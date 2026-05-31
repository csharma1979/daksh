import { getCategoryBySlug } from "@/lib/actions/designCategories";
import { getSubcategories } from "@/lib/actions/designSubcategories";
import { getGalleriesByCategory } from "@/lib/actions/designGalleries";
import { notFound } from "next/navigation";
import DesignHero from "@/components/DesignHero";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import TrustStats from "@/components/TrustStats";
import DesignGalleryClient from "./DesignGalleryClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  
  return {
    title: category.heroTitle?.replace(/<[^>]+>/g, '') || `${category.name} Design Ideas | Daksh Interiors`,
    description: category.heroSubtitle || `Explore our curated gallery of award-winning ${category.name.toLowerCase()} designs in Bangalore.`
  };
}

export default async function DynamicCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category || category.status !== "Active") {
    notFound();
  }

  const subcategories = await getSubcategories(category._id);
  const galleries = await getGalleriesByCategory(category._id);

  // Default fallbacks if hero fields are not populated
  const title = category.heroTitle || `${category.name} Interior <span class='text-orange'>Design Ideas</span>`;
  const subtitle = category.heroSubtitle || `Explore our curated gallery of award-winning ${category.name.toLowerCase()} designs in Bangalore.`;
  const heroImage = category.heroImage || "/inspiration/living-room.png";

  return (
    <main className="design-ideas-page bg-white pb-20">
      <DesignHero
        title={title}
        subtitle={subtitle}
        backgroundImage={heroImage}
        breadcrumbCategory={category.name}
      />

      <DesignGalleryClient subcategories={subcategories} galleries={galleries} />

      <DesignSessionCTA 
        heading="Love one of these <span class='text-orange'>Designs?</span>"
        subheading="Our experts can customize any of these ideas to fit your floor plan and budget perfectly."
      />

      <TrustStats />
    </main>
  );
}
