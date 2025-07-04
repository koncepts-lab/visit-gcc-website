// In: components/LoadingProvider.js
"use client";

import React, { createContext, useState, useContext } from "react";
import GlobalLoader from "./GlobalLoader/GlobalLoader"; // Adjusted path

// Create the context
const LoadingContext = createContext();

// Create a custom hook to easily access the context
export const useLoading = () => useContext(LoadingContext);

// Create the provider component
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading && <GlobalLoader />}
      {children}
    </LoadingContext.Provider>
  );
};
