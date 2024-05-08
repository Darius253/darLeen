import { SearchResults } from "./SearchResults";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { db } from '../firebase/BaseConfig'; // Import from firebaseConfig.js
import { useSearchParams,Link } from 'react-router-dom';

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

export const MatchingCandidates = () => {
  const [searchParams] = useSearchParams();
  const encodedJobseekerIds = searchParams.get('jobseekerIds');
  const [jobseekers, setJobseekers] = useState<JobseekerData[]>([]); // Store fetched jobseeker data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchJobseekers = async () => {
      if (encodedJobseekerIds) {
        setIsLoading(true);
        const jobseekerIds = JSON.parse(decodeURIComponent(encodedJobseekerIds));
        console.log(jobseekerIds);

        

        try {
          const jobseekerQuery = query(collection(db, 'Jobseeker'), where('uid', 'in', jobseekerIds));
          const querySnapshot = await getDocs(jobseekerQuery);
          const fetchedJobseekers = querySnapshot.docs.map((doc) => ({ ...doc.data() as JobseekerData }));
          setJobseekers(fetchedJobseekers);
        } catch (error) {
            setError((error as Error).message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchJobseekers();
  }, [encodedJobseekerIds]);

  return (
    <div
      className="col d-flex  "
      style={{
        margin: "10px",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to="/homepage/company">Back</Link>
      {jobseekers.map((result,index) => (
        <div className="col" key={index}>
          <SearchResults
            fullName={result.first_name+" "+result.last_name}
            skills={result.skills}
            summary={result.summary}
          />
        </div>
      ))}
    </div>
  );
};
