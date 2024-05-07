interface Props {
  fullName: string;
  skills: string[];
  summary: string;
}

export const SearchResults = (props: Props) => {
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          color: "#013C5E",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      ></div>

      <div
        className="border "
        style={{
          borderColor: "red",
          border: "all",
          width: "500px",
          height: "auto",
        }}
      >
        <div className="row align-items-start" style={{ margin: "15px" }}>
          <div
            className=""
            style={{
              borderRadius: "100px",
              width: "60px",
              height: "60px",
              textAlign: "center",

              border: "2px solid grey", // Specify border separately
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#0086CA" }}>
              {props.fullName
                .split(" ")
                .map((word) => word.charAt(0))
                .join("")}
            </span>
          </div>

          <div className="col">
            <div
              className="col"
              style={{
                color: "#0086CA",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              {props.fullName}
            </div>
            <div
              className="col"
              style={{
                color: "#4A4A4A",
                fontSize: "13px",

                height: "auto",
                textOverflow: "ellipsis",
                textAlign: "justify",
              }}
            >
              {props.summary}
            </div>
            <div
              className="col"
              style={{
                color: "#4A4A4A",
                fontWeight: "bold",
                fontSize: "12px",
                marginTop: "15px",
              }}
            >
              Skills
            </div>
            <div className="d-flex flex-wrap">
              {props.skills.map((skill, index) => (
                <div
                  className="border "
                  key={index}
                  style={{
                    color: "black",
                    width: "auto",
                    borderColor: "#E8E8E8",
                    backgroundColor: "white",
                    borderRadius: "17px",
                    margin: "2px",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
            <div className="col" style={{ alignItems: "end" }}>
              <button
                className="border"
                style={{
                  borderRadius: "25px",
                  padding: "10px",
                  backgroundColor: "#0086CA",
                  color: "white",
                }}
              >
                Shortlist Candidate
              </button>
              <button
                className="border"
                style={{
                  borderRadius: "25px",
                  padding: "10px",
                  margin: "20px",
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
