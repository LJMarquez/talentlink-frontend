import "../styles/JobModal.css";
export default function JobModal({ job, onClose }) {
  const handleApplyClick = () => {

    if (localStorage.getItem("loggedIn") !== "true") {
      alert("Please log in to apply for a job.");
      window.location.href = "/Login";
    } else {
      window.location.href = `/apply/${job._id}`;
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-bg" onClick={onClose} />

        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-body">
              <div className="modal-title-container">
                <h3 className="modal-title">{job.jobName}</h3>

                <div className="modal-details">
                  <div>
                    <h4 className="section-title">Company</h4>
                    <p className="section-text">{job.companyDescription}</p>
                    <p className="section-text">Website: {job.website}</p>
                    <p className="section-text">Email: {job.companyEmail}</p>
                    <p className="section-text">
                      Phone Number: {job.companyPhoneNumber}
                    </p>
                  </div>

                  <div>
                    <h4 className="section-title">Job Details</h4>
                    <p className="section-text">Type: {job.jobType}</p>
                    <p className="section-text">Location: {job.location}</p>
                    <p className="section-text">
                      Experience: {job.experienceLevel}
                    </p>
                    <p className="section-text">Schedule: {job.workSchedule}</p>
                    <p className="section-text">
                      Salary: ${job.salaryRange.minSalary.toLocaleString()} - $
                      {job.salaryRange.maxSalary.toLocaleString()}
                    </p>
                    <p className="section-text">
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </p>
                    <p className="section-text important">
                      Application Deadline:{" "}
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <h4 className="section-title">Responsibilities</h4>
                    <ul className="list">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="section-title">Qualifications</h4>
                    <ul className="list">
                      {job.qualifications.map((qual, index) => (
                        <li key={index}>{qual}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="section-title">Desired Skills</h4>
                    <ul className="list">
                      {job.skills.map((qual, index) => (
                        <li key={index}>{qual}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="section-title">Benefits</h4>
                    <ul className="list">
                      {job.employmentBenefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {/* <a
              href={`/apply/${job._id}`} // Pass jobId in the URL
              className="apply button"
            >
              Apply Now
            </a> */}

            <button
              type="button"
              onClick={handleApplyClick}
              className="apply button"
            >
              Apply Now
            </button>

            <button type="button" onClick={onClose} className="close button">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
