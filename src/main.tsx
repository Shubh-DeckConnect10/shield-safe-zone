
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Dynamically import Ionic PWA Elements to prevent build errors
const setupCapacitor = async () => {
  try {
    const { defineCustomElements } = await import('@ionic/pwa-elements/loader');
    // Initialize the web components for Capacitor
    defineCustomElements(window);
  } catch (error) {
    console.warn('Could not load PWA elements - continuing without them');
  }
};

// Initialize Capacitor elements
setupCapacitor();

createRoot(document.getElementById("root")!).render(<App />);
