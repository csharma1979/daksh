import mongoose, { Schema, Document } from "mongoose";

export interface IDesignGallery extends Document {
  categoryId: mongoose.Types.ObjectId;
  subcategoryId: mongoose.Types.ObjectId;
  title: string;
  subtitle?: string;
  description?: string;
  images: string[];
  featuredImage?: string;
  featured: boolean;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

const DesignGallerySchema: Schema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "DesignCategory", required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: "DesignSubcategory", required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    images: { type: [String], default: [] },
    featuredImage: { type: String },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export default mongoose.models.DesignGallery ||
  mongoose.model<IDesignGallery>("DesignGallery", DesignGallerySchema);
