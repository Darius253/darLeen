import { SearchResults } from "./SearchResults";

export const FindCandidates = () => {
  let skills = [
    "JavaScript",
    "Software Engineering",
    "React",
    "React",
    "React",
  ];

  let candidates = [1, 2, 4, 5];
  let summary =
    "Had 5 years of working experience as design lead. Working for a reputated com. Just saw your job application. I think i am perfect fit for all your requirements and can start from your desired time. Lets talk in details in a interview. Just saw your job application. I think i am perfect fit for all your requirements and can start from your desired time. Lets talk in details in a interview. Just saw your job application. I think i am perfect fit for all your requirements and can start from your desired time. Lets talk in details in a interview.";

  // Count occurrences of the word "interview"
  //   const countInterviews = (summary.match(/\binterview\b/g) || []).length;

  //   console.log("Occurrences of 'interview':", countInterviews);

  return (
    <div className="row" style={{ margin: "30px" }}>
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
      <div className="row justify-content-around  ">
        {candidates.map((index) => (
          <div className={`col d-flex justify-content-center my-3`} key={index}>
            <SearchResults
              fullName={"Darius Tron"}
              skills={skills}
              summary={summary}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
