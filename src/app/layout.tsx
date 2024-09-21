import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { ThemeProvider } from "~/components/theme-provider";
import Header from "~/components/header";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Service Change Analysis",
  description: "Analyze changes in transit service in the Seattle area",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const TrackingTag = () => {
  if (process.env.NODE_ENV === "production") {
    return (
      <Script
        src="https://umami.danielhep.me/script.js"
        data-website-id="837c41b9-bd70-4b82-a29e-944e06f02d67"
      />
    );
  }
  return null;
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode, params: Record<string, string> }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TrackingTag />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
