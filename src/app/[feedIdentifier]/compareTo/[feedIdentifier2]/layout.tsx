import "~/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Change Analysis",
  description: "Analyze changes in transit service in the Seattle area",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode, params: Record<string, string> }>) {
  return (
    <>
    {children}
    </>
  );
}
