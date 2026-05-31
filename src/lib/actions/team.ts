"use server";

import dbConnect from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { revalidatePath } from "next/cache";

export async function getTeamMembers(activeOnly = false) {
  try {
    await dbConnect();
    const query = activeOnly ? { status: "Active" } : {};
    const members = await TeamMember.find(query).sort({ sortOrder: 1, createdAt: -1 });
    return JSON.parse(JSON.stringify(members));
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    throw new Error("Failed to fetch team members");
  }
}

export async function createTeamMember(data: any) {
  try {
    await dbConnect();
    const newMember = await TeamMember.create(data);
    revalidatePath("/team");
    revalidatePath("/admin/team");
    return JSON.parse(JSON.stringify(newMember));
  } catch (error) {
    console.error("Failed to create team member:", error);
    throw new Error("Failed to create team member");
  }
}

export async function updateTeamMember(id: string, data: any) {
  try {
    await dbConnect();
    const updatedMember = await TeamMember.findByIdAndUpdate(id, data, { new: true });
    revalidatePath("/team");
    revalidatePath("/admin/team");
    return JSON.parse(JSON.stringify(updatedMember));
  } catch (error) {
    console.error("Failed to update team member:", error);
    throw new Error("Failed to update team member");
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await dbConnect();
    await TeamMember.findByIdAndDelete(id);
    revalidatePath("/team");
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete team member:", error);
    throw new Error("Failed to delete team member");
  }
}
