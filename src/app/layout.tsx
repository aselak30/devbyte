import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevByte - Developer Tools That Just Work",
  description:
    "Fast, privacy-friendly online developer tools for software engineers, web and mobile developers. JSON formatters, Dart model generators, JWT decoders, Base64, UUIDs, and more.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "JSON to Dart",
    "Flutter tools",
    "JWT decoder",
    "Base64 encoder",
    "UUID generator",
    "Unix timestamp converter",
  ],
  authors: [{ name: "DevByte Team" }],
  openGraph: {
    title: "DevByte - Developer Tools That Just Work",
    description:
      "Fast, privacy-friendly online developer tools. Process everything client-side with zero telemetry or data leaks.",
    url: "https://devbyte.tools",
    siteName: "DevByte",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevByte - Developer Tools That Just Work",
    description: "Fast, privacy-friendly online developer tools that just work.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('devbyte-theme');
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && systemDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white dark:bg-slate-950 dark:text-slate-100"
      >
        {/* Google Tag Manager / Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-P6RKDGWL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
