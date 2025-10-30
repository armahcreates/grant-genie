import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./reduced-motion.css";
import "./animations.css";
import { Provider } from "@/components/ui/provider";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { ToastProvider } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StackProvider } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeadspaceGenie.ai — Headspace for humans who lead",
  description: "The AI Ecosystem for Mission-Driven Leaders. Built to give leaders back their headspace. AI that remembers your mission and automates with heart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StackProvider app={stackServerApp}>
          <QueryProvider>
            <Provider>
              <ErrorBoundary>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </ErrorBoundary>
            </Provider>
          </QueryProvider>
        </StackProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
