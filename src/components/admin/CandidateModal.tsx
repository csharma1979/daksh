"use client";

import { useState, useEffect } from "react";
import { X, Mail, Phone, Calendar, Briefcase, FileText, Download, Save, Loader2, CheckCircle2 } from "lucide-react";
import { updateApplicationNotes, updateApplicationStatus } from "@/lib/actions/applications";

interface CandidateModalProps {
  application: any;
  onClose: () => void;
}

export default function CandidateModal({ application, onClose }: CandidateModalProps) {
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.internalNotes || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Sync state with props when application updates (e.g. after refresh)
  useEffect(() => {
    setStatus(application.status);
    setNotes(application.internalNotes || "");
  }, [application]);

  const handleSave = async () => {
    setSaving(true);
    const resStatus = await updateApplicationStatus(application._id, status);
    const resNotes = await updateApplicationNotes(application._id, notes);
    
    if (resStatus.success && resNotes.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert("Error saving updates");
    }
    setSaving(false);
  };

  return (
    <div className="candidate-modal-backdrop">
      <div className="candidate-modal-content animate-slide-up">
        <div className="modal-header-premium">
          <div className="candidate-primary">
            <div className="avatar-placeholder">{application.name.charAt(0)}</div>
            <div>
              <h3>{application.name}</h3>
              <p className="job-ref">Applied for: <strong>{application.jobId?.title || "Unknown Position"}</strong></p>
            </div>
          </div>
          <button className="btn-close-circle" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body-layout">
          {/* Left Column: Details & Cover Letter */}
          <div className="modal-main-col">
            <section className="profile-section">
              <h4>Contact Information</h4>
              <div className="contact-grid-premium">
                <div className="contact-item">
                  <Mail size={16} /> <span>{application.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} /> <span>{application.phone}</span>
                </div>
                <div className="contact-item">
                  <Calendar size={16} /> <span>Applied on {new Date(application.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </section>

            {application.coverLetter && (
              <section className="profile-section">
                <h4>Cover Letter / Message</h4>
                <div className="cover-letter-box">
                  {application.coverLetter.split('\n').map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </section>
            )}

            <section className="profile-section">
              <h4>Resume / Portfolio</h4>
              <a href={application.resume} target="_blank" rel="noopener noreferrer" className="btn-resume-full">
                <FileText size={20} />
                <span>Review Full Technical CV</span>
                <Download size={18} />
              </a>
            </section>
          </div>

          {/* Right Column: Hiring Controls */}
          <div className="modal-side-col">
            <div className="hiring-controls-card">
              <h4>Hiring Workflow</h4>
              
              <div className="control-group-premium">
                <label>Recruitment Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className={`status-select-large ${status.toLowerCase()}`}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>

              <div className="control-group-premium">
                <label>Internal Hiring Notes</label>
                <textarea 
                  rows={8}
                  placeholder="Add interview feedback, assessment results, or team comments..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button 
                className={`btn-save-hiring ${saved ? 'success' : ''}`} 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <Loader2 className="animate-spin" /> : (saved ? <CheckCircle2 /> : <Save size={18} />)}
                <span>{saving ? 'Updating...' : (saved ? 'Changes Saved' : 'Update Application')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .candidate-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 18, 51, 0.7);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .candidate-modal-content {
          background: white;
          width: 100%;
          max-width: 1100px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.4);
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .modal-header-premium {
          padding: 25px 40px;
          background: #f9fafb;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .candidate-primary { display: flex; align-items: center; gap: 20px; }
        .avatar-placeholder { width: 50px; height: 50px; background: var(--brand-blue); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; }
        .candidate-primary h3 { margin: 0; font-size: 1.5rem; color: var(--brand-blue); font-weight: 900; }
        .job-ref { margin: 4px 0 0; color: #6b7280; font-size: 0.9rem; }
        .job-ref strong { color: var(--brand-orange); }

        .btn-close-circle { background: #f3f4f6; border: none; width: 36px; height: 36px; border-radius: 50%; color: #9ca3af; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
        .btn-close-circle:hover { background: #fee2e2; color: #dc2626; transform: rotate(90deg); }

        .modal-body-layout { display: grid; grid-template-columns: 1fr 340px; overflow-y: auto; }
        .modal-main-col { padding: 40px; border-right: 1px solid #f3f4f6; }
        .modal-side-col { padding: 40px; background: #fafafa; }

        .profile-section { margin-bottom: 35px; }
        .profile-section h4 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1.5px; color: #9ca3af; font-weight: 800; margin-bottom: 15px; }

        .contact-grid-premium { display: flex; flex-wrap: wrap; gap: 25px; }
        .contact-item { display: flex; align-items: center; gap: 10px; color: #4b5563; font-weight: 600; font-size: 0.95rem; }
        .contact-item :global(svg) { color: var(--brand-orange); }

        .cover-letter-box { background: #f9fafb; padding: 25px; border-radius: 16px; border: 1px solid #f3f4f6; line-height: 1.7; color: #4b5563; font-size: 1rem; }
        .cover-letter-box p { margin-bottom: 12px; }

        .btn-resume-full { display: flex; align-items: center; justify-content: space-between; background: white; border: 1.5px dashed #e5e7eb; padding: 18px 25px; border-radius: 16px; color: var(--brand-blue); font-weight: 800; text-decoration: none; transition: 0.3s; }
        .btn-resume-full:hover { border-color: var(--brand-orange); background: #fffaf8; }

        .hiring-controls-card h4 { font-size: 0.9rem; color: var(--brand-blue); font-weight: 900; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 0.5px; }
        .control-group-premium { margin-bottom: 25px; }
        .control-group-premium label { display: block; font-size: 0.75rem; font-weight: 800; color: #9ca3af; margin-bottom: 10px; text-transform: uppercase; }

        .status-select-large { width: 100%; padding: 14px; border-radius: 12px; border: 2px solid #e5e7eb; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .status-select-large.applied { border-color: #3b82f6; color: #3b82f6; }
        .status-select-large.shortlisted { border-color: #8b5cf6; color: #8b5cf6; }
        .status-select-large.rejected { border-color: #ef4444; color: #ef4444; }
        .status-select-large.hired { border-color: #10b981; color: #10b981; }

        textarea { width: 100%; border-radius: 12px; border: 1px solid #e5e7eb; padding: 15px; font-size: 0.9rem; transition: 0.2s; resize: none; background: white; }
        textarea:focus { outline: none; border-color: var(--brand-orange); box-shadow: 0 0 0 4px rgba(249,115,22,0.1); }

        .btn-save-hiring { width: 100%; background: var(--brand-orange); color: white; border: none; padding: 16px; border-radius: 14px; font-weight: 800; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; box-shadow: 0 10px 20px rgba(249,115,22,0.2); }
        .btn-save-hiring:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(249,115,22,0.3); }
        .btn-save-hiring.success { background: #10b981; box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2); }

        .animate-spin { animation: spin 1s linear infinite; }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.19, 1, 0.22, 1); }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .modal-body-layout { grid-template-columns: 1fr; }
          .modal-main-col { border-right: none; border-bottom: 1px solid #f3f4f6; }
        }
      `}</style>
    </div>
  );
}
