
import { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerOverlay } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Shield, Phone, MessageSquare, BookOpen, AlertCircle, Settings, Menu, Bell, Home, History, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import HomePage from "@/components/HomePage";
import SmsScamDetection from "@/components/SmsScamDetection";
import CallScamMonitoring from "@/components/CallScamMonitoring";
import ScamEducationHub from "@/components/ScamEducationHub";
import EmergencyAssistance from "@/components/EmergencyAssistance";
import SettingsPage from "@/components/SettingsPage";
import AboutHelp from "@/components/AboutHelp";
import { Card } from "@/components/ui/card";
import LoadingScreen from "@/components/LoadingScreen";
import SetupWizard from "@/components/SetupWizard";
import ThreatHistory from "@/components/ThreatHistory";
import { useLanguage } from "@/contexts/LanguageContext";

export type AppPage = 
  | "home" 
  | "sms" 
  | "call" 
  | "education" 
  | "emergency" 
  | "settings" 
  | "about"
  | "history";

export type ProtectionStatus = "protected" | "at-risk" | "critical";

const ScamShield = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [protectionStatus, setProtectionStatus] = useState<ProtectionStatus>("protected");
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const hasCompletedSetup = localStorage.getItem("setupCompleted");
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!hasCompletedSetup) {
        setShowSetup(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const completeSetup = () => {
    localStorage.setItem("setupCompleted", "true");
    setShowSetup(false);
    toast.success(t("success.setup"), {
      description: t("success.setup.desc")
    });
  };
  
  const skipSetup = () => {
    localStorage.setItem("setupCompleted", "true");
    setShowSetup(false);
    toast(t("toast.setup.skip"), {
      description: t("toast.setup.skip.desc")
    });
  };

  useEffect(() => {
    setTimeout(() => {
      toast.success(t("success.shield"), {
        description: t("success.shield.desc")
      });
    }, 1500);
  }, [t]);
  
  const handlePageChange = (page: AppPage) => {
    setCurrentPage(page);
    setDrawerOpen(false);
    
    document.querySelector("main")?.classList.add("page-transition");
    setTimeout(() => {
      document.querySelector("main")?.classList.remove("page-transition");
    }, 300);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const getStatusColor = () => {
    switch(protectionStatus) {
      case "protected": return "bg-green-500";
      case "at-risk": return "bg-amber-500";
      case "critical": return "bg-red-500";
    }
  };

  const getStatusIcon = () => {
    switch(protectionStatus) {
      case "protected": return <CheckCircle className="h-6 w-6 text-white" />;
      case "at-risk": return <AlertTriangle className="h-6 w-6 text-white" />;
      case "critical": return <AlertCircle className="h-6 w-6 text-white" />;
    }
  };
  
  const renderPage = () => {
    switch(currentPage) {
      case "home":
        return <HomePage setProtectionStatus={setProtectionStatus} />;
      case "sms":
        return <SmsScamDetection />;
      case "call":
        return <CallScamMonitoring />;
      case "education":
        return <ScamEducationHub />;
      case "emergency":
        return <EmergencyAssistance />;
      case "settings":
        return <SettingsPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      case "about":
        return <AboutHelp />;
      case "history":
        return <ThreatHistory />;
      default:
        return <HomePage setProtectionStatus={setProtectionStatus} />;
    }
  };

  const menuItems = [
    { id: "home", label: t("menu.home"), icon: <Home className="h-5 w-5" /> },
    { id: "sms", label: t("menu.sms"), icon: <MessageSquare className="h-5 w-5" /> },
    { id: "call", label: t("menu.call"), icon: <Phone className="h-5 w-5" /> },
    { id: "history", label: t("menu.history"), icon: <History className="h-5 w-5" /> },
    { id: "education", label: t("menu.education"), icon: <BookOpen className="h-5 w-5" /> },
    { id: "emergency", label: t("menu.emergency"), icon: <AlertCircle className="h-5 w-5" /> },
    { id: "settings", label: t("menu.settings"), icon: <Settings className="h-5 w-5" /> },
    { id: "about", label: t("menu.about"), icon: <Bell className="h-5 w-5" /> },
  ];

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }
  
  if (showSetup) {
    return <SetupWizard onComplete={completeSetup} onSkip={skipSetup} />;
  }

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerOverlay />
            <DrawerContent className="h-[90vh] flex flex-col">
              <div className="p-4 bg-background h-full overflow-y-auto">
                <div className="flex items-center gap-2 mb-8">
                  <Shield className="h-8 w-8 text-primary" />
                  <h2 className="text-xl font-medium">{t("app.name")}</h2>
                </div>
                
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "secondary" : "ghost"}
                      className={`w-full justify-start text-left ${
                        currentPage === item.id ? "bg-secondary" : ""
                      }`}
                      onClick={() => handlePageChange(item.id as AppPage)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Button>
                  ))}
                </nav>
                
                <div className="mt-auto pt-8">
                  <Card className="p-4 bg-primary/10">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4" />
                      <span>{t("app.version")}</span>
                    </div>
                  </Card>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <h1 className="text-xl font-medium">{t("app.name")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handlePageChange("home")}
            className="text-primary-foreground"
          >
            <Home className="h-5 w-5" />
          </Button>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${getStatusColor()}`}>
            {getStatusIcon()}
          </div>
        </div>
      </header>

      <main className="flex-1 transition-opacity duration-300 ease-in-out">
        {renderPage()}
      </main>
    </div>
  );
};

export default ScamShield;
