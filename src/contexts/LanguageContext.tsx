
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define all supported languages
export type Language = 'english' | 'hindi' | 'telugu' | 'tamil';

// Create context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string; // Translation function
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get saved language preference or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'english';
  });
  
  // Update local storage when language changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  
  // Translation function
  const t = (key: string): string => {
    const translation = translations[language][key];
    // Fall back to English if translation not found
    if (!translation) return translations.english[key] || key;
    return translation;
  };

  // Apply language to HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language === 'english' ? 'en' : 
                                   language === 'hindi' ? 'hi' : 
                                   language === 'telugu' ? 'te' : 'ta';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations object
interface TranslationsType {
  [language: string]: {
    [key: string]: string;
  };
}

export const translations: TranslationsType = {
  english: {
    // App shell
    "app_name": "Shield Safe Zone",
    "version": "v1.0.0 Beta",
    
    // Menu items
    "menu_home": "Home",
    "menu_sms_detection": "SMS Detection",
    "menu_call_monitoring": "Call Monitoring",
    "menu_threat_history": "Threat History",
    "menu_scam_education": "Scam Education",
    "menu_emergency_help": "Emergency Help",
    "menu_settings": "Settings",
    "menu_about": "About/Help",
    
    // Protection status
    "protected": "Protected",
    "at_risk": "At Risk",
    "critical": "Critical",
    
    // Setup wizard
    "setup_welcome": "Welcome to Shield Safe Zone",
    "setup_intro": "Your protection against scams starts here. Let's set up your app for maximum security.",
    "setup_realtime": "Real-time protection",
    "setup_monitors": "Monitors calls and messages",
    "setup_instant": "Instant alerts",
    "setup_notifications": "Get notified about potential scams",
    "setup_education": "Scam education",
    "setup_learn": "Learn about common scam techniques",
    "setup_permissions": "Required Permissions",
    "setup_needs_access": "Shield Safe Zone needs access to certain features to protect you",
    "setup_sms_access": "SMS Access",
    "setup_sms_desc": "For monitoring suspicious messages",
    "setup_call_access": "Call Access",
    "setup_call_desc": "For monitoring suspicious calls",
    "setup_enable_notifications": "Enable Notifications",
    "setup_notifications_desc": "Get instant alerts when potential scams are detected",
    "setup_push_notifications": "Push Notifications",
    "setup_realtime_alerts": "For real-time scam alerts",
    "setup_change_later": "You can always change notification settings later",
    "setup_emergency": "Emergency Contacts",
    "setup_contacts_desc": "Add trusted contacts for emergency assistance",
    "setup_alert_contacts": "In case you fall for a scam, we can alert your trusted contacts immediately",
    "setup_add_contacts": "Set Up Emergency Contacts",
    "setup_skip_step": "You can skip this step and set up emergency contacts later",
    "setup_complete": "Setup Complete!",
    "setup_protected": "You're now protected against scams. You can always adjust your settings later.",
    "setup_whats_next": "What's next?",
    "setup_protection_active": "Your protection is now active",
    "setup_sms_monitoring": "SMS scam monitoring is enabled",
    "setup_call_monitoring": "Call monitoring is ready",
    "setup_wizard": "Setup wizard",
    "setup_step": "Setup step",
    "setup_of": "of",
    "skip_setup": "Skip setup",
    "back": "Back",
    "next": "Next",
    "finish": "Finish",
    "grant": "Grant",
    "enable": "Enable",
    
    // SMS Detection
    "sms_protection": "SMS Protection",
    "sms_protection_active": "SMS protection is active. We'll scan incoming messages for potential scams.",
    "sms_protection_disabled": "SMS protection is disabled. Enable it to detect scam messages.",
    "scan_sms": "Scan SMS Inbox",
    "scan_now": "Scan Now",
    "scanning_sms": "Scanning SMS...",
    "flagged_messages": "Flagged Messages",
    "all_clear": "All Clear!",
    "no_suspicious": "No suspicious messages detected in your inbox.",
    "why_flagged": "Why was this message flagged?",
    "detected_words": "Detected suspicious words:",
    "safe": "Safe",
    "report": "Report",
    "delete": "Delete",
    "low_risk": "Low Risk",
    "medium_risk": "Medium Risk", 
    "high_risk": "High Risk",
    
    // Alerts and notifications
    "shield_activated": "Shield Safe Zone activated!",
    "shield_protection": "You're now protected from scams.",
    "scan_completed": "SMS scan completed!",
    "all_suspicious": "All suspicious messages have been detected.",
    "message_safe": "Message marked as safe",
    "wont_flag": "This message won't be flagged again.",
    "thanks_reporting": "Thank you for reporting",
    "helps_community": "This helps protect the community.",
    "message_deleted": "Message deleted",
    "removed_list": "The message has been removed from your list.",
    "sms_activated": "SMS Protection Activated",
    "sms_protection_on": "You'll now be protected from SMS scams.",
    "sms_deactivated": "SMS Protection Deactivated",
    "warning": "Warning: You won't be protected from SMS scams.",
    "setup_completed": "Setup completed!",
    "now_protected": "You're now protected against scams.",
    "setup_skipped": "Setup skipped",
    "complete_later": "You can complete setup later in Settings.",
    
    // Settings
    "app_permissions": "App Permissions",
    "control_access": "Control what Shield Safe Zone can access",
    "sms_access": "SMS Access",
    "call_access": "Call Access",
    "contacts_access": "Contacts Access",
    "notifications": "Notifications",
    "scam_database": "Scam Database",
    "manage_updates": "Manage scam pattern updates",
    "background_sync": "Background Sync",
    "keep_updated": "Keep scam patterns up-to-date automatically",
    "sync_now": "Sync Now",
    "updating_database": "Updating database...",
    "last_updated": "Last updated:",
    "privacy_settings": "Privacy Settings",
    "local_processing": "Local Processing",
    "process_device": "Process scam detection on device only",
    "cloud_backup": "Cloud Backup",
    "backup_settings": "Backup settings and preferences",
    "appearance": "Appearance",
    "dark_mode": "Dark Mode",
    "theme_switch": "Switch between light and dark theme",
    "language": "Language",
    "feedback_thanks": "Thank you for your feedback",
    "feedback_helps": "Your input helps improve our detection system.",
    
    // Threat history
    "threat_history": "Threat History",
    "search_threats": "Search threats...",
    "risk_level": "Risk Level",
    "threat_type": "Threat Type",
    "threats_found": "threats found",
    "threat_found": "threat found",
    "all": "All",
    "sms": "SMS",
    "calls": "Calls",
    "today": "Today",
    "this_week": "This Week",
    "this_month": "This Month",
    "all_time": "All Time",
    "detected_threat": "Detected threat words:",
    "unsafe": "Unsafe",
    "not_sure": "Not Sure",
    "no_threats": "No threats found",
    "adjust_search": "Try adjusting your search or filters",
    
    // Additional keys needed for settings
    "permission_granted": "Permission granted",
    "permission_disabled": "Permission disabled",
    "permission_has_been": "permission has been",
    "enabled": "enabled",
    "disabled": "disabled",
    "sync_started": "Sync started",
    "database_updated": "Database updated",
    "updated": "updated"
  },
  
  hindi: {
    // App shell
    "app_name": "शील्ड सेफ़ ज़ोन",
    "version": "v1.0.0 बीटा",
    
    // Menu items
    "menu_home": "होम",
    "menu_sms_detection": "एसएमएस जांच",
    "menu_call_monitoring": "कॉल निगरानी",
    "menu_threat_history": "खतरा इतिहास",
    "menu_scam_education": "धोखाधड़ी शिक्षा",
    "menu_emergency_help": "आपातकालीन सहायता",
    "menu_settings": "सेटिंग्स",
    "menu_about": "जानकारी/मदद",
    
    // Protection status
    "protected": "सुरक्षित",
    "at_risk": "जोखिम में",
    "critical": "गंभीर",
    
    // Setup wizard
    "setup_welcome": "शील्ड सेफ़ ज़ोन में आपका स्वागत है",
    "setup_intro": "धोखाधड़ी से आपकी सुरक्षा यहां से शुरू होती है। अधिकतम सुरक्षा के लिए अपने ऐप को सेट करें।",
    "setup_realtime": "वास्तविक समय सुरक्षा",
    "setup_monitors": "कॉल और संदेशों की निगरानी करता है",
    "setup_instant": "तत्काल अलर्ट",
    "setup_notifications": "संभावित धोखाधड़ी के बारे में सूचित करें",
    "setup_education": "धोखाधड़ी शिक्षा",
    "setup_learn": "सामान्य धोखाधड़ी तकनीकों के बारे में जानें",
    "setup_permissions": "आवश्यक अनुमतियां",
    "setup_needs_access": "शील्ड सेफ़ ज़ोन को आपकी सुरक्षा के लिए कुछ सुविधाओं तक पहुंच की आवश्यकता है",
    "setup_sms_access": "एसएमएस पहुंच",
    "setup_sms_desc": "संदिग्ध संदेशों की निगरानी के लिए",
    "setup_call_access": "कॉल पहुंच",
    "setup_call_desc": "संदिग्ध कॉल की निगरानी के लिए",
    "setup_enable_notifications": "सूचनाएं सक्षम करें",
    "setup_notifications_desc": "संभावित धोखाधड़ी का पता चलने पर तुरंत अलर्ट प्राप्त करें",
    "setup_push_notifications": "पुश नोटिफिकेशन",
    "setup_realtime_alerts": "वास्तविक समय धोखाधड़ी अलर्ट के लिए",
    "setup_change_later": "आप हमेशा बाद में नोटिफिकेशन सेटिंग्स बदल सकते हैं",
    "setup_emergency": "आपातकालीन संपर्क",
    "setup_contacts_desc": "आपातकालीन सहायता के लिए विश्वसनीय संपर्क जोड़ें",
    "setup_alert_contacts": "यदि आप किसी धोखाधड़ी का शिकार होते हैं, तो हम तुरंत आपके विश्वसनीय संपर्कों को सचेत कर सकते हैं",
    "setup_add_contacts": "आपातकालीन संपर्क सेट करें",
    "setup_skip_step": "आप इस चरण को छोड़ सकते हैं और बाद में आपातकालीन संपर्क सेट कर सकते हैं",
    "setup_complete": "सेटअप पूरा!",
    "setup_protected": "अब आप धोखाधड़ी से सुरक्षित हैं। आप हमेशा बाद में अपनी सेटिंग्स समायोजित कर सकते हैं।",
    "setup_whats_next": "आगे क्या है?",
    "setup_protection_active": "आपकी सुरक्षा अब सक्रिय है",
    "setup_sms_monitoring": "एसएमएस धोखाधड़ी निगरानी सक्षम है",
    "setup_call_monitoring": "कॉल निगरानी तैयार है",
    "setup_wizard": "सेटअप विजार्ड",
    "setup_step": "सेटअप चरण",
    "setup_of": "का",
    "skip_setup": "सेटअप छोड़ें",
    "back": "पीछे",
    "next": "अगला",
    "finish": "समाप्त करें",
    "grant": "अनुमति दें",
    "enable": "सक्षम करें",
    
    // SMS Detection
    "sms_protection": "एसएमएस सुरक्षा",
    "sms_protection_active": "एसएमएस सुरक्षा सक्रिय है। हम संभावित धोखाधड़ी के लिए आने वाले संदेशों की जांच करेंगे।",
    "sms_protection_disabled": "एसएमएस सुरक्षा अक्षम है। धोखाधड़ी संदेशों का पता लगाने के लिए इसे सक्षम करें।",
    "scan_sms": "एसएमएस इनबॉक्स स्कैन करें",
    "scan_now": "अभी स्कैन करें",
    "scanning_sms": "एसएमएस स्कैन हो रहा है...",
    "flagged_messages": "फ्लैग किए गए संदेश",
    "all_clear": "सब साफ है!",
    "no_suspicious": "आपके इनबॉक्स में कोई संदिग्ध संदेश नहीं मिला।",
    "why_flagged": "यह संदेश फ्लैग क्यों किया गया?",
    "detected_words": "संदिग्ध शब्द पाए गए:",
    "safe": "सुरक्षित",
    "report": "रिपोर्ट",
    "delete": "हटाएँ",
    "low_risk": "कम जोखिम",
    "medium_risk": "मध्यम जोखिम", 
    "high_risk": "उच्च जोखिम",
    
    // Alerts and notifications
    "shield_activated": "शील्ड सेफ़ ज़ोन सक्रिय!",
    "shield_protection": "अब आप धोखाधड़ी से सुरक्षित हैं।",
    "scan_completed": "एसएमएस स्कैन पूरा!",
    "all_suspicious": "सभी संदिग्ध संदेशों का पता चल गया है।",
    "message_safe": "संदेश सुरक्षित के रूप में चिह्नित",
    "wont_flag": "इस संदेश को फिर से फ्लैग नहीं किया जाएगा।",
    "thanks_reporting": "रिपोर्ट करने के लिए धन्यवाद",
    "helps_community": "यह समुदाय को सुरक्षित रखने में मदद करता है।",
    "message_deleted": "संदेश हटा दिया गया",
    "removed_list": "संदेश आपकी सूची से हटा दिया गया है।",
    "sms_activated": "एसएमएस सुरक्षा सक्रिय",
    "sms_protection_on": "अब आप एसएमएस धोखाधड़ी से सुरक्षित रहेंगे।",
    "sms_deactivated": "एसएमएस सुरक्षा निष्क्रिय",
    "warning": "चेतावनी: आप एसएमएस धोखाधड़ी से सुरक्षित नहीं होंगे।",
    "setup_completed": "सेटअप पूरा!",
    "now_protected": "अब आप धोखाधड़ी से सुरक्षित हैं।",
    "setup_skipped": "सेटअप छोड़ा गया",
    "complete_later": "आप सेटिंग्स में बाद में सेटअप पूरा कर सकते हैं।",
    
    // Settings
    "app_permissions": "ऐप अनुमतियां",
    "control_access": "नियंत्रित करें कि शील्ड सेफ़ ज़ोन किस तक पहुंच सकता है",
    "sms_access": "एसएमएस पहुंच",
    "call_access": "कॉल पहुंच",
    "contacts_access": "संपर्क पहुंच",
    "notifications": "सूचनाएं",
    "scam_database": "धोखाधड़ी डेटाबेस",
    "manage_updates": "धोखाधड़ी पैटर्न अपडेट प्रबंधित करें",
    "background_sync": "पृष्ठभूमि सिंक",
    "keep_updated": "धोखाधड़ी पैटर्न स्वचालित रूप से अप-टू-डेट रखें",
    "sync_now": "अभी सिंक करें",
    "updating_database": "डेटाबेस अपडेट हो रहा है...",
    "last_updated": "अंतिम अपडेट:",
    "privacy_settings": "गोपनीयता सेटिंग्स",
    "local_processing": "स्थानीय प्रसंस्करण",
    "process_device": "धोखाधड़ी का पता केवल डिवाइस पर लगाएं",
    "cloud_backup": "क्लाउड बैकअप",
    "backup_settings": "सेटिंग्स और प्राथमिकताओं का बैकअप",
    "appearance": "उपस्थिति",
    "dark_mode": "डार्क मोड",
    "theme_switch": "लाइट और डार्क थीम के बीच स्विच करें",
    "language": "भाषा",
    "feedback_thanks": "आपकी प्रतिक्रिया के लिए धन्यवाद",
    "feedback_helps": "आपका इनपुट हमारी पहचान प्रणाली को बेहतर बनाने में मदद करता है।",
    
    // Threat history
    "threat_history": "खतरा इतिहास",
    "search_threats": "खतरे खोजें...",
    "risk_level": "जोखिम स्तर",
    "threat_type": "खतरे का प्रकार",
    "threats_found": "खतरे मिले",
    "threat_found": "खतरा मिला",
    "all": "सभी",
    "sms": "एसएमएस",
    "calls": "कॉल",
    "today": "आज",
    "this_week": "इस सप्ताह",
    "this_month": "इस महीने",
    "all_time": "हमेशा",
    "detected_threat": "पता लगाए गए खतरनाक शब्द:",
    "unsafe": "असुरक्षित",
    "not_sure": "निश्चित नहीं",
    "no_threats": "कोई खतरा नहीं मिला",
    "adjust_search": "अपनी खोज या फ़िल्टर समायोजित करें",
    
    // Additional keys needed for settings
    "permission_granted": "अनुमति दी गई",
    "permission_disabled": "अनुमति अक्षम की गई",
    "permission_has_been": "अनुमति",
    "enabled": "सक्षम की गई",
    "disabled": "अक्षम की गई",
    "sync_started": "सिंक शुरू हुआ",
    "database_updated": "डेटाबेस अपडेट किया गया",
    "updated": "अपडेट किया गया"
  },
  
  telugu: {
    // App shell
    "app_name": "షీల్డ్ సేఫ్ జోన్",
    "version": "v1.0.0 బీటా",
    
    // Menu items
    "menu_home": "హోమ్",
    "menu_sms_detection": "SMS గుర్తింపు",
    "menu_call_monitoring": "కాల్ మానిటరింగ్",
    "menu_threat_history": "ప్రమాద చరిత్ర",
    "menu_scam_education": "మోసాల విద్య",
    "menu_emergency_help": "అత్యవసర సహాయం",
    "menu_settings": "సెట్టింగ్‌లు",
    "menu_about": "గురించి/సహాయం",
    
    // Protection status
    "protected": "రక్షించబడింది",
    "at_risk": "ప్రమాదంలో",
    "critical": "క్లిష్టమైన",
    
    // Setup wizard
    "setup_welcome": "షీల్డ్ సేఫ్ జోన్‌కి స్వాగతం",
    "setup_intro": "మీ మోసాల నుండి రక్షణ ఇక్కడ ప్రారంభమవుతుంది. గరిష్ట భద్రత కోసం మీ యాప్‌ను సెటప్ చేద్దాం.",
    "setup_realtime": "రియల్-టైమ్ రక్షణ",
    "setup_monitors": "కాల్స్ మరియు మెసేజ్‌లను పర్యవేక్షిస్తుంది",
    "setup_instant": "తక్షణ హెచ్చరికలు",
    "setup_notifications": "సంభావ్య మోసాల గురించి తెలుసుకోండి",
    "setup_education": "మోసాల విద్య",
    "setup_learn": "సాధారణ మోసపు పద్ధతుల గురించి తెలుసుకోండి",
    "setup_permissions": "అవసరమైన అనుమతులు",
    "setup_needs_access": "మిమ్మల్ని రక్షించడానికి షీల్డ్ సేఫ్ జోన్‌కి కొన్ని ఫీచర్‌లకు యాక్సెస్ అవసరం",
    "setup_sms_access": "SMS యాక్సెస్",
    "setup_sms_desc": "అనుమానాస్పద సందేశాలను పర్యవేక్షించడానికి",
    "setup_call_access": "కాల్ యాక్సెస్",
    "setup_call_desc": "అనుమానాస్పద కాల్‌లను పర్యవేక్షించడానికి",
    "setup_enable_notifications": "నోటిఫికేషన్లను ఎనేబుల్ చేయండి",
    "setup_notifications_desc": "సంభావ్య మోసాలు గుర్తించినప్పుడు తక్షణ హెచ్చరికలను పొందండి",
    "setup_push_notifications": "పుష్ నోటిఫికేషన్లు",
    "setup_realtime_alerts": "రియల్-టైమ్ మోసం హెచ్చరికల కోసం",
    "setup_change_later": "మీరు ఎప్పుడైనా తర్వాత నోటిఫికేషన్ సెట్టింగ్‌లను మార్చవచ్చు",
    "setup_emergency": "అత్యవసర కాంటాక్ట్‌లు",
    "setup_contacts_desc": "అత్యవసర సహాయం కోసం నమ్మదగిన కాంటాక్ట్‌లను జోడించండి",
    "setup_alert_contacts": "మీరు మోసానికి గురైతే, మేము వెంటనే మీ నమ్మకమైన కాంటాక్ట్‌లకు హెచ్చరిక చేస్తాము",
    "setup_add_contacts": "అత్యవసర కాంటాక్ట్‌లను సెటప్ చేయండి",
    "setup_skip_step": "మీరు ఈ దశను దాటవేయవచ్చు మరియు తర్వాత అత్యవసర కాంటాక్ట్‌లను సెటప్ చేయవచ్చు",
    "setup_complete": "సెటప్ పూర్తయింది!",
    "setup_protected": "మీరు ఇప్పుడు మోసాల నుండి రక్షించబడ్డారు. మీరు ఎప్పుడైనా మీ సెట్టింగ్‌లను సర్దుబాటు చేయవచ్చు.",
    "setup_whats_next": "తర్వాత ఏమిటి?",
    "setup_protection_active": "మీ రక్షణ ఇప్పుడు యాక్టివ్‌గా ఉంది",
    "setup_sms_monitoring": "SMS మోసం మానిటరింగ్ ఎనేబుల్ చేయబడింది",
    "setup_call_monitoring": "కాల్ మానిటరింగ్ సిద్ధంగా ఉంది",
    "setup_wizard": "సెటప్ విజార్డ్",
    "setup_step": "సెటప్ దశ",
    "setup_of": "యొక్క",
    "skip_setup": "సెటప్‌ని దాటవేయి",
    "back": "వెనుకకు",
    "next": "తరువాత",
    "finish": "పూర్తి",
    "grant": "మంజూరు",
    "enable": "ఎనేబుల్",
    
    // SMS Detection
    "sms_protection": "SMS రక్షణ",
    "sms_protection_active": "SMS రక్షణ సక్రియంగా ఉంది. మేము సంభావ్య మోసాల కోసం వచ్చే సందేశాలను స్కాన్ చేస్తాము.",
    "sms_protection_disabled": "SMS రక్షణ నిలిపివేయబడింది. మోసపు సందేశాలను గుర్తించడానికి దీన్ని ఎనేబుల్ చేయండి.",
    "scan_sms": "SMS ఇన్‌బాక్స్‌ను స్కాన్ చేయండి",
    "scan_now": "ఇప్పుడే స్కాన్ చేయండి",
    "scanning_sms": "SMS స్కానింగ్...",
    "flagged_messages": "ఫ్లాగ్ చేయబడిన సందేశాలు",
    "all_clear": "అన్నీ క్లియర్!",
    "no_suspicious": "మీ ఇన్‌బాక్స్‌లో అనుమానాస్పద సందేశాలు ఏవీ గుర్తించబడలేదు.",
    "why_flagged": "ఈ సందేశం ఎందుకు ఫ్లాగ్ చేయబడింది?",
    "detected_words": "అనుమానాస్పద పదాలు గుర్తించబడ్డాయి:",
    "safe": "సురక్షితం",
    "report": "నివేదించండి",
    "delete": "తొలగించండి",
    "low_risk": "తక్కువ ప్రమాదం",
    "medium_risk": "మధ్యస్థ ప్రమాదం", 
    "high_risk": "అధిక ప్రమాదం",
    
    // Alerts and notifications
    "shield_activated": "షీల్డ్ సేఫ్ జోన్ యాక్టివేట్ చేయబడింది!",
    "shield_protection": "మీరు ఇప్పుడు మోసాల నుండి రక్షించబడ్డారు.",
    "scan_completed": "SMS స్కాన్ పూర్తయింది!",
    "all_suspicious": "అన్ని అనుమానాస్పద సందేశాలు గుర్తించబడ్డాయి.",
    "message_safe": "సందేశం సురక్షితంగా గుర్తించబడింది",
    "wont_flag": "ఈ సందేశం మళ్ళీ ఫ్లాగ్ చేయబడదు.",
    "thanks_reporting": "నివేదించినందుకు ధన్యవాదాలు",
    "helps_community": "ఇది సమాజాన్ని రక్షించడానికి సహాయపడుతుంది.",
    "message_deleted": "సందేశం తొలగించబడింది",
    "removed_list": "సందేశం మీ జాబితా నుండి తొలగించబడింది.",
    "sms_activated": "SMS రక్షణ యాక్టివేట్ చేయబడింది",
    "sms_protection_on": "మీరు ఇప్పుడు SMS మోసాల నుండి రక్షించబడతారు.",
    "sms_deactivated": "SMS రక్షణ నిలిపివేయబడింది",
    "warning": "హెచ్చరిక: మీరు SMS మోసాల నుండి రక్షించబడరు.",
    "setup_completed": "సెటప్ పూర్తయింది!",
    "now_protected": "మీరు ఇప్పుడు మోసాల నుండి రక్షించబడ్డారు.",
    "setup_skipped": "సెటప్ దాటవేయబడింది",
    "complete_later": "మీరు సెట్టింగ్‌లలో తర్వాత సెటప్‌ను పూర్తి చేయవచ్చు.",
    
    // Settings
    "app_permissions": "యాప్ అనుమతులు",
    "control_access": "షీల్డ్ సేఫ్ జోన్ దేనికి యాక్సెస్ చేయగలదో నియంత్రించండి",
    "sms_access": "SMS యాక్సెస్",
    "call_access": "కాల్ యాక్సెస్",
    "contacts_access": "కాంటాక్ట్స్ యాక్సెస్",
    "notifications": "నోటిఫికేషన్లు",
    "scam_database": "మోసం డేటాబేస్",
    "manage_updates": "మోసం పాటర్న్ అప్‌డేట్‌లను నిర్వహించండి",
    "background_sync": "బ్యాక్‌గ్రౌండ్ సింక్",
    "keep_updated": "మోసం పాటర్న్‌లను స్వయంచాలకంగా అప్-టు-డేట్‌గా ఉంచండి",
    "sync_now": "ఇప్పుడే సింక్ చేయండి",
    "updating_database": "డేటాబేస్ అప్‌డేట్ అవుతోంది...",
    "last_updated": "చివరిగా అప్‌డేట్ చేయబడింది:",
    "privacy_settings": "ప్రైవసీ సెట్టింగ్‌లు",
    "local_processing": "స్థానిక ప్రాసెసింగ్",
    "process_device": "మోసం గుర్తింపును పరికరంలో మాత్రమే ప్రాసెస్ చేయండి",
    "cloud_backup": "క్లౌడ్ బ్యాకప్",
    "backup_settings": "సెట్టింగ్‌లు మరియు ప్రాధాన్యతల బ్యాకప్",
    "appearance": "అప్పియరెన్స్",
    "dark_mode": "డార్క్ మోడ్",
    "theme_switch": "లైట్ మరియు డార్క్ థీమ్ మధ్య మార్చండి",
    "language": "భాష",
    "feedback_thanks": "మీ అభిప్రాయానికి ధన్యవాదాలు",
    "feedback_helps": "మీ ఇన్‌పుట్ మా గుర్తింపు వ్యవస్థను మెరుగుపరచడానికి సహాయపడుతుంది.",
    
    // Threat history
    "threat_history": "ప్రమాద చరిత్ర",
    "search_threats": "ప్రమాదాలను శోధించండి...",
    "risk_level": "ప్రమాద స్థాయి",
    "threat_type": "ప్రమాద రకం",
    "threats_found": "ప్రమాదాలు కనుగొనబడ్డాయి",
    "threat_found": "ప్రమాదం కనుగొనబడింది",
    "all": "అన్నీ",
    "sms": "SMS",
    "calls": "కాల్స్",
    "today": "నేడు",
    "this_week": "ఈ వారం",
    "this_month": "ఈ నెల",
    "all_time": "ఎల్లప్పుడూ",
    "detected_threat": "గుర్తించబడిన ప్రమాదకరమైన పదాలు:",
    "unsafe": "అసురక్షితం",
    "not_sure": "ఖచ్చితంగా తెలియదు",
    "no_threats": "ప్రమాదాలు ఏవీ కనుగొనబడలేదు",
    "adjust_search": "మీ శోధన లేదా ఫిల్టర్లను సర్దుబాటు చేయడానికి ప్రయత్నించండి",
    
    // Additional keys needed for settings
    "permission_granted": "అనుమతి ఇవ్వబడింది",
    "permission_disabled": "అనుమతి నిలిపివేయబడింది",
    "permission_has_been": "అనుమతి",
    "enabled": "ఎనేబుల్ చేయబడింది",
    "disabled": "డిసేబుల్ చేయబడింది",
    "sync_started": "సింక్ ప్రారంభించబడింది",
    "database_updated": "డేటాబేస్ అప్డేట్ చేయబడింది",
    "updated": "అప్డేట్ చేయబడింది"
  },
  
  tamil: {
    // App shell
    "app_name": "ஷீல்ட் சேஃப் ஜோன்",
    "version": "v1.0.0 பீட்டா",
    
    // Menu items
    "menu_home": "முகப்பு",
    "menu_sms_detection": "SMS கண்டறிதல்",
    "menu_call_monitoring": "அழைப்பு கண்காணிப்பு",
    "menu_threat_history": "அச்சுறுத்தல் வரலாறு",
    "menu_scam_education": "மோசடி கல்வி",
    "menu_emergency_help": "அவசர உதவி",
    "menu_settings": "அமைப்புகள்",
    "menu_about": "பற்றி/உதவி",
    
    // Protection status
    "protected": "பாதுகாக்கப்பட்டது",
    "at_risk": "ஆபத்தில் உள்ளது",
    "critical": "முக்கியமானது",
    
    // Setup wizard
    "setup_welcome": "ஷீல்ட் சேஃப் ஜோனுக்கு வரவேற்கிறோம்",
    "setup_intro": "மோசடிகளுக்கு எதிரான உங்கள் பாதுகாப்பு இங்கே தொடங்குகிறது. அதிகபட்ச பாதுகாப்புக்காக உங்கள் பயன்பாட்டை அமைக்கலாம்.",
    "setup_realtime": "உண்மை நேர பாதுகாப்பு",
    "setup_monitors": "அழைப்புகள் மற்றும் செய்திகளை கண்காணிக்கும்",
    "setup_instant": "உடனடி எச்சரிக்கைகள்",
    "setup_notifications": "சாத்தியமான மோசடிகள் பற்றி அறிவிக்கப்படும்",
    "setup_education": "மோசடி கல்வி",
    "setup_learn": "பொதுவான மோசடி நுட்பங்களைப் பற்றி அறிக",
    "setup_permissions": "தேவையான அனுமதிகள்",
    "setup_needs_access": "உங்களைப் பாதுகாக்க ஷீல்ட் சேஃப் ஜோனுக்கு சில அம்சங்களை அணுக வேண்டியுள்ளது",
    "setup_sms_access": "SMS அணுகல்",
    "setup_sms_desc": "சந்தேகத்திற்குரிய செய்திகளை கண்காணிக்க",
    "setup_call_access": "அழைப்பு அணுகல்",
    "setup_call_desc": "சந்தேகத்திற்குரிய அழைப்புகளை கண்காணிக்க",
    "setup_enable_notifications": "அறிவிப்புகளை இயக்கவும்",
    "setup_notifications_desc": "சாத்தியமான மோசடிகள் கண்டறியப்படும்போது உடனடி எச்சரிக்கைகளைப் பெறுங்கள்",
    "setup_push_notifications": "புஷ் அறிவிப்புகள்",
    "setup_realtime_alerts": "உண்மை நேர மோசடி எச்சரிக்கைகளுக்கு",
    "setup_change_later": "நீங்கள் எப்போது வேண்டுமானாலும் அறிவிப்பு அமைப்புகளை மாற்றலாம்",
    "setup_emergency": "அவசர தொடர்புகள்",
    "setup_contacts_desc": "அவசர உதவிக்கு நம்பகமான தொடர்புகளைச் சேர்க்கவும்",
    "setup_alert_contacts": "நீங்கள் மோசடிக்கு ஆளாகும் பட்சத்தில், நாங்கள் உங்கள் நம்பகமான தொடர்புகளுக்கு உடனடியாக எச்சரிக்கை செய்ய முடியும்",
    "setup_add_contacts": "அவசர தொடர்புகளை அமைக்கவும்",
    "setup_skip_step": "இந்த படியைத் தவிர்த்து பின்னர் அவசர தொடர்புகளை அமைக்கலாம்",
    "setup_complete": "அமைப்பு முடிந்தது!",
    "setup_protected": "நீங்கள் இப்போது மோசடிகளிலிருந்து பாதுகாக்கப்படுகிறீர்கள். நீங்கள் எப்போது வேண்டுமானாலும் உங்கள் அமைப்புகளை சரிசெய்யலாம்.",
    "setup_whats_next": "அடுத்து என்ன?",
    "setup_protection_active": "உங்கள் பாதுகாப்பு இப்போது செயலில் உள்ளது",
    "setup_sms_monitoring": "SMS மோசடி கண்காணிப்பு இயக்கப்பட்டுள்ளது",
    "setup_call_monitoring": "அழைப்பு கண்காணிப்பு தயாராக உள்ளது",
    "setup_wizard": "அமைப்பு வழிகாட்டி",
    "setup_step": "அமைப்பு படி",
    "setup_of": "இல்",
    "skip_setup": "அமைப்பை தவிர்",
    "back": "பின்",
    "next": "அடுத்து",
    "finish": "முடிக்க",
    "grant": "வழங்க",
    "enable": "இயக்கு",
    
    // SMS Detection
    "sms_protection": "SMS பாதுகாப்பு",
    "sms_protection_active": "SMS பாதுகாப்பு செயலில் உள்ளது. சாத்தியமான மோசடிகளுக்கு வரும் செய்திகளை நாங்கள் ஸ்கேன் செய்வோம்.",
    "sms_protection_disabled": "SMS பாதுகாப்பு முடக்கப்பட்டுள்ளது. மோசடி செய்திகளைக் கண்டறிய அதை இயக்கவும்.",
    "scan_sms": "SMS இன்பாக்ஸை ஸ்கேன் செய்யவும்",
    "scan_now": "இப்போது ஸ்கேன் செய்யவும்",
    "scanning_sms": "SMS ஸ்கேன் செய்கிறது...",
    "flagged_messages": "குறியிடப்பட்ட செய்திகள்",
    "all_clear": "அனைத்தும் தெளிவாக உள்ளது!",
    "no_suspicious": "உங்கள் இன்பாக்ஸில் சந்தேகத்திற்குரிய செய்திகள் எதுவும் கண்டறியப்படவில்லை.",
    "why_flagged": "இந்த செய்தி ஏன் குறியிடப்பட்டது?",
    "detected_words": "சந்தேகத்திற்குரிய சொற்கள் கண்டறியப்பட்டன:",
    "safe": "பாதுகாப்பானது",
    "report": "புகார் செய்",
    "delete": "நீக்கு",
    "low_risk": "குறைந்த ஆபத்து",
    "medium_risk": "நடுத்தர ஆபத்து", 
    "high_risk": "அதிக ஆபத்து",
    
    // Alerts and notifications
    "shield_activated": "ஷீல்ட் சேஃப் ஜோன் செயல்படுத்தப்பட்டது!",
    "shield_protection": "நீங்கள் இப்போது மோசடிகளிலிருந்து பாதுகாக்கப்படுகிறீர்கள்.",
    "scan_completed": "SMS ஸ்கேன் முடிந்தது!",
    "all_suspicious": "அனைத்து சந்தேகத்திற்குரிய செய்திகளும் கண்டறியப்பட்டன.",
    "message_safe": "செய்தி பாதுகாப்பானதாக குறிக்கப்பட்டுள்ளது",
    "wont_flag": "இந்த செய்தி மீண்டும் குறியிடப்படாது.",
    "thanks_reporting": "புகார் செய்ததற்கு நன்றி",
    "helps_community": "இது சமூகத்தைப் பாதுகாக்க உதவுகிறது.",
    "message_deleted": "செய்தி நீக்கப்பட்டது",
    "removed_list": "செய்தி உங்கள் பட்டியலிலிருந்து நீக்கப்பட்டது.",
    "sms_activated": "SMS பாதுகாப்பு செயல்படுத்தப்பட்டது",
    "sms_protection_on": "இப்போது நீங்கள் SMS மோசடிகளிலிருந்து பாதுகாக்கப்படுவீர்கள்.",
    "sms_deactivated": "SMS பாதுகாப்பு முடக்கப்பட்டது",
    "warning": "எச்சரிக்கை: நீங்கள் SMS மோசடிகளிலிருந்து பாதுகாக்கப்படமாட்டீர்கள்.",
    "setup_completed": "அமைப்பு முடிந்தது!",
    "now_protected": "நீங்கள் இப்போது மோசடிகளிலிருந்து பாதுகாக்கப்படுகிறீர்கள்.",
    "setup_skipped": "அமைப்பு தவிர்க்கப்பட்டது",
    "complete_later": "நீங்கள் அமைப்புகளில் பின்னர் அமைப்பை முடிக்கலாம்.",
    
    // Settings
    "app_permissions": "பயன்பாட்டு அனுமதிகள்",
    "control_access": "ஷீல்ட் சேஃப் ஜோன் எதை அணுக முடியும் என்பதைக் கட்டுப்படுத்தவும்",
    "sms_access": "SMS அணுகல்",
    "call_access": "அழைப்பு அணுகல்",
    "contacts_access": "தொடர்புகள் அணுகல்",
    "notifications": "அறிவிப்புகள்",
    "scam_database": "மோசடி தரவுத்தளம்",
    "manage_updates": "மோசடி முறைகள் புதுப்பிப்புகளை நிர்வகிக்கவும்",
    "background_sync": "பின்னணி ஒத்திசைவு",
    "keep_updated": "மோசடி முறைகளை தானாகவே புதுப்பித்த நிலையில் வைத்திருக்கவும்",
    "sync_now": "இப்போது ஒத்திசைக்கவும்",
    "updating_database": "தரவுத்தளம் புதுப்பிக்கப்படுகிறது...",
    "last_updated": "கடைசியாக புதுப்பிக்கப்பட்டது:",
    "privacy_settings": "தனியுரிமை அமைப்புகள்",
    "local_processing": "உள்ளூர் செயலாக்கம்",
    "process_device": "மோசடி கண்டறிதலை சாதனத்தில் மட்டுமே செயலாக்கவும்",
    "cloud_backup": "கிளவுட் பேக்கப்",
    "backup_settings": "அமைப்புகள் மற்றும் விருப்பத்தேர்வுகளின் காப்புப்பிரதி",
    "appearance": "தோற்றம்",
    "dark_mode": "இருண்ட பயன்முறை",
    "theme_switch": "இலேசான மற்றும் இருண்ட தீம்களுக்கு இடையே மாறவும்",
    "language": "மொழி",
    "feedback_thanks": "உங்கள் கருத்துக்கு நன்றி",
    "feedback_helps": "உங்கள் உள்ளீடு எங்கள் கண்டறிதல் அமைப்பை மேம்படுத்த உதவுகிறது.",
    
    // Threat history
    "threat_history": "அச்சுறுத்தல் வரலாறு",
    "search_threats": "அச்சுறுத்தல்களைத் தேடு...",
    "risk_level": "ஆபத்து நிலை",
    "threat_type": "அச்சுறுத்தல் வகை",
    "threats_found": "அச்சுறுத்தல்கள் கண்டுபிடிக்கப்பட்டன",
    "threat_found": "அச்சுறுத்தல் கண்டுபிடிக்கப்பட்டது",
    "all": "அனைத்தும்",
    "sms": "SMS",
    "calls": "அழைப்புகள்",
    "today": "இன்று",
    "this_week": "இந்த வாரம்",
    "this_month": "இந்த மாதம்",
    "all_time": "எல்லா நேரமும்",
    "detected_threat": "கண்டறியப்பட்ட அச்சுறுத்தல் சொற்கள்:",
    "unsafe": "பாதுகாப்பற்றது",
    "not_sure": "உறுதியாக தெரியவில்லை",
    "no_threats": "அச்சுறுத்தல்கள் எதுவும் கண்டுபிடிக்கப்படவில்லை",
    "adjust_search": "உங்கள் தேடலை அல்லது வடிப்பான்களை சரிசெய்ய முயற்சிக்கவும்",
    
    // Additional keys needed for settings
    "permission_granted": "அனுமதி வழங்கப்பட்டது",
    "permission_disabled": "அனுமதி முடக்கப்பட்டது",
    "permission_has_been": "அனுமதி",
    "enabled": "இயக்கப்பட்டது",
    "disabled": "முடக்கப்பட்டது",
    "sync_started": "ஒத்திசைவு தொடங்கியது",
    "database_updated": "தரவுத்தளம் புதுப்பிக்கப்பட்டது",
    "updated": "புதுப்பிக்கப்பட்டது"
  }
};

