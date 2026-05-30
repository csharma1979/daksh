"use server";

import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import { revalidatePath } from "next/cache";

export async function getClients(activeOnly = false) {
  try {
    await dbConnect();
    const query = activeOnly ? { isActive: true } : {};
    const clients = await Client.find(query).sort({ order: 1, createdAt: -1 });
    return JSON.parse(JSON.stringify(clients));
  } catch (err) {
    console.error("Error fetching clients:", err);
    return [];
  }
}

export async function addClient(data: any) {
  try {
    await dbConnect();
    const client = await Client.create(data);
    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: true, client: JSON.parse(JSON.stringify(client)) };
  } catch (err) {
    console.error("Error adding client:", err);
    return { success: false, error: "Failed to add client" };
  }
}

export async function updateClient(id: string, data: any) {
  try {
    await dbConnect();
    const client = await Client.findByIdAndUpdate(id, data, { new: true });
    if (!client) return { success: false, error: "Client not found" };
    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: true, client: JSON.parse(JSON.stringify(client)) };
  } catch (err) {
    console.error("Error updating client:", err);
    return { success: false, error: "Failed to update client" };
  }
}

export async function deleteClient(id: string) {
  try {
    await dbConnect();
    await Client.findByIdAndDelete(id);
    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Error deleting client:", err);
    return { success: false, error: "Failed to delete client" };
  }
}

export async function reorderClients(ids: string[]) {
  try {
    await dbConnect();
    const updates = ids.map((id, index) => 
      Client.findByIdAndUpdate(id, { order: index })
    );
    await Promise.all(updates);
    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Error reordering clients:", err);
    return { success: false, error: "Failed to reorder clients" };
  }
}
