
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Phone, MessageSquare, BookOpen, AlertCircle, Settings, Bell, Home, History } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import type { AppPage } from "@/types/app";

const AppMenu = () => {
  const { currentPage, setCurrentPage } = useAppContext();

  const menuItems = [
    { id: "home", label: "Home", icon: <Home className="h-5 w-5" /> },
    { id: "sms", label: "SMS Detection", icon: <MessageSquare className="h-5 w-5" /> },
    { id: "call", label: "Call Monitoring", icon: <Phone className="h-5 w-5" /> },
    { id: "history", label: "Threat History", icon: <History className="h-5 w-5" /> },
    { id: "education", label: "Scam Education", icon: <BookOpen className="h-5 w-5" /> },
    { id: "emergency", label: "Emergency Help", icon: <AlertCircle className="h-5 w-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
    { id: "about", label: "About/Help", icon: <Bell className="h-5 w-5" /> },
  ];

  return (
    <div className="p-4 bg-background h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <h2 className="text-xl font-medium">Shield Safe Zone</h2>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentPage === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start text-left ${
              currentPage === item.id ? "bg-secondary" : ""
            }`}
            onClick={() => setCurrentPage(item.id as AppPage)}
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
            <span>v1.0.0 Beta</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AppMenu;
