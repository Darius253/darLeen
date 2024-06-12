import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { db } from '../firebase/BaseConfig'; // Import from firebaseConfig.js
import { Link } from 'react-router-dom';

interface Job {
  id: string;
    job_title: string;
    job_description: string;
    education_qualification?: string; // Optional property
    professional_qualification?: string; // Optional property
    yearsofexperience: number;
    location: string;
    skills: string[];
    gcsesPassed: number; // Optional property
    sector: string;
    Staff: string; // User ID of the job poster
  }
  
  interface Jobseeker {
    id: string; // Jobseeker document ID
    job_title: string;
    education_qualification?: string; // Optional property
    location: string;
    skills: string[];
    experience?: string; // Optional property
    sector: string;
    gcsesPassed: number; // Optional property
    yearsofexperience: number;
}

export const PostedJobs = () => {
  
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();
  const [matchingCounts, setMatchingCounts] = useState<{ [key: string]: number }>({});
  const [matchingJobseekerIds, setMatchingJobseekerIds] = useState<Set<string>>(new Set());


  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser ? currentUser : null);
      if (currentUser) {
        setIsLoading(true);
      setError(null);
      try {
        const jobsCollectionRef = collection(db, "Jobs");
        const q = query(jobsCollectionRef, where("Staff", "==", currentUser.uid)); // Filter by employer UID
        const querySnapshot = await getDocs(q);
        const fetchedJobs: Job[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedJobs.push({
                id: doc.id,
                job_title: data.job_title,
                job_description: data.job_description,
                education_qualification: data.education_qualification,
                professional_qualification: data.professional_qualification,
                yearsofexperience: data.yearsofexperience,
                location: data.location,
                skills: data.skills,
                gcsesPassed: data.gcsesPassed,
                sector: data.sector,
                Staff: data.Staff
            });
        });
        setJobs(fetchedJobs);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
  })

  return unsubscribe; 
  }, [auth]);

  useEffect(() => {
    if (jobs) {
        const getMatchingCounts = async () => {
            const newMatchingCounts: { [key: string]: number } = {};
            const tempMatchingJobseekerIds = new Set<string>();

            for (const job of jobs) {
                const {id,job_title, education_qualification, location, skills, professional_qualification, sector, gcsesPassed, yearsofexperience } = job;

          
                const jobseekersCollectionRef = collection(db, "Jobseeker");
                const q = query(jobseekersCollectionRef,
                    where("job_title", "==", job_title),
                    where("educational_qualification", "==", education_qualification),
                    where("location", "==", location),
                    where("skills", "array-contains-any", skills),
                    // where("experience", "==", professional_qualification),
                    where("sector", "==", sector),
                    where("gcsesPassed", ">=", gcsesPassed),
                    where("yearsofexperience", ">=", yearsofexperience)
                );

                const querySnapshot = await getDocs(q);
                let matchingCount = 0;
                querySnapshot.forEach(doc => {
                    const jobseeker = doc.data() as Jobseeker;
                    let criteriaMatchCount = 0;
                    if (jobseeker.job_title === job.job_title) criteriaMatchCount++;
                    if (jobseeker.education_qualification === job.education_qualification) criteriaMatchCount++;
                    if (jobseeker.location === job.location) criteriaMatchCount++;
                    if (jobseeker.skills.some(skill => job.skills.includes(skill))) criteriaMatchCount++;
                    if (jobseeker.experience === job.professional_qualification) criteriaMatchCount++;
                    if (jobseeker.sector === job.sector) criteriaMatchCount++;
                    if (jobseeker.gcsesPassed >= job.gcsesPassed) criteriaMatchCount++;
                    if (jobseeker.yearsofexperience >= job.yearsofexperience) criteriaMatchCount++;
                    if (criteriaMatchCount >= 4){
                      matchingCount++
                      tempMatchingJobseekerIds.add(doc.id);
                    };
                });
             

                newMatchingCounts[id] = matchingCount;
            }

            setMatchingCounts(newMatchingCounts);
            setMatchingJobseekerIds(tempMatchingJobseekerIds);
        };

        getMatchingCounts();

    }
}, [jobs]);
const encodedJobseekerIds = encodeURIComponent(JSON.stringify(Array.from(matchingJobseekerIds)));
const resultsUrl = `/homepage/matchingCandidates?jobseekerIds=${encodedJobseekerIds}`;

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
      {jobs&&jobs.length>0&&jobs.map((job,index) => (
        <div
          className="col border-bottom "
          key={index}
          style={{
            borderColor: "red",
            border: "all",
            width: "500px",
            height: "auto",
            margin: "20px",
          }}
        >
          <div
            className="col"
            style={{ color: "#1A4F6E", fontWeight: "bold", fontSize: "16px" }}
          >
           {job.job_title}
          </div>
          <div
            className="col"
            style={{ color: "#4A4A4A", fontSize: "14px", marginTop: "10px" }}
          >
            {job.job_description}
          </div>
          <div
            className="col"
            style={{
              color: "#4A4A4A",
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Requirments:
          </div>
          <div className="col" style={{ color: "#4A4A4A", fontSize: "14px" }}>
            - {job.education_qualification}
          </div>
          <div className="col" style={{ color: "#4A4A4A", fontSize: "14px" }}>
            - {job.professional_qualification?(job.professional_qualification):("No professional Qualifications")}
          </div>
          <div className="col" style={{ color: "#4A4A4A", fontSize: "14px" }}>
            - {job.gcsesPassed} GCSCES Passed
          </div>
          <div className="col" style={{ color: "#4A4A4A", fontSize: "14px" }}>
            - {job.yearsofexperience} years of experience
          </div>
          <div
            className="col"
            style={{
              color: "#013C5E",
              fontSize: "12px",
              fontWeight: "bold",
              margin: "10px",
            }}
          >
            Skills:
            <div className="d-flex flex-wrap">
              {job.skills&&job.skills.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: "17px",
                    width: "auto",
                    height: "auto",
                    padding: "8px",
                    margin: "10px",
                    color: "white",
                    backgroundColor: "#013C5E",
                    fontSize: "14px",
                    textAlign: "center",
                    fontWeight: "lighter",
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <Link to={resultsUrl}>
            <div
              style={{
                borderRadius: "25px",
                width: "auto",
                height: "auto",
                padding: "8px",
                margin: "10px",
                color: "black",

                fontSize: "14px",
                textAlign: "center",
                fontWeight: "lighter",
              }}
            >
              {matchingCounts[job.id]} Candidates Matched this job.
            </div>
          </Link>
          <div
            className="col"
            style={{
              color: "#4A4A4A",
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Location: {job.location}
          </div>
        </div>
      ))}
    </div>
  );
};
