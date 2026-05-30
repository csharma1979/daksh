import { getPageBySlug } from "@/lib/actions/pages";
import BlockRenderer from "@/components/public/BlockRenderer";
import ProcessSection from "@/components/ProcessSection";
import ServiceOfferings from "@/components/ServiceOfferings";
import ProjectShowcase from "@/components/ProjectShowcase";
import DesignInspiration from "@/components/DesignInspiration";
import TrustStats from "@/components/TrustStats";
import CustomerReviews from "@/components/CustomerReviews";
import FAQSection from "@/components/FAQSection";
import SEOIntro from "@/components/public/SEOIntro";
import ClientsSection from "@/components/public/ClientsSection";
import { FAQSchema } from "@/components/StructuredData";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Interior Designers in Bangalore | Daksh Interiors",
  description: "Transform your home with the best interior designers in Bangalore. Expert in home interior design, modular kitchens, and flat interiors. Book a free consultation today!",
};

export default async function Home() {
  const page = await getPageBySlug("home");

  // Compatibility layer: Convert old hero content to blocks if needed
  let blocks = page?.content?.blocks || [];
  if (blocks.length === 0 && page?.content?.hero) {
    blocks = [{
      type: "slider-hero",
      data: {}
    }];
  } else if (blocks.length === 0) {
    // Ultimate fallback if nothing exists in DB
    blocks = [{
      type: "slider-hero",
      data: {}
    }];
  }

  // Filter out 'clients' or 'partners' blocks since we are manually placing it below CustomerReviews
  const cleanedBlocks = blocks.filter((b: any) => !['clients', 'Clients', 'partners', 'Partners', 'logos'].includes(b.type));

  return (
    <div className="homepage">
      {/* Dynamic Blocks from CMS */}
      <BlockRenderer blocks={cleanedBlocks} />

      {/* Target Keywords: Interior Designers in Bangalore */}
      <SEOIntro />


      <ServiceOfferings />
      <ProjectShowcase />
      <DesignInspiration />
      <TrustStats />



      <ProcessSection />
      <CustomerReviews />

      <FAQSchema items={[
        {
          question: "Why choose Daksh Interiors as your interior designers in Bangalore?",
          answer: "We offer end-to-end home interior design with a focus on quality, transparency, and timely delivery. Our 10-year warranty ensures long-term peace of mind."
        },
        {
          question: "Do you specialize in flat interior design for specific apartments?",
          answer: "Yes, we have deep experience optimizing 2BHK, 3BHK, and luxury villa spaces across Bangalore, maximizing both aesthetics and functional storage."
        },
        {
          question: "How long does a complete home interior project take?",
          answer: "Depending on the scope, flat interior design and execution typically take between 45 to 60 days from finalization of designs to handover."
        }
      ]} />
      <FAQSection
        items={[
          {
            question: "Why choose Daksh Interiors as your interior designers in Bangalore?",
            answer: "We offer end-to-end home interior design with a focus on quality, transparency, and timely delivery. Our 10-year warranty ensures long-term peace of mind."
          },
          {
            question: "Do you specialize in flat interior design for specific apartments?",
            answer: "Yes, we have deep experience optimizing 2BHK, 3BHK, and luxury villa spaces across Bangalore, maximizing both aesthetics and functional storage."
          },
          {
            question: "How long does a complete home interior project take?",
            answer: "Depending on the scope, flat interior design and execution typically take between 45 to 60 days from finalization of designs to handover."
          }
        ]}
        title="Interior Design FAQs"
        subtitle="Common questions about our home interior services in Bangalore."
      />

      <section className="final-cta" style={{ padding: '100px 0', textAlign: 'center', background: 'var(--brand-orange)', color: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Your dream home is just a click away</h2>
          <Link href="/contact" style={{
            display: 'inline-block',
            padding: '20px 40px',
            borderRadius: '50px',
            border: 'none',
            background: 'white',
            color: 'var(--brand-orange)',
            fontWeight: 800,
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Book Free Consultation
          </Link>
        </div>
      </section>

      <ClientsSection />
    </div>
  );
}
