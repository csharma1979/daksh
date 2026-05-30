import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/actions/pages";
import BlockRenderer from "@/components/public/BlockRenderer";

export default async function CMSPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page || page.status !== "Published") {
    // If it's a draft, we might still want to show it in preview mode, but for now simple 404
    notFound();
  }

  return (
    <main className="cms-page">
      <BlockRenderer blocks={page.content?.blocks || []} />
    </main>
  );
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || `Daksh Interiors - ${page.title}`,
  };
}
