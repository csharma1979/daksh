import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/public/CookieBanner";

export const revalidate = 3600; // Cache these pages for 1 hour

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="main-content-layout">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
