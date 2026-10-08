import type { Metadata, Viewport } from "next";
import { Geist, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lydia Chebet | Industrial & Textile Engineer",
  description:
    "Lydia Chebet is a Moi University Industrial & Textile Engineering graduate focused on manufacturing systems, quality and sustainable textile production. Explore her engineering projects, industrial experience and technical portfolio.",
  keywords: [
    "Lydia Chebet",
    "Textile Engineer Kenya",
    "Industrial Engineer Kenya",
    "Moi University Textile Engineering Graduate",
    "Graduate Industrial Engineer Kenya",
    "Textile Testing",
    "Line Balancing",
    "Quality Engineering",
  ],
  authors: [{ name: "Lydia Chebet" }],
  openGraph: {
    title: "Lydia Chebet | Industrial & Textile Engineer",
    description:
      "Industrial & Textile Engineering graduate focused on manufacturing systems, quality and sustainable textile production.",
    type: "website",
    siteName: "Lydia Chebet — Engineering Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lydia Chebet | Industrial & Textile Engineer",
    description:
      "Industrial & Textile Engineering graduate focused on manufacturing systems, quality and sustainable textile production.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F8F6" },
    { media: "(prefers-color-scheme: dark)", color: "#101412" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${interTight.variable} ${plexMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
