// components/ClientSideRouter.js
"use client";

import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import Footer from './footer';
import Header from './header';

const ClientSideRouter = ({ children }) => {
    const [currentPath, setCurrentPath] = useState('');
    const pathName = usePathname();

    return (
        <>
            <Header currentPath={pathName} />
            {children}
            <Footer />
        </>
    );
};

export default ClientSideRouter;
