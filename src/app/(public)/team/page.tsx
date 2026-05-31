import Image from "next/image";
import { Metadata } from "next";
import { Mail } from "lucide-react";
import DesignSessionCTA from "@/components/DesignSessionCTA";
import { getTeamMembers } from "@/lib/actions/team";
import "./team.css";

export const metadata: Metadata = {
  title: "Meet The Team | Daksh Interiors",
  description: "Meet the masterminds behind Daksh Interiors' 30 years of excellence. Our team of expert architects, designers, and engineers.",
};

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export default async function TeamPage() {
  const teamMembers = await getTeamMembers(true); // Active only

  return (
    <main className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <Image
          src="/inspiration/living-room.png"
          alt="Daksh Interiors Team"
          fill
          style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
          priority
        />
        <div className="team-hero-overlay" />
        <div className="team-hero-content container">
          <h1>Meet The <span className="text-orange">Masterminds.</span></h1>
          <p>Behind our 30-year legacy and 10,000+ delivered projects is a team of visionary architects, meticulous designers, and seasoned engineers.</p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="team-section">
        <div className="container">
          {teamMembers.length > 0 ? (
            <div className="team-grid">
              {teamMembers.map((member: any) => (
                <div className="team-card" key={member._id}>
                  <div className="team-image-wrapper">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-4xl font-bold">{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <div className="team-role">{member.role}</div>
                    
                    {member.bio && (
                      <p className="team-bio">{member.bio}</p>
                    )}
                    
                    <div className="team-socials">
                      {member.socials?.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                          <LinkedinIcon />
                        </a>
                      )}
                      {member.socials?.twitter && (
                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
                          <TwitterIcon />
                        </a>
                      )}
                      {member.socials?.email && (
                        <a href={`mailto:${member.socials.email}`} className="social-link" title="Email">
                          <Mail size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <h3 className="text-2xl font-bold mb-2">Our Team is Growing</h3>
              <p>Check back soon to meet our amazing experts!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <DesignSessionCTA 
        heading="Want to work with <span class='text-orange'>Our Experts?</span>"
        subheading="Book a free consultation and let our team design your dream space."
      />
    </main>
  );
}
