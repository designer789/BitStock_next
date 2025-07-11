"use client";

import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SmoothScrollProvider } from "@/contexts/SmoothScrollContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const refreshScrollTrigger = async () => {
      if (typeof window !== 'undefined') {
        try {
          const { ScrollTrigger } = await import('gsap/ScrollTrigger');
          
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        } catch {
          // ScrollTrigger not available, continue silently
        }
      }
    };

    refreshScrollTrigger();
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${sourceSerif4.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutClient>{children}</LayoutClient>;
}
