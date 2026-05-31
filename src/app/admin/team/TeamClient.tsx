"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X, Search, Filter, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/actions/team";
import "./team-admin.css";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export default function TeamClient({ initialMembers }: { initialMembers: any[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    socials: { linkedin: "", twitter: "", email: "" },
    sortOrder: 0,
    status: "Active"
  });

  const handleOpenModal = (member?: any) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        bio: member.bio || "",
        image: member.image || "",
        socials: {
          linkedin: member.socials?.linkedin || "",
          twitter: member.socials?.twitter || "",
          email: member.socials?.email || ""
        },
        sortOrder: member.sortOrder || 0,
        status: member.status || "Active"
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: "",
        role: "",
        bio: "",
        image: "",
        socials: { linkedin: "", twitter: "", email: "" },
        sortOrder: 0,
        status: "Active"
      });
    }
    setIsModalOpen(true);
    setNotification(null);
  };

  // Replaced with URL input directly

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingMember) {
        const updated = await updateTeamMember(editingMember._id, formData);
        setMembers(members.map(m => m._id === updated._id ? updated : m));
      } else {
        const created = await createTeamMember(formData);
        setMembers([created, ...members]);
      }
      setIsModalOpen(false);
      showNotification("success", editingMember ? "Member updated successfully!" : "Member added successfully!");
    } catch (error) {
      console.error("Failed to save team member:", error);
      setNotification({ type: "error", message: "Failed to save team member." });
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await deleteTeamMember(id);
        setMembers(members.filter(m => m._id !== id));
        showNotification("success", "Member deleted successfully!");
      } catch (error) {
        console.error("Failed to delete team member:", error);
        showNotification("error", "Failed to delete team member.");
      }
    }
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[60] px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all ${
          notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={20} className="text-green-600" /> : <AlertCircle size={20} className="text-red-600" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-brand-orange text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition shrink-0 font-medium shadow-sm"
        >
          <Plus size={20} />
          Add Team Member
        </button>
      </div>

      <div className="team-admin-table-container">
        <table className="team-admin-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Order</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member._id} className="team-admin-row">
                <td>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-gray-100 to-gray-200 border border-gray-200 shrink-0">
                      {member.image ? (
                        <Image src={member.image} alt={member.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-lg">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 block">{member.name}</span>
                      <div className="flex gap-2 mt-1">
                        {member.socials?.linkedin ? <LinkedinIcon className="text-[#0A66C2]" /> : <LinkedinIcon className="text-gray-300" />}
                        {member.socials?.twitter ? <TwitterIcon className="text-[#1DA1F2]" /> : <TwitterIcon className="text-gray-300" />}
                        {member.socials?.email ? <Mail size={14} className="text-gray-600" /> : <Mail size={14} className="text-gray-300" />}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium text-gray-800">{member.role}</td>
                <td>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md text-sm font-semibold">{member.sortOrder}</span>
                </td>
                <td>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                    member.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenModal(member)}
                      className="team-action-btn edit"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="team-action-btn delete"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center">
                  <div className="text-gray-400 mb-2"><Search size={32} className="mx-auto" /></div>
                  <h3 className="text-lg font-medium text-gray-800">No team members found</h3>
                  <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto modal-content border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="admin-label">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="admin-input"
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div>
                  <label className="admin-label">Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="admin-input"
                    placeholder="e.g., Lead Architect"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label">Profile Image URL</label>
                <div className="flex flex-col gap-4">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="admin-input"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image && (
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm">
                      <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="admin-label">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="admin-input min-h-[100px] resize-y"
                  placeholder="Short description of their expertise..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="admin-label">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.socials.linkedin}
                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, linkedin: e.target.value } })}
                    className="admin-input"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
                <div>
                  <label className="admin-label">Twitter URL</label>
                  <input
                    type="url"
                    value={formData.socials.twitter}
                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, twitter: e.target.value } })}
                    className="admin-input"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="admin-label">Email</label>
                  <input
                    type="email"
                    value={formData.socials.email}
                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, email: e.target.value } })}
                    className="admin-input"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="admin-label">Display Order (Lowest first)</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="admin-input"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || uploadingImage}
                  className="px-6 py-2 bg-brand-blue text-white font-medium rounded-lg hover:bg-blue-900 transition disabled:opacity-70"
                >
                  {isLoading ? "Saving..." : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
