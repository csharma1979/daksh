import JobForm from "@/components/admin/JobForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import "../jobs.css";
import dbConnect from "@/lib/mongodb";
import Job from "@/models/Job";
import { notFound } from "next/navigation";

export default async function EditJobPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const job = await Job.findById(params.id);

  if (!job) {
    notFound();
  }

  const jobData = JSON.parse(JSON.stringify(job));

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div className="header-info">
          <Link href="/admin/jobs" className="back-link">
            <ChevronLeft size={16} /> Back to Jobs
          </Link>
          <h1>Edit Job Posting</h1>
          <p>Update details for <strong>{jobData.title}</strong>.</p>
        </div>
      </div>

      <JobForm initialData={jobData} />
    </div>
  );
}
