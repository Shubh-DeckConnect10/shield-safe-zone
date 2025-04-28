
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Settings, 
  Bell, 
  Globe, 
  Lock, 
  Database, 
  RefreshCw, 
  CheckCircle,
  Moon,
  Sun
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface SettingsPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsPage = ({ darkMode, toggleDarkMode }: SettingsPageProps) => {
  const [permissions, setPermissions] = useState({
    sms: true,
    calls: true,
    contacts: true,
    notifications: true
  });
  
  const [backgroundSync, setBackgroundSync] = useState(true);
  const [localProcessing, setLocalProcessing] = useState(true);
  const [cloudBackup, setCloudBackup] = useState(false);
  const [language, setLanguage] = useState("english");
  const [syncStatus, setSyncStatus] = useState({
    inProgress: false,
    progress: 0
  });
  
  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      
      toast(newState[key] ? "Permission granted" : "Permission disabled", {
        description: `${key.charAt(0).toUpperCase() + key.slice(1)} permission has been ${newState[key] ? 'enabled' : 'disabled'}.`
      });
      
      return newState;
    });
  };
  
  const toggleBackgroundSync = () => {
    setBackgroundSync(!backgroundSync);
    
    toast(!backgroundSync ? "Background sync enabled" : "Background sync disabled", {
      description: !backgroundSync 
        ? "Scam database will be updated automatically in the background." 
        : "Scam database will only update when app is open."
    });
  };
  
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
  
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    
    toast("Language updated", {
      description: `App language has been changed to ${lang.charAt(0).toUpperCase() + lang.slice(1)}.`
    });
  };
  
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
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5 text-primary" />
              <span>App Permissions</span>
            </CardTitle>
            <CardDescription>
              Control what Shield Safe Zone can access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-permission" className="flex-1 cursor-pointer">
                SMS Access
              </Label>
              <Switch 
                id="sms-permission" 
                checked={permissions.sms} 
                onCheckedChange={() => togglePermission('sms')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="calls-permission" className="flex-1 cursor-pointer">
                Call Access
              </Label>
              <Switch 
                id="calls-permission" 
                checked={permissions.calls} 
                onCheckedChange={() => togglePermission('calls')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="contacts-permission" className="flex-1 cursor-pointer">
                Contacts Access
              </Label>
              <Switch 
                id="contacts-permission" 
                checked={permissions.contacts} 
                onCheckedChange={() => togglePermission('contacts')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications-permission" className="flex-1 cursor-pointer">
                Notifications
              </Label>
              <Switch 
                id="notifications-permission" 
                checked={permissions.notifications} 
                onCheckedChange={() => togglePermission('notifications')}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Database Sync */}
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
        
        {/* Privacy */}
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
        
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              {darkMode ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-toggle" className="flex-1">
                <div>Dark Mode</div>
                <span className="text-xs text-muted-foreground">
                  Switch between light and dark theme
                </span>
              </Label>
              <Switch 
                id="theme-toggle" 
                checked={darkMode} 
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              <span>Language</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={language} onValueChange={changeLanguage}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hindi" id="hindi" />
                <Label htmlFor="hindi">Hindi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tamil" id="tamil" />
                <Label htmlFor="tamil">Tamil</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="telugu" id="telugu" />
                <Label htmlFor="telugu">Telugu</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        {/* About App */}
        <Card>
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            <div className="space-y-1">
              <p>Shield Safe Zone</p>
              <p>v1.0.0 Beta</p>
              <p>© 2025 Shield Safe Zone</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default SettingsPage;
