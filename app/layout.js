import { Poppins } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: '500' 
});

export const metadata = {
  title: "Welcome to Visit GCC",
  description: "Welcome to Visit GCC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="favicon.png" />
      </Head>
      <body>
        <Header />
        
        {children}
        <Footer />
      </body>
    </html>
  );
}
