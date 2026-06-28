import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RESEARCH // LANGGRAPH",
  description: "Deterministic AI Investment Agent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}