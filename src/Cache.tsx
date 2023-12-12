import React, { createContext, useContext, useState } from 'react';

// Define the cache context
interface CacheContextProps {
  updateCache: (key: string, value: any) => void;
  getFromCache: (key: string) => any;
}

interface CacheState {
    [key: string]: any;
  }

const CacheContext = createContext<CacheContextProps | undefined>(undefined);

export const CacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cache, setCache] = useState<CacheState>(() => {
    // Initialize cache from local storage on component mount
    const storedCache = localStorage.getItem('myReactAppCache');
    return storedCache ? JSON.parse(storedCache) : {};
  });

  const updateCache = (key: string, value: any) => {
    // Update cache state
    setCache((prevCache) => ({ ...prevCache, [key]: value }));

    // Update local storage
    localStorage.setItem('myReactAppCache', JSON.stringify({ ...cache, [key]: value }));
  };

  const getFromCache = (key: string) => {
    return cache[key];
  };

  return (
    <CacheContext.Provider value={{ updateCache, getFromCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = (): CacheContextProps => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};