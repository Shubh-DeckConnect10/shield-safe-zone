
import { useIsMobile } from "@/hooks/use-mobile";
import { AppProvider } from "@/contexts/AppContext";
import { useAppContext } from "@/contexts/AppContext";
import AppHeader from "@/components/AppHeader";
import AppContent from "@/components/AppContent";
import LoadingScreen from "@/components/LoadingScreen";
import SetupWizard from "@/components/SetupWizard";

// Re-export types from the types file using 'export type'
export type { AppPage, ProtectionStatus } from "@/types/app";

const ScamShieldContent = () => {
  const { isLoading, showSetup, completeSetup, skipSetup, darkMode } = useAppContext();
  useIsMobile(); // Keep this hook for mobile detection

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => {}} />; // onLoadingComplete is handled in AppContext now
  }
  
  if (showSetup) {
    return <SetupWizard onComplete={completeSetup} onSkip={skipSetup} />;
  }

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <AppHeader />
      <AppContent />
    </div>
  );
};

const ScamShield = () => {
  return (
    <AppProvider>
      <ScamShieldContent />
    </AppProvider>
  );
};

export default ScamShield;
