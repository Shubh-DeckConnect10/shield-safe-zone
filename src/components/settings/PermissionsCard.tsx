
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PermissionsCard = () => {
  const [permissions, setPermissions] = useState({
    sms: true,
    calls: true,
    contacts: true,
    notifications: true
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

  return (
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
  );
};

export default PermissionsCard;
