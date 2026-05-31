import { Metadata } from "next";
import { Scale, FileText, CreditCard, Hammer, Shield, AlertTriangle } from "lucide-react";
import DesignSessionCTA from "@/components/DesignSessionCTA";

export const metadata: Metadata = {
  title: "Terms & Conditions | Daksh Interiors",
  description: "Read the terms and conditions for engaging with Daksh Interiors for your home, office, and civil project needs.",
};

const TERMS_SECTIONS = [
  { id: "introduction", icon: FileText, title: "1. Introduction" },
  { id: "services", icon: Hammer, title: "2. Scope of Services" },
  { id: "payment", icon: CreditCard, title: "3. Payment Terms" },
  { id: "warranties", icon: Shield, title: "4. Warranties & Liability" },
  { id: "cancellations", icon: AlertTriangle, title: "5. Cancellations & Refunds" },
  { id: "governing-law", icon: Scale, title: "6. Governing Law" },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Premium Hero Section */}
      <div className="relative py-20 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before engaging with Daksh Interiors.
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
              <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider text-sm">Table of Contents</h3>
              <nav className="flex flex-col gap-2">
                {TERMS_SECTIONS.map((section) => (
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
              
              <section id="introduction" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">1. Introduction</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Welcome to Daksh Interiors. By accessing our website, using our services, or engaging us for any interior or civil project, you agree to be bound by these Terms and Conditions.
                  </p>
                  <p>
                    With over 30 years of experience serving both small residential requirements and large corporate projects, Daksh Interiors operates under strict professional guidelines to ensure the highest quality of service.
                  </p>
                </div>
              </section>

              <section id="services" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">2. Scope of Services</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Daksh Interiors provides comprehensive interior design, architectural planning, civil construction, and remodeling services.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-orange">
                    <li>All design concepts, 3D renderings, and architectural plans remain the intellectual property of Daksh Interiors until full payment is received.</li>
                    <li>Project timelines are estimates and may be subject to change due to unforeseen circumstances, including but not limited to material availability, labor shortages, or severe weather conditions.</li>
                    <li>Any deviations from the agreed-upon Scope of Work (SOW) must be documented and signed by both parties via a formal Change Order.</li>
                  </ul>
                </div>
              </section>

              <section id="payment" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">3. Payment Terms</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    To ensure smooth execution of your project, our standard payment structure is as follows, unless explicitly stated otherwise in your contract:
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 my-6">
                    <ul className="space-y-3 font-medium text-gray-700">
                      <li className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span>Initial Booking & Design Advance</span>
                        <span className="text-brand-blue font-bold">10%</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span>Upon Material Delivery / Civil Start</span>
                        <span className="text-brand-blue font-bold">40%</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span>Mid-Project Completion</span>
                        <span className="text-brand-blue font-bold">40%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Handover & Final Inspection</span>
                        <span className="text-brand-blue font-bold">10%</span>
                      </li>
                    </ul>
                  </div>
                  <p>
                    Payments delayed beyond 7 business days from the invoice date may result in a temporary suspension of work.
                  </p>
                </div>
              </section>

              <section id="warranties" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">4. Warranties & Liability</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    We stand by our craftsmanship. Daksh Interiors offers a standard <strong>1-Year Workmanship Warranty</strong> on all civil and interior installations executed directly by our team.
                  </p>
                  <p>
                    Third-party materials (e.g., appliances, lighting fixtures, hardware) carry the original manufacturer's warranty. Daksh Interiors is not liable for manufacturing defects in third-party products but will assist in facilitating replacements where possible.
                  </p>
                  <p>
                    Our warranty is voided if the installations are tampered with, altered by third-party contractors, or subjected to abnormal wear and tear or water damage not related to plumbing faults executed by us.
                  </p>
                </div>
              </section>

              <section id="cancellations" className="scroll-mt-32 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">5. Cancellations & Refunds</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    We understand that circumstances change. However, due to the customized nature of interior and civil projects:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-orange">
                    <li>The initial 10% booking and design advance is <strong>non-refundable</strong> once 2D/3D design work has commenced.</li>
                    <li>If a project is canceled after material procurement has begun, the client is liable for the cost of all procured materials and labor executed up to the date of cancellation.</li>
                    <li>Custom-manufactured items (e.g., modular kitchens, bespoke furniture) cannot be canceled once production has started.</li>
                  </ul>
                </div>
              </section>

              <section id="governing-law" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">6. Governing Law</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these terms, or the services provided by Daksh Interiors, shall be subject to the exclusive jurisdiction of the courts located in our primary city of operation.
                  </p>
                  <p>
                    If you have any questions regarding these terms, please contact our legal department at <a href="mailto:legal@dakshinteriors.com" className="text-brand-blue font-semibold hover:underline">legal@dakshinteriors.com</a>.
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
