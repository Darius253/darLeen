import { SearchResults } from "./SearchResults";

export const FindCandidates = () => {
  let skills = [
    "JavaScript",
    "Software Engineering",
    "React",
    "React",
    "React",
  ];
  return (
    <div className="col" style={{ margin: "30px" }}>
      <form>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Preferred Job Sector"
              aria-label="Preferred Job Sector"
              id="jobPosition"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Minimum Education Level"
              aria-label="Minimum Education Level"
              id="minimumEducationLevel"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Educational Qualification"
              aria-label="Educational Qualification"
              id="edQualification"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Professional Qualification"
              aria-label="Professional Qualification"
              id="professionalQualification"
              required
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
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Years of Experience"
              aria-label="Years of experience"
              id="yearsOfExperience"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="GCSE Passses"
              aria-label="GCSE Passses"
              id="gcsePasses"
              required
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
            {" "}
            Search
          </button>
        </div>
      </form>
      <SearchResults fullName={""} skills={skills} summary={""} />
    </div>
  );
};
