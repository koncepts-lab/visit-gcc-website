import {NextUIProvider} from "@nextui-org/react";
import './globals.css';
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body id="style-1">
      <NextUIProvider> 
      <Header />
      {children}
      <Footer/>
      </NextUIProvider>
      </body>
    </html>
  );
}


