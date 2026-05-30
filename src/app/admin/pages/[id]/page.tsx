import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";
import PageEditorForm from "@/components/admin/PageEditorForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPage(id: string) {
  await dbConnect();
  const page = await Page.findById(id);
  if (!page) return null;
  return JSON.parse(JSON.stringify(page));
}

import "./edit-page.css";

import ModularEditor from "@/components/admin/cms/ModularEditor";

export default async function EditPage({ params }: { params: { id: string } }) {
  const page = await getPage(params.id);

  if (!page) {
    notFound();
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <Link href="/admin/pages" className="back-link">
          <ChevronLeft size={20} />
          <span>Back to Pages</span>
        </Link>
        <h1>Edit Page: <span className="text-orange">{page.title}</span></h1>
      </div>

      <ModularEditor page={page} />
    </div>
  );
}
