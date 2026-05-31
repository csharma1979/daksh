import { Metadata } from "next";
import { Shield, Eye, Database, Lock, UserCheck, MessageSquare } from "lucide-react";
import DesignSessionCTA from "@/components/DesignSessionCTA";

export const metadata: Metadata = {
  title: "Privacy Policy | Daksh Interiors",
  description: "Read the privacy policy for Daksh Interiors to understand how we collect, use, and protect your personal information.",
};

const PRIVACY_SECTIONS = [
  { id: "collection", icon: Database, title: "1. Information We Collect" },
  { id: "usage", icon: Eye, title: "2. How We Use Information" },
  { id: "protection", icon: Lock, title: "3. Data Security" },
  { id: "cookies", icon: Shield, title: "4. Cookies & Tracking" },
  { id: "rights", icon: UserCheck, title: "5. Your Rights" },
  { id: "contact", icon: MessageSquare, title: "6. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Premium Hero Section */}
      <div className="relative py-20 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we handle your personal data.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Last Updated: May 31, 2026
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-1/4 lg:shrink-0">
            <div className="sticky top-32 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider text-sm">Navigation</h3>
              <nav className="flex flex-col gap-2">
                {PRIVACY_SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-brand-blue transition-colors font-medium text-sm group"
                  >
                    <section.icon size={16} className="text-gray-400 group-hover:text-brand-blue transition-colors" />
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="w-full lg:w-3/4 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="prose-custom max-w-none">
              
              <section id="collection" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">1. Information We Collect</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    At Daksh Interiors, we collect information to provide better services to all our clients. The types of personal information we collect include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-orange">
                    <li><strong>Contact Information:</strong> Name, email address, phone number, and physical project address.</li>
                    <li><strong>Project Details:</strong> Architectural drawings, design preferences, layouts, and budget estimates.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our website, collected through cookies and analytics tools.</li>
                  </ul>
                </div>
              </section>

              <section id="usage" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">2. How We Use Information</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    We use the information we collect for various purposes, including to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-orange">
                    <li>Provide, operate, and maintain our interior and civil engineering services.</li>
                    <li>Improve, personalize, and expand our website design and customer offerings.</li>
                    <li>Communicate with you, either directly or through one of our partners, for customer service, updates, and marketing communications.</li>
                    <li>Process project payments and manage financial records.</li>
                  </ul>
                </div>
              </section>

              <section id="protection" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">3. Data Security</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    We value your trust in providing us your personal information, thus we are striving to use commercially acceptable means of protecting it. 
                  </p>
                  <p>
                    We implement standard firewalls, encryption protocols, and administrative controls to protect against unauthorized access, alteration, disclosure, or destruction of your personal data.
                  </p>
                  <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100/50 my-6 text-gray-700">
                    <p className="font-semibold text-brand-blue mb-2">Note on Security:</p>
                    <p className="text-sm">
                      Please remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                    </p>
                  </div>
                </div>
              </section>

              <section id="cookies" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">4. Cookies & Tracking Technologies</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Our website uses cookies to enhance your experience. A cookie is a small file placed on your device. We use cookies to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-orange">
                    <li>Keep track of your calculator estimates (e.g., our design budget calculator).</li>
                    <li>Understand and save user's preferences for future visits.</li>
                    <li>Compile aggregate data about site traffic and site interactions to offer better site experiences and tools in the future.</li>
                  </ul>
                  <p>
                    You can choose to disable cookies through your individual browser options.
                  </p>
                </div>
              </section>

              <section id="rights" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">5. Your Data Rights</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    We believe in transparency. Depending on your location, you have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-orange">
                    <li>The right to request access to the personal data we hold about you.</li>
                    <li>The right to request that we correct any inaccurate or incomplete personal data.</li>
                    <li>The right to request deletion of your personal data under certain conditions.</li>
                    <li>The right to object to or restrict our processing of your personal information.</li>
                  </ul>
                </div>
              </section>

              <section id="contact" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">6. Contact Us</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact our data protection team:
                  </p>
                  <p className="font-medium text-gray-800">
                    Daksh Interiors<br />
                    Email: <a href="mailto:privacy@dakshinteriors.com" className="text-brand-blue hover:underline">privacy@dakshinteriors.com</a><br />
                    Phone: +91 99999 99999
                  </p>
                </div>
              </section>

            </div>
          </main>

        </div>
      </div>

      <DesignSessionCTA />
    </div>
  );
}
