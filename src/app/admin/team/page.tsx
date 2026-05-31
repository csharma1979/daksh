import { getTeamMembers } from "@/lib/actions/team";
import TeamClient from "./TeamClient";

export const metadata = {
  title: "Team Management | Admin",
};

export default async function TeamAdminPage() {
  const initialMembers = await getTeamMembers(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-gray-500">Add, edit, or remove members from your team.</p>
        </div>
      </div>
      
      <TeamClient initialMembers={initialMembers} />
    </div>
  );
}
