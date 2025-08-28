"use client";

import { useState, useEffect } from "react";
import JobModal from "./JobModal";
import "../styles/JobCarousel.css";
import baseURL from "../baseURL";

export default function JobCarousel() {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

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

  const sortedJobs = jobs
    .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
    .slice(0, 6);

  const nextSlide = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= sortedJobs.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? Math.max(sortedJobs.length - 3, 0) : prevIndex - 3
    );
  };

  const visibleJobs = sortedJobs.slice(currentIndex, currentIndex + 3);

  return (
    <section className="job-carousel">
      <div className="container">
        <div className="carousel-header">
          <h2 className="title">Latest Job Postings</h2>
          <div className="navigation">
            <button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="nav-button"
            >
              <i className="fa-solid fa-chevron-left icon"></i>
            </button>
            <button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="nav-button"
            >
              <i className="fa-solid fa-chevron-right icon"></i>
            </button>
          </div>
        </div>

        <div className={`job-grid ${direction}`}>
          {visibleJobs.length > 0 ? (
            visibleJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3 className="job-title">{job.jobName}</h3>
                <p className="job-company">{job.companyName}</p>
                <p className="job-details">
                  {job.location} • {job.jobType}
                </p>
                <button variant="outline" className="details-button" onClick={() => setSelectedJob(job)}>

            {/* onClick={() => setSelectedJob(job)} */}
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No Available Jobs</p>
          )}
        </div>
      </div>
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </section>
  );
}
