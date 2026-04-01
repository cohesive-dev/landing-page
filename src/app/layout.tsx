import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Cohesive - AI-Native CRM for Skilled Trade Services",
  description: "Streamline your trade business operations with Cohesive's intelligent CRM platform. Built specifically for contractors, plumbers, electricians, and skilled trade professionals.",
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
        className={`${spaceGrotesk.variable} ${jakarta.variable} ${playfair.variable} ${caveat.variable} antialiased`}
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
      </body>
    </html>
  );
}
