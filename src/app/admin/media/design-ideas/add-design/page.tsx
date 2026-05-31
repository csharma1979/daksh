"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "@/lib/actions/designCategories";
import { getSubcategories } from "@/lib/actions/designSubcategories";
import { createGallery } from "@/lib/actions/designGalleries";
import { UploadCloud, Trash2, X, Loader2 } from "lucide-react";

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

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError("");

    const selectedCategory = categories.find(c => c._id === formData.categoryId);
    const categorySlug = selectedCategory ? selectedCategory.slug : "general";

    const uploadData = new FormData();
    uploadData.append("categorySlug", categorySlug);
    for (let i = 0; i < files.length; i++) {
      uploadData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/upload/design-ideas", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...data.urls],
          featuredImage: prev.featuredImage || data.urls[0]
        }));
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setUploadError("An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = (idx: number) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== idx);
      return {
        ...prev,
        images: newImages,
        featuredImage: prev.featuredImage === prev.images[idx] ? (newImages[0] || "") : prev.featuredImage
      };
    });
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
            
            {/* Drag & Drop File Upload Area */}
            <div 
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '12px',
                padding: '30px',
                textAlign: 'center',
                background: '#f8fafc',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input 
                type="file" 
                id="file-input" 
                multiple 
                accept="image/png, image/jpeg, image/jpg, image/webp" 
                style={{ display: 'none' }} 
                onChange={handleFileUpload} 
              />
              <UploadCloud size={40} style={{ color: '#f97316', margin: '0 auto 10px' }} />
              <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                {uploading ? "Uploading images..." : "Click to upload files (single or multiple)"}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Supports PNG, JPG, JPEG, WEBP</p>
              {uploading && (
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#f97316', fontWeight: '600' }}>
                  <Loader2 size={16} className="animate-spin" /> Uploading...
                </div>
              )}
            </div>

            {uploadError && (
              <p style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: '500' }}>{uploadError}</p>
            )}

            {/* Manual URL Input Fallback */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Or add image by URL</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" id="imgUrl" placeholder="https://example.com/image.jpg" style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <button type="button" onClick={() => {
                  const el = document.getElementById("imgUrl") as HTMLInputElement;
                  handleImageAdd(el.value);
                  el.value = "";
                }} style={{ padding: '10px 16px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Add URL</button>
              </div>
            </div>
            
            {/* Gallery Image Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '15px' }}>
              {formData.images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', height: '120px', background: '#f1f5f9', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <img src={img} alt="upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  
                  <button
                    type="button"
                    onClick={() => handleImageDelete(idx)}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}
                  >
                    ×
                  </button>

                  {/* Featured Badge Selector */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, featuredImage: img }))}
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      background: formData.featuredImage === img ? '#22c55e' : 'rgba(15, 23, 42, 0.75)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {formData.featuredImage === img ? "Featured" : "Set Featured"}
                  </button>
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
