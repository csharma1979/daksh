import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wardrobe & Closet Designs Bangalore | Daksh Interiors",
  description: "Premium modular wardrobes, built-in closets, and walk-in wardrobe designs. Maximize your storage space with Daksh Interiors.",
  keywords: ["wardrobe designs bangalore", "modular wardrobes", "walk in closets", "custom wardrobe interiors"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
