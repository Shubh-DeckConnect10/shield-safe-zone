
import { useAppContext } from "@/contexts/AppContext";
import HomePage from "@/components/HomePage";
import SmsScamDetection from "@/components/SmsScamDetection";
import CallScamMonitoring from "@/components/CallScamMonitoring";
import ScamEducationHub from "@/components/ScamEducationHub";
import EmergencyAssistance from "@/components/EmergencyAssistance";
import SettingsPage from "@/components/SettingsPage";
import AboutHelp from "@/components/AboutHelp";
import ThreatHistory from "@/components/ThreatHistory";

const AppContent = () => {
  const { currentPage, setProtectionStatus, darkMode, toggleDarkMode } = useAppContext();
  
  const renderPage = () => {
    switch(currentPage) {
      case "home":
        return <HomePage setProtectionStatus={setProtectionStatus} />;
      case "sms":
        return <SmsScamDetection />;
      case "call":
        return <CallScamMonitoring />;
      case "education":
        return <ScamEducationHub />;
      case "emergency":
        return <EmergencyAssistance />;
      case "settings":
        return <SettingsPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      case "about":
        return <AboutHelp />;
      case "history":
        return <ThreatHistory />;
      default:
        return <HomePage setProtectionStatus={setProtectionStatus} />;
    }
  };

  return (
    <main className="flex-1 transition-opacity duration-300 ease-in-out">
      {renderPage()}
    </main>
  );
};

export default AppContent;
