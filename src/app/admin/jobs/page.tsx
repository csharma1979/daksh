import { getJobs } from "@/lib/actions/jobs";
import Link from "next/link";
import { Plus } from "lucide-react";
import JobList from "@/components/admin/JobList";
import "./jobs.css";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div className="header-info">
          <h1>Job Openings</h1>
          <p>Manage career opportunities and recruitment at Daksh Interiors.</p>
        </div>
        <Link href="/admin/jobs/new" className="btn-add-job">
          <Plus size={20} />
          <span>Post New Job</span>
        </Link>
      </div>

      <JobList jobs={jobs} />
    </div>
  );
}
