"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "@/lib/actions/testimonials";
import { ArrowLeft, Save, Star, Upload, User, UserPlus, Users, Home, XCircle, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface TestimonialFormProps {
  initialData?: any;
}

const AVATAR_PRESETS = [
  { id: 'male', label: 'Male', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', icon: User },
  { id: 'female', label: 'Female', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', icon: UserPlus },
  { id: 'couple', label: 'Couple', url: 'https://images.unsplash.com/photo-1516589174184-c68526572af0?w=200&h=200&fit=crop', icon: Users },
  { id: 'home', label: 'Home', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop', icon: Home },
];

const TestimonialForm = ({ initialData }: TestimonialFormProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const [data, setData] = useState(initialData || {
    name: "",
    city: "",
    text: "",
    rating: 5,
    avatar: AVATAR_PRESETS[0].url,
    isPublished: true
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pageSlug", "testimonials");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setData({ ...data, avatar: result.url });
        showNotification('success', 'Image uploaded successfully!');
      } else {
        showNotification('error', 'Upload failed');
      }
    } catch (err) {
      showNotification('error', 'Network error during upload');
    } finally {
      setUploading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.text) {
      showNotification('error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    const res = initialData?._id 
      ? await updateTestimonial(initialData._id, data)
      : await createTestimonial(data);

    if (res.success) {
      showNotification('success', initialData?._id ? 'Testimonial updated!' : 'New testimonial created!');
      setTimeout(() => {
        router.push("/admin/testimonials");
        router.refresh();
      }, 1500);
    } else {
      showNotification('error', 'Failed to save changes');
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
          <Link href="/admin/testimonials" className="btn-back-soft">
            <ArrowLeft size={18} /> Back
          </Link>
          <div className="header-title-group">
            <h2>{initialData?._id ? "Edit Testimonial" : "New Customer Review"}</h2>
            <p className="subtitle">Craft a compelling story for your visitors</p>
          </div>
        </div>
        <div className="header-actions">
          <button 
            onClick={handleSubmit} 
            disabled={loading || uploading}
            className={`btn-save-premium ${loading ? 'loading' : ''}`}
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {loading ? "Saving..." : "Publish Changes"}
          </button>
        </div>
      </div>

      <div className="ux-form-layout">
        <div className="main-form-section">
          <div className="form-card-premium">
            <div className="card-header-inner">
              <span className="step-number">01</span>
              <h3>Review Content</h3>
            </div>
            
            <div className="form-group-premium">
              <label>Review Description</label>
              <div className="textarea-wrapper">
                <textarea 
                  rows={6}
                  value={data.text} 
                  onChange={(e) => setData({ ...data, text: e.target.value.slice(0, 500) })}
                  placeholder="Share the customer's experience with Daksh Interiors..."
                  required
                />
                <div className={`char-counter ${data.text.length > 400 ? 'warning' : ''}`}>
                  {data.text.length}/500
                </div>
              </div>
              <p className="field-hint">Aim for 150-300 characters for best visual layout on the front end.</p>
            </div>

            <div className="form-row-twin">
              <div className="form-group-premium">
                <label>Customer Full Name</label>
                <input 
                  type="text" 
                  value={data.name} 
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>
              <div className="form-group-premium">
                <label>City / Location</label>
                <input 
                  type="text" 
                  value={data.city} 
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  placeholder="e.g. Gurugram, Sector 56"
                />
              </div>
            </div>
          </div>

          <div className="form-card-premium">
            <div className="card-header-inner">
              <span className="step-number">02</span>
              <h3>Dynamic Rating</h3>
            </div>
            <div className="rating-ux-group">
              <div className="interactive-stars">
                {[1, 2, 3, 4, 5].map(star => (
                   <button 
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setData({ ...data, rating: star })}
                    className={`ux-star-btn ${ (hoverRating || data.rating) >= star ? 'active' : ''}`}
                   >
                     <Star size={32} fill={(hoverRating || data.rating) >= star ? "var(--brand-orange)" : "none"} />
                   </button>
                ))}
              </div>
              <div className="rating-label">
                {data.rating === 5 ? "Excellent!" : data.rating === 4 ? "Great" : "Good"}
              </div>
            </div>
          </div>
        </div>

        <div className="side-form-section">
          <div className="form-card-premium profile-card">
            <div className="card-header-inner">
               <span className="step-number">03</span>
               <h3>Customer Avatar</h3>
            </div>
            
            <div className="avatar-interaction-zone">
              <div className={`avatar-preview-main ${uploading ? 'uploading-state' : ''}`}>
                {uploading && <Loader2 size={30} className="animate-spin" />}
                <img src={data.avatar || AVATAR_PRESETS[0].url} alt="Profile Preview" />
                <button 
                  className="upload-overlay"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={20} />
                  <span>Update Photo</span>
                </button>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                hidden 
                accept="image/*" 
              />
            </div>

            <div className="preset-selector">
              <p className="selector-title">Quick Presets</p>
              <div className="preset-grid">
                {AVATAR_PRESETS.map(preset => {
                  const Icon = preset.icon;
                  return (
                    <button 
                      key={preset.id}
                      className={`preset-btn ${data.avatar === preset.url ? 'active' : ''}`}
                      onClick={() => setData({ ...data, avatar: preset.url })}
                      title={preset.label}
                    >
                      <Icon size={18} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group-premium" style={{ marginTop: 20 }}>
             <label>Image URL (Manual Override)</label>
             <input 
               type="text" 
               value={data.avatar} 
               onChange={(e) => setData({ ...data, avatar: e.target.value })}
               placeholder="https://..."
               className="input-sm"
             />
            </div>
          </div>

          <div className="form-card-premium status-card">
            <div className="card-header-inner">
               <span className="step-number">04</span>
               <h3>Publishing</h3>
            </div>
            <label className="ios-toggle-label">
              <span className="toggle-text">Published on Site</span>
              <div className="toggle-wrapper">
                <input 
                  type="checkbox" 
                  checked={data.isPublished} 
                  onChange={(e) => setData({ ...data, isPublished: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </div>
            </label>
            <p className="field-hint">Uncheck to hide this testimonial while keeping the data saved.</p>
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
          background: var(--admin-bg);
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
          background: white;
          color: #6b7280;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.2s;
        }
        .btn-back-soft:hover { transform: translateX(-4px); color: var(--brand-blue); }
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
        .form-group-premium input, .form-group-premium textarea {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          font-size: 1rem;
          background: #f9fafb;
          transition: all 0.2s;
        }
        .form-group-premium input:focus, .form-group-premium textarea:focus { 
          outline: none; 
          border-color: var(--brand-orange); 
          background: white;
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1); 
        }
        .form-row-twin { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        
        .textarea-wrapper { position: relative; }
        .char-counter { position: absolute; bottom: 12px; right: 12px; font-size: 0.75rem; color: #9ca3af; font-weight: 600; }
        .char-counter.warning { color: var(--brand-orange); }
        .field-hint { font-size: 0.8rem; color: #9ca3af; margin-top: 8px; font-style: italic; }

        .rating-ux-group { display: flex; align-items: center; gap: 25px; }
        .ux-star-btn { background: none; border: none; cursor: pointer; color: #e5e7eb; transition: transform 0.2s; }
        .ux-star-btn:hover { transform: scale(1.2); }
        .ux-star-btn.active { color: var(--brand-orange); }
        .rating-label { font-weight: 800; font-size: 1.2rem; color: var(--brand-blue); width: 100px; }

        .avatar-interaction-zone { display: flex; justify-content: center; margin-bottom: 25px; }
        .avatar-preview-main {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          border: 4px solid #f3f4f6;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar-preview-main img { width: 100%; height: 100%; object-fit: cover; }
        .uploading-state img { opacity: 0.3; }
        .upload-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 43, 91, 0.6);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          cursor: pointer;
          border: none;
          transition: opacity 0.3s;
        }
        .avatar-preview-main:hover .upload-overlay { opacity: 1; }

        .preset-selector { border-top: 1px solid #f9fafb; padding-top: 20px; }
        .selector-title { font-size: 0.8rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; margin-bottom: 12px; }
        .preset-grid { display: flex; gap: 10px; }
        .preset-btn { 
          width: 40px; 
          height: 40px; 
          border-radius: 10px; 
          border: 2px solid #f3f4f6; 
          background: white; 
          color: #9ca3af; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer;
          transition: all 0.2s;
        }
        .preset-btn:hover { border-color: #d1d5db; color: #6b7280; }
        .preset-btn.active { border-color: var(--brand-orange); color: var(--brand-orange); background: rgba(249, 115, 22, 0.05); }

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

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(100%) scale(0.9); opacity: 0; } to { transform: translateX(0) scale(1); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1200px) { .ux-form-layout { grid-template-columns: 1fr; } .header-left { gap: 10px; } }
      `}</style>
    </div>
  );
};

export default TestimonialForm;
