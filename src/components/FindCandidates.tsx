import { SearchResults } from "./SearchResults";
import React, { useState } from 'react';
import { collection, query, where, getDocs,doc,getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { db } from '../firebase/BaseConfig';
import { Link } from 'react-router-dom';


  interface JobseekerData {
    first_name:string;
    last_name:string;
    email:string;
    job_title: string;
    education_qualification?: string; // Optional property
    location: string;
    skills: string[];
    experience?: string; // Optional property
    sector: string;
    gcsesPassed: number; // Optional property
    yearsofexperience: number;
    summary:string;
}

export const FindCandidates = () => {
  

  // Count occurrences of the word "interview"
  //   const countInterviews = (summary.match(/\binterview\b/g) || []).length;

  //   console.log("Occurrences of 'interview':", countInterviews);
  const [job_title, setJobTitle] = useState('');
  const [sector, setSector] = useState('');
  const [minEducationLevel, setMinEducationLevel] = useState('');
  const [minEducationLevels, setMinEducationLevels] = useState('');
  const [minGcsePasses, setMinGcsePasses] = useState('');
  const [minYearsExperience, setMinYearsExperience] = useState('');
  const [professionalQualification, setProfessionalQualification] = useState('');
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState<JobseekerData[]>([]);
  const auth = getAuth();
  const matchingJobseekerIds = new Set();
  const handleSearch = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setSearchResults([])
    const jobseekerQuery = query(collection(db, 'Jobseeker'));
    let searchCriteria = [];
    if (
        !job_title.trim() &&
        !sector.trim() &&
        !minGcsePasses &&
        !minEducationLevel.trim() &&
        !minEducationLevels.trim() &&
        !minYearsExperience &&
        !skill.trim()&&!location.trim()&&!professionalQualification.trim()
      ) {
        console.warn('No search criteria provided. Please enter at least one search term.');
        return; // Exit the function if no search criteria are provided
      }
    

    if (job_title) {
      searchCriteria.push(where('job_title', '==', job_title)); // Check if desired job title includes the entered title
    }
    if (sector) {
      searchCriteria.push(where('sector', '==', sector)); // Check if desired sector includes the entered sector
    }
    if (minGcsePasses) {
      searchCriteria.push(where('gcsesPassed', '>=', parseInt(minGcsePasses)));
    }
    if (minEducationLevel) {
      searchCriteria.push(where('educational_qualification', '==', minEducationLevel)); // Check if education array includes the specified level
    }
    if (minEducationLevels) {
      searchCriteria.push(where('education_level', '==', minEducationLevels)); // Check if education array includes the specified level
    }
    if (professionalQualification) {
        searchCriteria.push(where('experience', '==', professionalQualification)); // Check if education array includes the specified level
      }
      if (location) {
        searchCriteria.push(where('location', '==', location)); // Check if education array includes the specified level
      }
    if (minYearsExperience) {
      searchCriteria.push(where('yearsofexperience', '>=', parseInt(minYearsExperience))); // Check if experience array includes the specified experience level (use array-containsAny for multiple options)
    }
    if (skill) {
        searchCriteria.push(where('skills', 'array-contains', skill)); // Check if desired sector includes the entered sector
      }

    const combinedQuery = searchCriteria.length > 0 ? query(jobseekerQuery, ...searchCriteria) : jobseekerQuery; // Build combined query or use base query if no criteria
      
    try {
      const querySnapshot = await getDocs(combinedQuery);
      querySnapshot.forEach((doc) => matchingJobseekerIds.add(doc.id)); // Add matching Jobseeker IDs
    } catch (error) {
      console.error('Error fetching jobseekers:', error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }

    if (matchingJobseekerIds.size === 0) {
      console.log('No matching jobseekers found based on your search criteria.');
      // Display a message to the user (e.g., "No results found")
      return;
    }

    const jobseekers = [];
    for (const id of matchingJobseekerIds) {
      const jobseekerDoc =  doc(db, `Jobseeker/${id}`);
      const jobseekerData = (await getDoc(jobseekerDoc)).data() as JobseekerData;
      if (jobseekerData) {
        jobseekers.push({ id, ...jobseekerData });
      }
    }
    setSearchResults(jobseekers);



  }

  
 

  return (
    <div className="row" style={{ margin: "30px" }}>
      <form onSubmit={handleSearch}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Preferred Job "
              aria-label="Preferred Job "
              id="job_title"
              value={job_title} onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Minimum Education Level"
              aria-label="Minimum Education Level"
              id="minimumEducationLevel"
              value={minEducationLevels} onChange={(e) => setMinEducationLevels(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Educational Qualification"
              aria-label="Educational Qualification"
              id="edQualification"
              value={minEducationLevel} onChange={(e) => setMinEducationLevel(e.target.value)}
              
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Professional Qualification"
              aria-label="Professional Qualification"
              id="professionalQualification"
              value={professionalQualification} onChange={(e) => setProfessionalQualification(e.target.value)}
            />
          </div>
        </div>

        <div className="row" style={{ marginTop: "30px" }}>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Specific Skill"
              aria-label="Specific Skill"
              id="skill"
              value={skill} onChange={(e) => setSkill(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Years of Experience"
              aria-label="Years of experience"
              id="yearsOfExperience"
              value={minYearsExperience} onChange={(e) => setMinYearsExperience(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="GCSE Passses"
              aria-label="GCSE Passses"
              id="gcsePasses"
              value={minGcsePasses} onChange={(e) => setMinGcsePasses(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              aria-label="LOcation"
              id="location"
              value={location} onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Sector"
              aria-label="Sector"
              id="sector"
              value={sector} onChange={(e) => setSector(e.target.value)}
            />
          </div>
          <button
            className="btn btn-outline-light"
            type="submit"
            style={{
              width: "100px",
              borderRadius: "25px",
              backgroundColor: "#0086CA",
              color: "white",
            }}
          >
            Search
          </button>
        </div>
      </form>
      <div className="row justify-content-around  ">
        {searchResults.length>0?(searchResults.map((result,index) => (
          <div className={`col d-flex justify-content-center my-3`} key={index}>
            <SearchResults
              fullName={result.first_name+" "+result.last_name}
              skills={result.skills}
              summary={result.summary}
            />
          </div>
        ))):(<p>No candidate match this search.Try again</p>)}
      </div>
    </div>
  );
};
