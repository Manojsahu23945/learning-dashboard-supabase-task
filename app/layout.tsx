import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnFlow – Student Dashboard",
  description: "Your futuristic learning companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
