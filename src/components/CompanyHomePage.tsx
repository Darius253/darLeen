import { FindCandidates } from "./FindCandidates";
import { useState } from "react";
import { PostedJobs } from "./PostedJobs";
import { PostJob } from "./PostJob";
import { Link } from "react-router-dom";

export const CompanyHomePage = () => {
  const [activeTab, setActiveTab] = useState(1);
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
              <Link to="/login">
               
                <button
                  style={{
                    borderRadius: "17.5px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "4px 10px",
                    outline: "none",
                  }}
                >
                Log Out
                </button>
              </Link>
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
