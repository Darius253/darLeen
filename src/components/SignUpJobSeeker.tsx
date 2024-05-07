import { Link } from "react-router-dom";
import ImageSrc from "../assets/login.jpg";

export const SignUpJobSeeker = () => {
  return (
    <div
      className="row"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="row">
        <div
          className="col col-6"
          style={{
            backgroundImage: `url(${ImageSrc})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div
          className="col  d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "white" }}
        >
          <form>
            <div
              className="d-flex    align-items-center justify-content-start"
              style={{ marginBottom: "10px" }}
            >
              <a style={{ fontSize: "17px", fontWeight: "bold" }}>
                Create an Account with Us.
              </a>
              <Link to="../signup">
                <button
                  className="btn btn-link"
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#0086CA",
                    marginLeft: "100px",
                  }}
                >
                  Sign Up as a Company here!
                </button>
              </Link>
            </div>
            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  id="email"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  id="password"
                  required
                />
              </div>
            </div>

            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  aria-label="First name"
                  id="firstName"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  aria-label="Last name"
                  id="lastName"
                  required
                />
              </div>
            </div>

            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Education qualification"
                  aria-label="Education qualification"
                  required
                />
              </div>

              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Years of experience"
                  aria-label="Years of experience"
                  required
                  value=""
                />
              </div>
            </div>
            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Number of GCSE Passes"
                  aria-label="Number of GCSE Passes"
                  id="gcse"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job Sector"
                  aria-label="Interested Job Sector"
                  id="sector"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Professional Qualification"
                  aria-label="Professional Qualification"
                  id="proQualification"
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col">
                <input
                  type="location"
                  className="form-control"
                  placeholder="Location"
                  aria-label="Location"
                  id="location"
                  required
                />
              </div>
              <div className="col">
                <select className="form-control" required>
                  <option>A Levels</option>
                  <option>O Levels</option>
                  <option>Masters</option>
                  <option>Undergraduate</option>
                  <option>Secondary</option>
                </select>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job Title"
                  aria-label="Job Tile"
                  required
                />
              </div>
            </div>

            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter at least 5 skills separated with comma"
                  aria-label="Skill"
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col">
                <textarea
                  className="form-control"
                  placeholder="Professional summary"
                  aria-label="Professional summary"
                  required
                  maxLength={630}
                />
              </div>
            </div>

            <div
              style={{
                width: "360px",
                marginBottom: "30px",
              }}
            >
              <div className="d-flex   flex-row align-items-center justify-content-start">
                <input type="radio" style={{ marginRight: "8px" }} />
                <a
                  style={{
                    color: "#9B9B9B",
                    fontSize: "14px",
                  }}
                >
                  I have read and agree to DarLeen's
                </a>
              </div>
              <button
                className="btn btn-link"
                style={{
                  fontSize: "14px",
                  color: "#0086CA",
                  marginLeft: "8px",
                }}
              >
                Privacy Policy, Terms of Use, and Cookies Policy
              </button>
            </div>

            <Link to="/homepage/jobseeker">
              {" "}
              <button
                type="submit"
                className="btn btn"
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "#0086CA",
                  width: "360px",
                  marginLeft: "30%",
                }}
              >
                Sign Up
              </button>
            </Link>

            <div style={{ marginLeft: "40%", marginTop: "50px" }}>
              <a style={{ fontSize: "15px", color: "#4A4A4A" }}>
                Already have an account?
              </a>

              <Link to="../login">
                <button
                  className="btn btn-link"
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#0086CA",
                  }}
                >
                  Sign In
                </button>
              </Link>
            </div>
            <div style={{ marginLeft: "50%", marginTop: "20px" }}>
              <a style={{ fontSize: "12px", color: "#4A4A4A" }}>
                © 2024 DarLeen, Inc.
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
