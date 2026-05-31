import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Layout,
  Bed,
  ChefHat,
  Briefcase,
  Bath,
  TrendingUp,
  Layers
} from "lucide-react";
import TrustStats from "@/components/TrustStats";
import DesignHero from "@/components/DesignHero";
import "./DesignIdeas.css";
import { Metadata } from "next";
import { getCategories } from "@/lib/actions/designCategories";
import dbConnect from "@/lib/mongodb";
import DesignGallery from "@/models/DesignGallery";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Interior Design Ideas & Inspirations | Daksh Interiors Bangalore",
  description: "Explore 500+ home interior design ideas for Bangalore homes. From modular kitchens and luxury living rooms to 2026 trending design forecasts.",
  keywords: "Interior design ideas Bangalore, home decor inspirations, modular kitchen designs, luxury bedroom ideas, trending interiors 2026"
};

const iconMap: Record<string, React.ReactNode> = {
  "trending": <TrendingUp size={24} />,
  "trending-designs": <TrendingUp size={24} />,
  "living-room": <Layout size={24} />,
  "modular-kitchen": <ChefHat size={24} />,
  "full-kitchen-designs": <ChefHat size={24} />,
  "bedroom": <Bed size={24} />,
  "wardrobe": <Layers size={24} />,
  "wardrobe-designs": <Layers size={24} />,
  "home-office": <Briefcase size={24} />,
  "bathroom": <Bath size={24} />,
  "kids-room": <Sparkles size={24} />,
  "tv-units-and-storage": <Layout size={24} />,
  "false-ceiling": <Layout size={24} />,
  "pooja-room": <Sparkles size={24} />,
  "vastu-tips": <Sparkles size={24} />
};

async function getCategoriesWithCounts() {
  await dbConnect();
  const categories = await getCategories();
  
  const mapped = await Promise.all(categories.map(async (cat: any) => {
    const count = await DesignGallery.countDocuments({ categoryId: cat._id, status: "Active" });
    return {
      ...cat,
      count
    };
  }));
  
  return mapped;
}

export default async function DesignIdeasDirectory() {
  const designCategories = await getCategoriesWithCounts();

  return (
    <main className="design-directory-page">
      <DesignHero
        title="Interior Design <span class='text-orange'>Inspirations</span>"
        subtitle="Explore thousands of curated design ideas across every corner of your home in Bangalore. From trending luxury to functional modularity, your dream space begins here."
        backgroundImage="/inspiration/living-room.png"
      />

      {/* Grid Section */}
      <section className="directory-grid-section container">
        <div className="directory-grid">
          {designCategories.filter(c => c.status === "Active").map((cat, idx) => (
            <Link href={`/design-ideas/${cat.slug}`} key={idx} className="dir-card">
              <div className="card-image-box">
                <Image
                  src={cat.heroImage || "/inspiration/living-room.png"}
                  alt={cat.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="card-img"
                />
                <div className="card-overlay" />
                <div className="card-count">{cat.count}+ Ideas</div>
              </div>
              <div className="card-info">
                <div className="card-header">
                  <div className="icon-box">{iconMap[cat.slug] || <Layout size={24} />}</div>
                  <h3>{cat.name}</h3>
                </div>
                <p>{cat.heroSubtitle || "Explore our premium designs."}</p>
                <div className="card-footer">
                  <span>Explore Designs</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & CTA */}
      <TrustStats />

      <section className="directory-cta-new container">
        <div className="cta-split-card">
          <div className="cta-image-side">
            <Image
              src="/inspiration/master-bedroom.png"
              alt="Luxury Interior Design"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="cta-overlay-accent" />
            <div className="cta-badge-floating">#1 Rated Studio in Bangalore</div>
          </div>
          <div className="cta-form-side">
            <div className="cta-header-text">
              <h2>Found a look you <span className="text-orange">Love?</span></h2>
              <p>Get a **Free 3D Visualization** and accurate cost estimate for your home within 24 hours.</p>
            </div>
            <div className="cta-form-wrapper">
              <LeadForm source="Design Ideas CTA Section" />
            </div>
            <div className="cta-trust-badges">
              <span>🛡️ 10 Year Warranty</span>
              <span>📅 45-Day Delivery</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
