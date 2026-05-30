import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { Mail, Phone, Calendar, Trash2, CheckCircle, Search } from "lucide-react";
import EnquiryRow from "@/components/admin/EnquiryRow";

async function getEnquiries() {
  await dbConnect();
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(enquiries));
}

import "./enquiries.css";

export default async function EnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="enquiries-wrapper">
      <div className="page-header">
        <div>
          <h1>Customer Enquiries</h1>
          <p>Total leads generated from website forms.</p>
        </div>
        <div className="header-stats">
          <div className="small-stat">
            <strong>{enquiries.filter((e: any) => e.status === 'Unread').length}</strong>
            <span>Unread</span>
          </div>
        </div>
      </div>

      <div className="enquiries-table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Requirement</th>
              <th>Source</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry: any) => (
              <EnquiryRow key={enquiry._id} enquiry={enquiry} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
