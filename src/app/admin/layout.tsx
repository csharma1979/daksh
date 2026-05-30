import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { Providers } from "@/components/Providers";

import "./admin-layout.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin-login");
  }

  return (
    <Providers>
      <div className="admin-layout">
        <Sidebar role={(session.user as any).role} />
        <div className="admin-main">
          <Header user={session.user} />
          <main className="admin-content">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
