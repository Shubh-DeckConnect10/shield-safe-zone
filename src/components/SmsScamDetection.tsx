
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Shield, Search, AlertOctagon, CheckCircle, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type RiskLevel = "low" | "medium" | "high";

interface SmsMessage {
  id: string;
  sender: string;
  message: string;
  date: string;
  riskLevel: RiskLevel;
}

const SmsScamDetection = () => {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  const [messages, setMessages] = useState<SmsMessage[]>([
    {
      id: "sms1",
      sender: "+91 98765 43210",
      message: "Your bank account has been compromised. Call immediately on this number to secure...",
      date: "10 min ago",
      riskLevel: "high"
    },
    {
      id: "sms2",
      sender: "BANKUPI",
      message: "Your UPI verification is pending. Please click on the following link to complete...",
      date: "Yesterday",
      riskLevel: "high"
    },
    {
      id: "sms3",
      sender: "+91 88123 45678",
      message: "Congratulations! You've won a special prize. Call now to claim your reward...",
      date: "2 days ago",
      riskLevel: "medium"
    },
    {
      id: "sms4",
      sender: "ADHAR",
      message: "Your Aadhaar card will be deactivated today. Please update your KYC by visiting...",
      date: "2 days ago",
      riskLevel: "high"
    }
  ]);

  const startScan = () => {
    setScanning(true);
    setScanProgress(0);
    
    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          toast.success("SMS scan completed!", {
            description: "All suspicious messages have been detected."
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const markSafe = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    toast.success("Message marked as safe", {
      description: "This message won't be flagged again."
    });
  };

  const reportScam = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    toast("Thank you for reporting", {
      description: "This helps protect the community."
    });
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    toast("Message deleted", {
      description: "The message has been removed from your list."
    });
  };

  const getRiskBadge = (riskLevel: RiskLevel) => {
    switch(riskLevel) {
      case "low":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low Risk</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium Risk</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Risk</Badge>;
    }
  };

  const toggleProtection = () => {
    setIsProtectionActive(!isProtectionActive);
    if (!isProtectionActive) {
      toast.success("SMS Protection Activated", {
        description: "You'll now be protected from SMS scams."
      });
    } else {
      toast.error("SMS Protection Deactivated", {
        description: "Warning: You won't be protected from SMS scams."
      });
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
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>SMS Protection</span>
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
                ? "SMS protection is active. We'll scan incoming messages for potential scams." 
                : "SMS protection is disabled. Enable it to detect scam messages."}
            </p>
          </CardContent>
        </Card>

        {/* Manual Scan */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                <span>Scan SMS Inbox</span>
              </div>
              <Button 
                onClick={startScan} 
                disabled={scanning}
                variant="outline"
                className="gap-2"
              >
                <Shield className="h-4 w-4" />
                Scan Now
              </Button>
            </div>
            
            {scanning && (
              <div className="mt-4 space-y-2">
                <Progress value={scanProgress} className="w-full" />
                <p className="text-center text-sm text-muted-foreground">
                  Scanning SMS... {scanProgress}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Flagged Messages */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-amber-500" />
            <span>Flagged Messages</span>
            <Badge variant="secondary" className="ml-2">{messages.length}</Badge>
          </h2>
          
          {messages.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <h3 className="text-xl font-medium">All Clear!</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  No suspicious messages detected in your inbox.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <Card key={message.id} className={
                  message.riskLevel === "high" ? "border-red-200 bg-red-50/50 dark:bg-red-900/10" : 
                  message.riskLevel === "medium" ? "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10" : 
                  "border-blue-200 bg-blue-50/50 dark:bg-blue-900/10"
                }>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{message.sender}</h3>
                        <p className="text-xs text-muted-foreground">{message.date}</p>
                      </div>
                      {getRiskBadge(message.riskLevel)}
                    </div>
                    <p className="text-sm">{message.message}</p>
                    <div className="flex gap-2 pt-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600"
                        onClick={() => markSafe(message.id)}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" /> Safe
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-amber-600"
                        onClick={() => reportScam(message.id)}
                      >
                        <AlertOctagon className="h-3 w-3 mr-1" /> Report
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <Trash className="h-3 w-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default SmsScamDetection;
