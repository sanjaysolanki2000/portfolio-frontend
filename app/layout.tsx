import type { Metadata } from "next";
import { Roboto, Syne } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sanjay Solanki | Mobile & Full Stack Developer",
  description:
    "Portfolio of Sanjay Solanki, a React Native, Flutter, React.js, Node.js, and PHP developer based in Bikaner and open to remote work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${syne.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
