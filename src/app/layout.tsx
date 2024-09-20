import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { ThemeProvider } from "~/components/theme-provider";
import { identifierToFeedAndDate } from "~/data/feeds";
import { number } from "zod";

export const metadata: Metadata = {
  title: "Service Change Analysis",
  description: "Analyze changes in transit service in the Seattle area",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const TrackingTag = () => {
  if (process.env.NODE_ENV === 'production') {
    return <script defer src="https://umami.danielhep.me/script.js" data-website-id="837c41b9-bd70-4b82-a29e-944e06f02d67"></script>
  }
  return null;
};

export default function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode, params: Record<string, string> }>) {
  const feedIdentifier = params.feedIdentifier;
  const feedIdentifier2 = params.feedIdentifier2;
  const firstFeed = feedIdentifier ? identifierToFeedAndDate(feedIdentifier) : undefined;
  const secondFeed = feedIdentifier2 ? identifierToFeedAndDate(feedIdentifier2) : undefined;
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <TrackingTag />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="h-16 w-full bg-purple-900 shadow-sm flex items-center px-4 justify-between">
            <h1 className="md:text-4xl font-bold text-white text-xl">What the Bus?</h1>
            {feedIdentifier}
            { !firstFeed && <p>No feeds selected</p> }
            { firstFeed && secondFeed && <p>Compare {firstFeed.feedGroup.name} to {secondFeed.feedGroup.name}</p> }
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
