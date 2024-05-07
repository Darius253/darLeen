import { Link } from "react-router-dom";
import ImageSrc from "../assets/login.jpg";

export const Login = () => {
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
            <div style={{ marginLeft: "150px", marginBottom: "30px" }}>
              <a style={{ fontSize: "17px", fontWeight: "bold" }}>Log In</a>
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="Email"
                size={36}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="Password"
                size={36}
              />
            </div>
            <div style={{ marginBottom: "30px", marginTop: "30px" }}>
              <button
                className="btn btn-link"
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#0086CA",
                }}
              >
                Forgot Password?
              </button>
            </div>
            <Link to="">
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
                }}
              >
                Log in
              </button>
            </Link>

            <div style={{ marginLeft: "90px", marginTop: "100px" }}>
              <a style={{ fontSize: "15px", color: "#4A4A4A" }}>
                Don’t have an account?
              </a>
              <Link to="/signup">
                <button
                  className="btn btn-link"
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#0086CA",
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </div>
            <div style={{ marginLeft: "150px", marginTop: "50px" }}>
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
