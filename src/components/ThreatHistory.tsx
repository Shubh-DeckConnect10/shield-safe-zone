
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, MessageSquare, Phone, Search, Filter, ArrowLeft, Calendar, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

type ThreatType = "sms" | "call";
type RiskLevel = "high" | "medium" | "low";

interface ThreatDetail {
  id: string;
  type: ThreatType;
  source: string;
  date: string;
  riskLevel: RiskLevel;
  content: string;
  reasons: string[];
  threatWords?: { word: string; count: number }[];
  feedback?: "safe" | "unsafe" | "uncertain";
}

const ThreatHistory = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRisk, setFilterRisk] = useState<RiskLevel | "all">("all");
  const [filterType, setFilterType] = useState<ThreatType | "all">("all");
  const navigate = useNavigate();
  
  const mockThreats: ThreatDetail[] = [
    {
      id: "threat1",
      type: "sms",
      source: "+91 98765 43210",
      date: "Today, 14:30",
      riskLevel: "high",
      content: "Your bank account has been compromised. Call immediately on this number to secure your account...",
      reasons: ["Detected phishing pattern", "Urgent action request", "Impersonating a bank"],
      threatWords: [
        { word: "bank", count: 2 },
        { word: "compromised", count: 1 },
        { word: "immediately", count: 1 },
      ]
    },
    {
      id: "threat2",
      type: "call",
      source: "Unknown",
      date: "Today, 11:15",
      riskLevel: "medium",
      content: "Suspicious call detected (2min 30s)",
      reasons: ["UPI-related words detected", "Unusual call pattern", "Known scammer format"],
      threatWords: [
        { word: "UPI", count: 3 },
        { word: "verify", count: 2 },
        { word: "urgent", count: 1 },
      ]
    },
    {
      id: "threat3",
      type: "sms",
      source: "BANKUPI",
      date: "Yesterday, 09:45",
      riskLevel: "high",
      content: "Your UPI verification is pending. Please click on the following link to complete...",
      reasons: ["Suspicious URL detected", "UPI verification scam pattern", "Unauthorized sender"],
      threatWords: [
        { word: "UPI", count: 1 },
        { word: "verification", count: 2 },
        { word: "click", count: 1 },
        { word: "link", count: 1 },
      ]
    },
    {
      id: "threat4",
      type: "call",
      source: "+91 77654 32109",
      date: "2 days ago, 16:20",
      riskLevel: "low",
      content: "Potential telemarketing call (1min 15s)",
      reasons: ["Known telemarketing pattern", "Non-urgent tone detected"],
      threatWords: [
        { word: "offer", count: 2 },
        { word: "promotion", count: 1 },
      ]
    },
  ];
  
  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case "high":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{t("high_risk")}</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{t("medium_risk")}</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{t("low_risk")}</Badge>;
    }
  };
  
  const getTypeIcon = (type: ThreatType) => {
    switch (type) {
      case "sms":
        return <MessageSquare className="h-5 w-5 text-primary" />;
      case "call":
        return <Phone className="h-5 w-5 text-primary" />;
    }
  };
  
  const filteredThreats = mockThreats.filter(threat => {
    if (searchQuery && !threat.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !threat.source.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (filterRisk !== "all" && threat.riskLevel !== filterRisk) {
      return false;
    }
    
    if (filterType !== "all" && threat.type !== filterType) {
      return false;
    }
    
    return true;
  });

  const submitFeedback = (id: string, feedback: "safe" | "unsafe" | "uncertain") => {
    toast.success(t("feedback_thanks"), {
      description: t("feedback_helps")
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">{t("threat_history")}</h1>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search_threats")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2">
                <p className="text-sm font-medium mb-1">{t("risk_level")}</p>
                <div className="grid grid-cols-2 gap-1">
                  <Button 
                    variant={filterRisk === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilterRisk("all")}
                    className="text-xs h-7"
                  >
                    {t("all")}
                  </Button>
                  <Button 
                    variant={filterRisk === "high" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilterRisk("high")}
                    className="text-xs h-7"
                  >
                    {t("high_risk")}
                  </Button>
                  <Button 
                    variant={filterRisk === "medium" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilterRisk("medium")}
                    className="text-xs h-7"
                  >
                    {t("medium_risk")}
                  </Button>
                  <Button 
                    variant={filterRisk === "low" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilterRisk("low")}
                    className="text-xs h-7"
                  >
                    {t("low_risk")}
                  </Button>
                </div>
                
                <p className="text-sm font-medium mb-1 mt-3">{t("threat_type")}</p>
                <div className="grid grid-cols-3 gap-1">
                  <Button 
                    variant={filterType === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilterType("all")}
                    className="text-xs h-7"
                  >
                    {t("all")}
                  </Button>
                  <Button 
                    variant={filterType === "sms" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilterType("sms")}
                    className="text-xs h-7"
                  >
                    {t("sms")}
                  </Button>
                  <Button 
                    variant={filterType === "call" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilterType("call")}
                    className="text-xs h-7"
                  >
                    {t("calls")}
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}}>{t("today")}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>{t("this_week")}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>{t("this_month")}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>{t("all_time")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredThreats.length} {filteredThreats.length === 1 ? t("threat_found") : t("threats_found")}
          </p>
          <Tabs defaultValue="all" className="w-auto">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">{t("all")}</TabsTrigger>
              <TabsTrigger value="sms">{t("sms")}</TabsTrigger>
              <TabsTrigger value="calls">{t("calls")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredThreats.length > 0 ? (
            filteredThreats.map(threat => (
              <Card key={threat.id} className={
                threat.riskLevel === "high" ? "border-red-200 bg-red-50/50 dark:bg-red-900/10" : 
                threat.riskLevel === "medium" ? "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10" : 
                "border-blue-200 bg-blue-50/50 dark:bg-blue-900/10"
              }>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(threat.type)}
                      <div>
                        <p className="font-medium">{threat.source}</p>
                        <p className="text-xs text-muted-foreground">{threat.date}</p>
                      </div>
                    </div>
                    {getRiskBadge(threat.riskLevel)}
                  </div>
                  
                  <p className="text-sm mb-3">{threat.content}</p>
                  
                  <div className="mt-2 space-y-2">
                    <p className="text-xs font-medium">{t("why_flagged")}</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {threat.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-current"></span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                    
                    {threat.threatWords && (
                      <div className="mt-3">
                        <p className="text-xs font-medium">{t("detected_threat")}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {threat.threatWords.map((word, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {word.word} ({word.count})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${threat.feedback === 'safe' ? 'bg-green-100' : ''}`}
                      onClick={() => submitFeedback(threat.id, 'safe')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> {t("safe")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${threat.feedback === 'unsafe' ? 'bg-red-100' : ''}`}
                      onClick={() => submitFeedback(threat.id, 'unsafe')}
                    >
                      <AlertTriangle className="h-4 w-4 mr-1" /> {t("unsafe")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${threat.feedback === 'uncertain' ? 'bg-yellow-100' : ''}`}
                      onClick={() => submitFeedback(threat.id, 'uncertain')}
                    >
                      <HelpCircle className="h-4 w-4 mr-1" /> {t("not_sure")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
              <h3 className="text-lg font-medium">{t("no_threats")}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("adjust_search")}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThreatHistory;
