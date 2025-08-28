import { useState, useEffect } from "react";
import Modal from "./ProfileModal";
import "../styles/AppliedJobs.css";
import baseURL from "../baseURL";

export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEmployer, setIsEmployer] = useState(false);

  useEffect(() => {
    // const employerStatus = localStorage.getItem("isEmployer") === "true";
    // setIsEmployer(employerStatus);
    const userId = localStorage.getItem("currentUserId");

    const api = baseURL();

    const fetchUser = async () => {
      try {
        const response = await api.get(
          `/retrieve-user/TalentLinkDB/users/${userId}`
        );
        setAppliedJobs(response.data.appliedJobs);
        setIsEmployer(response.data.isEmployer);
        console.log(response.data.appliedJobs)
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchUser();
  }, []);

  if (isEmployer) {
    return null;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="applied-jobs">
      <h2>Applied Jobs</h2>
      <div className="jobs-list">
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <div
              key={job.id}
              className="job-card"
              onClick={() => setSelectedJob(job)}
            >
              <div className="job-header">
                <h3>{job.jobName}</h3>
                <span className="status">{job.applicationStatus}</span>
              </div>
              <div className="job-details">
                <p className="company">{job.companyName}</p>
                <p className="location">{job.location}</p>
                <p className="date">Applied: {formatDate(job.dateApplied)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs applied for</p>
        )}
      </div>
      {selectedJob && (
        <Modal
          title={`Application Details: ${selectedJob.jobName}`}
          onClose={() => setSelectedJob(null)}
        >
          <div className="application-details">
            <h4 className="section-title">Your Details</h4>
            <div>
              <h4 className="section-title">Personal Information</h4>
              <p className="section-text">Email: {selectedJob.email}</p>
              <p className="section-text">Phone Number: {selectedJob.phone}</p>
              <p className="section-text">School: {selectedJob.school}</p>
              <p className="section-text">
                Graduation Date:{" "}
                {new Date(selectedJob.graduationDate).toLocaleDateString()}
              </p>
              <p className="section-text">Major: {selectedJob.major}</p>
              <p className="section-text">
                Role Applying For: {capitalizeFirstLetter(selectedJob.jobRole)}
              </p>
              <p className="section-text">
                Authorized To Work:{" "}
                {capitalizeFirstLetter(selectedJob.workAuthorization)}
              </p>
              <p className="section-text">About Me: {selectedJob.aboutMe}</p>
              <p className="section-text">Comments: {selectedJob.comments}</p>
            </div>

            <h4 className="section-title">Job Details</h4>
            <div>
              <h4 className="section-title">Company</h4>
              <p className="section-text">{selectedJob.companyDescription}</p>
              <p className="section-text">Website: {selectedJob.website}</p>
              <p className="section-text">Email: {selectedJob.companyEmail}</p>
              <p className="section-text">
                Phone Number: {selectedJob.companyPhoneNumber}
              </p>
            </div>

            <div>
              <h4 className="section-title">Job Details</h4>
              <p className="section-text">Type: {selectedJob.jobType}</p>
              <p className="section-text">Location: {selectedJob.location}</p>
              <p className="section-text">
                Experience: {selectedJob.experienceLevel}
              </p>
              <p className="section-text">
                Schedule: {selectedJob.workSchedule}
              </p>
              <p className="section-text">
                Salary: ${selectedJob.salaryRange.minSalary.toLocaleString()} -
                ${selectedJob.salaryRange.maxSalary.toLocaleString()}
              </p>
              <p className="section-text">
                Posted: {new Date(selectedJob.postedDate).toLocaleDateString()}
              </p>
              <p className="section-text important">
                Application Deadline:{" "}
                {new Date(selectedJob.applicationDeadline).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h4 className="section-title">Responsibilities</h4>
              <ul className="list">
                {selectedJob.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="section-title">Qualifications</h4>
              <ul className="list">
                {selectedJob.qualifications.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="section-title">Desired Skills</h4>
              <ul className="list">
                {selectedJob.skills.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="section-title">Benefits</h4>
              <ul className="list">
                {selectedJob.employmentBenefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
