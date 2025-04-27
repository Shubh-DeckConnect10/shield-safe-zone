
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Shield, AlertTriangle, CheckCircle, Settings, UserX } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type CallStatus = "safe" | "suspicious" | "blocked";

interface CallRecord {
  id: string;
  number: string;
  date: string;
  status: CallStatus;
  duration?: string;
}

const CallScamMonitoring = () => {
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  const [vibrationLevel, setVibrationLevel] = useState("medium");
  const [callRecords, setCallRecords] = useState<CallRecord[]>([
    {
      id: "call1",
      number: "+91 98765 43210",
      date: "Today, 12:30 PM",
      status: "blocked"
    },
    {
      id: "call2",
      number: "+91 88123 45678",
      date: "Today, 10:15 AM",
      status: "suspicious",
      duration: "0:42"
    },
    {
      id: "call3",
      number: "Fake Bank",
      date: "Yesterday, 3:20 PM",
      status: "blocked"
    },
    {
      id: "call4",
      number: "+91 77654 32109",
      date: "Yesterday, 11:05 AM",
      status: "safe",
      duration: "3:15"
    },
    {
      id: "call5",
      number: "Unknown",
      date: "2 days ago, 4:45 PM",
      status: "suspicious",
      duration: "1:03"
    }
  ]);

  const toggleProtection = () => {
    setIsProtectionActive(!isProtectionActive);
    if (!isProtectionActive) {
      toast.success("Call Protection Activated", {
        description: "You'll now be protected from scam calls."
      });
    } else {
      toast.error("Call Protection Deactivated", {
        description: "Warning: You won't be protected from scam calls."
      });
    }
  };

  const handleChangeVibration = (value: string) => {
    setVibrationLevel(value);
    toast.success("Vibration alert updated", {
      description: `Vibration level set to ${value}.`
    });
  };

  const getStatusIcon = (status: CallStatus) => {
    switch(status) {
      case "safe":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "suspicious":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "blocked":
        return <UserX className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: CallStatus) => {
    switch(status) {
      case "safe":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Safe</Badge>;
      case "suspicious":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Suspicious</Badge>;
      case "blocked":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Blocked</Badge>;
    }
  };

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Protection Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>Call Protection</span>
              </div>
              <Switch 
                checked={isProtectionActive} 
                onCheckedChange={toggleProtection}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {isProtectionActive 
                ? "Call protection is active. We'll screen incoming calls for potential scams." 
                : "Call protection is disabled. Enable it to detect scam calls."}
            </p>
            {isProtectionActive && (
              <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <p className="text-xs text-green-700 dark:text-green-400">
                    Protected: <span className="font-medium">12 calls</span> screened in the last 7 days
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vibration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Settings className="h-5 w-5 text-primary" />
              <span>Vibration Alert Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose how you want to be alerted when a suspicious call is detected
            </p>
            
            <RadioGroup value={vibrationLevel} onValueChange={handleChangeVibration}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">Low (gentle pulse)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">Medium (standard vibration)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer">High (strong alert)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="off" id="r4" />
                <Label htmlFor="r4" className="cursor-pointer">Off (visual alert only)</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Call History */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <span>Call History</span>
            <Badge variant="secondary" className="ml-2">{callRecords.length}</Badge>
          </h2>
          
          <div className="space-y-3">
            {callRecords.map((call) => (
              <Card key={call.id} className={
                call.status === "blocked" ? "border-red-200 bg-red-50/50 dark:bg-red-900/10" : 
                call.status === "suspicious" ? "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10" : 
                "border-green-200 bg-green-50/50 dark:bg-green-900/10"
              }>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {getStatusIcon(call.status)}
                        <span>{call.number}</span>
                      </h3>
                      <p className="text-xs text-muted-foreground">{call.date}</p>
                    </div>
                    {getStatusBadge(call.status)}
                  </div>
                  
                  {call.status !== "blocked" && call.duration && (
                    <p className="text-xs text-muted-foreground">
                      Duration: {call.duration}
                    </p>
                  )}
                  
                  {call.status === "suspicious" && (
                    <div className="mt-1 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        This call matched patterns of known scam calls. Exercise caution.
                      </p>
                    </div>
                  )}
                  
                  {call.status === "blocked" && (
                    <div className="mt-1 p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                      <p className="text-xs text-red-700 dark:text-red-400">
                        This call was blocked because it was identified as a potential scam.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default CallScamMonitoring;
