"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSubcategory } from "@/lib/actions/designSubcategories";
import { getCategories } from "@/lib/actions/designCategories";

export default function NewSubcategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoryId");

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: initialCategory || "",
    name: "",
    slug: "",
    sortOrder: 0,
    status: "Active"
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

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
    await createSubcategory(formData);
    router.push("/admin/media/design-ideas");
    router.refresh();
  };

  return (
    <div className="admin-page-wrapper">
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h1>Add New Subcategory</h1>
      </div>
      <div className="card" style={{ padding: '24px', background: 'white', borderRadius: '12px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '500' }}>Parent Category</label>
            <select required name="categoryId" value={formData.categoryId} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="">-- Select Category --</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '500' }}>Subcategory Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '500' }}>Slug URL</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
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
              {loading ? "Saving..." : "Save Subcategory"}
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
