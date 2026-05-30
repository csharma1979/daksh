import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CookieConsent from "@/models/CookieConsent";
import { getServerSession } from "next-auth";

// Mask IP Address for privacy compliance
const maskIP = (ip: string) => {
  if (!ip) return "unknown";
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
  }
  return ip; // Return as is if not IPv4
};

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, consent } = body;

    const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const newConsent = await CookieConsent.create({
      email: email || undefined,
      ipAddress: maskIP(ip),
      userAgent,
      consent: consent || "Accepted",
    });

    return NextResponse.json({ success: true, data: newConsent }, { status: 201 });
  } catch (error: any) {
    console.error("Cookie Consent Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    // In a real app, you would check for admin role here
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");
    const consent = searchParams.get("consent");

    let query: any = {};
    if (email) query.email = { $regex: email, $options: "i" };
    if (consent) query.consent = consent;

    const consents = await CookieConsent.find(query).sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, data: consents });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
