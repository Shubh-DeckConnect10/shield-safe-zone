
import { ScrollArea } from "@/components/ui/scroll-area";
import PermissionsCard from "./PermissionsCard";
import DatabaseSyncCard from "./DatabaseSyncCard";
import PrivacySettingsCard from "./PrivacySettingsCard";
import AppearanceCard from "./AppearanceCard";
import LanguageCard from "./LanguageCard";
import AboutAppCard from "./AboutAppCard";

interface SettingsPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsPage = ({ darkMode, toggleDarkMode }: SettingsPageProps) => {
  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-md mx-auto p-4 space-y-6">
        <PermissionsCard />
        <DatabaseSyncCard />
        <PrivacySettingsCard />
        <AppearanceCard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <LanguageCard />
        <AboutAppCard />
      </div>
    </ScrollArea>
  );
};

export default SettingsPage;
