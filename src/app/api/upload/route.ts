import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const pageSlug = formData.get("pageSlug") as string || "general";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create directory path: /public/uploads/pages/{slug}/
    const relativePath = `uploads/pages/${pageSlug}`;
    const uploadDir = path.join(process.cwd(), "public", relativePath);

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    // Sanitize filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(uploadDir, filename);

    // Write file
    await writeFile(filePath, buffer);

    const publicPath = `/${relativePath}/${filename}`;

    return NextResponse.json({ success: true, url: publicPath });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
