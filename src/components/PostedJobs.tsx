import { Link } from "react-router-dom";

export const PostedJobs = () => {
  const jobs = [1, 2, 3];
  const skills = ["React", "JavaScript", "Mobile Dev"];
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
      {jobs.map((index) => (
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
            Job Position
          </div>
          <div
            className="col"
            style={{ color: "#4A4A4A", fontSize: "14px", marginTop: "10px" }}
          >
            Our company Microsoft is looking for a senior UI and UX lead
            designer to take over March, 2020.
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
            - 5 years Experience
          </div>
          <div className="col" style={{ color: "#4A4A4A", fontSize: "14px" }}>
            - 5 years Experience
          </div>
          <div className="col" style={{ color: "#4A4A4A", fontSize: "14px" }}>
            - 5 years Experience
          </div>
          <div className="col" style={{ color: "#4A4A4A", fontSize: "14px" }}>
            - 5 years Experience
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
              {skills.map((skill, index) => (
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
          <Link to="/homepage/matchingCandidates">
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
              10 Candidates Matched this job.
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
            Location: London
          </div>
        </div>
      ))}
    </div>
  );
};
