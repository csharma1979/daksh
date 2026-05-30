import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Storage Unit Designs | Daksh Interiors Bangalore",
  description: "Smart, space-saving storage unit designs for compact and luxury homes. Premium build quality and seamless aesthetics.",
  keywords: ["storage units bangalore", "space saving interior design", "custom cabinets", "living room storage"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
