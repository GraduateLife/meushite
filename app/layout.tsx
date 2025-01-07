import { ThemeProvider } from '@/components/providers/DarkModeProvider';
import { Toaster } from '@/components/ui/toaster';
import { BackToTop } from '@/sections/Common/BackToTop';
import { NavbarSection } from '@/sections/Common/NavbarSection';
import { domainUrl } from '@/whoami/links';
import { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import localFont from 'next/font/local';
import './globals.css';

const soraLight = localFont({
  src: './fonts/Sora-Light.ttf',
  variable: '--font-sora-light',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(domainUrl),
};

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
        {/* <SpeedInsights /> */}
        {/* <Analytics></Analytics> */}

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
          className={`${soraLight.variable} mx-4 bg-gray-50 font-sans bg-dot-black/[0.6] dark:bg-black dark:bg-dot-white/[0.2]`}
        >
          <LayoutWrapper>
            <main className="min-h-[calc(100vh-100px] flex flex-wrap items-center justify-evenly pt-24 sm:flex-col md:flex-row">
              <NavbarSection></NavbarSection>
              {children}
            </main>
            <footer className="mt-auto py-5 text-center">
              <span>© 2024 by Eddie with ❤️</span>
            </footer>
          </LayoutWrapper>
        </body>
      </html>
    </ViewTransitions>
  );
}
