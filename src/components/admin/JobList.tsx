"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Edit, MapPin, Plus, Loader2 } from "lucide-react";
import JobStatusToggle from "./JobStatusToggle";
import DeleteJobBtn from "./DeleteJobBtn";

export default function JobList({ jobs }: { jobs: any[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, hidden

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                         job.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || 
                         (filter === "active" && job.isActive) || 
                         (filter === "hidden" && !job.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="job-list-container">
      <div className="list-controls">
        <div className="search-wrapper">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by title or location..." 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="status-tabs">
          <button 
            className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Roles
          </button>
          <button 
            className={`tab-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`tab-btn ${filter === 'hidden' ? 'active' : ''}`}
            onClick={() => setFilter('hidden')}
          >
            Hidden
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Priority</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div className="job-info-cell">
                      <strong>{job.title}</strong>
                      <span className="location-info"><MapPin size={12} /> {job.location}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${job.priority.toLowerCase()}`}>
                      {job.priority}
                    </span>
                  </td>
                  <td>{job.experience}</td>
                  <td>
                    <JobStatusToggle id={job._id} isActive={job.isActive} />
                  </td>
                  <td>
                    <div className="action-btns">
                      <Link href={`/admin/jobs/${job._id}`} className="btn-icon" title="Edit Job">
                        <Edit size={16} />
                      </Link>
                      <DeleteJobBtn id={job._id} />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state">
                      <h3>No openings found</h3>
                      <p>{search ? `No results for "${search}"` : 'No job postings in this category.'}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
