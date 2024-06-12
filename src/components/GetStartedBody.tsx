import { FaLink } from "react-icons/fa";
import { IoBriefcaseSharp } from "react-icons/io5";
import { BiMerge } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Body = () => {
  const buttonStyle = {
    fontSize: "14px",
    borderRadius: "25px",
  };

  return (
    <>
      <div
        className="col"
        style={{ marginTop: "100px", marginBottom: "200px" }}
      >
        <div className="row" style={{ marginRight: "50px" }}>
          <a style={{ fontSize: "20px", color: "black" }}>
            First 90 Days FREE for Employers!
          </a>
          <a style={{ fontSize: "72px", color: "white", fontWeight: "bold" }}>
            Connect.
          </a>
          <a style={{ fontSize: "72px", color: "#013C5E", fontWeight: "bold" }}>
            Merge. Work.
          </a>
          <div className="col">
            <Link to="/login">
              <button
                type="button"
                className="btn btn-outline-dark mr-2"
                style={{ ...buttonStyle, marginRight: "20px" }}
              >
                Post Job
              </button>
            </Link>

            <Link to="/signup/jobseeker">
              <button
                type="button"
                className="btn btn-primary"
                style={{ ...buttonStyle }}
              >
                Get Hired
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginLeft: "100px" }}>
        <div
          className="row"
          style={{
            fontSize: "14px",
            color: "white",
            width: "250px",
            marginRight: "150px",
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          <FaLink style={{ color: "#013C5E", fontSize: "20px" }} />
          <a style={{ color: "#484848", fontSize: "16px", fontWeight: "bold" }}>
            Connect
          </a>
          <a>
            DarLeen's mission is to CONNECT Employers with Job Seekers in an
            effective and efficient platform, making it easier for both.
          </a>
        </div>
        <div
          className="row"
          style={{
            fontSize: "14px",
            color: "white",
            width: "280px",
            marginRight: "150px",
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          <BiMerge style={{ color: "#013C5E", fontSize: "20px" }} />
          <a style={{ color: "#484848", fontSize: "16px", fontWeight: "bold" }}>
            Merge
          </a>
          <a>
            Using Resumes, Video Introductions, Video Interviews, and Direct
            Messages, DarLeen's platform goal is to MERGE Employers and Job
            Seekers.
          </a>
        </div>
        <div
          className="row"
          style={{
            fontSize: "14px",
            color: "white",
            width: "250px",
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          <IoBriefcaseSharp style={{ color: "#013C5E", fontSize: "20px" }} />
          <a style={{ color: "#484848", fontSize: "16px", fontWeight: "bold" }}>
            Work
          </a>
          <a>
            After Employers and Job Seekers have connected and merged, now it is
            time to WORK, mutually benefiting both.
          </a>
        </div>
      </div>
    </>
  );
};
