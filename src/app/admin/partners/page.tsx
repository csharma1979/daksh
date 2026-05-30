import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import PartnerRow from "@/components/admin/PartnerRow";

async function getPartners() {
  await dbConnect();
  const partners = await Partner.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(partners));
}

import "./partners.css";

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="partners-wrapper">
      <div className="page-header">
        <div>
          <h1>Partner Requests</h1>
          <p>Architects and Designers seeking collaboration.</p>
        </div>
      </div>

      <div className="partners-table-container">
        <table className="partners-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Partner</th>
              <th>Professional Details</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner: any) => (
              <PartnerRow key={partner._id} partner={partner} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
