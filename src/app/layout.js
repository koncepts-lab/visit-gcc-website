"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import dynamic from 'next/dynamic';

const ClientSideRouter = dynamic(() => import('../../components/layouts/ClientSideRouter'), {
  ssr: false
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Visit GCC</title>
      </head>
      <body>
        <ClientSideRouter>
          {children}
        </ClientSideRouter>
      </body>
    </html>
  );
}
