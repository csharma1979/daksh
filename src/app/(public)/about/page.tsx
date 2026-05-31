import Image from "next/image";
import { Metadata } from "next";
import { CheckCircle2, Home, Building2, HardHat, PenTool, ShieldCheck } from "lucide-react";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us | Daksh Interiors - 30 Years of Excellence",
  description: "Daksh Interiors is a 30-year-old company specialized in Home and Office interiors and CIVIL works. We stand from zero to hero, serving over 10,000 projects.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* 1. Hero Section */}
      <section className="about-hero">
        <Image
          src="/inspiration/living-room.png"
          alt="Daksh Interiors Legacy"
          fill
          style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content container">
          <h1>30 Years of Crafting Spaces.<br/><span className="text-orange">From Zero to Hero.</span></h1>
          <p>What started as a humble beginning three decades ago is now Bangalore’s most trusted name in Interior Design, Civil Works, and Long-Term Maintenance.</p>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>30+</h3>
            <p>Years of Legacy</p>
          </div>
          <div className="stat-item">
            <h3>10k+</h3>
            <p>Projects Delivered</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>In-House Execution</p>
          </div>
          <div className="stat-item">
            <h3>0</h3>
            <p>Compromise on Quality</p>
          </div>
        </div>
      </section>

      {/* 3. Expertise Section */}
      <section className="expertise-section">
        <div className="section-header container">
          <h2>Our Core Expertise</h2>
          <p>From laying the foundation to installing the final masterpiece, we are specialists in both interior aesthetics and structural integrity.</p>
        </div>
        <div className="expertise-grid">
          <div className="expertise-card">
            <div className="icon-wrapper">
              <Home size={36} />
            </div>
            <h3>Home Interiors</h3>
            <p>Turning houses into dream homes. Whether it's a modular kitchen, a luxurious living room, or a custom wardrobe, we design spaces that reflect your personality and optimize for comfort.</p>
          </div>
          <div className="expertise-card">
            <div className="icon-wrapper">
              <Building2 size={36} />
            </div>
            <h3>Office Interiors</h3>
            <p>Creating productivity-driven workspaces. We specialize in corporate layouts, ergonomic furniture, and aesthetic environments that inspire teams and impress clients.</p>
          </div>
          <div className="expertise-card">
            <div className="icon-wrapper">
              <HardHat size={36} />
            </div>
            <h3>Civil Works</h3>
            <p>End-to-end structural construction and foundational excellence. Our civil engineering expertise ensures that every project is built safely, durably, and completely to code.</p>
          </div>
        </div>
      </section>

      {/* 4. Maintenance Section */}
      <section className="maintenance-section">
        <div className="maintenance-content">
          <div className="maintenance-text">
            <h2>Beyond Construction: <span className="text-orange">Maintenance</span></h2>
            <p>At Daksh Interiors, our relationship doesn't end when the project is handed over. We believe in standing by our work. Our specialized maintenance teams cater to both individual homeowners and large corporate campuses, ensuring your spaces remain as flawless as day one.</p>
            <ul className="maintenance-list">
              <li>
                <CheckCircle2 color="var(--brand-orange)" size={24} />
                <span><strong>Individual Home Maintenance:</strong> Quick-response repairs and touch-ups for residential clients.</span>
              </li>
              <li>
                <ShieldCheck color="var(--brand-orange)" size={24} />
                <span><strong>Corporate AMCs:</strong> Annual Maintenance Contracts covering civil, electrical, and interior upkeep for offices.</span>
              </li>
              <li>
                <PenTool color="var(--brand-orange)" size={24} />
                <span><strong>Dedicated Support Team:</strong> Direct access to our experienced maintenance engineers.</span>
              </li>
            </ul>
          </div>
          <div className="maintenance-image">
            <Image
              src="/inspiration/master-bedroom.png"
              alt="Premium Interior Maintenance"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <DesignSessionCTA 
        heading="Ready to partner with a <span class='text-orange'>30-Year Veteran?</span>"
        subheading="Let's build, design, and maintain your dream space together."
      />

    </main>
  );
}
