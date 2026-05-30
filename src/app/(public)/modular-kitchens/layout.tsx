import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modular Kitchen Designs Bangalore | Daksh Interiors",
  description: "L-Shaped, U-Shaped, Island, and Straight modular kitchen designs. Premium materials, 10-year warranty, and ergonomic workflow solutions.",
  keywords: ["modular kitchen bangalore", "kitchen interior designers", "L shape kitchen designs", "luxury modular kitchens"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
