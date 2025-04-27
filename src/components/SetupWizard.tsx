
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, AlertCircle, ArrowRight, MessageSquare, Phone, Bell, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type SetupStep = "intro" | "permissions" | "notifications" | "emergency" | "done";

interface SetupWizardProps {
  onComplete: () => void;
  onSkip: () => void;
}

const SetupWizard = ({ onComplete, onSkip }: SetupWizardProps) => {
  const [currentStep, setCurrentStep] = useState<SetupStep>("intro");
  const [permissions, setPermissions] = useState({
    sms: false,
    calls: false,
    notifications: false
  });
  
  const steps = ["intro", "permissions", "notifications", "emergency", "done"];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = (currentStepIndex / (steps.length - 1)) * 100;
  
  const handleNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex] as SetupStep);
    } else {
      onComplete();
    }
  };
  
  const grantPermission = (type: "sms" | "calls" | "notifications") => {
    // Simulate permission granting
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} permission granted`);
    setPermissions(prev => ({ ...prev, [type]: true }));
  };
  
  const renderStepContent = () => {
    switch(currentStep) {
      case "intro":
        return (
          <div className="space-y-6 text-center">
            <Shield className="h-16 w-16 mx-auto text-primary" />
            <h2 className="text-2xl font-bold">Welcome to Shield Safe Zone</h2>
            <p className="text-muted-foreground">
              Your protection against scams starts here. Let's set up your app for maximum security.
            </p>
            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Real-time protection</p>
                  <p className="text-sm text-muted-foreground">Monitors calls and messages</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Bell className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Instant alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified about potential scams</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Info className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Scam education</p>
                  <p className="text-sm text-muted-foreground">Learn about common scam techniques</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "permissions":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold">Required Permissions</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Shield Safe Zone needs access to certain features to protect you
              </p>
            </div>
            
            <Card className={`${permissions.sms ? "border-green-300 bg-green-50/50 dark:bg-green-900/10" : ""}`}>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <MessageSquare className={`h-6 w-6 ${permissions.sms ? "text-green-500" : "text-primary"}`} />
                  <div>
                    <p className="font-medium">SMS Access</p>
                    <p className="text-sm text-muted-foreground">For monitoring suspicious messages</p>
                  </div>
                </div>
                {permissions.sms ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Button onClick={() => grantPermission("sms")} size="sm" variant="outline">
                    Grant
                  </Button>
                )}
              </CardContent>
            </Card>
            
            <Card className={`${permissions.calls ? "border-green-300 bg-green-50/50 dark:bg-green-900/10" : ""}`}>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Phone className={`h-6 w-6 ${permissions.calls ? "text-green-500" : "text-primary"}`} />
                  <div>
                    <p className="font-medium">Call Access</p>
                    <p className="text-sm text-muted-foreground">For monitoring suspicious calls</p>
                  </div>
                </div>
                {permissions.calls ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Button onClick={() => grantPermission("calls")} size="sm" variant="outline">
                    Grant
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        );
        
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold">Enable Notifications</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Get instant alerts when potential scams are detected
              </p>
            </div>
            
            <Card className={`${permissions.notifications ? "border-green-300 bg-green-50/50 dark:bg-green-900/10" : ""}`}>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Bell className={`h-6 w-6 ${permissions.notifications ? "text-green-500" : "text-primary"}`} />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">For real-time scam alerts</p>
                  </div>
                </div>
                {permissions.notifications ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Button onClick={() => grantPermission("notifications")} size="sm" variant="outline">
                    Enable
                  </Button>
                )}
              </CardContent>
            </Card>
            
            <p className="text-sm text-muted-foreground text-center">
              You can always change notification settings later
            </p>
          </div>
        );
        
      case "emergency":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold">Emergency Contacts</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Add trusted contacts for emergency assistance
              </p>
            </div>
            
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                <p className="text-center text-sm">
                  In case you fall for a scam, we can alert your trusted contacts immediately
                </p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={() => {
                    toast.success("You can add emergency contacts later from the Emergency Assistance section");
                  }}
                >
                  Set Up Emergency Contacts
                </Button>
              </CardContent>
            </Card>
            
            <p className="text-sm text-muted-foreground text-center">
              You can skip this step and set up emergency contacts later
            </p>
          </div>
        );
        
      case "done":
        return (
          <div className="space-y-6 text-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 h-16 w-16 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold">Setup Complete!</h2>
            <p className="text-muted-foreground">
              You're now protected against scams. You can always adjust your settings later.
            </p>
            <div className="space-y-4">
              <p className="font-medium">What's next?</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <Shield className="h-5 w-5 text-primary" />
                  <p className="text-sm">Your protection is now active</p>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <p className="text-sm">SMS scam monitoring is enabled</p>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <Phone className="h-5 w-5 text-primary" />
                  <p className="text-sm">Call monitoring is ready</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-40 flex flex-col">
      <div className="relative flex-1 flex flex-col px-4 py-6 max-w-md mx-auto w-full justify-between">
        <div className="mb-4">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Setup wizard</span>
            <span>{currentStepIndex + 1} of {steps.length}</span>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          {renderStepContent()}
        </div>
        
        <div className="flex justify-between mt-8">
          {currentStep === "intro" ? (
            <Button variant="ghost" onClick={onSkip}>
              Skip setup
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => {
              const prevIndex = currentStepIndex - 1;
              if (prevIndex >= 0) {
                setCurrentStep(steps[prevIndex] as SetupStep);
              }
            }} disabled={currentStep === "intro"}>
              Back
            </Button>
          )}
          <Button onClick={handleNextStep} className="gap-2">
            {currentStep === "done" ? "Finish" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
