"use client";

import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import Footer from './footer';
import Header from './header';
import { SnackbarProvider } from "notistack";


const ClientSideRouter = ({ children }) => {
    const [currentPath, setCurrentPath] = useState('');
    const pathName = usePathname();

    return (
        <>
            <Header currentPath={pathName} />
                <SnackbarProvider>
                    {children}
                </SnackbarProvider>
            <Footer />
        </>
    );
};

export default ClientSideRouter;
