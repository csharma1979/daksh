import Link from "next/link";
import "./DesignSessionCTA.css";

interface DesignSessionCTAProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
}

const DesignSessionCTA = ({
  heading = "Book a Design Session",
  subheading = "Get personalized interior design solutions from our experts.",
  buttonText = "Get Free Consultation"
}: DesignSessionCTAProps) => {
  return (
    <section className="design-cta container">
      <div className="cta-box">
        <h2>{heading.includes("<span") ? (
          <span dangerouslySetInnerHTML={{ __html: heading }} />
        ) : heading}</h2>
        <p>{subheading}</p>
        <Link href="/contact" className="btn-primary-cta">
          {buttonText}
        </Link>
        <div className="trust-line">
          <span>Free | No Obligation | Expert Guidance</span>
        </div>
      </div>
    </section>
  );
};

export default DesignSessionCTA;
