"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/lib/actions/designCategories";

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sortOrder: 0,
    status: "Active",
    heroTitle: "",
    heroSubtitle: "",
    heroImage: ""
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "name" ? { slug: generateSlug(value) } : {})
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await createCategory(formData);
    router.push("/admin/media/design-ideas");
    router.refresh();
  };

  return (
    <div className="admin-page-wrapper">
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h1>Add New Category</h1>
      </div>
      <div className="card" style={{ padding: '24px', background: 'white', borderRadius: '12px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '500' }}>Category Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '500' }}>Slug URL</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '500' }}>Hero Title (Supports HTML)</label>
            <input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '500' }}>Hero Subtitle</label>
            <textarea name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} rows={3} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '500' }}>Hero Image URL</label>
            <input type="text" name="heroImage" value={formData.heroImage} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontWeight: '500' }}>Sort Order</label>
              <input type="number" name="sortOrder" value={formData.sortOrder} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontWeight: '500' }}>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={loading} style={{ padding: '10px 24px', background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              {loading ? "Saving..." : "Save Category"}
            </button>
            <button type="button" onClick={() => router.back()} style={{ padding: '10px 24px', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
