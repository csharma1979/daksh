import mongoose, { Schema, Document } from "mongoose";

export interface IDesignCategory extends Document {
  name: string;
  slug: string;
  sortOrder: number;
  status: "Active" | "Inactive";
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DesignCategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    heroImage: { type: String },
    heroTitle: { type: String },
    heroSubtitle: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.DesignCategory ||
  mongoose.model<IDesignCategory>("DesignCategory", DesignCategorySchema);
