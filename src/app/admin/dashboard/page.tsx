import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import Partner from "@/models/Partner";
import Page from "@/models/Page";
import Job from "@/models/Job";
import Application from "@/models/Application";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Briefcase,
  UserPlus,
  Image as ImageIcon
} from "lucide-react";
import "./dashboard.css";

async function getStats() {
  try {
    await dbConnect();
    
    const [enquiryCount, partnerCount, pageCount, jobCount, appCount, recentEnquiries, recentApps] = await Promise.all([
      Enquiry.countDocuments(),
      Partner.countDocuments(),
      Page.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Application.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
      Application.find().populate('jobId', 'title').sort({ createdAt: -1 }).limit(5)
    ]);

    return {
      enquiryCount,
      partnerCount,
      pageCount,
      jobCount,
      appCount,
      recentEnquiries: JSON.parse(JSON.stringify(recentEnquiries)),
      recentApps: JSON.parse(JSON.stringify(recentApps)),
      databaseError: false
    };
  } catch (err) {
    console.error("Dashboard Stats Error:", err);
    return {
      enquiryCount: 0,
      partnerCount: 0,
      pageCount: 0,
      recentEnquiries: [],
      databaseError: true
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { title: "Total Enquiries", value: stats.enquiryCount, icon: MessageSquare, color: "#3b82f6", trend: "+12%" },
    { title: "Partner Requests", value: stats.partnerCount, icon: Users, color: "#f59e0b", trend: "+5%" },
    { title: "Active Jobs", value: stats.jobCount, icon: Briefcase, color: "#10b981", trend: "Recruiting" },
    { title: "Total Applicants", value: stats.appCount, icon: UserPlus, color: "#8b5cf6", trend: "New" },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="welcome-banner">
        <h1>Welcome back, <span className="text-orange">Admin</span></h1>
        {stats.databaseError ? (
          <div className="db-error-banner">
            <strong>⚠️ Database Connection Offline:</strong> Displaying cached/mock data. Please ensure your current IP is whitelisted in MongoDB Atlas.
          </div>
        ) : (
          <p>Here's what's happening with Daksh Interiors today.</p>
        )}
      </div>

      <div className="stats-grid">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <h3>{card.title}</h3>
                <div className="stat-value">{card.value}</div>
                <div className="stat-trend">
                  <span className="trend-up">{card.trend}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-content-grid">
        <div className="content-card recent-enquiries">
          <div className="card-header">
            <h3>Recent Enquiries</h3>
            <a href="/admin/enquiries" className="view-all">View All</a>
          </div>
          <div className="enquiry-list">
            {stats.recentEnquiries.length > 0 ? (
              stats.recentEnquiries.map((enquiry: any) => (
                <div key={enquiry._id} className="enquiry-item">
                  <div className="enquiry-avatar">
                    {enquiry.name.charAt(0)}
                  </div>
                  <div className="enquiry-details">
                    <div className="enquiry-name">{enquiry.name}</div>
                    <div className="enquiry-meta">{enquiry.projectType || 'General'} • {new Date(enquiry.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className={`status-badge ${enquiry.status.toLowerCase()}`}>
                    {enquiry.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No recent enquiries found.</div>
            )}
          </div>
        </div>

        <div className="content-card recent-enquiries">
          <div className="card-header">
            <h3>Recent Candidates</h3>
            <a href="/admin/applications" className="view-all">All Candidates</a>
          </div>
          <div className="enquiry-list">
            {stats.recentApps && stats.recentApps.length > 0 ? (
              stats.recentApps.map((app: any) => (
                <div key={app._id} className="enquiry-item">
                  <div className="enquiry-avatar" style={{ background: '#ecfdf5', color: '#10b981' }}>
                    {app.name.charAt(0)}
                  </div>
                  <div className="enquiry-details">
                    <div className="enquiry-name">{app.name}</div>
                    <div className="enquiry-meta">{app.jobId?.title || 'Job Deleted'} • {new Date(app.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className={`status-badge hired`}>
                    {app.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No recent applications.</div>
            )}
          </div>
        </div>

        <div className="content-card quick-actions">
          <h3>Hiring Actions</h3>
          <div className="actions-grid">
            <a href="/admin/jobs/new" className="action-btn">
              <Briefcase size={20} />
              <span>Post New Job</span>
            </a>
            <a href="/admin/applications" className="action-btn">
              <UserPlus size={20} />
              <span>View Candidates</span>
            </a>
            <a href="/admin/jobs" className="action-btn">
              <FileText size={20} />
              <span>Manage Roles</span>
            </a>
            <a href="/admin/media" className="action-btn">
              <ImageIcon size={20} />
              <span>Upload Media</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
