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
      >
        Here are the results:
      </div>
      <div
        className="border"
        style={{
          borderColor: "red",
          border: "all",
          width: "500px",
          height: "auto",
        }}
      >
        <div className="row align-items-start" style={{ margin: "20px" }}>
          <div
            className="avatar text-white"
            style={{
              borderRadius: "100px",
              width: "60px",
              height: "60px",
              textAlign: "center",
              backgroundColor: "gray",
            }}
          >
            CUI
          </div>

          <div className="col">
            <div
              className="col"
              style={{ color: "#0086CA", fontSize: "15px", fontWeight: "bold" }}
            >
              Darius Tron
            </div>
            <div
              className="col"
              style={{
                color: "#4A4A4A",
                fontSize: "13px",
                // overflow: "clip",
                height: "auto",
                textOverflow: "ellipsis",
                textAlign: "justify",
              }}
            >
              Had 5 years of working experience as design lead. Working for a
              reputated com. Just saw your job application. I think i am perfect
              fit for all your requirements and can start from your desired
              time. Lets talk in details in a interview. Just saw your job
              application. I think i am perfect fit for all your requirements
              and can start from your desired time. Lets talk in details in a
              interview. Just saw your job application. I think i am perfect fit
              for all your requirements and can start from your desired time.
              Lets talk in details in a interview.
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
                    borderRadius: "20px",
                    margin: "5px",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
