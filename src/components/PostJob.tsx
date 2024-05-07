import { useState } from "react";

export const PostJob = () => {
  const [loading, setLoading] = useState(1);

  return (
    <div className="container" style={{ alignItems: "center" }}>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <input
            className="form-control"
            placeholder="Job Title"
            aria-label="Job Title"
            required
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Job Sector"
            aria-label="Job Sector"
            required
          />
        </div>
      </div>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <input
            className="form-control"
            placeholder="Years of Experience"
            aria-label="Years of Experience"
            required
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Skills"
            aria-label="Skills"
            required
          />
        </div>
      </div>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <input
            className="form-control"
            placeholder="Location"
            aria-label="Location"
            required
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Professional Qualification"
            aria-label="Professional Qualification"
            required
          />
        </div>
      </div>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <select
            className="form-control"
            aria-label="Educational Qualification"
            required
          >
            {" "}
            <option>BSc.</option>
            <option>Masters</option>
            <option>BA</option>
            <option>PhD</option>
          </select>
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Number of GCSE Passes"
            aria-label="Number of GCSE Passes"
            required
          />
        </div>
      </div>
      <div className="row" style={{ margin: "30px" }}>
        <div className="col">
          <textarea
            className="form-control"
            placeholder="Job Description"
            aria-label="Job Description"
            required
            maxLength={500}
          />
        </div>
      </div>
      <div className="row justify-content-center" style={{ margin: "30px" }}>
        <div className="col-8">
          {loading === 1 && (
            <button
              className="form-control"
              style={{ color: "white", backgroundColor: "#0086CA" }}
              onClick={() => setLoading(2)}
            >
              Submit
            </button>
          )}
           {loading === 2 && (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border "
                role="status"
                style={{ color: "#0086CA" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
