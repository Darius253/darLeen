import React, { useState, useEffect,useRef } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getDoc, doc, collection, addDoc, Timestamp,updateDoc,arrayUnion,getDocs, query, where} from 'firebase/firestore'; // Import Firestore for document retrieval and writing
import { db } from '../firebase/BaseConfig'; // Assuming you have a firebaseConfig
import { Link } from 'react-router-dom';

interface EducationEntry {
    institution?: string;
    degree?: string;
    fieldOfStudy?: string;
    levelOfStudy?: string;
    gcsesPassed?: number;
    startDate?: Timestamp; // Use Timestamp for date-time fields
    endDate?: Timestamp;
  }

export const EducationHistory = () => {
    const [educationInfo, setEducationInfo] = useState<EducationEntry[]>([]);
    const [educationInfos, setEducationInfos] = useState<EducationEntry[]>([]);
    const auth=getAuth();

    useEffect(() => {
        const getEducationData = async () => {
          try {
            // Get a reference to the education collection
            const educationRef = collection(db, 'Education');
            const querys = query(educationRef, where('Jobseeker', '==', auth.currentUser?.uid));
    
          // Get all matching education documents
          const educationSnapshot = await getDocs(querys);
    
            // Get all education documents (adjust query as needed)
    
            // Extract data from each document and set state
            const educationData = educationSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as EducationEntry), // Spread operator includes all document data
              }));
              setEducationInfos(educationData);
          } catch (error) {
            console.error('Error fetching education data:', error);
          }
        };
    
        getEducationData();
      }, [db,auth.currentUser?.uid]);

      const handleAddEducation = () => {
        setEducationInfo([...educationInfo, {}]); // Add an empty education entry
      };
    
      const handleEducationChange = (index: number, key: string, value: string | Timestamp | string[]) => {
        setEducationInfo((prevData) =>
          prevData.map((entry, i) => (i === index ? { ...entry, [key]: value } : entry))
        );
      };
    
      const handleEducationDelete = (index: number) => {
        setEducationInfo((prevData) => prevData.filter((_, i) => i !== index));
      };


      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("hfdghf")
        try {
          const educationCollection = collection(db, 'Education');
          const user = auth.currentUser; // Assuming you have the current user
      
          if (!user?.uid) {
            console.error('User not logged in, cannot save education');
            return;
          }
      
          for (const educationEntry of educationInfo) {
            const { institution, degree, endDate } = educationEntry; // Destructure education properties
      
            // Build a query to check for similar institutions and degrees within a date range (adjustable)
            const existingEduQuery = query(educationCollection, 
              where('Jobseeker', '==', user.uid),
              where('institution', '==', institution),
              where('degree', 'in', [degree, `${degree} (similar)`]), // Allow for potential variations in degree names
              where('endDate', '<=', endDate?? Infinity), // Convert to milliseconds
          where('endDate', '>=', endDate?? Infinity)// Check if new graduation falls within +- 1 year of existing ones
            );
      
            const querySnapshot = await getDocs(existingEduQuery);
      
            // Check if any documents matched the query (similar education within date range)
            if (querySnapshot.empty) {
              // Education doesn't exist, add it
              const educationRef = await addDoc(educationCollection, {
                ...educationEntry,
                Jobseeker: user.uid,
                createdAt: Timestamp.now(),
              });
      
              // Update jobseeker data with education reference (same as before)
              const jobseekerRef = doc(db, 'Jobseeker', user.uid);
              await updateDoc(jobseekerRef, {
                education: arrayUnion(educationRef),
              });
            } else {
              console.log(`Similar education entry for ${institution} - ${degree} already exists within a year of the provided graduation date.`);
              // You can optionally handle potential duplicates here (e.g., skip or prompt user)
            }
          }
      
          console.log('Education data saved successfully!');
      
        } catch (error) {
          // ... error handling remains the same ...
          const typedError = error as Error; // Assert error as type Error
          console.log(typedError.message);
        }
      };
  return (
<>
{/* print */}
<div className="experience-section">
        {educationInfos.length > 0 ?(
          educationInfos.map((experience, index) => (
            <div>
            <p>{experience.institution}</p>
            <p>{experience.degree}</p>
            <p>{experience.fieldOfStudy}</p>
            <p>{experience.startDate instanceof Timestamp ? experience.startDate.toDate().toISOString() : experience.startDate || ''}</p>
            <p>{experience.levelOfStudy}</p>
            <p>{experience.endDate instanceof Timestamp ? experience.endDate.toDate().toISOString() : experience.endDate || 'Current School'}</p>
            <hr></hr>
            </div>

          ))
        ):(<p>No education history.Add some</p>)}
        </div>
    <form onSubmit={handleSubmit}>


    <div
              className="row"
              style={{ width: "450px", paddingBottom: "15px", height: "auto" }}
            >
                {educationInfo.length > 0 && (
          educationInfo.map((education, index) => (
            <EducationForm
              key={index}
              index={index}
              education={education}
              handleChange={handleEducationChange}
              onDelete={() => handleEducationDelete(index)}
            />
          ))
        )}
         <button onClick={handleAddEducation}>Add New Education</button>
              <br></br>

                {educationInfo.length>0&&<button type="submit">Submit Education</button>}
      
      </div>
             
             
          
            
            </form>
            
            </>   
  );
};


