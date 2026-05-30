"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Loader2, Link as LinkIcon, Save } from "lucide-react";
import { addClient, updateClient } from "@/lib/actions/clients";

export default function ClientForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    logo: initialData?.logo || "",
    website: initialData?.website || "",
    isActive: initialData?.isActive ?? true,
    order: initialData?.order || 0
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("folder", "pages/clients");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, logo: data.url });
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const editId = initialData?._id || initialData?.id;
    const res = editId 
      ? await updateClient(editId, formData)
      : await addClient(formData);

    if (res.success) {
      router.push("/admin/clients");
      router.refresh();
    } else {
      alert(res.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="client-form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Client / Brand Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Prestige Group, Sobha Developers"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group full-width">
            <label>Client Logo (Transparent PNG/SVG preferred)</label>
            <div className="logo-upload-area" onClick={() => document.getElementById('logo-input')?.click()}>
              <input 
                type="file" 
                id="logo-input" 
                hidden 
                accept="image/*"
                onChange={handleFileUpload}
              />
              {formData.logo ? (
                <>
                  <img src={formData.logo} alt="Preview" className="logo-preview-large" />
                  <button 
                    type="button" 
                    className="btn-remove"
                    onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, logo: "" }); }}
                  >
                    <X size={14} /> Remove and Change
                  </button>
                </>
              ) : (
                <div className="upload-placeholder">
                  {uploading ? <Loader2 className="animate-spin" /> : <Upload size={40} />}
                  <p>{uploading ? 'Uploading Logo...' : 'Click or Drag to Upload logo'}</p>
                  <span>Supports PNG, SVG, JPG (Max 2MB)</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Website URL (Optional)</label>
            <div className="input-with-icon">
              <LinkIcon size={16} />
              <input 
                type="url" 
                placeholder="https://client-website.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Display Order</label>
            <input 
              type="number" 
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            />
          </div>

          <div className="form-group full-width">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <span>Mark as Active (Visible on Website)</span>
            </label>
          </div>
        </div>

        <div className="form-actions-premium" style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button type="submit" className="btn-primary" disabled={loading || uploading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {initialData ? 'Save Changes' : 'Create Client'}
          </button>
          <button type="button" className="btn-secondary" onClick={() => router.back()}>
            Cancel
          </button>
        </div>
      </form>

      <style jsx>{`
        .checkbox-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: 700; user-select: none; }
        .checkbox-label input { width: 20px; height: 20px; cursor: pointer; accent-color: var(--brand-orange); }
        .input-with-icon { position: relative; display: flex; align-items: center; }
        .input-with-icon :global(svg) { position: absolute; left: 15px; color: #9ca3af; }
        .input-with-icon input { padding-left: 45px !important; }
        .btn-remove { background: #fee2e2; color: #dc2626; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 6px; margin: 0 auto; }
        .upload-placeholder { color: #9ca3af; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .upload-placeholder span { font-size: 0.75rem; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
