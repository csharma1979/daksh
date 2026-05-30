"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: 1, title: "Living Room", image: "/inspiration/living-room.png", slug: "living-room" },
  { id: 2, title: "Master Bedroom", image: "/inspiration/master-bedroom.png", slug: "bedroom" },
  { id: 3, title: "Modular Kitchen", image: "/inspiration/modular-kitchen.png", slug: "modular-kitchen" },
  { id: 4, title: "Dining Room", image: "/inspiration/dining-room.png", slug: "living-room" }, // Fallback to living room for now
  { id: 5, title: "Bathroom", image: "/inspiration/bathroom.png", slug: "bathroom" },
  { id: 6, title: "Home Office", image: "/inspiration/home-office.png", slug: "home-office" },
  { id: 7, title: "Kids Room", image: "/inspiration/kids-room.png", slug: "bedroom" }, // Fallback to bedroom for now
  { id: 8, title: "Wardrobe", image: "/inspiration/wardrobe.png", slug: "wardrobe" },
];

const DesignInspiration = () => {
  return (
    <section className="inspiration-section container">
      <div className="section-header-flex">
        <div className="text-left">
          <h2>Inspiration for <span className="text-gold">home interior designs</span></h2>
          <p>Give your home a new look with these interior design ideas curated for you.</p>
        </div>
        <Link href="/design-ideas" className="btn-secondary">View All →</Link>
      </div>

      <div className="inspiration-grid">
        {categories.map((cat) => (
          <Link href={`/design-ideas/${cat.slug}`} key={cat.id} className="inspiration-card">
            <div className="inspiration-img-container">
              <Image 
                src={cat.image} 
                alt={cat.title} 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="overlay">
                <span className="cat-title">{cat.title}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .inspiration-section {
          padding: var(--space-xl) 0;
        }
        .section-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--space-xl);
        }
        .text-left h2 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .text-left p {
          color: var(--brand-grey);
          font-size: 1.1rem;
        }
        .inspiration-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
        }
        .inspiration-img-container {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 12px;
          overflow: hidden;
          transition: var(--transition-smooth);
        }
        .inspiration-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }
        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: var(--brand-white);
          text-align: left;
        }
        .inspiration-card:hover .inspiration-img-container {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        .inspiration-card:hover img {
          transform: scale(1.1);
        }
        .cat-title {
          font-weight: 700;
          font-size: 1.1rem;
        }
        @media (max-width: 992px) {
          .inspiration-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
};

export default DesignInspiration;
