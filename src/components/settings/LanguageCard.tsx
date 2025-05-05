
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const LanguageCard = () => {
  const [language, setLanguage] = useState("english");
  
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    
    toast("Language updated", {
      description: `App language has been changed to ${lang.charAt(0).toUpperCase() + lang.slice(1)}.`
    });
  };

  return (
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
  );
};

export default LanguageCard;
