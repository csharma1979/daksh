import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vastu Tips & Interior Guidance Bangalore | Daksh Interiors",
  description: "Expert Vastu interior design for homes and commercial spaces. Correct Vastu doshas with modern architectural engineering in Bangalore.",
  keywords: ["vastu tips for home", "commercial vastu", "vastu interior designers bangalore", "directional elements guide"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
