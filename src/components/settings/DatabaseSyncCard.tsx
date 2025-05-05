
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Database, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import BackgroundSyncToggle from "./BackgroundSyncToggle";

const DatabaseSyncCard = () => {
  const [syncStatus, setSyncStatus] = useState({
    inProgress: false,
    progress: 0
  });
  
  const syncNow = () => {
    if (syncStatus.inProgress) return;
    
    setSyncStatus({ inProgress: true, progress: 0 });
    toast("Database sync started", {
      description: "Updating to the latest scam patterns..."
    });
    
    // Simulate sync process
    const interval = setInterval(() => {
      setSyncStatus(prev => {
        const newProgress = prev.progress + 20;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          toast.success("Database updated", {
            description: "You're protected with the latest scam patterns."
          });
          return { inProgress: false, progress: 100 };
        }
        
        return { inProgress: true, progress: newProgress };
      });
    }, 600);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="h-5 w-5 text-primary" />
          <span>Scam Database</span>
        </CardTitle>
        <CardDescription>
          Manage scam pattern updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <BackgroundSyncToggle />
        
        <Button 
          onClick={syncNow}
          disabled={syncStatus.inProgress}
          className="w-full gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${syncStatus.inProgress ? 'animate-spin' : ''}`} />
          Sync Now
        </Button>
        
        {syncStatus.inProgress && (
          <div className="space-y-1">
            <Progress value={syncStatus.progress} />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Updating database...</span>
              <span>{syncStatus.progress}%</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span>Last updated: Today, 2:30 PM</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseSyncCard;
