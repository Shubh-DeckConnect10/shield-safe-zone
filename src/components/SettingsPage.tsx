
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
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface SettingsPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsPage = ({ darkMode, toggleDarkMode }: SettingsPageProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [permissions, setPermissions] = useState({
    sms: true,
    calls: true,
    contacts: true,
    notifications: true
  });
  
  const [backgroundSync, setBackgroundSync] = useState(true);
  const [localProcessing, setLocalProcessing] = useState(true);
  const [cloudBackup, setCloudBackup] = useState(false);
  const [syncStatus, setSyncStatus] = useState({
    inProgress: false,
    progress: 0
  });
  
  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      
      toast(newState[key] ? t("permission_granted") : t("permission_disabled"), {
        description: `${key.charAt(0).toUpperCase() + key.slice(1)} ${t("permission_has_been")} ${newState[key] ? t('enabled') : t('disabled')}.`
      });
      
      return newState;
    });
  };
  
  const toggleBackgroundSync = () => {
    setBackgroundSync(!backgroundSync);
    
    toast(!backgroundSync ? t("background_sync") + " " + t("enabled") : t("background_sync") + " " + t("disabled"), {
      description: !backgroundSync 
        ? t("keep_updated") 
        : t("sms_protection_disabled")
    });
  };
  
  const toggleLocalProcessing = () => {
    setLocalProcessing(!localProcessing);
    
    toast(!localProcessing ? t("local_processing") + " " + t("enabled") : t("cloud_backup") + " " + t("enabled"), {
      description: !localProcessing 
        ? t("process_device") 
        : t("backup_settings")
    });
  };
  
  const toggleCloudBackup = () => {
    setCloudBackup(!cloudBackup);
    
    toast(!cloudBackup ? t("cloud_backup") + " " + t("enabled") : t("cloud_backup") + " " + t("disabled"), {
      description: !cloudBackup 
        ? t("backup_settings")
        : t("cloud_backup") + " " + t("disabled")
    });
  };
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    
    toast(t("language") + " " + t("updated"), {
      description: `${t("language")} ${lang}`
    });
  };
  
  const syncNow = () => {
    if (syncStatus.inProgress) return;
    
    setSyncStatus({ inProgress: true, progress: 0 });
    toast(t("sync_started"), {
      description: t("updating_database")
    });
    
    // Simulate sync process
    const interval = setInterval(() => {
      setSyncStatus(prev => {
        const newProgress = prev.progress + 20;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          toast.success(t("database_updated"), {
            description: t("now_protected")
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
              <span>{t("app_permissions")}</span>
            </CardTitle>
            <CardDescription>
              {t("control_access")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-permission" className="flex-1 cursor-pointer">
                {t("sms_access")}
              </Label>
              <Switch 
                id="sms-permission" 
                checked={permissions.sms} 
                onCheckedChange={() => togglePermission('sms')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="calls-permission" className="flex-1 cursor-pointer">
                {t("call_access")}
              </Label>
              <Switch 
                id="calls-permission" 
                checked={permissions.calls} 
                onCheckedChange={() => togglePermission('calls')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="contacts-permission" className="flex-1 cursor-pointer">
                {t("contacts_access")}
              </Label>
              <Switch 
                id="contacts-permission" 
                checked={permissions.contacts} 
                onCheckedChange={() => togglePermission('contacts')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications-permission" className="flex-1 cursor-pointer">
                {t("notifications")}
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
              <span>{t("scam_database")}</span>
            </CardTitle>
            <CardDescription>
              {t("manage_updates")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="bg-sync" className="flex-1">
                <div>{t("background_sync")}</div>
                <span className="text-xs text-muted-foreground">
                  {t("keep_updated")}
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
              {t("sync_now")}
            </Button>
            
            {syncStatus.inProgress && (
              <div className="space-y-1">
                <Progress value={syncStatus.progress} />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{t("updating_database")}</span>
                  <span>{syncStatus.progress}%</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>{t("last_updated")}: Today, 2:30 PM</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5 text-primary" />
              <span>{t("privacy_settings")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="local-processing" className="flex-1">
                <div>{t("local_processing")}</div>
                <span className="text-xs text-muted-foreground">
                  {t("process_device")}
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
                <div>{t("cloud_backup")}</div>
                <span className="text-xs text-muted-foreground">
                  {t("backup_settings")}
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
              <span>{t("appearance")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-toggle" className="flex-1">
                <div>{t("dark_mode")}</div>
                <span className="text-xs text-muted-foreground">
                  {t("theme_switch")}
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
              <span>{t("language")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={language} onValueChange={(value) => changeLanguage(value as Language)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hindi" id="hindi" />
                <Label htmlFor="hindi">हिंदी</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="telugu" id="telugu" />
                <Label htmlFor="telugu">తెలుగు</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tamil" id="tamil" />
                <Label htmlFor="tamil">தமிழ்</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        {/* About App */}
        <Card>
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            <div className="space-y-1">
              <p>{t("app_name")}</p>
              <p>{t("version")}</p>
              <p>© 2025 {t("app_name")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default SettingsPage;
