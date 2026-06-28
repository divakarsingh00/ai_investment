import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Investment Agent",
  description: "Autonomous analytical engine leveraging LangGraph.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-gray-100 antialiased">{children}</body>
    </html>
  );
}