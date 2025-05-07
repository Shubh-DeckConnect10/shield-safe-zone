
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import type { AppPage, ProtectionStatus } from "@/types/app";

interface AppContextType {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  protectionStatus: ProtectionStatus;
  setProtectionStatus: (status: ProtectionStatus) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  isLoading: boolean;
  showSetup: boolean;
  completeSetup: () => void;
  skipSetup: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [protectionStatus, setProtectionStatus] = useState<ProtectionStatus>("protected");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  
  useEffect(() => {
    const hasCompletedSetup = localStorage.getItem("setupCompleted");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!hasCompletedSetup && !isLoggedIn) {
        setShowSetup(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const completeSetup = () => {
    localStorage.setItem("setupCompleted", "true");
    setShowSetup(false);
    toast.success("Setup completed!", {
      description: "You're now protected against scams."
    });
  };
  
  const skipSetup = () => {
    localStorage.setItem("setupCompleted", "true");
    setShowSetup(false);
    toast("Setup skipped", {
      description: "You can complete setup later in Settings."
    });
  };

  useEffect(() => {
    setTimeout(() => {
      toast.success("Shield Safe Zone activated!", {
        description: "You're now protected from scams."
      });
    }, 1500);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handlePageChange = (page: AppPage) => {
    setCurrentPage(page);
    setDrawerOpen(false);
    
    document.querySelector("main")?.classList.add("page-transition");
    setTimeout(() => {
      document.querySelector("main")?.classList.remove("page-transition");
    }, 300);
  };

  const value = {
    currentPage,
    setCurrentPage: handlePageChange,
    protectionStatus,
    setProtectionStatus,
    darkMode,
    toggleDarkMode,
    drawerOpen,
    setDrawerOpen,
    isLoading,
    showSetup,
    completeSetup,
    skipSetup
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
