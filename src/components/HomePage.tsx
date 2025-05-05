
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertCircle, Search, ArrowRight, TrendingUp, BookOpen, History } from "lucide-react";
import type { ProtectionStatus } from "@/types/app";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type HomePageProps = {
  setProtectionStatus: (status: ProtectionStatus) => void;
};

const HomePage = ({ setProtectionStatus }: HomePageProps) => {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startQuickScan = () => {
    setScanning(true);
    setScanProgress(0);
    
    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          toast.success("Quick scan completed!", {
            description: "No threats detected, you're safe!"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const statCards = [
    { title: "SMS Protected", value: 12, icon: <AlertCircle className="h-5 w-5 text-amber-500" /> },
    { title: "Calls Screened", value: 8, icon: <AlertCircle className="h-5 w-5 text-amber-500" /> },
    { title: "Security Level", value: "High", icon: <Shield className="h-5 w-5 text-green-500" /> }
  ];

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Protection Status Banner */}
        <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span>Protected</span>
              </div>
              <span className="text-sm font-normal text-green-600 dark:text-green-400">
                All systems active
              </span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Quick Scan Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={startQuickScan} 
            disabled={scanning}
            className="h-20 w-20 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white flex flex-col items-center justify-center gap-1"
          >
            <Search className={`h-7 w-7 ${scanning ? 'animate-pulse' : ''}`} />
            <span className="text-xs">Quick Scan</span>
          </Button>
        </div>
        
        {scanning && (
          <div className="space-y-2">
            <Progress value={scanProgress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              Scanning for threats... {scanProgress}%
            </p>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          {statCards.map((stat, i) => (
            <Card key={i} className="bg-card">
              <CardContent className="p-3 text-center">
                <div className="flex justify-center mb-1">
                  {stat.icon}
                </div>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shortcut Cards */}
        <div className="space-y-3">
          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="font-medium">Full System Scan</h3>
                    <p className="text-xs text-muted-foreground">Check all apps & messages</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Link to="/history">
            <Card className="bg-amber-50 dark:bg-amber-900/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <History className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    <div>
                      <h3 className="font-medium">Threat History</h3>
                      <p className="text-xs text-muted-foreground">View detected scam attempts</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-green-50 dark:bg-green-900/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <div>
                    <h3 className="font-medium">Stay Safe</h3>
                    <p className="text-xs text-muted-foreground">Learn how to avoid scams</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};

export default HomePage;
