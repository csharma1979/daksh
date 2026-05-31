import dbConnect from "@/lib/mongodb";
import CookieConsent from "@/models/CookieConsent";
import ConsentsClient from "./ConsentsClient";
import "../enquiries/enquiries.css"; 
import "./consents.css";

async function getConsents() {
  await dbConnect();
  // We can fetch more if needed, currently leaving at 1000 for good client side pagination
  const consents = await CookieConsent.find().sort({ createdAt: -1 }).limit(1000);
  return JSON.parse(JSON.stringify(consents));
}

export default async function ConsentsPage() {
  const consents = await getConsents();

  return (
    <div className="enquiries-wrapper">
      <div className="page-header">
        <div>
          <h1>User Cookie Consents</h1>
          <p>Compliance records and optional user email captures.</p>
        </div>
        <div className="header-stats">
          <div className="small-stat">
            <strong>{consents.length}</strong>
            <span>Total Records</span>
          </div>
          <div className="small-stat">
            <strong>{consents.filter((c: any) => c.email).length}</strong>
            <span>Emails Captured</span>
          </div>
        </div>
      </div>

      <ConsentsClient initialConsents={consents} />
    </div>
  );
}
