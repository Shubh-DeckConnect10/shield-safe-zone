
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shieldsafezone.app',
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
