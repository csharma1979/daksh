"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { deleteCategory } from "@/lib/actions/designCategories";
import { deleteSubcategory } from "@/lib/actions/designSubcategories";
import { deleteGallery } from "@/lib/actions/designGalleries";

export default function DesignIdeasClientList({ categories, subcategories, galleries }: any) {
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({});

  const toggleCat = (id: string) => setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleSub = (id: string) => setExpandedSubs(prev => ({ ...prev, [id]: !prev[id] }));

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this category? All subcategories must be removed first.")) {
      await deleteCategory(id);
    }
  };

  const handleDeleteSubcategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      await deleteSubcategory(id);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (confirm("Are you sure you want to delete this design?")) {
      await deleteGallery(id);
    }
  };

  return (
    <div className="design-tree">
      {categories.map((cat: any) => {
        const catSubs = subcategories.filter((s: any) => s.categoryId === cat._id || s.categoryId?._id === cat._id);
        const isCatExpanded = expandedCats[cat._id];

        return (
          <div key={cat._id} className="tree-node category-node" style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            <div className="node-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', cursor: 'pointer' }} onClick={() => toggleCat(cat._id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                {isCatExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                {cat.name} ({catSubs.length} subcategories)
                <span style={{ fontSize: '0.8rem', padding: '2px 8px', background: cat.status === 'Active' ? '#dcfce7' : '#fee2e2', color: cat.status === 'Active' ? '#166534' : '#991b1b', borderRadius: '12px' }}>{cat.status}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }} onClick={e => e.stopPropagation()}>
                <Link href={`/admin/media/design-ideas/subcategory/new?categoryId=${cat._id}`} style={{ padding: '6px', background: '#e0e7ff', color: '#4338ca', borderRadius: '6px' }} title="Add Subcategory"><Plus size={16} /></Link>
                <Link href={`/admin/media/design-ideas/category/${cat._id}/edit`} style={{ padding: '6px', background: '#e2e8f0', color: '#475569', borderRadius: '6px' }}><Edit size={16} /></Link>
                <button onClick={() => handleDeleteCategory(cat._id)} style={{ padding: '6px', background: '#fee2e2', color: '#dc2626', borderRadius: '6px', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
            </div>

            {isCatExpanded && (
              <div className="node-children" style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0' }}>
                {catSubs.length === 0 && <p style={{ color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic' }}>No subcategories found.</p>}
                
                {catSubs.map((sub: any) => {
                  const subGals = galleries.filter((g: any) => g.subcategoryId === sub._id || g.subcategoryId?._id === sub._id);
                  const isSubExpanded = expandedSubs[sub._id];

                  return (
                    <div key={sub._id} className="tree-node subcategory-node" style={{ marginBottom: '8px', border: '1px solid #f1f5f9', borderRadius: '6px' }}>
                      <div className="node-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fff', cursor: 'pointer' }} onClick={() => toggleSub(sub._id)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', color: '#334155' }}>
                          {isSubExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          {sub.name} ({subGals.length} designs)
                          <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: sub.status === 'Active' ? '#dcfce7' : '#fee2e2', color: sub.status === 'Active' ? '#166534' : '#991b1b', borderRadius: '12px' }}>{sub.status}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }} onClick={e => e.stopPropagation()}>
                          <Link href={`/admin/media/design-ideas/add-design?subcategoryId=${sub._id}`} style={{ padding: '4px', background: '#e0e7ff', color: '#4338ca', borderRadius: '4px' }} title="Add Design"><ImageIcon size={14} /></Link>
                          <Link href={`/admin/media/design-ideas/subcategory/${sub._id}/edit`} style={{ padding: '4px', background: '#f1f5f9', color: '#64748b', borderRadius: '4px' }}><Edit size={14} /></Link>
                          <button onClick={() => handleDeleteSubcategory(sub._id)} style={{ padding: '4px', background: '#fee2e2', color: '#dc2626', borderRadius: '4px', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
                        </div>
                      </div>

                      {isSubExpanded && (
                        <div className="node-children" style={{ padding: '12px 14px', borderTop: '1px solid #f1f5f9', background: '#fafaf9' }}>
                           {subGals.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic' }}>No designs in this subcategory.</p>}
                           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                             {subGals.map((gal: any) => (
                               <div key={gal._id} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', background: 'white' }}>
                                 <div style={{ height: '120px', background: '#f1f5f9', position: 'relative' }}>
                                    {gal.featuredImage && (
                                      <img src={gal.featuredImage} alt={gal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    )}
                                 </div>
                                 <div style={{ padding: '8px' }}>
                                   <div style={{ fontSize: '0.85rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{gal.title}</div>
                                   <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                     <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{gal.images?.length} images</span>
                                     <div style={{ display: 'flex', gap: '4px' }}>
                                       <Link href={`/admin/media/design-ideas/galleries/${gal._id}/edit`} style={{ color: '#4338ca' }}><Edit size={12} /></Link>
                                       <button onClick={() => handleDeleteGallery(gal._id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={12} /></button>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             ))}
                           </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
