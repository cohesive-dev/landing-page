import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Playfair_Display, Caveat, Dancing_Script, Allura } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const allura = Allura({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Cohesive | The AI growth engine for businesses that sell locally",
  description: "Cohesive automates prospecting, outreach, follow-up, and lead management for companies selling to local businesses, property owners, and commercial facilities.",
  icons: {
    icon: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/cohesive-backgroundless.png",
    apple: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/cohesive-backgroundless.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WJJNZWWC');
          `}
        </Script>
        <Script id="leadTruffle" strategy="afterInteractive">
          {`
            (function () {
              var s = document.createElement('script');
              s.src = "https://embeds-v1.leadtruffle.com/tooldesk-widget.js";
              s.async = true;
              s.onload = function () {
                window.LTWidget.initialize({
                  companyId: "54e15aec-f591-4859-9e29-a9b10f65981a"
                });
              };
              document.head.appendChild(s);
            })();
        `}
        </Script>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jakarta.variable} ${playfair.variable} ${caveat.variable} ${dancingScript.variable} ${allura.variable} antialiased`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WJJNZWWC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
