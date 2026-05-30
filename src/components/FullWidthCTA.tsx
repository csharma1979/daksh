"use client";

import Image from "next/image";
import LeadForm from "@/components/LeadForm";

interface FullWidthCTAProps {
  title?: string;
  subtitle?: string;
  image?: string;
  source?: string;
}

const FullWidthCTA = ({ 
  title = "Found a look you Love?", 
  subtitle = "Get a **Free 3D Visualization** and accurate cost estimate for your home within 24 hours.",
  image = "/design-ideas/living-room/modern.png",
  source = "Global CTA Section"
}: FullWidthCTAProps) => {
  return (
    <section className="global-cta-section container">
      <div className="cta-split-card">
        <div className="cta-image-side">
          <Image 
            src={image} 
            alt="Daksh Interiors Design" 
            fill 
            style={{ objectFit: 'cover' }}
          />
          <div className="cta-overlay-accent" />
          <div className="cta-badge-floating">#1 Rated Studio in Bangalore</div>
        </div>
        <div className="cta-form-side">
          <div className="cta-header-text">
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: subtitle.replace('**', '<strong>').replace('**', '</strong>') }} />
          </div>
          <div className="cta-form-wrapper">
            <LeadForm source={source} ctaText="Get Free Consultation" />
          </div>
          <div className="cta-trust-badges">
            <span>🛡️ 10 Year Warranty</span>
            <span>📅 45-Day Delivery</span>
            <span>✅ 150+ Quality Checks</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .global-cta-section { padding: 80px 0; }
        .cta-split-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #002B5B;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0, 43, 91, 0.15);
          min-height: 580px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-split-card:hover {
          transform: translateY(-5px) scale(1.005);
          box-shadow: 0 50px 120px rgba(0, 43, 91, 0.25);
        }
        .cta-image-side { position: relative; overflow: hidden; }
        .cta-overlay-accent {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0, 43, 91, 0.4), transparent);
        }
        .cta-badge-floating {
          position: absolute;
          top: 30px;
          left: 30px;
          background: #F58220;
          color: white;
          padding: 8px 18px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          z-index: 5;
        }
        .cta-form-side {
          padding: 60px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .cta-header-text h2 { 
          font-size: 3rem; 
          margin-bottom: 20px; 
          line-height: 1.1; 
          font-weight: 900;
          color: #FFFFFF !important;
        }
        .cta-header-text :global(span.text-orange) { 
          color: #F58220 !important; 
        }
        .cta-header-text p { 
          font-size: 1.25rem; 
          opacity: 1 !important; 
          color: #FFFFFF !important;
          margin-bottom: 40px; 
          line-height: 1.6; 
          font-weight: 500;
        }
        .cta-header-text :global(p strong) { color: #F58220; }
        
        .cta-form-wrapper { margin-bottom: 30px; }
        .cta-form-wrapper :global(input), 
        .cta-form-wrapper :global(select),
        .cta-form-wrapper :global(textarea) {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          padding: 12px 15px !important;
        }
        .cta-form-wrapper :global(input::placeholder) { color: rgba(255, 255, 255, 0.4) !important; }
        .cta-form-wrapper :global(button) {
           background: #F58220 !important;
           font-weight: 900 !important;
        }

        .cta-trust-badges {
          display: flex;
          gap: 20px;
          font-weight: 800;
          font-size: 0.85rem;
          opacity: 0.8;
          flex-wrap: wrap;
        }
        
        @media (max-width: 1100px) {
          .cta-split-card { grid-template-columns: 1fr; min-height: auto; }
          .cta-image-side { height: 350px; }
          .cta-form-side { padding: 40px; text-align: center; }
          .cta-trust-badges { justify-content: center; }
          .cta-header-text h2 { font-size: 2.2rem; }
        }
        @media (max-width: 640px) {
          .cta-form-side { padding: 30px; }
          .global-cta-section { padding: 40px 0; }
        }
      `}</style>
    </section>
  );
};

export default FullWidthCTA;
