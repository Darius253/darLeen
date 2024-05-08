import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { db } from '../firebase/BaseConfig'; // Import from firebaseConfig.js
import { WorkHistory } from './WorkHistory';
import { EducationHistory } from './EducationHistory';


interface JobseekerData {
  email: string;
  first_name?: string;
  last_name?: string;
  gcsesPassed?: number; // Assuming numerical value
  skills: string[]; // Array of skills
  experience?: string;
  location?: string;
  summary?: string;
  role?: string;
  educational_qualification?:string,
  education_level?:string,
  uid: string; // User ID from Firebase authentication
}
export const JobSeekerHomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [jobseekerData, setJobseekerData] = useState<JobseekerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser ? currentUser : null);

      // If user is logged in and has a UID, fetch jobseeker data
      if (currentUser) {
        setIsLoading(true);
      setError(null);
      try {
        const jobseekerDoc = await getDoc(doc(db, "Jobseeker", currentUser.uid));
        if (jobseekerDoc.exists()) {
          setJobseekerData(jobseekerDoc.data() as JobseekerData);
        } else {
          console.error("Jobseeker document not found for current user");
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
      }
    });

    return unsubscribe; // Cleanup function to unsubscribe on unmount
  }, [auth]);
  const {
    email = null,
    first_name = null,
    last_name = null,
    gcsesPassed = null,
    skills = [], // Initialize skills as an empty array if null
    experience = null,
    location = null,
    summary = null,
    role = 'Jobseeker',
    educational_qualification = null,
    education_level = null,
  } = jobseekerData || {};

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user from Firebase Authentication
      console.log('User successfully logged out');
      window.location.href = '/login'; // Redirect to login page (replace with your desired URL)
    } catch (error) {
      const typedError = error as Error;
      console.error('Error logging out:', typedError);
      // Handle specific errors (optional)
    }
  };
  
  return (
    <>
      <nav className="border-bottom" style={{ marginTop: "40px" }}><button onClick={handleLogout}>Logout</button></nav>
      <div
        className="row"
        style={{ width: "auto", height: "80vh", margin: "50px" }}
      >
        <div className="col border-end" style={{ width: "20%" }}>
          <div
            className=""
            style={{
              borderRadius: "100px",
              width: "160px",
              height: "160px",
              textAlign: "center",

              border: "2px solid grey", // Specify border separately
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#0086CA", fontSize: "20px" }}>
              {first_name?.charAt(0)} {last_name?.charAt(0)}
                
            </span>
          </div>
          <span
            style={{
              color: "#0086CA",
              fontSize: "20px",
              fontWeight: "bold",
              // marginLeft: "20px",
            }}
          >
            {first_name} {last_name}
          </span>

          <div
            style={{
              color: "#013C5E",
              fontSize: "12px",

              // marginLeft: "20px",
              marginTop: "30px",
            }}
          >
            Location
          </div>
          <div
            style={{
              color: "#013C5E",
              fontSize: "14px",
              fontWeight: "bold",

              // marginLeft: "20px",
              marginTop: "5px",
            }}
          >
            {location}
          </div>
          <div
            style={{
              color: "#013C5E",
              fontSize: "12px",

              // marginLeft: "20px",
              marginTop: "30px",
            }}
          >
            Email
          </div>
          <div
            style={{
              color: "#013C5E",
              fontSize: "14px",
              fontWeight: "bold",

              // marginLeft: "20px",
              marginTop: "5px",
            }}
          >
           {email}
          </div>
          <div
            className="border-top"
            style={{
              color: "#013C5E",
              fontSize: "14px",
              fontWeight: "bold",

              // marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              {" "}
              Skills
            </div>
            <div className="d-flex flex-wrap">
              {skills.map((skill: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                <div
                  className="border "
                  key={index}
                  style={{
                    color: "white",
                    width: "auto",
                    borderColor: "#E8E8E8",
                    backgroundColor: "#013C5E",
                    borderRadius: "17px",
                    margin: "0px 4px 4px 0px",
                    textAlign: "center",
                    padding: "5px",
                    fontWeight: "normal",
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-end" style={{ width: "50%" }}>
          <div
            className="row"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <span
              style={{
                color: "#0086CA",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "15px",
              }}
            >
              Professional Summary
            </span>
            <span
              style={{
                textAlign: "justify",
                fontSize: "14px",
                color: "#4A4A4A",
              }}
            >
              {summary}
            </span>
            <span
              style={{
                color: "#0086CA",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "15px",
                marginTop: "30px",
              }}
            >
              Work History
            </span>
            <WorkHistory/>

            <hr></hr>
           
          </div>
        </div>
        <div className="bg-green" style={{ width: "35%" }}>
        <span
              style={{
                color: "#0086CA",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "15px",
                marginTop: "30px",
              }}
            >
              Education History
            </span>
            <EducationHistory/>
          
        </div>
      </div>
    </>
  );
};
