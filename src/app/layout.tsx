import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Service Change Analysis",
  description: "Analyze changes in transit service in the Seattle area",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script defer src="https://umami.danielhep.me/script.js" data-website-id="837c41b9-bd70-4b82-a29e-944e06f02d67"></script>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="h-16 w-full bg-purple-900 shadow-sm flex items-center px-4">
            <h1 className="text-4xl font-bold text-white">Seattle Area Service Changes</h1>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
