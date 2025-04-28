
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

type CallStatus = "safe" | "suspicious" | "blocked";

interface CallRecord {
  id: string;
  number: string;
  date: string;
  status: CallStatus;
  duration?: string;
  reasons?: string[];
  detectedWords?: { word: string, count: number }[];
}

const CallScamMonitoring = () => {
  const { t } = useLanguage();
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  const [vibrationLevel, setVibrationLevel] = useState("medium");
  const [callRecords, setCallRecords] = useState<CallRecord[]>([
    {
      id: "call1",
      number: "+91 98765 43210",
      date: "Today, 12:30 PM",
      status: "suspicious",
      reasons: [
        "Caller used UPI-related vocabulary",
        "Matched pattern of known scam calls",
        "Caller asked for personal information"
      ],
      detectedWords: [
        { word: "UPI", count: 3 },
        { word: "verify", count: 2 },
        { word: "urgent", count: 1 }
      ]
    },
    {
      id: "call2",
      number: "+91 88123 45678",
      date: "Today, 10:15 AM",
      status: "suspicious",
      duration: "0:42",
      reasons: [
        "User opened banking app immediately after call",
        "Call duration matches typical scam pattern",
        "Caller used urgent language"
      ],
      detectedWords: [
        { word: "bank", count: 2 },
        { word: "account", count: 3 },
        { word: "urgent", count: 2 }
      ]
    },
    {
      id: "call3",
      number: "Fake Bank",
      date: "Yesterday, 3:20 PM",
      status: "suspicious",
      reasons: [
        "Caller impersonated a bank official",
        "Asked for OTP or password",
        "Used threatening language about account suspension"
      ],
      detectedWords: [
        { word: "OTP", count: 2 },
        { word: "suspend", count: 1 },
        { word: "immediate", count: 2 }
      ]
    },
    {
      id: "call4",
      number: "+91 77654 32109",
      date: "Yesterday, 11:05 AM",
      status: "safe",
      duration: "3:15",
      reasons: ["No suspicious patterns detected"]
    },
    {
      id: "call5",
      number: "Unknown",
      date: "2 days ago, 4:45 PM",
      status: "suspicious",
      duration: "1:03",
      reasons: [
        "Suspicious calling pattern",
        "Known scam number format",
        "Asked user to download remote access app"
      ],
      detectedWords: [
        { word: "download", count: 2 },
        { word: "access", count: 1 },
        { word: "control", count: 1 }
      ]
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
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{t("status.safe")}</Badge>;
      case "suspicious":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{t("status.suspicious")}</Badge>;
      case "blocked":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{t("status.blocked")}</Badge>;
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
                <span>{t("call.monitoring")}</span>
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
                ? t("call.active")
                : t("call.inactive")}
            </p>
            {isProtectionActive && (
              <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <p className="text-xs text-green-700 dark:text-green-400">
                    {t("call.monitored")} <span className="font-medium">12 {t("call.calls")}</span>
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
              <span>{t("call.settings")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("call.settings.desc")}
            </p>
            
            <RadioGroup value={vibrationLevel} onValueChange={handleChangeVibration}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">{t("call.vibration.low")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">{t("call.vibration.medium")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer">{t("call.vibration.high")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="off" id="r4" />
                <Label htmlFor="r4" className="cursor-pointer">{t("call.vibration.off")}</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Call History */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <span>{t("call.history")}</span>
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
                      {t("call.duration")} {call.duration}
                    </p>
                  )}
                  
                  {call.status === "suspicious" && (
                    <div className="mt-1 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-none">
                          <AccordionTrigger className="py-1 text-xs text-amber-700 dark:text-amber-400 hover:no-underline">
                            {t("call.flagged")}
                          </AccordionTrigger>
                          <AccordionContent>
                            {call.reasons && (
                              <ul className="text-xs text-amber-700 dark:text-amber-400 pl-2 space-y-1">
                                {call.reasons.map((reason, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <span className="h-1 w-1 rounded-full bg-current"></span>
                                    {reason}
                                  </li>
                                ))}
                              </ul>
                            )}
                            
                            {call.detectedWords && (
                              <div className="mt-2">
                                <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                                  {t("call.words")}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {call.detectedWords.map((word, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs bg-amber-100 text-amber-800 border-amber-300">
                                      {word.word} ({word.count})
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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
