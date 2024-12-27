import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/providers/DarkModeProvider';
import { Analytics } from '@vercel/analytics/react';

import { Toaster } from '@/components/ui/toaster';
import { ViewTransitions } from 'next-view-transitions';
import { NavbarSection } from '@/sections/Common/NavbarSection';
import { BackToTop } from '@/sections/Common/BackToTop';
import { SpeedInsights } from '@vercel/speed-insights/next';

const soraLight = localFont({
  src: 'fonts/Sora-Light.ttf',
  variable: '--font-sora-light',
  display: 'swap',
});

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
        <SpeedInsights />
        <Analytics></Analytics>

        <Toaster />
        <BackToTop />
      </ThemeProvider>
    </>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${soraLight.variable}  font-sans dark:bg-black bg-gray-50  dark:bg-dot-white/[0.2] bg-dot-black/[0.6]  mx-4`}
        >
          <LayoutWrapper>
            <main className="flex flex-wrap sm:flex-col md:flex-row justify-evenly items-center pt-24 min-h-[calc(100vh-100px]">
              <NavbarSection></NavbarSection>
              {children}
            </main>
            <footer className="text-center py-5 mt-auto ">
              <span>© 2024 by Eddie with ❤️</span>
            </footer>
          </LayoutWrapper>
        </body>
      </html>
    </ViewTransitions>
  );
}
