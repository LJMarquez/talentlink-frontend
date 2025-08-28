import React, { useState, useEffect } from "react";
import JobsList from "./JobsList";
import JobFilters from "./JobFilters";
import baseURL from "../baseURL";
import "../styles/JobsPageBody.css";

const JobPageBody = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const api = baseURL();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/find/TalentLinkDB/published_jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const applyFilters = (filters) => {
    let filtered = jobs;
    console.log("filters", filters);
    console.log(filteredJobs);

    if (filters.jobType) {
      filtered = filtered.filter((job) => job.jobType === filters.jobType);
    }

    if (filters.experienceLevel) {
      filtered = filtered.filter(
        (job) => job.experienceLevel === filters.experienceLevel
      );
    }

    if (filters.minSalary) {
      filtered = filtered.filter(
        (job) => job.salaryRange.minSalary >= parseInt(filters.minSalary)
      );
    }

    if (filters.maxSalary) {
      filtered = filtered.filter(
        (job) => job.salaryRange.maxSalary <= parseInt(filters.maxSalary)
      );
    }

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    const handleApplyFilters = (event) => {
      applyFilters(event.detail);
    };
    applyFilters({
      jobType: "",
      experienceLevel: "",
      minSalary: "",
      maxSalary: "",
    });

    window.addEventListener("applyFilters", handleApplyFilters);

    return () => {
      window.removeEventListener("applyFilters", handleApplyFilters);
    };
  }, [jobs]);

  return (
    <div>
      <JobFilters onApplyFilters={applyFilters} />
      <div className="jobs-list-container">
        {filteredJobs.length !== 0 ? (
          <JobsList jobs={filteredJobs} />
        ) : (
          <div className="no-results">No Results</div>
        )}
      </div>
    </div>
  );
};

export default JobPageBody;
