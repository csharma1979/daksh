import "./Hero.css";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";

const Hero = ({ data }: { data: any }) => {
  return (
    <section className="hero">
      {data.bgImage && (
        <Image 
          src={data.bgImage} 
          alt={data.title || "Daksh Interiors"} 
          fill 
          priority 
          style={{ objectFit: 'cover' }}
          className="hero-bg-img"
        />
      )}
      <div className="container hero-content">
        <div className="hero-text">
          <h1 dangerouslySetInnerHTML={{ __html: data.title || "" }} />
          <div className="hero-subtitle" dangerouslySetInnerHTML={{ __html: data.subtitle || "" }} />
          
          {data.ctaText && (
            <div className="hero-cta-wrapper">
              <a href={data.ctaLink || "#"} className="btn-orange-large">
                {data.ctaText}
              </a>
            </div>
          )}
        </div>
        
        <div className="hero-form-container">
          <div className="form-card">
            <h3>Get Free Consultation</h3>
            <p>Expert designers are just a click away.</p>
            <LeadForm source="Home Hero" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
