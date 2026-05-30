import "../jobs/jobs.css";
import { getApplications } from "@/lib/actions/applications";
import { getJobs } from "@/lib/actions/jobs";
import ApplicationList from "@/components/admin/ApplicationList";

export default async function ApplicationsPage() {
  const apps = await getApplications();
  const jobs = await getJobs();

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div className="header-info">
          <h1>Candidates & Applications</h1>
          <p>Review and manage job applications for Daksh Interiors.</p>
        </div>
      </div>

      <ApplicationList initialApplications={apps} jobs={jobs} />
    </div>
  );
}
