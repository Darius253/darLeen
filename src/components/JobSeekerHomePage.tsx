export const JobSeekerHomePage = () => {
  const fullName = "Darius Tron";
  const skills = ["React", "Java", "Flutter", "HTML"];
  return (
    <>
      <nav className="border-bottom" style={{ marginTop: "40px" }}></nav>
      <div
        className="row"
        style={{ width: "auto", height: "80vh", margin: "50px" }}
      >
        <div className="col border-end" style={{ width: "20%" }}>
          <div
            className=""
            style={{
              borderRadius: "100px",
              width: "160px",
              height: "160px",
              textAlign: "center",

              border: "2px solid grey", // Specify border separately
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#0086CA", fontSize: "20px" }}>
              {fullName
                .split(" ")
                .map((word) => word.charAt(0))
                .join("")}
            </span>
          </div>
          <span
            style={{
              color: "#0086CA",
              fontSize: "20px",
              fontWeight: "bold",
              // marginLeft: "20px",
            }}
          >
            Darius Tron
          </span>

          <div
            style={{
              color: "#013C5E",
              fontSize: "12px",

              // marginLeft: "20px",
              marginTop: "30px",
            }}
          >
            Location
          </div>
          <div
            style={{
              color: "#013C5E",
              fontSize: "14px",
              fontWeight: "bold",

              // marginLeft: "20px",
              marginTop: "5px",
            }}
          >
            London
          </div>
          <div
            style={{
              color: "#013C5E",
              fontSize: "12px",

              // marginLeft: "20px",
              marginTop: "30px",
            }}
          >
            Email
          </div>
          <div
            style={{
              color: "#013C5E",
              fontSize: "14px",
              fontWeight: "bold",

              // marginLeft: "20px",
              marginTop: "5px",
            }}
          >
            trondarius13@gmail.com
          </div>
          <div
            className="border-top"
            style={{
              color: "#013C5E",
              fontSize: "14px",
              fontWeight: "bold",

              // marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              {" "}
              Skills
            </div>
            <div className="d-flex flex-wrap">
              {skills.map((skill, index) => (
                <div
                  className="border "
                  key={index}
                  style={{
                    color: "white",
                    width: "auto",
                    borderColor: "#E8E8E8",
                    backgroundColor: "#013C5E",
                    borderRadius: "17px",
                    margin: "0px 4px 4px 0px",
                    textAlign: "center",
                    padding: "5px",
                    fontWeight: "normal",
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-end" style={{ width: "50%" }}>
          <div
            className="row"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <span
              style={{
                color: "#0086CA",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "15px",
              }}
            >
              Professional Summary
            </span>
            <span
              style={{
                textAlign: "justify",
                fontSize: "14px",
                color: "#4A4A4A",
              }}
            >
              Been working as a lead consultancy in RealEstate for last 5 years.
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions.
            </span>
            <span
              style={{
                color: "#0086CA",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "15px",
                marginTop: "30px",
              }}
            >
              Work History
            </span>
            <div
              className="row border"
              style={{ width: "450px", paddingBottom: "15px", height: "auto" }}
            >
              <span
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}
              >
                Job title
              </span>
              <input
                type="text"
                style={{
                  color: "#1A4F6E",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "200px",
                }}
              ></input>
              <span
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}
              >
                Position
              </span>
              <input
                type="text"
                style={{
                  color: "#1A4F6E",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "200px",
                }}
              ></input>
              <span
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}
              >
                Employer Name
              </span>
              <input
                type="text"
                style={{
                  color: "#1A4F6E",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "200px",
                }}
              ></input>
              <span
                style={{
                  color: "#1A4F6E",
                  fontSize: "12px",
                  marginTop: "15px",
                }}
              >
                Location
              </span>
              <input
                type="text"
                style={{
                  color: "#1A4F6E",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "200px",
                }}
              ></input>
              <div className="row">
                <span
                  className="col"
                  style={{
                    color: "#1A4F6E",
                    fontSize: "12px",
                    marginTop: "15px",
                  }}
                >
                  Start Date
                </span>
                <input
                  type="date"
                  style={{
                    color: "#1A4F6E",
                    fontSize: "14px",
                    fontWeight: "bold",
                    width: "200px",
                  }}
                ></input>
                <span
                  className="row"
                  style={{
                    color: "#1A4F6E",
                    fontSize: "12px",
                    marginTop: "15px",
                    marginLeft: "15px",
                  }}
                >
                  End Date
                </span>
                <input
                  type="date"
                  style={{
                    color: "#1A4F6E",
                    fontSize: "14px",
                    fontWeight: "bold",
                    width: "200px",
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green" style={{ width: "35%" }}>
          heyy
        </div>
      </div>
    </>
  );
};
