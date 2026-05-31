import Image from "next/image";
import { Metadata } from "next";
import { MessageSquare, PenTool, FileText, Hammer, Key, Clock, UserCheck, ShieldCheck } from "lucide-react";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import "./process.css";

export const metadata: Metadata = {
  title: "Our Process | Daksh Interiors",
  description: "Learn about Daksh Interiors' 5-step process. From consultation to handover, we deliver 100% in-house execution with zero compromise on quality.",
};

const timelineSteps = [
  {
    step: "Step 01",
    title: "Discovery & Consultation",
    description: "We listen to your vision. We conduct site visits, gather your specific requirements, and discuss budget expectations to ensure our goals are perfectly aligned from day one.",
    icon: <MessageSquare size={28} />
  },
  {
    step: "Step 02",
    title: "Design & 3D Visualization",
    description: "Our expert architects and designers create precision 2D layouts and stunning 3D renders, allowing you to walk through and experience your space before a single brick is laid.",
    icon: <PenTool size={28} />
  },
  {
    step: "Step 03",
    title: "Estimation & Agreement",
    description: "No hidden costs. We provide a transparent, detailed bill of materials and an exact timeline. Once approved, we lock in the contract so you have complete peace of mind.",
    icon: <FileText size={28} />
  },
  {
    step: "Step 04",
    title: "Execution & Civil Works",
    description: "Our skilled civil engineers, carpenters, and technicians take over. Because we execute 100% in-house, we tightly control both the quality of materials and the speed of delivery.",
    icon: <Hammer size={28} />
  },
  {
    step: "Step 05",
    title: "Handover & Maintenance",
    description: "A flawless finish followed by a final walk-through. We hand over the keys and activate our dedicated post-care maintenance support, standing by our 30-year legacy of trust.",
    icon: <Key size={28} />
  }
];

export default function ProcessPage() {
  return (
    <main className="process-page">
      {/* Hero Section */}
      <section className="process-hero">
        <Image
          src="/inspiration/master-bedroom.png"
          alt="Daksh Interiors Process"
          fill
          style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content container">
          <h1>Our 5-Step Process<br/><span className="text-orange">to Perfection.</span></h1>
          <p>From a blank canvas to your dream space. Here is exactly how we deliver 100% in-house execution with zero compromise on quality.</p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="timeline-container">
            {timelineSteps.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-icon">
                  {item.icon}
                </div>
                <div className="timeline-content">
                  <span className="step-number">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="timeline-spacer" style={{ width: "45%" }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Why Choose Us Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-header">
            <h2>Why Choose <span>Our Workflow?</span></h2>
          </div>
          <div className="trust-grid">
            <div className="trust-card">
              <Clock size={40} />
              <h3>On-Time Delivery</h3>
              <p>We respect your time. Our rigorous project management ensures strict adherence to the agreed-upon timeline, every single time.</p>
            </div>
            <div className="trust-card">
              <UserCheck size={40} />
              <h3>Single Point of Contact</h3>
              <p>No more running between contractors. You get a dedicated project manager who handles everything from procurement to handover.</p>
            </div>
            <div className="trust-card">
              <ShieldCheck size={40} />
              <h3>30 Years of Refinement</h3>
              <p>Decades of experience mean we have refined our workflows to eliminate errors, reduce wastage, and guarantee structural integrity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <DesignSessionCTA 
        heading="Ready to begin <span class='text-orange'>Step 01?</span>"
        subheading="Book a free consultation today and let's discuss your vision."
      />
    </main>
  );
}
