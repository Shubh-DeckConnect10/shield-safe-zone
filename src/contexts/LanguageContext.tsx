
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type Language = 'english' | 'hindi' | 'telugu' | 'tamil';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

interface Translations {
  [key: string]: {
    english: string;
    hindi: string;
    telugu: string;
    tamil: string;
  };
}

const translations: Translations = {
  // App General
  "app_name": {
    english: "Shield Safe Zone",
    hindi: "शील्ड सेफ ज़ोन",
    telugu: "షీల్డ్ సేఫ్ జోన్",
    tamil: "ஷீல்ட் சேஃப் ஜோன்"
  },
  "version": {
    english: "Version 1.0.0",
    hindi: "संस्करण 1.0.0",
    telugu: "వెర్షన్ 1.0.0",
    tamil: "பதிப்பு 1.0.0"
  },
  
  // Menu Items
  "menu_home": {
    english: "Home",
    hindi: "होम",
    telugu: "హోమ్",
    tamil: "முகப்பு"
  },
  "menu_sms_detection": {
    english: "SMS Scam Detection",
    hindi: "एसएमएस स्कैम पहचान",
    telugu: "ఎస్ఎంఎస్ స్కామ్ డిటెక్షన్",
    tamil: "எஸ்எம்எஸ் மோசடி கண்டறிதல்"
  },
  "menu_call_monitoring": {
    english: "Call Scam Monitoring",
    hindi: "कॉल स्कैम मॉनिटरिंग",
    telugu: "కాల్ స్కామ్ మానిటరింగ్",
    tamil: "அழைப்பு மோசடி கண்காணிப்பு"
  },
  "menu_threat_history": {
    english: "Threat History",
    hindi: "खतरा इतिहास",
    telugu: "ప్రమాద చరిత్ర",
    tamil: "அச்சுறுத்தல் வரலாறு"
  },
  "menu_scam_education": {
    english: "Scam Education",
    hindi: "स्कैम शिक्षा",
    telugu: "స్కామ్ విద్య",
    tamil: "மோசடி கல்வி"
  },
  "menu_emergency_help": {
    english: "Emergency Help",
    hindi: "आपातकालीन सहायता",
    telugu: "అత్యవసర సహాయం",
    tamil: "அவசர உதவி"
  },
  "menu_settings": {
    english: "Settings",
    hindi: "सेटिंग्स",
    telugu: "సెట్టింగ్‌లు",
    tamil: "அமைப்புகள்"
  },
  "menu_about": {
    english: "About & Help",
    hindi: "जानकारी और सहायता",
    telugu: "గురించి & సహాయం",
    tamil: "பற்றி & உதவி"
  },
  
  // Home Page
  "protected": {
    english: "Protected",
    hindi: "सुरक्षित",
    telugu: "రక్షించబడింది",
    tamil: "பாதுகாக்கப்பட்டது"
  },
  "all_systems_active": {
    english: "All systems active",
    hindi: "सभी सिस्टम सक्रिय",
    telugu: "అన్ని సిస్టమ్‌లు యాక్టివ్",
    tamil: "அனைத்து சிஸ்டம்களும் செயலில்"
  },
  "quick_scan": {
    english: "Quick Scan",
    hindi: "त्वरित स्कैन",
    telugu: "త్వరిత స్కాన్",
    tamil: "விரைவு ஸ்கேன்"
  },
  "scanning_for_threats": {
    english: "Scanning for threats...",
    hindi: "खतरों के लिए स्कैन किया जा रहा है...",
    telugu: "ముప్పుల కోసం స్కాన్ చేస్తోంది...",
    tamil: "அச்சுறுத்தல்களை ஸ்கேன் செய்கிறது..."
  },
  "sms_protected": {
    english: "SMS Protected",
    hindi: "एसएमएस सुरक्षित",
    telugu: "ఎస్ఎంఎస్ రక్షించబడింది",
    tamil: "எஸ்எம்எஸ் பாதுகாக்கப்பட்டது"
  },
  "calls_screened": {
    english: "Calls Screened",
    hindi: "कॉल स्क्रीन किए गए",
    telugu: "కాల్స్ స్క్రీన్ చేయబడ్డాయి",
    tamil: "அழைப்புகள் திரையிடப்பட்டது"
  },
  "security_level": {
    english: "Security Level",
    hindi: "सुरक्षा स्तर",
    telugu: "భద్రతా స్థాయి",
    tamil: "பாதுகாப்பு நிலை"
  },
  "high": {
    english: "High",
    hindi: "उच्च",
    telugu: "అధికం",
    tamil: "உயர்"
  },
  "medium": {
    english: "Medium",
    hindi: "मध्यम",
    telugu: "మధ్యస్థం",
    tamil: "நடுத்தர"
  },
  "low": {
    english: "Low",
    hindi: "निम्न",
    telugu: "తక్కువ",
    tamil: "குறைந்த"
  },
  "full_system_scan": {
    english: "Full System Scan",
    hindi: "पूर्ण सिस्टम स्कैन",
    telugu: "పూర్తి సిస్టమ్ స్కాన్",
    tamil: "முழு சிஸ்டம் ஸ்கேன்"
  },
  "check_all_apps_messages": {
    english: "Check all apps & messages",
    hindi: "सभी ऐप्स और संदेश जांचें",
    telugu: "అన్ని యాప్‌లు & సందేశాలను తనిఖీ చేయండి",
    tamil: "அனைத்து ஆப்ஸ் & செய்திகளையும் சரிபார்க்கவும்"
  },
  "threat_history": {
    english: "Threat History",
    hindi: "खतरा इतिहास",
    telugu: "ప్రమాద చరిత్ర",
    tamil: "அச்சுறுத்தல் வரலாறு"
  },
  "view_detected_scam_attempts": {
    english: "View detected scam attempts",
    hindi: "पता लगाए गए स्कैम प्रयासों को देखें",
    telugu: "గుర్తించబడిన స్కామ్ ప్రయత్నాలను వీక్షించండి",
    tamil: "கண்டறியப்பட்ட மோசடி முயற்சிகளைப் பார்க்கவும்"
  },
  "stay_safe": {
    english: "Stay Safe",
    hindi: "सुरक्षित रहें",
    telugu: "సురక్షితంగా ఉండండి",
    tamil: "பாதுகாப்பாக இருங்கள்"
  },
  "learn_how_to_avoid_scams": {
    english: "Learn how to avoid scams",
    hindi: "स्कैम से कैसे बचें यह जानें",
    telugu: "స్కామ్‌లను ఎలా నివారించాలో నేర్చుకోండి",
    tamil: "மோசடிகளைத் தவிர்க்க எப்படி என்று அறிக"
  },
  "quick_scan_completed": {
    english: "Quick scan completed!",
    hindi: "त्वरित स्कैन पूरा हुआ!",
    telugu: "త్వరిత స్కాన్ పూర్తయింది!",
    tamil: "விரைவு ஸ்கேன் முடிந்தது!"
  },
  "no_threats_detected": {
    english: "No threats detected, you're safe!",
    hindi: "कोई खतरा नहीं मिला, आप सुरक्षित हैं!",
    telugu: "ఎటువంటి ముప్పులు కనుగొనబడలేదు, మీరు సురక్షితంగా ఉన్నారు!",
    tamil: "அச்சுறுத்தல்கள் எதுவும் கண்டறியப்படவில்லை, நீங்கள் பாதுகாப்பாக இருக்கிறீர்கள்!"
  },

  // Settings Page
  "app_permissions": {
    english: "App Permissions",
    hindi: "ऐप अनुमतियां",
    telugu: "యాప్ అనుమతులు",
    tamil: "ஆப்ஸ் அனுமதிகள்"
  },
  "control_access": {
    english: "Control which features the app can access",
    hindi: "नियंत्रित करें कि ऐप किन सुविधाओं तक पहुँच सकता है",
    telugu: "యాప్ ఏ ఫీచర్‌లను యాక్సెస్ చేయగలదో నియంత్రించండి",
    tamil: "ஆப்ஸ் எந்த அம்சங்களை அணுகலாம் என்பதைக் கட்டுப்படுத்தவும்"
  },
  "sms_access": {
    english: "SMS Access",
    hindi: "एसएमएस एक्सेस",
    telugu: "ఎస్ఎంఎస్ యాక్సెస్",
    tamil: "எஸ்எம்எஸ் அணுகல்"
  },
  "call_access": {
    english: "Call Access",
    hindi: "कॉल एक्सेस",
    telugu: "కాల్ యాక్సెస్",
    tamil: "அழைப்பு அணுகல்"
  },
  "contacts_access": {
    english: "Contacts Access",
    hindi: "कॉन्टैक्ट्स एक्सेस",
    telugu: "కాంటాక్ట్స్ యాక్సెస్",
    tamil: "தொடர்புகள் அணுகல்"
  },
  "notifications": {
    english: "Notifications",
    hindi: "नोटिफिकेशन",
    telugu: "నోటిఫికేషన్‌లు",
    tamil: "அறிவிப்புகள்"
  },
  "scam_database": {
    english: "Scam Database",
    hindi: "स्कैम डेटाबेस",
    telugu: "స్కామ్ డేటాబేస్",
    tamil: "மோசடி தரவுத்தளம்"
  },
  "manage_updates": {
    english: "Manage database updates",
    hindi: "डेटाबेस अपडेट प्रबंधित करें",
    telugu: "డేటాబేస్ అప్‌డేట్‌లను నిర్వహించండి",
    tamil: "தரவுத்தள புதுப்பிப்புகளை நிர்வகிக்கவும்"
  },
  "background_sync": {
    english: "Background Sync",
    hindi: "बैकग्राउंड सिंक",
    telugu: "బ్యాక్‌గ్రౌండ్ సింక్",
    tamil: "பின்னணி ஒத்திசைவு"
  },
  "keep_updated": {
    english: "Keep scam database updated",
    hindi: "स्कैम डेटाबेस को अपडेटेड रखें",
    telugu: "స్కామ్ డేటాబేస్‌ని అప్‌డేట్‌గా ఉంచండి",
    tamil: "மோசடி தரவுத்தளத்தை புதுப்பிக்கப்பட்டதாக வைத்திருங்கள்"
  },
  "sync_now": {
    english: "Sync Now",
    hindi: "अभी सिंक करें",
    telugu: "ఇప్పుడే సింక్ చేయండి",
    tamil: "இப்போது ஒத்திசைக்கவும்"
  },
  "updating_database": {
    english: "Updating scam database",
    hindi: "स्कैम डेटाबेस अपडेट हो रहा है",
    telugu: "స్కామ్ డేటాబేస్‌ని అప్‌డేట్ చేస్తోంది",
    tamil: "மோசடி தரவுத்தளத்தைப் புதுப்பிக்கிறது"
  },
  "last_updated": {
    english: "Last updated",
    hindi: "आखिरी अपडेट",
    telugu: "చివరిగా నవీకరించబడింది",
    tamil: "கடைசியாக புதுப்பிக்கப்பட்டது"
  },
  "privacy_settings": {
    english: "Privacy Settings",
    hindi: "गोपनीयता सेटिंग्स",
    telugu: "గోప్యతా సెట్టింగ్‌లు",
    tamil: "தனியுரிமை அமைப்புகள்"
  },
  "local_processing": {
    english: "Local Processing",
    hindi: "लोकल प्रोसेसिंग",
    telugu: "లోకల్ ప్రాసెసింగ్",
    tamil: "உள்ளூர் செயலாக்கம்"
  },
  "process_device": {
    english: "Process data on your device only",
    hindi: "डेटा केवल आपके डिवाइस पर प्रोसेस करें",
    telugu: "మీ పరికరంలో మాత్రమే డేటాను ప్రాసెస్ చేయండి",
    tamil: "உங்கள் சாதனத்தில் மட்டுமே தரவைச் செயலாக்குங்கள்"
  },
  "cloud_backup": {
    english: "Cloud Backup",
    hindi: "क्लाउड बैकअप",
    telugu: "క్లౌడ్ బ్యాకప్",
    tamil: "கிளவுட் பேக்அப்"
  },
  "backup_settings": {
    english: "Backup settings to cloud",
    hindi: "सेटिंग्स का क्लाउड पर बैकअप लें",
    telugu: "సెట్టింగులను క్లౌడ్‌కు బ్యాకప్ చేయండి",
    tamil: "அமைப்புகளை கிளவுடில் காப்புப் பிரதி எடுக்கவும்"
  },
  "appearance": {
    english: "Appearance",
    hindi: "दिखावट",
    telugu: "అప్పియరెన్స్",
    tamil: "தோற்றம்"
  },
  "dark_mode": {
    english: "Dark Mode",
    hindi: "डार्क मोड",
    telugu: "డార్క్ మోడ్",
    tamil: "இருள் பயன்முறை"
  },
  "theme_switch": {
    english: "Switch between light and dark themes",
    hindi: "लाइट और डार्क थीम के बीच स्विच करें",
    telugu: "లైట్ మరియు డార్క్ థీమ్‌ల మధ్య మారండి",
    tamil: "லைட் மற்றும் டார்க் தீம்களுக்கு இடையே மாறவும்"
  },
  "language": {
    english: "Language",
    hindi: "भाषा",
    telugu: "భాష",
    tamil: "மொழி"
  },
  "enabled": {
    english: "enabled",
    hindi: "सक्रिय किया गया",
    telugu: "ప్రారంభించబడింది",
    tamil: "இயக்கப்பட்டது"
  },
  "disabled": {
    english: "disabled",
    hindi: "अक्षम किया गया",
    telugu: "నిలిపివేయబడింది",
    tamil: "முடக்கப்பட்டது"
  },
  "permission_granted": {
    english: "Permission granted",
    hindi: "अनुमति दी गई",
    telugu: "అనుమతి ఇవ్వబడింది",
    tamil: "அனுமதி வழங்கப்பட்டது"
  },
  "permission_disabled": {
    english: "Permission disabled",
    hindi: "अनुमति अक्षम की गई",
    telugu: "అనుమతి నిలిపివేయబడింది",
    tamil: "அனுமதி முடக்கப்பட்டது"
  },
  "permission_has_been": {
    english: "permission has been",
    hindi: "अनुमति",
    telugu: "అనుమతి",
    tamil: "அனுமதி"
  },
  "sms_protection_disabled": {
    english: "SMS protection temporarily disabled",
    hindi: "एसएमएस सुरक्षा अस्थायी रूप से अक्षम",
    telugu: "SMS సంరక్షణ తాత్కాలికంగా నిలిపివేయబడింది",
    tamil: "SMS பாதுகாப்பு தற்காலிகமாக முடக்கப்பட்டது"
  },
  "database_updated": {
    english: "Database updated",
    hindi: "डेटाबेस अपडेट किया गया",
    telugu: "డేటాబేస్ అప్‌డేట్ చేయబడింది",
    tamil: "தரவுத்தளம் புதுப்பிக்கப்பட்டது"
  },
  "now_protected": {
    english: "You're now protected with the latest security data",
    hindi: "आप अब नवीनतम सुरक्षा डेटा के साथ सुरक्षित हैं",
    telugu: "మీరు ఇప్పుడు తాజా భద్రతా డేటాతో రక్షించబడ్డారు",
    tamil: "நீங்கள் இப்போது சமீபத்திய பாதுகாப்பு தரவுடன் பாதுகாக்கப்படுகிறீர்கள்"
  },
  "sync_started": {
    english: "Sync started",
    hindi: "सिंक शुरू हुआ",
    telugu: "సింక్ ప్రారంభించబడింది",
    tamil: "ஒத்திசைவு தொடங்கியது"
  },
  "updated": {
    english: "updated",
    hindi: "अपडेट किया गया",
    telugu: "అప్‌డేట్ చేయబడింది",
    tamil: "புதுப்பிக்கப்பட்டது"
  },

  // Call Monitoring
  "call_monitoring": {
    english: "Call Monitoring",
    hindi: "कॉल मॉनिटरिंग",
    telugu: "కాల్ మానిటరింగ్",
    tamil: "அழைப்பு கண்காணிப்பு"
  },
  "call_monitoring_active": {
    english: "Call monitoring is active. We'll analyze incoming calls for potential scams and provide real-time warnings.",
    hindi: "कॉल मॉनिटरिंग सक्रिय है। हम संभावित स्कैम के लिए आने वाले कॉल का विश्लेषण करेंगे और रीयल-टाइम चेतावनियां प्रदान करेंगे।",
    telugu: "కాల్ మానిటరింగ్ యాక్టివ్‌గా ఉంది. మేము సంభావ్య స్కామ్‌ల కోసం ఇన్‌కమింగ్ కాల్‌లను విశ్లేషిస్తాము మరియు రియల్-టైమ్ హెచ్చరికలను అందిస్తాము.",
    tamil: "அழைப்பு கண்காணிப்பு செயலில் உள்ளது. நாங்கள் சாத்தியமான மோசடிகளுக்காக வரும் அழைப்புகளை பகுப்பாய்வு செய்து, நிகழ்நேர எச்சரிக்கைகளை வழங்குவோம்."
  },
  "call_monitoring_inactive": {
    english: "Call monitoring is disabled. Enable it to receive warnings about suspicious calls.",
    hindi: "कॉल मॉनिटरिंग अक्षम है। संदिग्ध कॉल के बारे में चेतावनी प्राप्त करने के लिए इसे सक्षम करें।",
    telugu: "కాల్ మానిటరింగ్ నిలిపివేయబడింది. అనుమానాస్పద కాల్‌ల గురించి హెచ్చరికలను పొందడానికి దీన్ని ప్రారంభించండి.",
    tamil: "அழைப்பு கண்காணிப்பு முடக்கப்பட்டுள்ளது. சந்தேகத்திற்குரிய அழைப்புகளைப் பற்றிய எச்சரிக்கைகளைப் பெற இதை இயக்கவும்."
  },
  "monitored": {
    english: "Monitored",
    hindi: "मॉनिटर किए गए",
    telugu: "పర్యవేక్షించబడింది",
    tamil: "கண்காணிக்கப்பட்டது"
  },
  "calls_analyzed": {
    english: "calls analyzed in the last 7 days",
    hindi: "पिछले 7 दिनों में विश्लेषण किए गए कॉल",
    telugu: "గత 7 రోజులలో విశ్లేషించిన కాల్‌లు",
    tamil: "கடந்த 7 நாட்களில் பகுப்பாய்வு செய்யப்பட்ட அழைப்புகள்"
  },
  "alert_settings": {
    english: "Alert Settings",
    hindi: "अलर्ट सेटिंग्स",
    telugu: "అలర్ట్ సెట్టింగ్‌లు",
    tamil: "எச்சரிக்கை அமைப்புகள்"
  },
  "choose_alerts": {
    english: "Choose how you want to be alerted when a suspicious call is detected",
    hindi: "चुनें कि जब संदिग्ध कॉल का पता चलता है तो आपको कैसे सूचित किया जाए",
    telugu: "అనుమానాస్పద కాల్ కనుగొనబడినప్పుడు మీరు ఎలా హెచ్చరించాలనుకుంటున్నారో ఎంచుకోండి",
    tamil: "சந்தேகத்திற்குரிய அழைப்பு கண்டறியப்படும்போது நீங்கள் எவ்வாறு எச்சரிக்கப்பட வேண்டும் என்பதைத் தேர்வுசெய்யவும்"
  },
  "low_gentle": {
    english: "Low (gentle pulse)",
    hindi: "कम (हल्का पल्स)",
    telugu: "తక్కువ (సున్నితమైన పల్స్)",
    tamil: "குறைந்த (மென்மையான துடிப்பு)"
  },
  "medium_standard": {
    english: "Medium (standard vibration)",
    hindi: "मध्यम (मानक वाइब्रेशन)",
    telugu: "మధ్యస్థం (స్టాండర్డ్ వైబ్రేషన్)",
    tamil: "நடுத்தர (நிலையான அதிர்வு)"
  },
  "high_strong": {
    english: "High (strong alert)",
    hindi: "उच्च (मजबूत अलर्ट)",
    telugu: "అధికం (బలమైన అలర్ట్)",
    tamil: "அதிக (வலுவான எச்சரிக்கை)"
  },
  "off_visual": {
    english: "Off (visual alert only)",
    hindi: "बंद (केवल विजुअल अलर्ट)",
    telugu: "ఆఫ్ (విజువల్ అలర్ట్ మాత్రమే)",
    tamil: "முடக்கு (காட்சி எச்சரிக்கை மட்டும்)"
  },
  "call_monitoring_history": {
    english: "Call Monitoring History",
    hindi: "कॉल मॉनिटरिंग इतिहास",
    telugu: "కాల్ మానిటరింగ్ చరిత్ర",
    tamil: "அழைப்பு கண்காணிப்பு வரலாறு"
  },
  "safe": {
    english: "Safe",
    hindi: "सुरक्षित",
    telugu: "సురక్షితం",
    tamil: "பாதுகாப்பானது"
  },
  "suspicious": {
    english: "Suspicious",
    hindi: "संदिग्ध",
    telugu: "అనుమానాస్పదం",
    tamil: "சந்தேகத்திற்குரியது"
  },
  "blocked": {
    english: "Blocked",
    hindi: "ब्लॉक किया गया",
    telugu: "బ్లాక్ చేయబడింది",
    tamil: "தடுக்கப்பட்டது"
  },
  "duration": {
    english: "Duration",
    hindi: "अवधि",
    telugu: "వ్యవధి",
    tamil: "காலம்"
  },
  "why_flagged": {
    english: "Why was this call flagged?",
    hindi: "यह कॉल फ्लैग क्यों किया गया था?",
    telugu: "ఈ కాల్ ఎందుకు ఫ్లాగ్ చేయబడింది?",
    tamil: "இந்த அழைப்பு ஏன் கொடியிடப்பட்டது?"
  },
  "detected_words": {
    english: "Detected suspicious words",
    hindi: "संदिग्ध शब्द पाए गए",
    telugu: "అనుమానాస్పద పదాలు కనుగొనబడ్డాయి",
    tamil: "சந்தேகத்திற்குரிய வார்த்தைகள் கண்டறியப்பட்டன"
  },
  "vibration_updated": {
    english: "Vibration alert updated",
    hindi: "वाइब्रेशन अलर्ट अपडेट किया गया",
    telugu: "వైబ్రేషన్ అలర్ట్ అప్‌డేట్ చేయబడింది",
    tamil: "அதிர்வு எச்சரிக்கை புதுப்பிக்கப்பட்டது"
  },
  "vibration_level_set": {
    english: "Vibration level set to",
    hindi: "वाइब्रेशन लेवल सेट किया गया",
    telugu: "వైబ్రేషన్ లెవెల్ సెట్ చేయబడింది",
    tamil: "அதிர்வு அளவு அமைக்கப்பட்டது"
  },
  "call_protection_activated": {
    english: "Call Protection Activated",
    hindi: "कॉल सुरक्षा सक्रिय की गई",
    telugu: "కాల్ ప్రొటెక్షన్ యాక్టివేట్ చేయబడింది",
    tamil: "அழைப்பு பாதுகாப்பு செயல்படுத்தப்பட்டது"
  },
  "protected_from_scam_calls": {
    english: "You'll now be protected from scam calls.",
    hindi: "अब आप स्कैम कॉल से सुरक्षित रहेंगे।",
    telugu: "ఇప్పుడు మీరు స్కామ్ కాల్‌ల నుండి రక్షించబడతారు.",
    tamil: "இப்போது நீங்கள் மோசடி அழைப்புகளில் இருந்து பாதுகாக்கப்படுவீர்கள்."
  },
  "call_protection_deactivated": {
    english: "Call Protection Deactivated",
    hindi: "कॉल सुरक्षा निष्क्रिय की गई",
    telugu: "కాల్ ప్రొటెక్షన్ డీయాక్టివేట్ చేయబడింది",
    tamil: "அழைப்பு பாதுகாப்பு செயலிழக்கப்பட்டது"
  },
  "warning_no_protection": {
    english: "Warning: You won't be protected from scam calls.",
    hindi: "चेतावनी: आप स्कैम कॉल से सुरक्षित नहीं रहेंगे।",
    telugu: "హెచ్చరిక: మీరు స్కామ్ కాల్‌ల నుండి రక్షించబడరు.",
    tamil: "எச்சரிக்கை: நீங்கள் மோசடி அழைப்புகளில் இருந்து பாதுகாக்கப்பட மாட்டீர்கள்."
  },
  
  // Emergency Assistance
  "emergency_assistance": {
    english: "Emergency Assistance",
    hindi: "आपातकालीन सहायता",
    telugu: "అత్యవసర సహాయం",
    tamil: "அவசர உதவி"
  },
  "press_emergency_button": {
    english: "Press the button to send emergency alerts to your trusted contacts",
    hindi: "अपने विश्वसनीय संपर्कों को आपातकालीन अलर्ट भेजने के लिए बटन दबाएं",
    telugu: "మీ విశ్వసనీయ కాంటాక్ట్‌లకు అత్యవసర అలర్ట్‌లను పంపడానికి బటన్‌ను నొక్కండి",
    tamil: "உங்கள் நம்பகமான தொடர்புகளுக்கு அவசர எச்சரிக்கைகளை அனுப்ப பொத்தானை அழுத்தவும்"
  },
  "silent_emergency_mode": {
    english: "Silent Emergency Mode",
    hindi: "साइलेंट इमरजेंसी मोड",
    telugu: "సైలెంట్ ఎమర్జెన్సీ మోడ్",
    tamil: "அமைதி அவசர முறை"
  },
  "send_alerts_without_sound": {
    english: "Send alerts without sound or vibration",
    hindi: "बिना आवाज़ या वाइब्रेशन के अलर्ट भेजें",
    telugu: "శబ్దం లేదా వైబ్రేషన్ లేకుండా అలర్ట్‌లను పంపండి",
    tamil: "ஒலி அல்லது அதிர்வு இல்லாமல் எச்சரிக்கைகளை அனுப்பவும்"
  },
  "trusted_contacts": {
    english: "Trusted Contacts",
    hindi: "विश्वसनीय संपर्क",
    telugu: "విశ్వసనీయ కాంటాక్ట్లు",
    tamil: "நம்பகமான தொடர்புகள்"
  },
  "add": {
    english: "Add",
    hindi: "जोड़ें",
    telugu: "జోడించండి",
    tamil: "சேர்"
  },
  "no_contacts_yet": {
    english: "No Contacts Yet",
    hindi: "अभी तक कोई संपर्क नहीं",
    telugu: "ఇంకా కాంటాక్ట్‌లు లేవు",
    tamil: "இன்னும் தொடர்புகள் இல்லை"
  },
  "add_trusted_help": {
    english: "Add trusted contacts who can help in emergency situations.",
    hindi: "विश्वसनीय संपर्क जोड़ें जो आपातकालीन स्थितियों में मदद कर सकते हैं।",
    telugu: "అత్యవసర పరిస్థితులలో సహాయం చేయగల విశ్వసనీయ కాంటాక్ట్‌లను జోడించండి.",
    tamil: "அவசர சூழ்நிலைகளில் உதவக்கூடிய நம்பகமான தொடர்புகளைச் சேர்க்கவும்."
  },
  "add_emergency_contact": {
    english: "Add Emergency Contact",
    hindi: "आपातकालीन संपर्क जोड़ें",
    telugu: "అత్యవసర కాంటాక్ట్‌ను జోడించండి",
    tamil: "அவசர தொடர்பைச் சேர்க்கவும்"
  },
  "add_more_contacts": {
    english: "Add More Contacts",
    hindi: "और संपर्क जोड़ें",
    telugu: "మరిన్ని కాంటాక్ట్‌లను జోడించండి",
    tamil: "மேலும் தொடர்புகளைச் சேர்க்கவும்"
  },
  "emergency_message_templates": {
    english: "Emergency Message Templates",
    hindi: "आपातकालीन संदेश टेम्प्लेट",
    telugu: "అత్యవసర సందేశ టెంప్లేట్‌లు",
    tamil: "அவசர செய்தி வார்ப்புருக்கள்"
  },
  "scam_alert": {
    english: "Scam Alert",
    hindi: "स्कैम अलर्ट",
    telugu: "స్కామ్ అలర్ట్",
    tamil: "மோசடி எச்சரிக்கை"
  },
  "help_needed": {
    english: "Help Needed",
    hindi: "सहायता की आवश्यकता है",
    telugu: "సహాయం అవసరం",
    tamil: "உதவி தேவை"
  },
  "scam_alert_message": {
    english: "\"I'm being targeted by a scammer. Please call me immediately to help verify if this is legitimate.\"",
    hindi: "\"मुझे स्कैमर द्वारा निशाना बनाया जा रहा है। कृपया यह सत्यापित करने में मदद के लिए मुझे तुरंत कॉल करें कि यह वैध है या नहीं।\"",
    telugu: "\"నేను స్కామర్ ద్వారా లక్ష్యంగా ఉన్నాను. ఇది చట్టబద్ధమైనదో కాదో ధృవీకరించడానికి సహాయం చేయడానికి దయచేసి నాకు వెంటనే కాల్ చేయండి.\"",
    tamil: "\"நான் மோசடி செய்பவரால் இலக்காக உள்ளேன். இது சட்டப்பூர்வமானதா என்பதை சரிபார்க்க உதவ உடனடியாக என்னை அழைக்கவும்.\""
  },
  "help_needed_message": {
    english: "\"I need urgent assistance. Please call me or contact authorities. My last known location is attached.\"",
    hindi: "\"मुझे तत्काल सहायता की आवश्यकता है। कृपया मुझे कॉल करें या अधिकारियों से संपर्क करें। मेरा अंतिम ज्ञात स्थान संलग्न है।\"",
    telugu: "\"నాకు అత్యవసర సహాయం అవసరం. దయచేసి నాకు కాల్ చేయండి లేదా అధికారులను సంప్రదించండి. నా చివరిగా తెలిసిన స్థానం జతచేయబడింది.\"",
    tamil: "\"எனக்கு அவசர உதவி தேவை. தயவுசெய்து என்னை அழைக்கவும் அல்லது அதிகாரிகளைத் தொடர்பு கொள்ளவும். எனது கடைசியாக அறியப்பட்ட இருப்பிடம் இணைக்கப்பட்டுள்ளது.\""
  },
  "name": {
    english: "Name",
    hindi: "नाम",
    telugu: "పేరు",
    tamil: "பெயர்"
  },
  "full_name": {
    english: "Full Name",
    hindi: "पूरा नाम",
    telugu: "పూర్తి పేరు",
    tamil: "முழு பெயர்"
  },
  "phone_number": {
    english: "Phone Number",
    hindi: "फोन नंबर",
    telugu: "ఫోన్ నంబర్",
    tamil: "தொலைபேசி எண்"
  },
  "relation": {
    english: "Relation",
    hindi: "संबंध",
    telugu: "సంబంధం",
    tamil: "உறவு"
  },
  "family_friend": {
    english: "Family, Friend, etc.",
    hindi: "परिवार, दोस्त, आदि।",
    telugu: "కుటుంబం, స్నేహితుడు, మొదలైనవి.",
    tamil: "குடும்பம், நண்பர், முதலியன."
  },
  "cancel": {
    english: "Cancel",
    hindi: "रद्द करें",
    telugu: "రద్దు",
    tamil: "ரத்து"
  },
  "contact_added": {
    english: "Contact added",
    hindi: "संपर्क जोड़ा गया",
    telugu: "కాంటాక్ట్ జోడించబడింది",
    tamil: "தொடர்பு சேர்க்கப்பட்டது"
  },
  "contact_added_desc": {
    english: "has been added as an emergency contact.",
    hindi: "आपातकालीन संपर्क के रूप में जोड़ा गया है।",
    telugu: "అత్యవసర కాంటాక్ట్‌గా జోడించబడింది.",
    tamil: "அவசர தொடர்பாக சேர்க்கப்பட்டுள்ளார்."
  },
  "contact_removed": {
    english: "Contact removed",
    hindi: "संपर्क हटाया गया",
    telugu: "కాంటాక్ట్ తొలగించబడింది",
    tamil: "தொடர்பு நீக்கப்பட்டது"
  },
  "contact_removed_desc": {
    english: "has been removed from emergency contacts.",
    hindi: "आपातकालीन संपर्कों से हटा दिया गया है।",
    telugu: "అత్యవసర కాంటాక్ట్‌ల నుండి తొలగించబడింది.",
    tamil: "அவசர தொடர்புகளில் இருந்து நீக்கப்பட்டுள்ளது."
  },
  "emergency_alert_sent": {
    english: "Emergency alert sent",
    hindi: "आपातकालीन अलर्ट भेजा गया",
    telugu: "అత్యవసర అలర్ట్ పంపబడింది",
    tamil: "அவசர எச்சரிக்கை அனுப்பப்பட்டது"
  },
  "contacts_notified": {
    english: "Your trusted contacts have been notified of your situation.",
    hindi: "आपके विश्वसनीय संपर्कों को आपकी स्थिति के बारे में सूचित कर दिया गया है।",
    telugu: "మీ పరిస్థితి గురించి మీ విశ్వసనీయ కాంటాక్ట్‌లకు తెలియజేయబడింది.",
    tamil: "உங்கள் நிலைமை குறித்து உங்கள் நம்பகமான தொடர்புகளுக்குத் தெரிவிக்கப்பட்டுள்ளது."
  },
  "silent_mode_enabled": {
    english: "Silent mode enabled",
    hindi: "साइलेंट मोड सक्षम किया गया",
    telugu: "సైలెంట్ మోడ్ ప్రారంభించబడింది",
    tamil: "அமைதி முறை இயக்கப்பட்டது"
  },
  "silent_alerts": {
    english: "Emergency alerts will be sent silently.",
    hindi: "आपातकालीन अलर्ट चुपचाप भेजे जाएंगे।",
    telugu: "అత్యవసర అలర్ట్‌లు నిశ్శబ్దంగా పంపబడతాయి.",
    tamil: "அவசர எச்சரிக்கைகள் அமைதியாக அனுப்பப்படும்."
  },
  "silent_mode_disabled": {
    english: "Silent mode disabled",
    hindi: "साइलेंट मोड अक्षम किया गया",
    telugu: "సైలెంట్ మోడ్ నిలిపివేయబడింది",
    tamil: "அமைதி முறை முடக்கப்பட்டது"
  },
  "sound_alerts": {
    english: "Emergency alerts will make sound notifications.",
    hindi: "आपातकालीन अलर्ट ध्वनि सूचनाएं देंगे।",
    telugu: "అత్యవసర అలర్ట్‌లు శబ్ద నోటిఫికేషన్‌లను ఇస్తాయి.",
    tamil: "அவசர எச்சரிக்கைகள் ஒலி அறிவிப்புகளை உருவாக்கும்."
  },
  "missing_information": {
    english: "Missing information",
    hindi: "अधूरी जानकारी",
    telugu: "తప్పిన సమాచారం",
    tamil: "தவறிய தகவல்"
  },
  "provide_name_phone": {
    english: "Please provide both name and phone number.",
    hindi: "कृपया नाम और फोन नंबर दोनों प्रदान करें।",
    telugu: "దయచేసి పేరు మరియు ఫోన్ నంబర్ రెండింటినీ అందించండి.",
    tamil: "தயவுசெய்து பெயர் மற்றும் தொலைபேசி எண் ஆகிய இரண்டையும் வழங்கவும்."
  },
  
  // About & Help
  "frequently_asked_questions": {
    english: "Frequently Asked Questions",
    hindi: "अक्सर पूछे जाने वाले प्रश्न",
    telugu: "తరచుగా అడిగే ప్రశ్నలు",
    tamil: "அடிக்கடி கேட்கப்படும் கேள்விகள்"
  },
  "need_help": {
    english: "Need Help?",
    hindi: "सहायता चाहिए?",
    telugu: "సహాయం కావాలా?",
    tamil: "உதவி வேண்டுமா?"
  },
  "chat_with_support": {
    english: "Chat with Support",
    hindi: "सहायता से चैट करें",
    telugu: "సపోర్ట్‌తో చాట్ చేయండి",
    tamil: "ஆதரவுடன் அரட்டை"
  },
  "email_support": {
    english: "Email Support",
    hindi: "ईमेल सहायता",
    telugu: "ఇమెయిల్ సపోర్ట్",
    tamil: "மின்னஞ்சல் ஆதரவு"
  },
  "call_support": {
    english: "Call Support",
    hindi: "कॉल सपोर्ट",
    telugu: "కాల్ సపోర్ట్",
    tamil: "அழைப்பு ஆதரவு"
  },
  "learn_more": {
    english: "Learn More",
    hindi: "और अधिक जानें",
    telugu: "మరింత తెలుసుకోండి",
    tamil: "மேலும் அறிக"
  },
  "privacy_policy": {
    english: "Privacy Policy",
    hindi: "गोपनीयता नीति",
    telugu: "ప్రైవసీ పాలసీ",
    tamil: "தனியுரிமைக் கொள்கை"
  },
  "terms_of_service": {
    english: "Terms of Service",
    hindi: "सेवा की शर्तें",
    telugu: "సర్వీస్ నిబంధనలు",
    tamil: "சேவை விதிமுறைகள்"
  },
  "all_rights_reserved": {
    english: "All Rights Reserved",
    hindi: "सर्वाधिकार सुरक्षित",
    telugu: "సర్వహక్కులు కలివి",
    tamil: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை"
  },
  "support_ticket_created": {
    english: "Support ticket created",
    hindi: "सहायता टिकट बनाया गया",
    telugu: "సపోర్ట్ టికెట్ సృష్టించబడింది",
    tamil: "ஆதரவு டிக்கெட் உருவாக்கப்பட்டது"
  },
  "support_response_time": {
    english: "Our team will get back to you within 24 hours.",
    hindi: "हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।",
    telugu: "మా బృందం 24 గంటల్లోపు మీకు తిరిగి వస్తుంది.",
    tamil: "எங்கள் குழு 24 மணிநேரத்திற்குள் உங்களைத் தொடர்பு கொள்ளும்."
  },
  
  // App Setup & Loading
  "setup_completed": {
    english: "Setup completed",
    hindi: "सेटअप पूरा हो गया",
    telugu: "సెటప్ పూర్తయింది",
    tamil: "அமைவு முடிந்தது"
  },
  "setup_skipped": {
    english: "Setup skipped",
    hindi: "सेटअप छोड़ दिया गया",
    telugu: "సెటప్ దాటవేయబడింది",
    tamil: "அமைவு தவிர்க்கப்பட்டது"
  },
  "complete_later": {
    english: "You can complete setup later in Settings",
    hindi: "आप सेटिंग्स में बाद में सेटअप पूरा कर सकते हैं",
    telugu: "మీరు సెట్టింగ్‌లలో తర్వాత సెటప్‌ని పూర్తి చేయవచ్చు",
    tamil: "அமைப்புகளில் அமைவை பின்னர் முடிக்கலாம்"
  },
  "shield_activated": {
    english: "Shield activated",
    hindi: "शील्ड सक्रिय किया गया",
    telugu: "షీల్డ్ యాక్టివేట్ చేయబడింది",
    tamil: "ஷீல்டு செயல்படுத்தப்பட்டது"
  },
  "shield_protection": {
    english: "Your device is now protected from scams",
    hindi: "आपका डिवाइस अब स्कैम से सुरक्षित है",
    telugu: "మీ డివైస్ ఇప్పుడు స్కామ్‌ల నుండి రక్షించబడింది",
    tamil: "உங்கள் சாதனம் இப்போது மோசடிகளில் இருந்து பாதுகாக்கப்படுகிறது"
  },
  
  // FAQ Questions and Answers
  "faq_detection": {
    english: "How does Shield Safe Zone detect scams?",
    hindi: "शील्ड सेफ ज़ोन स्कैम का पता कैसे लगाता है?",
    telugu: "షీల్డ్ సేఫ్ జోన్ స్కామ్‌లను ఎలా గుర్తిస్తుంది?",
    tamil: "ஷீல்டு சேஃப் ஜோன் மோசடிகளை எவ்வாறு கண்டறிகிறது?"
  },
  "faq_detection_answer": {
    english: "Shield Safe Zone uses advanced pattern recognition and machine learning to identify common scam patterns in SMS messages and calls. It compares incoming communications against a database of known scam patterns, which is regularly updated to protect against new threats.",
    hindi: "शील्ड सेफ ज़ोन एसएमएस संदेशों और कॉल में सामान्य स्कैम पैटर्न की पहचान करने के लिए उन्नत पैटर्न रिकग्निशन और मशीन लर्निंग का उपयोग करता है। यह आने वाले संचार की तुलना ज्ञात स्कैम पैटर्न के डेटाबेस से करता है, जो नए खतरों से बचाव के लिए नियमित रूप से अपडेट किया जाता है।",
    telugu: "షీల్డ్ సేఫ్ జోన్ SMS సందేశాలు మరియు కాల్‌లలో సాధారణ స్కామ్ నమూనాలను గుర్తించడానికి అధునాతన ప్యాటర్న్ రికగ్నిషన్ మరియు మెషిన్ లెర్నింగ్‌ను ఉపయోగిస్తుంది. ఇది ఇన్‌కమింగ్ కమ్యూనికేషన్‌లను తెలిసిన స్కామ్ నమూనాల డేటాబేస్‌తో పోలుస్తుంది, ఇది కొత్త ముప్పుల నుండి రక్షించడానికి క్రమం తప్పకుండా అప్‌డేట్ చేయబడుతుంది.",
    tamil: "ஷீல்டு சேஃப் ஜோன் எஸ்எம்எஸ் செய்திகள் மற்றும் அழைப்புகளில் பொதுவான மோசடி வடிவங்களை அடையாளம் காண மேம்பட்ட முறை அங்கீகாரம் மற்றும் மெஷின் லெர்னிங்கைப் பயன்படுத்துகிறது. இது வரும் தொடர்புகளை அறியப்பட்ட மோசடி வடிவங்களின் தரவுத்தளத்துடன் ஒப்பிடுகிறது, இது புதிய அச்சுறுத்தல்களில் இருந்து பாதுகாக்க வழக்கமாக புதுப்பிக்கப்படுகிறது."
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'english';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key].english || key;
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
