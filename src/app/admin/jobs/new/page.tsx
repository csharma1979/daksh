import JobForm from "@/components/admin/JobForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import "../jobs.css";

export default function NewJobPage() {
  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div className="header-info">
          <Link href="/admin/jobs" className="back-link">
            <ChevronLeft size={16} /> Back to Jobs
          </Link>
          <h1>Post New Opening</h1>
          <p>Create a new career opportunity for your team.</p>
        </div>
      </div>

      <JobForm />
    </div>
  );
}
