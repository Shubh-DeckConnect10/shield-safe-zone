
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.924b94367bc147db98ce451bc45fe724',
  appName: 'shield-safe-zone',
  webDir: 'dist',
  server: {
    url: 'https://924b9436-7bc1-47db-98ce-451bc45fe724.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  // Add additional configuration options as needed
  android: {
    backgroundColor: "#FFFFFF"
  }
};

export default config;
