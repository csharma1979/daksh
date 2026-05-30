"use client";

import { useState } from "react";
import JobCard from "./JobCard";
import ApplicationForm from "./ApplicationForm";

export default function JobBoard({ initialJobs }: { initialJobs: any[] }) {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <div className="job-board">
      <div className="jobs-grid">
        {initialJobs.map((job) => (
          <JobCard key={job._id} job={job} onApply={(j) => setSelectedJob(j)} />
        ))}

        {initialJobs.length === 0 && (
          <div className="no-jobs">
            <p>We don't have any openings at the moment, but we're always looking for talent. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Detail / Application Modal */}
      {selectedJob && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <ApplicationForm job={selectedJob} onClose={() => setSelectedJob(null)} />
          </div>
        </div>
      )}

      <style jsx>{`
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .no-jobs {
          grid-column: 1 / -1;
          background: white;
          padding: 60px;
          border-radius: 20px;
          text-align: center;
          border: 1px dashed #e5e7eb;
        }

        .no-jobs p {
          font-size: 1.1rem;
          color: #6b7280;
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 18, 51, 0.6);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
          padding: 20px;
        }

        .modal-content {
          background: white;
          width: 100%;
          max-width: 960px;
          border-radius: 30px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.3);
          animation: modalIn 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          max-height: 90vh;
          overflow-y: auto;
        }

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 600px) {
          .jobs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
