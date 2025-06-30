// app/layout.js

"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import dynamic from "next/dynamic";
import Script from "next/script";

const ClientSideRouter = dynamic(
  () => import("../../components/layouts/ClientSideRouter"),
  {
    ssr: false,
  }
);

export default function RootLayout({ children }) {
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

        {/* ✅ Updated Zoho SalesIQ Implementation */}
        <Script
          id="zoho-salesiq-setup"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.$zoho = window.$zoho || {};
              $zoho.salesiq = $zoho.salesiq || {
                ready: function() {}
              };
            `,
          }}
        />

        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.com/widget?wc=siqc87d41d642b596ee8f7dc3c0674465b98a307bd386e607f660ba2dbf57cbcadd"
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  );
}
