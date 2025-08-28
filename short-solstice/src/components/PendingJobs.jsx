import { useState, useEffect } from "react";
import "../styles/PendingJobs.css";
import baseURL from "../baseURL";

export default function PendingJobs() {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [isEmployer, setIsEmployer] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const api = baseURL();
    const userId = localStorage.getItem("currentUserId");

    const fetchUser = async () => {
      try {
        const response = await api.get(
          `/retrieve-user/TalentLinkDB/users/${userId}`
        );
        if (response.status === 200) {
          setUser(response.data);
          setIsEmployer(response.data.isEmployer);
          setPendingJobs(response.data.pendingJobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchUser();
    // const jobs = [
    //   {
    //     id: 1,
    //     title: "Junior Developer",
    //     company: "TechCorp",
    //     location: "Remote",
    //     submittedDate: "2024-01-10",
    //   },
    //   {
    //     id: 2,
    //     title: "Marketing Specialist",
    //     company: "TechCorp",
    //     location: "New York, NY",
    //     submittedDate: "2024-01-09",
    //   },
    // ];
    // setPendingJobs(jobs);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!isEmployer) {
    return null;
  }

  return (
    <div>
      {user ? (
        isEmployer ? (
          <div className="pending-jobs">
            <h2>Pending Jobs</h2>
            <div className="jobs-list">
              {pendingJobs.length > 0 ? (
                pendingJobs.map((job) => (
                  <div key={job._id} className="job-card">
                    <div className="job-header">
                      <h3>{job.jobName}</h3>
                      <span className="status">Pending Approval</span>
                    </div>
                    <div className="job-details">
                      <p className="company">{job.companyName}</p>
                      <p className="location">{job.location}</p>
                      <p className="date">
                        Submitted: {formatDate(job.postedDate)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>You Have No Pending Jobs</p>
              )}
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
