import type { Metadata } from "next";
import "./globals.css";
import { ApplicationContextProvider } from "@/components/applicationContext";
import { HealthIndicator } from "@/components/health-indicator";

export const metadata: Metadata = {
  title: "SIH Hack The Box",
  description: "Smart India Hackathon project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ApplicationContextProvider>
          <HealthIndicator />
          {children}
        </ApplicationContextProvider>
      </body>
    </html>
  );
}
