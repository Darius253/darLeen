import { SearchResults } from "./SearchResults";

export const MatchingCandidates = () => {
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
      {candidates.map((index) => (
        <div className="col" key={index}>
          <SearchResults
            fullName={"Darius Tron"}
            skills={skills}
            summary={summary}
          />
        </div>
      ))}
    </div>
  );
};
