import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  getDoc,
  doc,
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  getDocs,
  query,
  where,
} from "firebase/firestore"; // Import Firestore for document retrieval and writing
import { db } from "../firebase/BaseConfig"; // Assuming you have a firebaseConfig
import { Link } from "react-router-dom";

interface ExperienceEntry {
  company_name?: string;
  job_title?: string;
  start_date?: Timestamp; // Can be a string representation of a date or a Timestamp object
  end_date?: Timestamp; // Can be a string representation of a date or a Timestamp object
  description?: string;
  sector?: string;
}

export const WorkHistory = () => {
  const [workExperience, setWorkExperience] = useState<ExperienceEntry[]>([]);
  const [workExperiences, setWorkExperiences] = useState<ExperienceEntry[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const getExperienceData = async () => {
      try {
        // Get a reference to the education collection
        const experienceRef = collection(db, "Experience");
        const querys = query(
          experienceRef,
          where("Jobseeker", "==", auth.currentUser?.uid)
        );

        // Get all matching education documents
        const experienceSnapshot = await getDocs(querys);
        const experienceData = experienceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as ExperienceEntry), // Spread operator includes all document data
        }));
        setWorkExperiences(experienceData);
      } catch (error) {
        console.error("Error fetching experience data:", error);
      }
    };

    getExperienceData();
  }, [db, auth.currentUser?.uid]);

  const handleAddExperience = () => {
    setWorkExperience([...workExperience, {}]); // Add an empty education entry
  };

  const handleExperienceChange = (
    index: number,
    key: string,
    value: string | Timestamp | string[]
  ) => {
    setWorkExperience((prevData) =>
      prevData.map((entry, i) =>
        i === index ? { ...entry, [key]: value } : entry
      )
    );
  };

  const handleExperienceDelete = (index: number) => {
    setWorkExperience((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleSubmitExperience = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const experienceCollection = collection(db, "Experience");
      const user = auth.currentUser; // Assuming you have the current user

      if (!user?.uid) {
        console.error("User not logged in, cannot save experience");
        return;
      }

      for (const experienceEntry of workExperience) {
        const { company_name, job_title, start_date, end_date } =
          experienceEntry; // Destructure experience properties

        // Build a query to check for existing experience with same company & job title within date range
        const existingExpQuery = query(
          experienceCollection,
          where("Jobseeker", "==", user.uid),
          where("company_name", "==", company_name),
          where("job_title", "==", job_title),
          where("start_date", "<=", end_date ?? Infinity),
          where("end_date", ">=", start_date)
        );

        const querySnapshot = await getDocs(existingExpQuery);

        // Check if any documents matched the query (existing overlapping experience)
        if (querySnapshot.empty) {
          // Experience doesn't exist, add it
          const experienceRef = await addDoc(experienceCollection, {
            ...experienceEntry,
            Jobseeker: user.uid,
            createdAt: Timestamp.now(),
          });

          // Update jobseeker data with experience reference (same as before)
          const jobseekerRef = doc(db, "Jobseeker", user.uid);
          await updateDoc(jobseekerRef, {
            experience: arrayUnion(experienceRef),
          });
        } else {
          console.log(
            `Experience for ${company_name} - ${job_title} already exists within the provided date range.`
          );
          // You can optionally handle overlapping entries here (e.g., skip or prompt user)
        }
      }

      console.log("Experience data saved successfully!");
    } catch (error) {
      // ... error handling remains the same ...
      const typedError = error as Error; // Assert error as type Error
      console.log(typedError.message);
    }
  };
  return (
    <>
      {/* print */}
      <div className="experience-section ">
        {workExperiences.length > 0 ? (
          workExperiences.map((experience, index) => (
            <div>
              <label
                htmlFor="company"
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                }}
              >
                Company Name
              </label>
              <p>{experience.company_name}</p>
              <label
                htmlFor="jobTitle"
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                }}
              >
                Job Title
              </label>
              <p>{experience.job_title}</p>
              <label
                htmlFor="jobDescription"
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                }}
              >
                Job Description
              </label>
              <p>{experience.description}</p>
              <label
                htmlFor="startDate"
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                }}
              >
                Start Date
              </label>
              <p>
                {experience.start_date instanceof Timestamp
                  ? experience.start_date.toDate().toISOString()
                  : experience.start_date || ""}
              </p>

              <label
                htmlFor="sector"
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                }}
              >
                Industry
              </label>
              <p>{experience.sector}</p>
              <label
                htmlFor="enddate"
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                }}
              >
                End Date
              </label>
              <p>
                {experience.end_date instanceof Timestamp
                  ? experience.end_date.toDate().toISOString()
                  : experience.end_date || "Current Job"}
              </p>
              <hr></hr>
            </div>
          ))
        ) : (
          <p>No work experience. Add more</p>
        )}
      </div>
      <form onSubmit={handleSubmitExperience}>
        <div
          className="row"
          style={{ width: "450px", paddingBottom: "15px", height: "auto" }}
        >
          {workExperience.length > 0 &&
            workExperience.map((experience, index) => (
              <ExperienceForm
                key={index}
                index={index}
                experience={experience}
                handleChange={handleExperienceChange}
                onDelete={() => handleExperienceDelete(index)}
              />
            ))}

          <button
            onClick={handleAddExperience}
            style={{
              borderRadius: "5px",
              border: "none",
              backgroundColor: "white",
              color: "#0086CA",
            }}
          >
            Add New Work Experience
          </button>
          <br></br>

          {workExperience.length > 0 && (
            <button
              type="submit"
              style={{
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#0086CA",
                color: "white",
                marginTop: "10px",
              }}
            >
              Submit Experience
            </button>
          )}
        </div>
      </form>
    </>
  );
};

