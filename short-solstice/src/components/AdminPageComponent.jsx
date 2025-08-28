import React, { useState, useEffect } from "react";
import ApprovalList from "./ApprovalList";
import JobInfoPanel from "./JobInfoPanel";
import baseURL from "../baseURL";
import '../styles/AdminPageComponent.css'

const AdminPageComponent = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [user, setUser] = useState(null);
  const api = baseURL();

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");

    const fetchUser = async () => {
      try {
        const response = await api.get(
          `/retrieve-user/TalentLinkDB/users/${userId}`
        );
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && !user.isAdmin) {
      alert("You are not authorized to view this page.");
      window.location.href = `/${localStorage.getItem("previousPage")}`;
    }
  }, [user]);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    console.log(job);
  };

  return (
    <div>
      {user ? (
        user.isAdmin ? (
          <main>
            <ApprovalList onJobSelect={handleJobSelect} />
            <JobInfoPanel job={selectedJob} />
          </main>
        ) : (
          <p>You are not authorized to view this page</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminPageComponent;
