"use client";

import { useState } from "react";
import { Upload, CheckCircle, Loader2, Send, X, MapPin, Briefcase, IndianRupee, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { submitApplication } from "@/lib/actions/applications";

export default function ApplicationForm({ job, onClose }: { job: any, onClose: () => void }) {
  const [view, setView] = useState<'details' | 'apply'>('details');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: ""
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload/resume", {
        method: "POST",
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData({ ...formData, resume: result.url });
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (err) {
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resume) {
      alert("Please upload your resume first");
      return;
    }

    setLoading(true);
    const res = await submitApplication({
      ...formData,
      jobId: job._id
    });

    if (res.success) {
      setSubmitted(true);
    } else {
      alert(res.error || "Failed to submit application");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="success-message">
        <CheckCircle size={60} color="var(--brand-orange)" />
        <h2>Application Received!</h2>
        <p>Thank you for your interest in Daksh Interiors. Our hiring team will review your profile and get back to you soon.</p>
        <button className="btn-primary" onClick={onClose}>Back to Careers</button>

        <style jsx>{`
          .success-message { text-align: center; padding: 60px 40px; animation: scaleIn 0.3s ease; }
          .success-message h2 { margin: 20px 0 10px; color: var(--brand-blue); font-weight: 800; font-size: 2rem; }
          .success-message p { color: #6b7280; margin-bottom: 30px; font-size: 1.1rem; line-height: 1.6; }
          .btn-primary { background: var(--brand-orange); color: white; border: none; padding: 15px 40px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.3s; }
          .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3); }
          @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="application-modal-inner">
      <button className="btn-close-absolute" onClick={onClose}><X size={24} /></button>
      
      {view === 'details' ? (
        <div className="job-details-view animate-fade">
          <div className="details-header">
            <span className="job-type-badge">Full-Time Opening</span>
            <h2>{job.title}</h2>
            <div className="details-meta-grid">
              <div className="meta-pill"><MapPin size={16} /> {job.location}</div>
              <div className="meta-pill"><Briefcase size={16} /> {job.experience} Experienced</div>
              {job.salary && <div className="meta-pill"><IndianRupee size={16} /> {job.salary}</div>}
              <div className={`meta-pill ${job.priority === 'High' ? 'urgent' : ''}`}>
                <Zap size={16} /> {job.priority} Priority
              </div>
            </div>
          </div>

          <div className="details-content">
            <h4>Role & Responsibilities</h4>
            <div className="description-text" dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>

          <div className="details-footer">
            <button className="btn-proceed" onClick={() => setView('apply')}>
              Apply for this Position <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="application-form-view animate-fade">
          <div className="form-header-premium">
            <button className="btn-back-link" onClick={() => setView('details')}>
              <ArrowLeft size={16} /> Back to Job Details
            </button>
            <h3>Submit Application</h3>
          </div>

          <form onSubmit={handleSubmit} className="careers-form-premium">
            <div className="form-group-premium">
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-row-premium">
              <div className="form-group-premium">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group-premium">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 00000 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group-premium">
              <label>Resume / CV (PDF Preferred)</label>
              <div className={`resume-upload-zone ${formData.resume ? 'success' : ''} ${uploading ? 'uploading' : ''}`}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} id="resume-input" hidden />
                <label htmlFor="resume-input" className="upload-label">
                  {uploading ? <Loader2 className="animate-spin" /> : (formData.resume ? <CheckCircle /> : <Upload />)}
                  <span>{uploading ? 'Processing File...' : (formData.resume ? 'Resume Attached Successfully' : 'Select Resume File')}</span>
                </label>
              </div>
              {formData.resume && <p className="file-success-hint">We have successfully received your technical CV.</p>}
            </div>

            <div className="form-group-premium">
              <label>Cover Letter (Optional)</label>
              <textarea 
                rows={4} 
                placeholder="Briefly tell us about your passion for interiors and design..."
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn-submit-premium" disabled={loading || uploading}>
              {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              <span>{loading ? 'Submitting Application...' : 'Apply Now for ' + job.title.split(' ')[0]}</span>
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        .application-modal-inner { position: relative; width: 100%; min-height: 400px; padding: 40px; }
        .btn-close-absolute { position: absolute; top: 25px; right: 25px; background: #f3f4f6; border: none; width: 40px; height: 40px; border-radius: 50%; color: #9ca3af; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; z-index: 10; }
        .btn-close-absolute:hover { background: #fee2e2; color: #dc2626; transform: rotate(90deg); }

        /* Details View */
        .details-header { margin-bottom: 35px; border-bottom: 1px solid #f3f4f6; padding-bottom: 30px; }
        .job-type-badge { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: var(--brand-orange); font-weight: 800; display: block; margin-bottom: 12px; }
        .details-header h2 { font-size: 2.2rem; color: var(--brand-blue); font-weight: 900; margin: 0 0 20px; line-height: 1.1; }
        .details-meta-grid { display: flex; flex-wrap: wrap; gap: 12px; }
        .meta-pill { display: flex; align-items: center; gap: 8px; background: #f9fafb; padding: 8px 16px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; color: #6b7280; border: 1px solid #f3f4f6; }
        .meta-pill.urgent { background: #fee2e2; color: #dc2626; border-color: #fecaca; }

        .details-content { margin-bottom: 40px; }
        .details-content h4 { font-size: 1.1rem; color: var(--brand-blue); font-weight: 800; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
        .description-text { font-size: 1.05rem; line-height: 1.8; color: #4b5563; }
        .description-text p { margin-bottom: 15px; }

        .btn-proceed { width: 100%; background: var(--brand-blue); color: white; padding: 20px; border-radius: 16px; border: none; font-weight: 800; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 15px; transition: 0.3s; box-shadow: 0 10px 20px rgba(0, 18, 51, 0.1); }
        .btn-proceed:hover { background: var(--brand-orange); transform: translateY(-2px); box-shadow: 0 15px 30px rgba(249, 115, 22, 0.2); }

        /* Form View */
        .form-header-premium { margin-bottom: 30px; }
        .btn-back-link { background: none; border: none; color: var(--brand-orange); font-weight: 800; display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 0; margin-bottom: 10px; font-size: 0.9rem; }
        .form-header-premium h3 { font-size: 1.8rem; color: var(--brand-blue); font-weight: 900; margin: 0; }

        .careers-form-premium { display: flex; flex-direction: column; gap: 20px; }
        .form-row-premium { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group-premium label { font-size: 0.85rem; font-weight: 800; color: #6b7280; margin-bottom: 8px; display: block; text-transform: uppercase; letter-spacing: 0.5px; }
        .form-group-premium input, .form-group-premium textarea { width: 100%; padding: 15px 20px; border-radius: 14px; border: 1px solid #e5e7eb; font-size: 1rem; background: #f9fafb; transition: 0.2s; }
        .form-group-premium input:focus, .form-group-premium textarea:focus { outline: none; border-color: var(--brand-orange); background: white; box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1); }

        .resume-upload-zone { border: 2px dashed #e5e7eb; border-radius: 14px; padding: 25px; text-align: center; transition: 0.3s; background: #f9fafb; }
        .resume-upload-zone.success { border-color: #10b981; background: #ecfdf5; }
        .resume-upload-zone.uploading { border-color: var(--brand-orange); }
        .upload-label { display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; color: #6b7280; font-weight: 800; }
        .resume-upload-zone.success .upload-label { color: #059669; }
        .file-success-hint { font-size: 0.8rem; color: #059669; font-weight: 700; margin-top: 8px; text-align: center; }

        .btn-submit-premium { margin-top: 10px; background: var(--brand-orange); color: white; display: flex; align-items: center; justify-content: center; gap: 12px; padding: 18px; border-radius: 16px; border: none; font-weight: 900; font-size: 1.1rem; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3); }
        .btn-submit-premium:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(249, 115, 22, 0.4); }
        .btn-submit-premium:disabled { background: #d1d5db; box-shadow: none; cursor: not-allowed; }

        .animate-fade { animation: fadeIn 0.4s ease-out; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .application-modal-inner { padding: 30px 20px; }
          .details-header h2 { font-size: 1.8rem; }
          .form-row-premium { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
