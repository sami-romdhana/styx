import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Styx",
  description: "Guess the game from the store description, one word at a time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
