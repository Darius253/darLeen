import React, { useState, useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate,Link} from 'react-router-dom'; 
import { db } from '../firebase/BaseConfig'; 

export const PostJob = () => {
  const [loading, setLoading] = useState(1);
  const jobTitleRef = useRef<HTMLInputElement>(null);
  const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const educationQualificationRef = useRef<HTMLSelectElement>(null);
  const professionalQualificationRef = useRef<HTMLInputElement>(null);
  const yearsOfExperienceRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const skillsRef = useRef<HTMLInputElement>(null);
  const gcsesPassedRef = useRef<HTMLInputElement>(null);
  const sectorRef = useRef<HTMLInputElement>(null);
  const auth = getAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [postJobError, setPostJobError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(2);

    setIsLoading(true);
    setPostJobError(null); // Clear previous errors

    const job_title = jobTitleRef.current?.value || ''; // Use empty string as default if null
    const job_description = jobDescriptionRef.current?.value || '';
    const education_qualification = educationQualificationRef.current?.value || '';
    const professional_qualification = professionalQualificationRef.current?.value || '';
    const yearsofexperience = parseInt(yearsOfExperienceRef.current?.value || '0'); // Assuming numerical value, default to 0
    const location = locationRef.current?.value || '';
    const skills = skillsRef.current?.value?.split(",") || []; // Split skills or use empty array as default
    const gcsesPassed = parseInt(gcsesPassedRef.current?.value || '0'); // Assuming numerical value, default to 0
    const sector = sectorRef.current?.value || '';


    if (!auth.currentUser?.uid) {
      setPostJobError('You must be logged in to post a job.');
      setIsLoading(false);
      return;
    }

    try {
      const jobData = {
        job_title,
        job_description,
        education_qualification,
        professional_qualification,
        yearsofexperience,
        location,
        skills,
        gcsesPassed,
        sector,
        Staff: auth.currentUser?.uid, // Add employer's UID
      };

      const jobsCollectionRef = collection(db, "Jobs");
      await addDoc(jobsCollectionRef, jobData);

      alert('Job posted successfully!');
      navigate("/homepage/company") // Replace with a success message component

      // Clear form after successful submission (optional)
    //   jobTitleRef.current?.value = '';
    // jobDescriptionRef.current?.value = '';
    // educationQualificationRef.current?.value = '';
    // professionalQualificationRef.current?.value = '';
    // yearsOfExperienceRef.current?.value = '';
    // locationRef.current?.value = '';
    // skillsRef.current?.value = '';
    // gcsesPassedRef.current?.value = '';
    // sectorRef.current?.value = '';
    } catch (error) {
      const typedError = error as Error; // Assert error as type Error
      setPostJobError(typedError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = () => {
    const selectedValue = educationQualificationRef.current!.value;
    console.log(selectedValue); // Output the selected option value
  };

  return (
    <div className="container" style={{ alignItems: "center" }}>
      <form onSubmit={handleSubmit}>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <input
            className="form-control"
            placeholder="Job Title"
            aria-label="Job Title"
            ref={jobTitleRef}
            required
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Job Sector"
            aria-label="Job Sector"
            ref={sectorRef}
            required
          />
        </div>
      </div>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <input
            className="form-control"
            placeholder="Years of Experience"
            aria-label="Years of Experience"
            ref={yearsOfExperienceRef}
            required
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Skills. Enter and separate with a comma(,)"
            aria-label="Skills"
            ref={skillsRef}
            required
          />
        </div>
      </div>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <input
            className="form-control"
            placeholder="Location"
            aria-label="Location"
            ref={locationRef}
            required
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Professional Qualification"
            aria-label="Professional Qualification"
            ref={professionalQualificationRef}
       
          />
        </div>
      </div>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <select
            className="form-control"
            aria-label="Educational Qualification"
            ref={educationQualificationRef}
            onChange={handleSelectChange}
            required
          >
            {" "}
            <option>BSc.</option>
            <option>Masters</option>
            <option>BA</option>
            <option>PhD</option>
          </select>
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Number of GCSE Passes"
            aria-label="Number of GCSE Passes"
            ref={gcsesPassedRef}
            required
          />
        </div>
      </div>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <textarea
            className="form-control"
            placeholder="Job Description"
            aria-label="Job Description"
            required
            maxLength={500}
            ref={jobDescriptionRef}
          />
        </div>
      </div>
      <div className="row justify-content-center" style={{ margin: "30px" }}>
        <div className="col-8">
          {loading === 1 && (
            <button
              className="form-control"
              type='submit'
              style={{ color: "white", backgroundColor: "#0086CA" }}
          
            >
              Submit
            </button>
          )}
           {loading === 2 && (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border "
                role="status"
                style={{ color: "#0086CA" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      </form>
    </div>
  );
};
