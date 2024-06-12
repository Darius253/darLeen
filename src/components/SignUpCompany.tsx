import { Link } from "react-router-dom";
import ImageSrc from "../assets/login.jpg";

export const SignUpCompany = () => {
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
          className="col col-6 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "white" }}
        >
          <form>
            <div
              className="d-flex    align-items-center justify-content-start"
              style={{ marginBottom: "10px" }}
            >
              <a style={{ fontSize: "17px", fontWeight: "bold" }}>
                Join Us as a Company.
              </a>
              <Link to="../signup/jobseeker">
                <button
                  className="btn btn-link"
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#0086CA",
                    marginLeft: "100px",
                  }}
                >
                  Not a company? Sign Up as a Jobseeker
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
                  placeholder="Company Name"
                  aria-label="Company Name"
                  id="email"
                  required
                />
              </div>
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                  aria-label="Contact Number"
                  id="contactNumber"
                  required
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "30px",
                width: "360px",
                marginBottom: "30px",
              }}
            >
              <div className="d-flex    align-items-center justify-content-start">
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

            <Link to="/homepage/company"><button
              type="submit"
              className="btn btn"
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "#0086CA",
                width: "360px",
                marginLeft: "150px",
              }}
            >
              Sign Up
            </button>
            </Link>

            <div
              style={{
                marginTop: "50px",
                marginLeft: "200px",
              }}
            >
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
            <div style={{ marginLeft: "250px", marginTop: "50px" }}>
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
