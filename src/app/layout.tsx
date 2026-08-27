import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@styles/globals.css";

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
    default: "Catalogo de Productos",
    template: "%s | Catalogo de Productos"
  },
  description:
    "Explora productos, consulta sus características y filtra el catálogo por nombre o categoría.",
  applicationName: "Catálogo de Productos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background font-body text-foreground antialiased">{children}</body>
    </html>
  );
}
