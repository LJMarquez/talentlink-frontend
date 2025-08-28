import React, { useState, useEffect } from "react";
import ConfirmAdminModal from "./ConfirmAdminModal";
import "../styles/JobInfoPanel.css";
import baseURL from "../baseURL";

const JobInfoPanel = ({ job }) => {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [approveTriggered, setApproveTriggered] = useState(false);
  const [rejectTriggered, setRejectTriggered] = useState(false);

  const [modalMessage, setModalMessage] = useState("");
  const [modalButton, setModalButton] = useState("Yes");
  const [isModalClosable, setIsModalClosable] = useState(true);

  const api = baseURL();

  const handleApprove = () => {
    setShowApproveModal(true);
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const confirmApprove = () => {
    setShowApproveModal(false);
    setApproveTriggered(true);
  };

  const confirmReject = () => {
    setShowRejectModal(false);
    setRejectTriggered(true);
  };

  const handleDone = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (approveTriggered) {
      const approveJob = async () => {
        try {
          console.log(job);
          const response = await api.post(
            "/approve-pending-job/TalentLinkDB/pending_jobs",
            job
          );
          console.log("Job approved:", response.data);
          setModalMessage(
            `Successfully approved job opening for ${job.jobName} requested by ${job.companyName}`
          );
          setModalButton("Done");
          setIsModalClosable(false);
          setShowApproveModal(true);
        } catch (error) {
          console.error("Error approving job:", error);
          window.alert("Error approving job.");
        } finally {
          setApproveTriggered(false);
        }
      };

      approveJob();
    }
  }, [approveTriggered, api, job]);

  useEffect(() => {
    if (rejectTriggered) {
      const rejectJob = async () => {
        console.log(job.employerId);
        try {
          const response = await api.delete(
            `/reject-pending-job/TalentLinkDB/pending_jobs/${job._id}/${job.employerId}`
          );
          console.log("Job rejected:", response.data);
          setModalMessage(
            `Successfully rejected job opening for ${job.jobName} requested by ${job.companyName}`
          );
          setModalButton("Done");
          setIsModalClosable(false);
          setShowRejectModal(true);
        } catch (error) {
          console.error("Error rejecting job:", error);
          window.alert("Error rejecting job.");
        } finally {
          setRejectTriggered(false);
        }
      };

      rejectJob();
    }
  }, [rejectTriggered, api, job]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div id="job-info-panel">
      <div id="header">
        <h2>Job Information</h2>
      </div>
      <div id="job-details">
        {job ? (
          // <div className="avenir-book">
          <div>
            <h1>{job.jobName}</h1>
            <div className="job-info-section">
              <h2>Company:</h2>
              <h3>{job.companyName}</h3>
              <p>{job.companyDescription}</p>
            </div>
            <div className="job-info-section">
              <h2>Company Contact Info:</h2>
              <ul>
                <li>{job.companyEmail}</li>
                <li>{job.companyPhone}</li>
                <li>
                  <a href={job.website}>{job.website}</a>
                </li>
              </ul>
            </div>
            <div className="job-info-section">
              <h2>Job Type:</h2>
              <p>{job.jobType}</p>
            </div>
            <div className="job-info-section">
              <h2>Salary:</h2>
              <p>
                ${job.salaryRange.minSalary.toLocaleString()} - $
                {job.salaryRange.maxSalary.toLocaleString()} a year
              </p>
            </div>
            <div className="job-info-section">
              <h2>Location:</h2>
              <p>{job.location}</p>
            </div>
            <div className="job-info-section">
              <h2>Work Schedule:</h2>
              <p>{job.workSchedule}</p>
            </div>
            <div className="job-info-section">
              <h2>Experience Level:</h2>
              <p>{job.experienceLevel}</p>
            </div>
            <div className="job-info-section">
              <h2>Qualifications:</h2>
              <ul className="a">
                {job.qualifications.map((qual) => (
                  <li>• {qual}</li>
                ))}
              </ul>
            </div>
            <div className="job-info-section">
              <h2>Skills:</h2>
              <ul>
                {job.skills.map((skill) => (
                  <li>• {skill}</li>
                ))}
              </ul>
            </div>
            <div className="job-info-section">
              <h2>Responsibilities:</h2>
              <ul>
                {job.responsibilities.map((res) => (
                  <li>• {res}</li>
                ))}
              </ul>
            </div>
            <div className="job-info-section">
              <h2>Benefits:</h2>
              <ul>
                {job.employmentBenefits.map((ben) => (
                  <li key={ben}>• {ben}</li>
                ))}
              </ul>
            </div>
            <div className="job-info-section">
              <h3>Posted on {formatDate(job.postedDate)}</h3>
              <h3>
                Deadline to apply is {formatDate(job.applicationDeadline)}
              </h3>
            </div>
            <div className="job-info-section"></div>
            <div id="button-wrapper">
              <button onClick={handleApprove} className="button approve">
                Approve Job Posting
              </button>
              <button onClick={handleReject} className="button reject">
                Reject Job Posting
              </button>
            </div>
          </div>
        ) : (
          <p id="no-job-selected">Select a job to see details</p>
        )}
      </div>
      <ConfirmAdminModal
        show={showApproveModal || showRejectModal}
        onClose={() =>
          isModalClosable &&
          (setShowApproveModal(false) || setShowRejectModal(false))
        }
        onConfirm={
          modalButton === "Done"
            ? handleDone
            : showApproveModal
            ? confirmApprove
            : confirmReject
        }
        message={
          modalMessage ||
          (showApproveModal
            ? "Are you sure you want to approve this job?"
            : "Are you sure you want to reject this job?")
        }
        buttonLabel={modalButton}
      />
    </div>
  );
};

export default JobInfoPanel;
