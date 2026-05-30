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

export const metadata: Metadata = {
  title: "Interior Design Ideas & Inspirations | Daksh Interiors Bangalore",
  description: "Explore 500+ home interior design ideas for Bangalore homes. From modular kitchens and luxury living rooms to 2026 trending design forecasts.",
  keywords: "Interior design ideas Bangalore, home decor inspirations, modular kitchen designs, luxury bedroom ideas, trending interiors 2026"
};

const designCategories = [
  {
    title: "Trending 2026",
    slug: "trending",
    image: "/design-ideas/trending-hero.png",
    count: "45+ Ideas",
    icon: <TrendingUp size={24} />,
    description: "The latest luxury forecasts and modern evolutions for Indian homes."
  },
  {
    title: "Living Room",
    slug: "living-room",
    image: "/inspiration/living-room.png",
    count: "120+ Designs",
    icon: <Layout size={24} />,
    description: "Contemporary, ethnic, and minimalist themes for the heart of your home."
  },
  {
    title: "Modular Kitchen",
    slug: "modular-kitchen",
    image: "/inspiration/modular-kitchen.png",
    count: "80+ Layouts",
    icon: <ChefHat size={24} />,
    description: "Ergonomic, easy-to-clean, and high-tech culinary spaces."
  },
  {
    title: "Bedroom",
    slug: "bedroom",
    image: "/inspiration/master-bedroom.png",
    count: "60+ Themes",
    icon: <Bed size={24} />,
    description: "Relaxing sanctuaries and space-optimized master suites."
  },
  {
    title: "Wardrobes",
    slug: "wardrobe",
    image: "/inspiration/wardrobe.png",
    count: "50+ Styles",
    icon: <Layers size={24} />,
    description: "Bespoke storage solutions from walk-in closets to sliding systems."
  },
  {
    title: "Home Office",
    slug: "home-office",
    image: "/inspiration/home-office.png",
    count: "30+ Setups",
    icon: <Briefcase size={24} />,
    description: "Productivity-optimized workspaces built for the modern professional."
  },
  {
    title: "Bathroom",
    slug: "bathroom",
    image: "/inspiration/bathroom.png",
    count: "40+ Concepts",
    icon: <Bath size={24} />,
    description: "Spa-like luxury and functional transformations for wet areas."
  },
  {
    title: "Kids Room",
    slug: "kids-room",
    image: "/artifacts/kids_adventure_room_1775013751006.png",
    count: "35+ Ideas",
    icon: <Sparkles size={24} />,
    description: "Imaginative sanctuaries from rocket-ship bunks to creative play zones."
  }
];

import LeadForm from "@/components/LeadForm";

export default function DesignIdeasDirectory() {
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
          {designCategories.map((cat, idx) => (
            <Link href={`/design-ideas/${cat.slug}`} key={idx} className="dir-card">
              <div className="card-image-box">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="card-img"
                />
                <div className="card-overlay" />
                <div className="card-count">{cat.count}</div>
              </div>
              <div className="card-info">
                <div className="card-header">
                  <div className="icon-box">{cat.icon}</div>
                  <h3>{cat.title}</h3>
                </div>
                <p>{cat.description}</p>
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
