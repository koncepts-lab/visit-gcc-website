import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import dynamic from 'next/dynamic';


export const metadata = {
  title: "Visit GCC",
  description: "Visit GCC",
};

const ClientSideRouter = dynamic(() => import('../../components/layouts/ClientSideRouter'), {
  ssr: false
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientSideRouter>
          {children}
        </ClientSideRouter>
      </body>
    </html>
  );
}
