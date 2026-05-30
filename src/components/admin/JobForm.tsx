"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Briefcase, 
  MapPin, 
  IndianRupee, 
  Zap, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Loader2,
  Settings,
  Rocket
} from "lucide-react";
import { addJob, updateJob } from "@/lib/actions/jobs";
import Link from "next/link";
import TipTapEditor from "./cms/TipTapEditor";

export default function JobForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    experience: initialData?.experience || "",
    location: initialData?.location || "Bangalore / Remote",
    salary: initialData?.salary || "",
    priority: initialData?.priority || "Medium",
    isActive: initialData?.isActive ?? true
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showNotification('error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    const res = initialData?._id 
      ? await updateJob(initialData._id, formData)
      : await addJob(formData);

    if (res.success) {
      showNotification('success', initialData?._id ? 'Job posting updated!' : 'New job opening published!');
      setTimeout(() => {
        router.push("/admin/jobs");
        router.refresh();
      }, 1500);
    } else {
      showNotification('error', res.error || "Failed to save changes");
    }
    setLoading(false);
  };

  return (
    <div className="admin-page-enhanced">
      {notification && (
        <div className={`notification-banner ${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}><XCircle size={18} /></button>
        </div>
      )}

      <div className="admin-header-sticky">
        <div className="header-left">
          <Link href="/admin/jobs" className="btn-back-soft">
            <ArrowLeft size={18} /> Back
          </Link>
          <div className="header-title-group">
            <h2>{initialData?._id ? "Edit Job Posting" : "Create New Opening"}</h2>
            <p className="subtitle">Expand your team with qualified professionals</p>
          </div>
        </div>
        <div className="header-actions">
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className={`btn-save-premium ${loading ? 'loading' : ''}`}
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {loading ? "Publishing..." : (initialData?._id ? "Update Job" : "Publish Job")}
          </button>
        </div>
      </div>

      <div className="ux-form-layout">
        {/* Main Content Area */}
        <div className="main-form-section">
          <div className="form-card-premium">
            <div className="card-header-inner">
              <span className="step-number">01</span>
              <h3>Job Identity & Details</h3>
            </div>
            
            <div className="form-group-premium">
              <label>Professional Job Title</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Interior Designer"
                required
              />
              <p className="field-hint">Use a clear, descriptive title to attract the right talent.</p>
            </div>

            <div className="form-group-premium">
              <label>Role Responsibilities & Description</label>
              <div className="rich-editor-container-premium">
                <TipTapEditor 
                  content={formData.description} 
                  onChange={(val) => setFormData({ ...formData, description: val })} 
                />
              </div>
              <p className="field-hint">Outline the daily tasks, project types, and expectations for this role using rich formatting.</p>
            </div>
          </div>

          <div className="form-card-premium">
            <div className="card-header-inner">
              <span className="step-number">02</span>
              <h3>Compensation & Benefits</h3>
            </div>
            <div className="form-row-twin">
              <div className="form-group-premium">
                <label>Salary Package (Public)</label>
                <div className="input-with-icon-inner">
                  <IndianRupee size={18} />
                  <input 
                    type="text" 
                    value={formData.salary} 
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. ₹8L - ₹12L PA"
                  />
                </div>
              </div>
              <div className="form-group-premium">
                <label>Experience Required</label>
                <div className="input-with-icon-inner">
                  <Briefcase size={18} />
                  <input 
                    type="text" 
                    value={formData.experience} 
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 5+ Years"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="side-form-section">
          <div className="form-card-premium settings-card">
            <div className="card-header-inner">
               <span className="step-number">03</span>
               <h3>Logistics</h3>
            </div>
            
            <div className="form-group-premium">
              <label>Work Location</label>
              <div className="input-with-icon-inner">
                <MapPin size={18} />
                <input 
                  type="text" 
                  value={formData.location} 
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Gurugram / Remote"
                />
              </div>
            </div>

            <div className="form-group-premium">
              <label>Hiring Priority</label>
              <div className="input-with-icon-inner">
                <Zap size={18} />
                <select 
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High (Urgent)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-card-premium status-card">
            <div className="card-header-inner">
               <span className="step-number">04</span>
               <h3>Visibility Controls</h3>
            </div>
            <label className="ios-toggle-label">
              <span className="toggle-text">Active Listing</span>
              <div className="toggle-wrapper">
                <input 
                  type="checkbox" 
                  checked={formData.isActive} 
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </div>
            </label>
            <p className="field-hint">When active, this job will appear on your public careers page.</p>
          </div>

          <div className="publishing-summary">
            <Rocket size={40} className="rocket-icon" />
            <h4>Ready to Hire?</h4>
            <p>Ensure your description is clear and your priority matches your deadline.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-page-enhanced { 
          animation: fadeIn 0.4s ease-out;
          position: relative;
        }
        
        .notification-banner {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 12px;
          color: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          z-index: 1000;
          animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .notification-banner.success { background: #059669; }
        .notification-banner.error { background: #dc2626; }
        .notification-banner button { background: none; border: none; color: white; cursor: pointer; margin-left: 10px; }

        .admin-header-sticky {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0 30px;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 30px;
          background: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .header-left { display: flex; align-items: center; gap: 20px; }
        .btn-back-soft {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 10px;
          background: #f9fafb;
          color: #6b7280;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.2s;
        }
        .btn-back-soft:hover { transform: translateX(-4px); color: var(--brand-blue); background: white; }
        .header-title-group h2 { font-size: 1.5rem; color: var(--brand-blue); margin: 0; }
        .subtitle { font-size: 0.9rem; color: #9ca3af; margin: 0; }

        .btn-save-premium {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--brand-orange);
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);
        }
        .btn-save-premium:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(249, 115, 22, 0.5); }
        .btn-save-premium:disabled { opacity: 0.7; cursor: not-allowed; }
        .animate-spin { animation: spin 1s linear infinite; }

        .ux-form-layout { display: grid; grid-template-columns: 1fr 380px; gap: 30px; }
        .form-card-premium {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          border: 1px solid #f3f4f6;
          margin-bottom: 30px;
        }
        .card-header-inner { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; border-bottom: 1px solid #f9fafb; padding-bottom: 15px; }
        .step-number { font-size: 0.75rem; background: var(--brand-blue); color: white; padding: 2px 8px; border-radius: 4px; font-weight: 800; }
        .card-header-inner h3 { font-size: 1.1rem; color: var(--brand-blue); margin: 0; }

        .form-group-premium { margin-bottom: 24px; position: relative; }
        .form-group-premium label { display: block; font-weight: 700; font-size: 0.85rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
        .form-group-premium input, 
        .form-group-premium textarea,
        .form-group-premium select {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          font-size: 1rem;
          background: #f9fafb;
          transition: all 0.2s;
        }
        .form-group-premium input:focus, 
        .form-group-premium textarea:focus,
        .form-group-premium select:focus { 
          outline: none; 
          border-color: var(--brand-orange); 
          background: white;
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1); 
        }
        .input-with-icon-inner { position: relative; display: flex; align-items: center; }
        .input-with-icon-inner :global(svg) { position: absolute; left: 15px; color: #9ca3af; }
        .input-with-icon-inner input, 
        .input-with-icon-inner select { padding-left: 45px !important; }

        .form-row-twin { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .field-hint { font-size: 0.8rem; color: #9ca3af; margin-top: 8px; font-style: italic; }

        .ios-toggle-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: #f9fafb;
          padding: 15px;
          border-radius: 12px;
          margin-bottom: 10px;
        }
        .toggle-text { font-weight: 700; color: var(--brand-blue); }
        .toggle-wrapper { position: relative; width: 50px; height: 26px; }
        .toggle-wrapper input { opacity: 0; width: 0; height: 0; }
        .toggle-slider {
          position: absolute;
          inset: 0;
          background-color: #ccc;
          border-radius: 34px;
          transition: .4s;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          border-radius: 50%;
          transition: .4s;
        }
        input:checked + .toggle-slider { background-color: #10b981; }
        input:checked + .toggle-slider:before { transform: translateX(24px); }

        .publishing-summary { text-align: center; padding: 20px; }
        .rocket-icon { color: #f3f4f6; margin-bottom: 15px; }
        .publishing-summary h4 { color: var(--brand-blue); font-weight: 800; margin-bottom: 5px; }
        .publishing-summary p { font-size: 0.85rem; color: #9ca3af; line-height: 1.5; }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(100%) scale(0.9); opacity: 0; } to { transform: translateX(0) scale(1); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1200px) { .ux-form-layout { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
