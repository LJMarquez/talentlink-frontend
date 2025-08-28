import { useState, useEffect } from "react";
import "../styles/ApplicantDetailsBody.css";
import baseURL from "../baseURL";

export default function ApplicantDetailsBody() {
  const [applicant, setApplicant] = useState(null);
  const [jobId, setJobId] = useState(null);

  const api = baseURL();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const applicantData = searchParams.get("applicant");
    if (applicantData) {
      const parsedData = JSON.parse(decodeURIComponent(applicantData));
      setApplicant(parsedData);
      setJobId(parsedData.jobId);
    }
  }, []);

  const updateStatus = (newStatus) => {
    setApplicant((prev) => ({ ...prev, applicationStatus: newStatus }));
    const userId = applicant.userId;
    const responseBody = {
      userId,
      jobId,
      newStatus,
    };
    console.log(responseBody);
    const updateApplication = async () => {
      try {
        const response = await api.post(
          "/update-application-status/TalentLinkDB/published_jobs",
          responseBody
        );
        console.log(response.data);
        window.location.href = "/Profile";
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    updateApplication();
  };

  if (!applicant) return <p>Loading...</p>;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="applicant-details">
      <h1 className="section-header">Personal Info</h1>
      <h2 className="applicant-name">
        {applicant.firstName} {applicant.lastName}
      </h2>
      <p>Email: {applicant.email}</p>
      <p>Phone: {applicant.phone}</p>
      <p>School: {applicant.school}</p>
      <p>Major: {applicant.major}</p>
      <p>Graduation Date: {formatDate(applicant.graduationDate)}</p>
      <h1 className="section-header">Application Info</h1>
      <p>Experience Level: {applicant.experienceLevel}</p>
      <p>Work Authorization: {applicant.workAuthorization}</p>
      <p>Comments: {applicant.comments}</p>
      <p>About Me/Qualifications: {applicant.aboutMe}</p>
      <p>Date Applied: {formatDate(applicant.dateApplied)}</p>
      <h3>Status: {applicant.applicationStatus}</h3>
      <div className="status-buttons">
        <button className="under-review-btn" onClick={() => updateStatus("Under Review")}>
          Under Review
        </button>
        <button className="interview-btn" onClick={() => updateStatus("Interview Scheduled")}>
          Schedule Interview
        </button>
        <button className="accept-btn" onClick={() => updateStatus("Offer Extended")}>
          Extend Offer
        </button>
        <button className="reject-btn" onClick={() => updateStatus("Rejected")}>Reject</button>
      </div>
    </div>
  );
}
