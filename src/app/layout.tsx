import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pantau Kerja - Job Application & Interview Tracker",
  description: "Track your job applications and organize interview schedules efficiently with Pantau Kerja. The ultimate tool for job seekers.",
  keywords: ["job tracker", "interview scheduler", "career management", "productivity", "job search", "application tracking system"],
  authors: [{ name: "Januantara" }],
  openGraph: {
    title: "Pantau Kerja - Job Application & Interview Tracker",
    description: "Simplify your job search. Track applications and manage interviews in one place.",
    url: "https://pantaukerja.com",
    siteName: "Pantau Kerja",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pantau Kerja - Job Application & Interview Tracker",
    description: "Simplify your job search. Track applications and manage interviews in one place.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >

          <div className="min-h-screen w-full bg-background relative">

            <div
              className="absolute inset-0 z-0 pointer-events-none opacity-25 dark:opacity-15"
              style={{
                backgroundImage: `
        linear-gradient(to right, var(--border) 1px, transparent 1px),
        linear-gradient(to bottom, var(--border) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)
      `,
                backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
              }}
            />
            <div className="relative z-50">
              <Providers>{children}</Providers>
            </div>
          </div>


        </ThemeProvider>
      </body>
    </html>
  );
}
