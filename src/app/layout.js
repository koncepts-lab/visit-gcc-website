// app/layout.js

"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import dynamic from "next/dynamic";
import Script from "next/script"; // 1. Import the Next.js Script component

const ClientSideRouter = dynamic(
  () => import("../../components/layouts/ClientSideRouter"),
  {
    ssr: false,
  }
);
const ClientSideRouter = dynamic(
  () => import("../../components/layouts/ClientSideRouter"),
  {
    ssr: false,
  }
);

export default function RootLayout({ children }) {
  const zohoWidgetCode =
    "siq52a27899a567c01384c23870a05b7a122b33194f5d9daeae3b32e05729c81d77";

  return (
    <html lang="en">
      <head>
        <title>Visit GCC</title>
        {/* ✅ Zoho PageSense */}
        <Script
          src="https://cdn.pagesense.io/js/visitgcc/c93ebcb0810846a887fea3d6acafa8e0.js"
          strategy="afterInteractive"
        />

        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LTQG8F1Z2K"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LTQG8F1Z2K');
            `,
          }}
        />

        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-58FTGTD4');
            `,
          }}
        />
      </head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-58FTGTD4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ClientSideRouter>{children}</ClientSideRouter>

        {/* 2. Add the Zoho div that the script will use */}
        <div id="zsiqwidget"></div>

        {/* 3. Add the inline script that sets up the Zoho object */}
        <Script id="zoho-salesiq-setup" strategy="afterInteractive">
          {`
            var $zoho=$zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
              widgetcode: "${zohoWidgetCode}",
              values:{},
              ready:function(){}
            };
          `}
        </Script>

        {/* 4. Add the script that loads the Zoho widget from their server */}
        <Script
          id="zsiqscript"
          src="https://salesiq.zoho.com/widget"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
