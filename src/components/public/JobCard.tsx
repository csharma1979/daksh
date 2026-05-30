"use client";

import { MapPin, Briefcase, ChevronRight, Clock } from "lucide-react";

export default function JobCard({ job, onApply }: { job: any, onApply: (job: any) => void }) {
  return (
    <div className="job-card">
      <div className="job-card-main">
        <div className="job-type-pill">
          <Briefcase size={14} /> Full-Time
        </div>
        <div className="job-priority-tag">
          {job.priority === 'High' && <span className="urgent-badge">Urgent Hire</span>}
        </div>
        
        <h3 className="job-title">{job.title}</h3>
        
        <div className="job-meta">
          <div className="meta-item"><MapPin size={16} /> {job.location}</div>
          <div className="meta-item"><Clock size={16} /> {job.experience} Experience</div>
        </div>

        <p className="job-preview">{job.description.replace(/<[^>]*>?/gm, '').substring(0, 120)}...</p>
      </div>

      <div className="job-card-footer">
        <button className="btn-view-details" onClick={() => onApply(job)}>
          View Details & Apply <ChevronRight size={18} />
        </button>
      </div>

      <style jsx>{`
        .job-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          border: 1px solid #e5e7eb;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .job-card:hover {
          transform: translateY(-5px);
          border-color: var(--brand-orange);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .job-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: ${job.priority === 'High' ? 'var(--brand-orange)' : 'transparent'};
        }

        .job-type-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f3f4f6;
          padding: 6px 12px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 800;
          color: #6b7280;
          margin-bottom: 15px;
        }

        .urgent-badge {
          font-size: 0.7rem;
          background: #fee2e2;
          color: #dc2626;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 800;
          text-transform: uppercase;
          margin-left: 10px;
        }

        .job-title {
          font-size: 1.5rem;
          color: var(--brand-blue);
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.25;
        }

        .job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 25px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: #4b5563;
          font-weight: 500;
        }

        .job-preview {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .btn-view-details {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px;
          background: #f9fafb;
          border: none;
          border-radius: 14px;
          color: var(--brand-blue);
          font-weight: 800;
          cursor: pointer;
          transition: 0.3s;
        }

        .job-card:hover .btn-view-details {
          background: var(--brand-orange);
          color: white;
        }
      `}</style>
    </div>
  );
}
