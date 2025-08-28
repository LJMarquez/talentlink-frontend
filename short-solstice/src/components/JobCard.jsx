import "../styles/JobCard.css";
export default function JobCard({ job, onClick }) {
  return (
    <div onClick={onClick} className="job-card">
      <div className="job-card-header">
        <div>
          <h3 className="job-title">{job.jobName}</h3>
          <p className="company-name">{job.companyName}</p>
          
          <div className="tags">
            <span className="tag job-type">{job.jobType}</span>
            <span className="tag location">{job.location}</span>
            <span className="tag experience-level">{job.experienceLevel}</span>
          </div>
          
          <div className="details">
            <span className="salary">
              ${job.salaryRange.minSalary.toLocaleString()} - ${job.salaryRange.maxSalary.toLocaleString()}
            </span>
            <span className="posted-date">Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