interface ExperienceFormProps {
  index: number; // Specify the type of 'index' as number
  experience: ExperienceEntry;
  handleChange: (
    index: number,
    key: string,
    value: string | Timestamp | string[]
  ) => void;
  onDelete: () => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  index,
  experience,
  handleChange,
  onDelete,
}) => {
  // Define options for select fields
  const sectors = [
    // Replace with your actual sectors
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    // ... other sectors
  ];

  return (
    <div
      className="row "
      style={{ width: "450px", paddingBottom: "15px", height: "auto" }}
    >
      <label
        htmlFor="companyName"
        style={{
          color: "#1A4F6E",
          fontSize: "12px",
          marginTop: "15px",
        }}
      >
        Company Name:
      </label>
      <input
        type="text"
        style={{
          color: "#1A4F6E",
          fontSize: "14px",
          fontWeight: "bold",
        }}
        id="company_name"
        value={experience.company_name}
        onChange={(e) => handleChange(index, "company_name", e.target.value)}
        required
      />

      <label
        htmlFor="jobTitle"
        style={{
          color: "#1A4F6E",
          fontSize: "12px",
          marginTop: "15px",
        }}
      >
        Job Title:
      </label>
      <input
        type="text"
        style={{
          color: "#1A4F6E",
          fontSize: "14px",
          fontWeight: "bold",
        }}
        id="job_title"
        value={experience.job_title}
        onChange={(e) => handleChange(index, "job_title", e.target.value)}
        required
      />

      <label
        htmlFor="startDate"
        style={{
          color: "#1A4F6E",
          fontSize: "12px",
          marginTop: "15px",
        }}
      >
        Start Date:
      </label>
      <input
        type="date"
        style={{
          color: "#1A4F6E",
          fontSize: "14px",
          fontWeight: "bold",
        }}
        id="start_date"
        value={
          experience.start_date instanceof Timestamp
            ? experience.start_date.toDate().toISOString()
            : experience.start_date || ""
        }
        onChange={(e) => handleChange(index, "start_date", e.target.value)}
      />

      <label
        htmlFor="endDate"
        style={{
          color: "#1A4F6E",
          fontSize: "12px",
          marginTop: "15px",
        }}
      >
        End Date:
      </label>
      <input
        type="date"
        style={{
          color: "#1A4F6E",
          fontSize: "14px",
          fontWeight: "bold",
        }}
        id="end_date"
        value={
          experience.end_date instanceof Timestamp
            ? experience.end_date.toDate().toISOString()
            : experience.end_date || ""
        }
        onChange={(e) => handleChange(index, "end_date", e.target.value)}
      />

      <label
        htmlFor="sector"
        style={{
          color: "#1A4F6E",
          fontSize: "12px",
          marginTop: "15px",
        }}
      >
        Sector:
      </label>
      <select
        id="sector"
        style={{
          color: "#1A4F6E",
          fontSize: "14px",
          fontWeight: "bold",
        }}
        value={experience.sector}
        onChange={(e) => handleChange(index, "sector", e.target.value)}
        required
      >
        {sectors.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label
        htmlFor="description"
        style={{
          color: "#1A4F6E",
          fontSize: "12px",
          marginTop: "15px",
        }}
      >
        Description:
      </label>
      <textarea
        id="description"
        style={{
          color: "#1A4F6E",
          fontSize: "14px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
        value={experience.description}
        onChange={(e) => handleChange(index, "description", e.target.value)}
      />

      {/* Add more form fields if needed (e.g., GPA, coursework) */}

      <button
        onClick={onDelete}
        style={{
          borderRadius: "4px",
          border: "none",
          backgroundColor: "red",
          color: "white",
        }}
      >
        Delete Job History
      </button>
    </div>
  );
};
