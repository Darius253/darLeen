import { Link } from "react-router-dom";
import ImageSrc from "../assets/login.jpg";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/BaseConfig";
import { useRef, useState } from "react";

export const SignUpJobSeeker = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const gcsesPassedRef = useRef<HTMLInputElement>(null); // Ref for GCSEs Passed
  const skillsRef = useRef<HTMLInputElement>(null); // Ref for all skills (can be an array later)
  const experienceRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const yearsofexperienceRef = useRef<HTMLInputElement>(null);
  const education_levelRef = useRef<HTMLSelectElement>(null);
  const education_qualificationRef = useRef<HTMLInputElement>(null);
  const job_titleRef = useRef<HTMLInputElement>(null);
  const sectorRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef("Jobseeker");
  // Ref object for first and last name
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    setIsLoading(true);
    setSignupError(null); // Clear previous errors

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    const first_name = firstNameRef.current!.value;
    const last_name = lastNameRef.current!.value;
    const gcsesPassed = gcsesPassedRef.current!.value;
    const skills = skillsRef.current!.value.split(",");
    const experience = experienceRef.current!.value;
    const location = locationRef.current!.value;
    const summary = summaryRef.current!.value;
    const yearsofexperience = yearsofexperienceRef.current!.value;
    const education_level = education_levelRef.current!.value;
    const educational_qualification = education_qualificationRef.current!.value;
    const job_title = job_titleRef.current!.value;
    const sector = sectorRef.current!.value;

    const role = roleRef.current;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile (optional)
      await updateProfile(user, { displayName: `${first_name} ${last_name}` }); // Combine for display name

      // Create document in Jobseeker collection with user ID
      await setDoc(doc(db, "Users", user.uid), {
        ...(role && { role }),
      });
      await setDoc(doc(db, "Jobseeker", user.uid), {
        email,
        ...(first_name && { first_name }),
        ...(last_name && { last_name }),
        uid: user.uid,
        gcsesPassed: parseInt(gcsesPassed), // Assuming numerical value
        skills,
        yearsofexperience: parseInt(yearsofexperience),
        educational_qualification: educational_qualification,
        education_level: education_level,
        job_title: job_title,
        sector: sector,
        experience,
        location,
        summary,
        ...(role && { role }),
      });
      await sendEmailVerification(user);

      // Show message indicating verification email sent
      alert(
        "A verification email has been sent to your address. Please verify to proceed."
      );

      // Redirect to login page after successful signup
      window.location.href = "/login"; // Replace with your login page path
    } catch (error) {
      const typedError = error as Error; // Assert error as type Error
      setSignupError(typedError.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelectChange = () => {
    const selectedValue = education_levelRef.current!.value;
    console.log(selectedValue); // Output the selected option value
  };
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
          <form onSubmit={handleSubmit}>
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
                  ref={emailRef}
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
                  ref={passwordRef}
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
                  ref={firstNameRef}
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
                  ref={lastNameRef}
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
                  ref={education_qualificationRef}
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
                  ref={yearsofexperienceRef}
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
                  ref={gcsesPassedRef}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job Sector"
                  aria-label="Interested Job Sector"
                  id="sector"
                  ref={sectorRef}
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
                  ref={experienceRef}
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
                  ref={locationRef}
                  required
                />
              </div>
              <div className="col">
                <select
                  className="form-control"
                  required
                  ref={education_levelRef}
                  onChange={handleSelectChange}
                >
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
                  ref={skillsRef}
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
                  rows={5}
                  cols={10}
                  ref={summaryRef}
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

            {isLoading === false && (
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
            )}
            {isLoading === true && (
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
