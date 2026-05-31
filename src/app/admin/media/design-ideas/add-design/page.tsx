"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "@/lib/actions/designCategories";
import { getSubcategories } from "@/lib/actions/designSubcategories";
import { createGallery } from "@/lib/actions/designGalleries";
import { UploadCloud } from "lucide-react";

export default function AddDesignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSubcat = searchParams.get("subcategoryId");

  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "",
    subcategoryId: initialSubcat || "",
    title: "",
    description: "",
    images: [] as string[],
    featuredImage: "",
    featured: false,
    status: "Active"
  });

  useEffect(() => {
    getCategories().then(res => setCategories(res));
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      getSubcategories(formData.categoryId).then(res => setSubcategories(res));
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleImageAdd = (url: string) => {
    if(!url) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url],
      featuredImage: prev.featuredImage || url
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await createGallery(formData);
    router.push("/admin/media/design-ideas");
    router.refresh();
  };

  return (
    <div className="admin-page-wrapper">
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h1>Add New Design Gallery</h1>
        <p>Step {step} of 4</p>
      </div>

      <div className="card" style={{ padding: '24px', background: 'white', borderRadius: '12px', maxWidth: '800px' }}>
        {/* Step Progress */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
           {[1,2,3,4].map(s => (
             <div key={s} style={{ flex: 1, height: '6px', borderRadius: '4px', background: s <= step ? '#f97316' : '#e2e8f0' }} />
           ))}
        </div>

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2>Step 1: Select Category</h2>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="">-- Choose Category --</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button disabled={!formData.categoryId} onClick={nextStep} style={{ padding: '10px 24px', background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Next Step</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2>Step 2: Select Subcategory</h2>
            <select name="subcategoryId" value={formData.subcategoryId} onChange={handleChange} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="">-- Choose Subcategory --</option>
              {subcategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={prevStep} style={{ padding: '10px 24px', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back</button>
              <button disabled={!formData.subcategoryId} onClick={nextStep} style={{ padding: '10px 24px', background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2>Step 3: Content Fields</h2>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Design Title" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={4} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} /> Featured Design
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={prevStep} style={{ padding: '10px 24px', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back</button>
              <button disabled={!formData.title} onClick={nextStep} style={{ padding: '10px 24px', background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Next Step</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2>Step 4: Upload Images</h2>
            <p style={{ color: '#64748b' }}>Provide Image URLs (In production, replace with S3 Drag & Drop Uploader). Next.js Image component handles optimization automatically.</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" id="imgUrl" placeholder="https://example.com/image.jpg" style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <button type="button" onClick={() => {
                const el = document.getElementById("imgUrl") as HTMLInputElement;
                handleImageAdd(el.value);
                el.value = "";
              }} style={{ padding: '10px 16px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px' }}>Add</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
              {formData.images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', height: '100px', background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={img} alt="upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button onClick={prevStep} style={{ padding: '10px 24px', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back</button>
              <button disabled={loading || formData.images.length === 0} onClick={handleSubmit} style={{ padding: '10px 24px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                {loading ? "Publishing..." : "Publish Design"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
