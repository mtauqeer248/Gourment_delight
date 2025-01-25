// src/context/LoaderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface LoaderContextProps {
  isLoading: boolean;
  setLoading: (loading: boolean) => void; // Function to set loading state
}

// Create the context with an empty default value
const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

// Create a provider component
export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false); // Local state to track loading

  // Provide the context value to children components
  return (
    <LoaderContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Custom hook to use the LoaderContext
export const useLoader = (): LoaderContextProps => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

