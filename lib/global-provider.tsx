

import React, { createContext, useContext, ReactNode } from "react";
import { getUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";
import { Redirect } from "expo-router";

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams : Record<string, string | number>) => Promise<void>
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
  $createdAt?: string;
  $updatedAt?: string;
  password?: string;
  hash?: string;
  hashOptions?: object;
  registration?: string;
  accessedAt?: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getUser,
  });

  const isLogged = !!user;

  const userData = user ?? null;

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user: userData,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;