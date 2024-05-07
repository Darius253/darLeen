import { Link } from "react-router-dom";
import { FindCandidates } from "./FindCandidates";

export const CompanyHomePage = () => {
  return (
    <>
      <nav
        className="navbar border-bottom border-body justify-content-center"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="row justify-content-center">
          <div className="col text-center">
            <button
              type="button"
              className="btn btn-link"
              style={{ color: "#0086CA", fontSize: "16px", fontWeight: "bold" }}
            >
              Find Candidates
            </button>
            <button
              type="button"
              className="btn mr-2"
              style={{ color: "#484848", fontSize: "14" }}
            >
              Matching Candidates
            </button>

            <Link to="">
              <button
                type="button"
                className="btn btn-outline-light mr-2"
                style={{
                  marginLeft: "20px",
                  borderRadius: "20px",
                  backgroundColor: "#0086CA",
                  fontSize: "14px",
                }}
              >
                Post Job
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="col d-flex justify-content-center">
        <FindCandidates />
      </div>
    </>
  );
};
