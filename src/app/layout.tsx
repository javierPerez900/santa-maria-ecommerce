import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppThemeProvider } from "./AppThemeProvider";
import { AuthProvider } from "@/contexts";
import AmplifyProvider from "./AmplifyProvider";
import { SearchProvider } from "@/contexts";
import { BasketProvider } from "@/contexts/BasketContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santa María",
  description: "Ecommerce Santa María",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppThemeProvider>
          <AmplifyProvider>
            <AuthProvider>
              <BasketProvider>
                <SearchProvider>{children}</SearchProvider>
              </BasketProvider>
            </AuthProvider>
          </AmplifyProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
