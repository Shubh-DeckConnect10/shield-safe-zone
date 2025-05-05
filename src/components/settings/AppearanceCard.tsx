
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AppearanceCardProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppearanceCard = ({ darkMode, toggleDarkMode }: AppearanceCardProps) => {
  return (
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
  );
};

export default AppearanceCard;
