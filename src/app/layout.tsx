import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pixzora.pages.dev"),
  title: "Pixzora | Enterprise-Grade Custom Websites at ₹299/mo",
  description: "Get a bespoke, high-performance website custom engineered for your business with zero upfront setup cost, free edge hosting, and automated UPI AutoPay.",
  keywords: [
    "custom website",
    "website development india",
    "₹299 website",
    "business website",
    "ecommerce website",
    "industrial website design",
    "zero cost hosting",
    "pixzora"
  ],
  authors: [{ name: "Pixzora Technologies" }],
  creator: "Pixzora",
  publisher: "Pixzora Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://pixzora.pages.dev",
  },
  openGraph: {
    title: "Pixzora | Custom Websites at ₹299/mo Flat",
    description: "Launch your business with an enterprise-grade custom website. Free edge hosting, automatic UPI AutoPay, and lifetime maintenance.",
    url: "https://pixzora.pages.dev",
    siteName: "Pixzora",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixzora | Custom Websites at ₹299/mo",
    description: "Zero CapEx. Bespoke custom website with free Cloudflare edge hosting & UPI AutoPay.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pixzora",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "299",
      "priceCurrency": "INR",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
    },
    "description": "Enterprise-grade bespoke website design, edge hosting, and maintenance platform at ₹299 per month flat.",
    "publisher": {
      "@type": "Organization",
      "name": "Pixzora Technologies",
      "url": "https://pixzora.pages.dev",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
