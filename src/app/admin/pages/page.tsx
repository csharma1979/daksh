import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";
import Link from "next/link";
import { FileText, Edit, Eye, Trash2, Plus } from "lucide-react";

async function getPages() {
  await dbConnect();
  const pages = await Page.find().sort({ title: 1 });
  return JSON.parse(JSON.stringify(pages));
}

import "./pages.css";

export default async function PagesListPage() {
  const pages = await getPages();

  return (
    <div className="pages-list-wrapper">
      <div className="page-header">
        <div>
          <h1>Website Pages</h1>
          <p>Manage and edit your website content sections.</p>
        </div>
        <button className="btn-add">
          <Plus size={20} />
          <span>Add New Page</span>
        </button>
      </div>

      <div className="pages-grid">
        {pages.map((page: any) => (
          <div key={page._id} className="page-card">
            <div className="page-card-icon">
              <FileText size={32} />
            </div>
            <div className="page-card-info">
              <h3>{page.title}</h3>
              <div className="page-slug">/{page.slug === 'home' ? '' : page.slug}</div>
              <div className={`status-pill ${page.status.toLowerCase()}`}>
                {page.status}
              </div>
            </div>
            <div className="page-card-actions">
              <Link href={`/admin/pages/${page._id}`} className="action-link edit" title="Edit Page">
                <Edit size={18} />
              </Link>
              <Link href={`/${page.slug === 'home' ? '' : page.slug}`} target="_blank" className="action-link view" title="View Public Page">
                <Eye size={18} />
              </Link>
              <button className="action-link delete" title="Delete Page">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
