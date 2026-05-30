import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modern Pooja Room Designs Bangalore | Daksh Interiors",
  description: "Browse high-fidelity Vastu-compliant Pooja room and Mandir designs for your home. Expert spiritual space design in Bangalore.",
  keywords: ["pooja room designs bangalore", "modern mandir designs", "vastu pooja room", "spiritual interior designers"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
