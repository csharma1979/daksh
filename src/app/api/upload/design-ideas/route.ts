import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const categorySlug = (formData.get("categorySlug") as string) || "general";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const savedUrls: string[] = [];
    const relativePath = `design-ideas/${categorySlug}`;
    const uploadDir = path.join(process.cwd(), "public", relativePath);

    // Ensure category folder exists under public/design-ideas/
    await mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      // Validate file type (image only, png, jpg, jpeg, webp, gif, etc.)
      const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];
      const ext = path.extname(file.name).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        return NextResponse.json(
          { error: `File type ${ext} not allowed. Only images (.png, .jpg, .jpeg, etc.) are allowed.` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Sanitize and create filename
      const sanitizedName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "");
      const filename = `${Date.now()}-${sanitizedName}`;
      const filePath = path.join(uploadDir, filename);

      // Write file to filesystem
      await writeFile(filePath, buffer);

      const publicPath = `/${relativePath}/${filename}`;
      savedUrls.push(publicPath);
    }

    return NextResponse.json({ success: true, urls: savedUrls });
  } catch (error: any) {
    console.error("Design Ideas upload error:", error);
    return NextResponse.json({ error: `Upload failed: ${error.message || error}` }, { status: 500 });
  }
}
