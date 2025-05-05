
import { Button } from "@/components/ui/button";
import { Menu, Home, Shield, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerOverlay } from "@/components/ui/drawer";
import { useAppContext } from "@/contexts/AppContext";
import AppMenu from "./AppMenu";
import type { ProtectionStatus } from "@/types/app";

const AppHeader = () => {
  const { setCurrentPage, drawerOpen, setDrawerOpen, protectionStatus } = useAppContext();

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

  return (
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
            <AppMenu />
          </DrawerContent>
        </Drawer>
        <h1 className="text-xl font-medium">Shield Safe Zone</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCurrentPage("home")}
          className="text-primary-foreground"
        >
          <Home className="h-5 w-5" />
        </Button>
        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${getStatusColor()}`}>
          {getStatusIcon()}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
