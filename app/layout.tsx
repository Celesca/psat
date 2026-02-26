import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "รวมสุข (Health Hub)",
  description: "ศูนย์รวมสุขภาพและสิทธิพิเศษสำหรับคุณ",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1, // prevents zooming on iOS inputs
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={prompt.variable}>{children}</body>
    </html>
  );
}
