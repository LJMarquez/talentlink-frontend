import React, { useState } from 'react';
import '../styles/JobFilters.css';

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const experienceLevels = ["Entry-level", "Mid-level", "Senior", "Executive"];

const JobFilters = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    minSalary: '',
    maxSalary: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="filter-container">
      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="jobType">Job Type</label>
          <select id="jobType" name="jobType" onChange={handleFilterChange}>
            <option value="">All Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="experienceLevel">Experience Level</label>
          <select id="experienceLevel" name="experienceLevel" onChange={handleFilterChange}>
            <option value="">All Levels</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="salaryRange">Salary Range</label>
          <div className="salary-range">
            <input
              type="number"
              id="minSalary"
              name="minSalary"
              placeholder="Min"
              onChange={handleFilterChange}
            />
            <span>-</span>
            <input
              type="number"
              id="maxSalary"
              name="maxSalary"
              placeholder="Max"
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="apply-filter-wrapper">
          <label>.</label>
          <button className="apply-button" onClick={applyFilters}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;