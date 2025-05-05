
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PrivacySettingsCard = () => {
  const [localProcessing, setLocalProcessing] = useState(true);
  const [cloudBackup, setCloudBackup] = useState(false);
  
  const toggleLocalProcessing = () => {
    setLocalProcessing(!localProcessing);
    
    toast(!localProcessing ? "Local processing enabled" : "Cloud processing enabled", {
      description: !localProcessing 
        ? "All scam detection will happen on your device for privacy." 
        : "Scam detection will use cloud processing for better accuracy."
    });
  };
  
  const toggleCloudBackup = () => {
    setCloudBackup(!cloudBackup);
    
    toast(!cloudBackup ? "Cloud backup enabled" : "Cloud backup disabled", {
      description: !cloudBackup 
        ? "Your settings and preferences will be backed up to the cloud." 
        : "Your settings will only be stored on this device."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lock className="h-5 w-5 text-primary" />
          <span>Privacy Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="local-processing" className="flex-1">
            <div>Local Processing</div>
            <span className="text-xs text-muted-foreground">
              Process scam detection on device only
            </span>
          </Label>
          <Switch 
            id="local-processing" 
            checked={localProcessing} 
            onCheckedChange={toggleLocalProcessing}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="cloud-backup" className="flex-1">
            <div>Cloud Backup</div>
            <span className="text-xs text-muted-foreground">
              Backup settings and preferences
            </span>
          </Label>
          <Switch 
            id="cloud-backup" 
            checked={cloudBackup} 
            onCheckedChange={toggleCloudBackup}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySettingsCard;