interface EducationFormProps {
    index: number; // Specify the type of 'index' as number
    education: EducationEntry;
    handleChange: (index: number, key: string, value: string | Timestamp | string[]) => void;
    onDelete: () => void;
  }
  
  const EducationForm: React.FC<EducationFormProps> = ({ index, education, handleChange, onDelete }) => {
    // Define options for select fields
    const degrees = [
      'Bachelor of Arts (BA)',
      'Bachelor of Science (BS)',
      'Master of Arts (MA)',
      'Master of Science (MS)',
      'Doctor of Philosophy (PhD)',
      'Associate Degree',
      'Diploma',
      'Certificate',
      'Other', // Optional for custom entries
    ];
  
    const fieldsOfStudy = [
      'Computer Science',
      'Engineering',
      'Business Administration',
      'Marketing',
      'Humanities',
      'Social Sciences',
      'Education',
      'Law',
      'Medicine',
      'Other', // Optional for custom entries
    ];
  
    const levelsOfStudy = [
      'Undergraduate',
      'Diploma',
      'Postgraduate',
      'Doctoral',
    ];
  
    return (
      <div className="row border"  style={{ width: "450px", paddingBottom: "15px", height: "auto" }}>
        <label htmlFor={`institution-${index}`} style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}>Institution:</label>
        <input
          type="text"
          id={`institution-${index}`}
          name="institution"
          value={education.institution || ''}
          onChange={(e) => handleChange(index, 'institution', e.target.value)}
          style={{
            color: "#1A4F6E",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        />
  
        <label htmlFor={`degree-${index}`} style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}>Degree:</label>
        <select
          id={`degree-${index}`}
          name="degree"
          value={education.degree || ''}
          onChange={(e) => handleChange(index, 'degree', e.target.value)}
          style={{
            color: "#1A4F6E",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
             <option>
                Select Degree
            </option>
          {degrees.map((degree, i) => (
           
            <option key={i} value={degree}>
              {degree}
            </option>
          ))}
        </select>
  
        <label htmlFor={`fieldOfStudy-${index}`} style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}>Field of Study:</label>
        <select
          id={`fieldOfStudy-${index}`}
          name="fieldOfStudy"
          value={education.fieldOfStudy || ''}
          onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
          style={{
            color: "#1A4F6E",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
             <option>
                Field of Study
            </option>
          {fieldsOfStudy.map((field, i) => (
            <option key={i} value={field}>
              {field}
            </option>
          ))}
        </select>
  
        <label htmlFor={`levelOfStudy-${index}`} style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}>Level of Study:</label>
        <select
          id={`levelOfStudy-${index}`}
          name="levelOfStudy"
          value={education.levelOfStudy || ''}
          onChange={(e) => handleChange(index, 'levelOfStudy', e.target.value)}
          style={{
            color: "#1A4F6E",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
             <option>
                Select Level of Study
            </option>
          {levelsOfStudy.map((level, i) => (
            <option key={i} value={level}>
              {level}
            </option>
          ))}
        </select>
  
        <label htmlFor={`startDate-${index}`} style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}>Start Date:</label>
        <input
          type="date"
          id={`startDate-${index}`}
          name="startDate"
          value={education.startDate instanceof Timestamp ? education.startDate.toDate().toISOString() : education.startDate || ''}
          onChange={(e) => handleChange(index, 'startDate', e.target.value)}
          style={{
            color: "#1A4F6E",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        />
  
        <label htmlFor={`endDate-${index}`} style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}>End Date:</label>
        <input
          type="date"
          id={`endDate-${index}`}
          name="endDate"
          value={education.endDate instanceof Timestamp ? education.endDate.toDate().toISOString() : education.endDate || ''}
          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
          style={{
            color: "#1A4F6E",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        />
        <label htmlFor={`gcsesPassed-${index}`} style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}>GcsesPassed:</label>
        <input
          type="number"
          id={`gcsesPassed-${index}`}
          name="gcsesPassed"
          value={education.gcsesPassed || ''}
          onChange={(e) => handleChange(index, 'gcsesPassed', e.target.value)}
          style={{
            color: "#1A4F6E",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        />
  
  
  
        <button onClick={onDelete}>Delete Education</button>

       
      </div>
    );
  };