import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobModal from "./JobModal";
import JobsPagination from "./JobsPagination";
// import baseURL from "../baseURL";

const jobsPerPage = 5;

export default function JobsList({ jobs }) {
  // const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // const api = baseURL();

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const response = await api.get("/find/TalentLinkDB/published_jobs");
  //       setJobs(response.data);
  //     } catch (error) {
  //       console.error("Error fetching jobs:", error);
  //     }
  //   };

  //   fetchJobs();
  // }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="jobs-list-container">
      <div className="jobs-grid">
        {currentJobs.map((job) => (
          <JobCard
            key={job.jobName}
            job={job}
            onClick={() => setSelectedJob(job)}
          />
        ))}
      </div>

      <JobsPagination
        jobsPerPage={jobsPerPage}
        totalJobs={jobs.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
