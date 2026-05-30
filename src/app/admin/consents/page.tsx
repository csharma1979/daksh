import dbConnect from "@/lib/mongodb";
import CookieConsent from "@/models/CookieConsent";
import { ShieldCheck, Mail, Globe, Clock, Monitor } from "lucide-react";
import "../enquiries/enquiries.css"; 
import "./consents.css";

async function getConsents() {
  await dbConnect();
  const consents = await CookieConsent.find().sort({ createdAt: -1 }).limit(100);
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

      <div className="enquiries-table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Status</th>
              <th>User Details</th>
              <th>Device / Agent</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {consents.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>
                  No consent records found yet.
                </td>
              </tr>
            ) : (
              consents.map((consent: any) => (
                <tr key={consent._id}>
                  <td>
                    <div className="cell-with-icon">
                      <Clock size={16} className="text-grey" />
                      <span>{new Date(consent.createdAt).toLocaleString()}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${consent.consent.toLowerCase()}`}>
                      {consent.consent}
                    </span>
                  </td>
                  <td>
                    <div className="user-info">
                      <div className="cell-with-icon">
                        <Mail size={16} />
                        <strong>{consent.email || "Anonymous"}</strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cell-with-icon" title={consent.userAgent}>
                      <Monitor size={16} />
                      <span className="truncate-text">{consent.userAgent.split(')')[0] + ')'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cell-with-icon">
                      <Globe size={16} />
                      <code>{consent.ipAddress}</code>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
