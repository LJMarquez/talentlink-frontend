import React, { useState, useEffect } from "react";
import "../styles/ApprovalList.css";
import baseURL from "../baseURL";

const ApprovalList = ({ onJobSelect }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    console.log("Job clicked:", job);
    setSelectedJob(job);
    if (typeof onJobSelect === "function") {
      console.log("onJobSelect is a function, calling it");
      onJobSelect(job);
    } else {
      console.warn("onJobSelect is not a function:", onJobSelect);
    }
  };

  const api = baseURL();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/find/TalentLinkDB/pending_jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div id="approval-list">
      <div id="header">
        <h2>Pending For Approval</h2>
      </div>
      <div id="jobs-list">
        {jobs.length !== 0 ? (
          jobs.map((job) => (
            <div
              className="job-list-item"
              onClick={() => {
                onJobSelect(job);
              }}
              key={job.id}
            >
              <i class="fa-solid fa-circle-chevron-right"></i> {job.jobName}
            </div>
          ))
        ) : (
          <p id="no-pending-jobs">No pending jobs</p>
        )}
      </div>
    </div>
  );
};

export default ApprovalList;
