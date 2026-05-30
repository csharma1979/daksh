import { Metadata } from "next";

export const metadata: Metadata = {
  title: "False Ceiling & Lighting Designs Bangalore | Daksh Interiors",
  description: "Expert POP and Gypsum false ceiling designs for living rooms, bedrooms, and offices in Bangalore. Transform your space with modern ambient lighting.",
  keywords: ["false ceiling designs bangalore", "pop ceiling interiors", "home ceiling lighting", "gypsum ceiling designers"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
