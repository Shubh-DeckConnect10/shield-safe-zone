
import { useState, useEffect } from "react";
import { Shield } from "lucide-react";

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing...");
  
  useEffect(() => {
    // Simulate loading process
    const messages = [
      "Initializing...",
      "Loading security protocols...",
      "Syncing scam database...",
      "Setting up protections..."
    ];
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        
        // Update loading message based on progress
        const messageIndex = Math.floor((prev / 100) * messages.length);
        setMessage(messages[Math.min(messageIndex, messages.length - 1)]);
        
        return prev + 2;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-primary flex flex-col items-center justify-center z-50">
      <div className="text-center space-y-6 p-4">
        <Shield className="h-24 w-24 text-white mx-auto pulse-animation" />
        
        <h1 className="text-2xl font-bold text-white">Shield Safe Zone</h1>
        
        <div className="w-64 bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-white/80 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
