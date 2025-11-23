// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
export const metadata: Metadata = {
  title: "Talaria",
  description: "Trainer & client console",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
                        <QueryClientProvider client={queryClient}>

        {children}
                </QueryClientProvider>
      </body>
    </html>
  );
}
