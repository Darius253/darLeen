import { Link } from "react-router-dom";
import ImageSrc from "../assets/login.jpg";
import React, { useState, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import { getDoc, doc } from 'firebase/firestore';
import { db,auth } from '../firebase/BaseConfig';

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    console.log("yres")

    setIsLoading(true);
    setLoginError(null); // Clear previous errors

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // User is successfully logged in
    const userId = userCredential.user.uid;
    const userRef = doc(db, 'Users', userId); // Reference the user document

    const userDocSnap = await getDoc(userRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const role = userData.role;

      if (role === 'Jobseeker') {
        navigate('/homepage/jobseeker'); // Navigate to Jobseeker dashboard
      } else if (role === 'Recruiter') {
        navigate('/homepage/company'); // Navigate to Staff dashboard
      } else {
        console.warn('Unrecognized user role:', role); // Handle unexpected role
      }
    } else {
      console.error('User document not found'); // Handle missing user document
    } // Replace with your dashboard page path
    } catch (error) {
      const typedError = error as Error; // Assert error as type Error
      setLoginError(typedError.message);
    } finally {
      setIsLoading(false);
    }
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
          className="col col-6 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "white" }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginLeft: "150px", marginBottom: "30px" }}>
              <a style={{ fontSize: "17px", fontWeight: "bold" }}>Log In</a>
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="Email"
                ref={emailRef}
                size={36}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="Password"
                ref={passwordRef}
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
            

            <div style={{ marginLeft: "90px", marginTop: "100px" }}>
              <a style={{ fontSize: "15px", color: "#4A4A4A" }}>
                Don’t have an account?
              </a>
              <Link to="/signup/jobseeker">
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
