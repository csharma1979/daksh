import { getCategories } from "@/lib/actions/designCategories";
import { getSubcategories } from "@/lib/actions/designSubcategories";
import { getGalleries } from "@/lib/actions/designGalleries";
import Link from "next/link";
import { Plus, Edit, Trash2, Image as ImageIcon, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import DesignIdeasClientList from "./DesignIdeasClientList";

export default async function DesignIdeasAdminPage() {
  const categories = await getCategories();
  const subcategories = await getSubcategories();
  const galleries = await getGalleries();

  // We pass all data to a client component to handle the collapsible accordion logic
  return (
    <div className="admin-page-wrapper">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1>Design Ideas CMS</h1>
          <p>Manage categories, subcategories, and design galleries.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/admin/media/design-ideas/category/new" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#f97316', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
            <Plus size={18} /> Add Category
          </Link>
          <Link href="/admin/media/design-ideas/add-design" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#0f172a', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
            <ImageIcon size={18} /> Add Design
          </Link>
        </div>
      </div>

      <div className="card" style={{ padding: '24px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <DesignIdeasClientList categories={categories} subcategories={subcategories} galleries={galleries} />
      </div>
    </div>
  );
}
