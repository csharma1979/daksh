"use client";

import { useState } from "react";
import { Download, Mail, Phone, Search, Eye } from "lucide-react";
import ApplicationStatusSelect from "./ApplicationStatusSelect";
import CandidateModal from "./CandidateModal";

export default function ApplicationList({ initialApplications, jobs }: { initialApplications: any[], jobs: any[] }) {
  const [search, setSearch] = useState("");
  const [filterJob, setFilterJob] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Derive the latest application data from props to avoid stale state
  const selectedApp = selectedId 
    ? initialApplications.find(app => app._id === selectedId) 
    : null;

  const filtered = initialApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) || 
                         app.email.toLowerCase().includes(search.toLowerCase());
    const matchesJob = filterJob === "all" || app.jobId?._id === filterJob;
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesJob && matchesStatus;
  });

  return (
    <div className="application-list-enhanced">
      <div className="filter-bar-premium">
        <div className="filter-item-premium" style={{ flex: 2, maxWidth: '400px' }}>
          <label>Search Candidate</label>
          <div className="search-wrapper" style={{ margin: 0 }}>
             <Search size={18} />
             <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </div>

        <div className="filter-item-premium">
          <label>By Job Posting</label>
          <select 
            className="filter-select-premium"
            value={filterJob} 
            onChange={(e) => setFilterJob(e.target.value)}
          >
            <option value="all">All Positions</option>
            {jobs.map(job => <option key={job._id} value={job._id}>{job.title}</option>)}
          </select>
        </div>

        <div className="filter-item-premium">
          <label>Status</label>
          <select 
            className="filter-select-premium"
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Any Status</option>
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Applied For</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app._id}>
                  <td>
                    <div className="applicant-cell">
                      <span className="name">{app.name}</span>
                      <div className="contact-sub">
                        <span><Mail size={12} /> {app.email}</span>
                        <span><Phone size={12} /> {app.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="job-applied-cell">
                      <span className="job-title">{app.jobId?.title || "Unknown Position"}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <span className="date-text">{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td style={{ width: '200px' }}>
                    <ApplicationStatusSelect id={app._id} initialStatus={app.status} />
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon-table view" title="View Profile" onClick={() => setSelectedId(app._id)}>
                        <Eye size={16} />
                      </button>
                      <a href={app.resume} target="_blank" rel="noopener noreferrer" className="btn-icon-table download" title="Resume">
                        <Download size={16} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state">
                      <h3>No candidates found</h3>
                      <p>{search ? `No results match "${search}"` : 'Your hiring pipeline is currently empty.'}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApp && (
        <CandidateModal 
          application={selectedApp} 
          onClose={() => setSelectedId(null)} 
        />
      )}
    </div>
  );
}
