"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DrawerContextType {
  open: boolean;
  toggleDrawer: () => void;
  token?: string;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{
  children: React.ReactNode;
  session?: string;
}> = ({ children, session }) => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  const toggleDrawer = () => setOpen((prev) => !prev);

  useEffect(() => {
    setToken(session);
  }, [token]);
  return (
    <DrawerContext.Provider value={{ open, toggleDrawer, token }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
