import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import "@styles/globals.css";

import { Header } from "@components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Product Catalog",
    template: "%s | Product Catalog",
  },
  description:
    "Browse products, view their details, and filter the catalog by name or category.",
  applicationName: "Product Catalog",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background font-body text-foreground antialiased">
        <Header />

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
