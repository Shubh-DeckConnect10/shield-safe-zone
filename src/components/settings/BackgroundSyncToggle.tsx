
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BackgroundSyncToggle = () => {
  const [backgroundSync, setBackgroundSync] = useState(true);
  
  const toggleBackgroundSync = () => {
    setBackgroundSync(!backgroundSync);
    
    toast(!backgroundSync ? "Background sync enabled" : "Background sync disabled", {
      description: !backgroundSync 
        ? "Scam database will be updated automatically in the background." 
        : "Scam database will only update when app is open."
    });
  };

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="bg-sync" className="flex-1">
        <div>Background Sync</div>
        <span className="text-xs text-muted-foreground">
          Keep scam patterns up-to-date automatically
        </span>
      </Label>
      <Switch 
        id="bg-sync" 
        checked={backgroundSync} 
        onCheckedChange={toggleBackgroundSync}
      />
    </div>
  );
};

export default BackgroundSyncToggle;
