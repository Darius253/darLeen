import { FindCandidates } from "./FindCandidates";
import { useState } from "react";
import { PostedJobs } from "./PostedJobs";
import { PostJob } from "./PostJob";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

export const CompanyHomePage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const auth=getAuth();
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
      <nav
        className="navbar border-bottom border-body justify-content-center"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="row justify-content-center " style={{ width: "100%" }}>
          <div className="col text-end ">
            <span
              onClick={() => setActiveTab(1)}
              className="btn mr-2"
              style={{
                color: activeTab === 1 ? "#0086CA" : "#484848",
                fontSize: "16px",
                textDecoration: activeTab === 1 ? "underline" : "",
              }}
            >
              Find Candidates
            </span>
            <span
              onClick={() => setActiveTab(2)}
              className="btn mr-2"
              style={{
                color: activeTab === 2 ? "#0086ca" : "#484848",
                fontSize: "14",
                textDecoration: activeTab === 2 ? "underline" : "",
              }}
            >
              Active Jobs
            </span>

            <span
              className="btn mr-2"
              onClick={() => setActiveTab(3)}
              style={{
                color: activeTab === 3 ? "#0086ca" : "#484848",
                fontSize: "14",
                textDecoration: activeTab === 3 ? "underline" : "",
              }}
            >
              Post Job
            </span>
            <span style={{ paddingLeft: "600px" }}>
     
               
                <button
                  style={{
                    borderRadius: "17.5px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "4px 10px",
                    outline: "none",
                  }}
                  onClick={handleLogout}
                >
                Log Out
                </button>
       
            </span>
          </div>
        </div>
      </nav>
      <div className="col d-flex justify-content-center">
        {activeTab === 1 && <FindCandidates />}
        {activeTab === 2 && <PostedJobs />}
        {activeTab === 3 && <PostJob />}
      </div>
    </>
  );
};
