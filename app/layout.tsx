import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PNM - Personal Network Management",
  description: "인맥 관계를 체계적으로 관리하는 스마트한 도구",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/PNM_L.png", media: "(prefers-color-scheme: light)" },
      { url: "/PNM_D.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/icons/PNM_L/ios/180.png", media: "(prefers-color-scheme: light)" },
      { url: "/icons/PNM_D/ios/180.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: "PNM - Personal Network Management",
    description: "인맥 관계를 체계적으로 관리하는 스마트한 도구",
    url: "http://localhost:3001",
    siteName: "PNM",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script id="theme-manifest" strategy="beforeInteractive">
          {`
            (function() {
              const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              const manifestLink = document.querySelector('link[rel="manifest"]');
              if (manifestLink) {
                manifestLink.href = theme === 'dark' ? '/manifest-dark.json' : '/manifest.json';
              }
            })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
