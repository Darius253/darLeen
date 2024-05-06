import { Link } from "react-router-dom";

export const Header = () => {
  const buttonStyle = {
    fontSize: "14px",
    borderRadius: "25px",
    color: "white",
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col text-end">
          <button
            type="button"
            className="btn btn-spacing mr-2"
            style={{ ...buttonStyle, marginRight: "200px" }}
          >
            How We Work
          </button>
          <button
            type="button"
            className="btn mr-2"
            style={{ ...buttonStyle, marginRight: "25px" }}
          >
            Download
          </button>
          <button
            type="button"
            className="btn mr-2"
            style={{ ...buttonStyle, marginRight: "25px" }}
          >
            About Us
          </button>
          <Link to="/login">
            <button
              type="button"
              className="btn btn-outline-dark mr-2"
              style={{ ...buttonStyle, marginRight: "20px" }}
            >
              Post Job
            </button>
          </Link>

          <Link to="/login">
            <button
              type="button"
              className="btn btn-primary"
              style={{ ...buttonStyle }}
            >
              Get Hired
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
