import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login.tsx";
import { SignUp } from "./components/SignUp.tsx";
import { SignUpJobSeeker } from "./components/SignUpJobSeeker.tsx";
import { CompanyHomePage } from "./components/CompanyHomePage.tsx";
import { JobSeekerHomePage } from "./components/JobSeekerHomePage.tsx";
import { MatchingCandidates } from "./components/MatchingCandidates.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Sorry Page Not Found</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signup/jobseeker",
    element: <SignUpJobSeeker />,
  },
  {
    path: "/homepage/company",
    element: <CompanyHomePage />,
  },

  {
    path: "/homepage/jobseeker",
    element: <JobSeekerHomePage />,
  },
  {
    path: "/homepage/matchingCandidates",
    element: <MatchingCandidates />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
