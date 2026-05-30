import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/gtag";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/StructuredData";
import "./globals.css";
// Unused imports from RootLayout following move to (public)/layout
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dakshinteriors.in"),
  title: {
    default: "Daksh Interiors | Premiere Home Design & Build in Bangalore",
    template: "%s | Daksh Interiors",
  },
  description: "Top-rated end-to-end interior design solutions in Bangalore. Award-winning residential and commercial interior designers for modern, premium spaces.",
  keywords: ["interior designers in bangalore", "home interior design", "flat interior design", "modular kitchen bangalore", "home renovation bangalore", "Daksh Interiors"],
};

// ... (Previous metadata setup) ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Google Analytics Integration */}
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
        {/* ChatPilot Widget */}
        <Script
          src="https://server.fritado.com/chatpilot.js"
          data-token="06f83aa983d1af422e523cf422f065ad"
          strategy="lazyOnload"
        />
        {/* Fritado Lead SDK */}
        <Script
          src="https://server.fritado.com/lead-sdk.js"
          data-project-key="pk_live_3fe6e4a806c84e95fa14006ea5039b82"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
