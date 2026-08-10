import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Use system fonts to avoid network issues during build
// CSS font stacks will be defined in globals.css

export const metadata: Metadata = {
  title: "Fledge — Start your first online store, free this month",
  description:
    "Fledge lets young entrepreneurs launch a real online store with no inventory and no upfront cost. First month free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <Nav />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}