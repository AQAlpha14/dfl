"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Drawer from "@/components/Drawer";

// -------------------------
// Types
// -------------------------

type DrawerSize = "sm" | "md" | "lg" | "full";

export interface DrawerConfig {
  isOpen: boolean;
  title?: ReactNode;
  direction?: ReactNode;
  size?: DrawerSize;
  content?: ReactNode;
  showClose?: boolean;
  footer?: ReactNode;
}

interface ShowDrawerConfig extends Omit<DrawerConfig, "isOpen"> {}

interface DrawerContextType {
  showDrawer: (config: ShowDrawerConfig) => void;
  hideDrawer: () => void;
}

interface DrawerProviderProps {
  children: ReactNode;
}

// -------------------------
// Context
// -------------------------

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

// -------------------------
// Provider
// -------------------------

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [drawerConfig, setDrawerConfig] = useState<DrawerConfig>({
    isOpen: false,
    title: "",
    size: "md",
    content: null,
    showClose: true,
    footer: null,
  });

  const showDrawer = (config: ShowDrawerConfig) => {
    setDrawerConfig({ ...drawerConfig, ...config, isOpen: true });
  };

  const hideDrawer = () => {
    setDrawerConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <DrawerContext.Provider value={{ showDrawer, hideDrawer }}>
      {children}
      <Drawer {...drawerConfig} onClose={hideDrawer} />
    </DrawerContext.Provider>
  );
};

// -------------------------
// Hook
// -------------------------

export const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
