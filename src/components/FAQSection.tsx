"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "How long does an interior project take?",
    answer: "A standard 2BHK/3BHK project typically takes 45 to 60 days from the design sign-off to handover. Commercial projects may vary based on scope."
  },
  {
    question: "Do you provide 3D designs?",
    answer: "Yes, we provide realistic 3D renders so you can visualize your space exactly how it will look after execution before we start on-site work."
  },
  {
    question: "What is the minimum budget?",
    answer: "We handle projects of various scales. For modular solutions, packages start from ₹2.5 Lakhs, while full home interiors usually start from ₹5 Lakhs depending on materials."
  },
  {
    question: "Do you handle turnkey projects?",
    answer: "Absolutely. We offer end-to-end turnkey solutions including design, procurement, civil work, electrical, plumbing, and final installation."
  }
];

const FAQSection = ({ items = defaultFaqs, title = "Got Questions?", subtitle = "Everything you need to know about starting your project with us." }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="faq-list">
          {items.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? "active" : ""}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="icon">{openIndex === index ? "−" : "+"}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          padding: var(--space-xxl) 0;
          background: var(--brand-white);
        }
        .section-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }
        .section-header h2 { font-size: 3rem; margin-bottom: 10px; }
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-item {
          border-bottom: 1px solid rgba(0, 43, 91, 0.1);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .faq-question {
          padding: 24px 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--brand-blue);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
          opacity: 0;
        }
        .faq-item.active .faq-answer {
          max-height: 200px;
          padding-bottom: 24px;
          opacity: 1;
        }
        .faq-answer p {
          color: var(--brand-grey-dark);
          line-height: 1.6;
          font-size: 1.05rem;
        }
        .icon {
          font-size: 1.5rem;
          color: var(--brand-orange);
          font-weight: 400;
        }
        @media (max-width: 768px) {
          .section-header h2 { font-size: 2.2rem; }
          .faq-question { font-size: 1.1rem; }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;
