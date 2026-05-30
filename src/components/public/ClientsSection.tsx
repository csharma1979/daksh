"use client";

import { useEffect, useState } from "react";
import { getClients } from "@/lib/actions/clients";

export default function ClientsSection() {
  const placeholders = [
    { _id: 'p1', name: 'Partner 1', logo: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png' },
    { _id: 'p2', name: 'Partner 2', logo: 'https://cdn-icons-png.flaticon.com/512/1055/1055644.png' },
    { _id: 'p3', name: 'Partner 3', logo: 'https://cdn-icons-png.flaticon.com/512/281/281763.png' },
    { _id: 'p4', name: 'Partner 4', logo: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' },
    { _id: 'p5', name: 'Partner 5', logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png' },
    { _id: 'p6', name: 'Partner 6', logo: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png' },
    { _id: 'p7', name: 'Partner 7', logo: 'https://cdn-icons-png.flaticon.com/512/1055/1055644.png' },
    { _id: 'p8', name: 'Partner 8', logo: 'https://cdn-icons-png.flaticon.com/512/281/281763.png' },
  ];

  const [clients, setClients] = useState<any[]>(placeholders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClients(true);
        if (data && data.length > 0) {
          setClients(data);
        }
      } catch (err) {
        console.error("Failed to load clients:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Remove the loading guard to ensure instant visibility with placeholders
  // if (loading && clients.length === 0) return <div className="clients-skeleton"></div>;
  
  // Triple the clients for a much smoother infinite scroll on large screens
  const displayClients = [...clients, ...clients, ...clients];

  return (
    <section className="clients-section">
      <div className="container">
        <div className="section-header-mini">
          <span className="subtitle">Trusted By (DEBUG)</span>
          <h2>Our Prestigious <span className="text-orange">Partners</span></h2>
        </div>

        <div className="logos-slider-container">
          <div className="logos-track">
            {displayClients.map((client, index) => (
              <div key={`${client._id}-${index}`} className="logo-item" title={client.name}>
                {client.website ? (
                  <a href={client.website} target="_blank" rel="noopener noreferrer">
                    <img src={client.logo} alt={client.name} loading="lazy" />
                  </a>
                ) : (
                  <img src={client.logo} alt={client.name} loading="lazy" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .clients-section { padding: 80px 0; background: #fff; overflow: hidden; }
        .section-header-mini { text-align: center; margin-bottom: 50px; }
        .subtitle { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 3px; color: var(--brand-orange); font-weight: 800; display: block; margin-bottom: 10px; }
        .section-header-mini h2 { font-size: 2.8rem; color: var(--brand-blue); font-weight: 900; }
        .text-orange { color: var(--brand-orange); }

        .logos-slider-container {
          position: relative;
          width: 100%;
        }

        .logos-track {
          display: flex;
          gap: 60px;
          width: calc(250px * ${displayClients.length});
          animation: scroll 40s linear infinite;
        }

        .logos-track:hover { animation-play-state: paused; }

        .logo-item {
          width: 200px;
          height: 100px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: grayscale(100%);
          opacity: 0.5;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-item:hover { filter: grayscale(0%); opacity: 1; transform: scale(1.1); }

        .logo-item img {
          max-width: 100%;
          max-height: 80%;
          object-fit: contain;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * ${clients.length})); }
        }

        .clients-skeleton { height: 200px; width: 100%; background: #f9fafb; }

        @media (max-width: 768px) {
          .section-header-mini h2 { font-size: 2rem; }
          .logo-item { width: 150px; }
          .logos-track { gap: 40px; }
        }
      `}</style>
    </section>
  );
}
