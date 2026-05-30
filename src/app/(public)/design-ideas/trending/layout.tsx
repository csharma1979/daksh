import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending Interior Design Ideas 2026 | Daksh Interiors",
  description: "Explore the most popular and trending interior design concepts for homes in Bangalore. Transform your space with cutting-edge styles.",
  keywords: ["trending interior designs", "bangalore interior ideas", "modern home concepts", "luxury interior trends"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
