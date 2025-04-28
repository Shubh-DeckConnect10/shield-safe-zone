
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define all supported languages
type SupportedLanguage = "en" | "hi" | "te";

// Define the context type
interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
}

// Translation dictionary
const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // App general
    "app.name": "Shield Safe Zone",
    "app.version": "v1.0.0 Beta",
    "app.tagline": "Your personal shield against digital scams",
    "app.loading": "Setting up your protection...",
    
    // Actions
    "action.back": "Go back to home",
    "action.scan": "Scan now",
    "action.read": "Read more",
    "action.submit": "Submit",
    "action.cancel": "Cancel",
    "action.next": "Next",
    "action.prev": "Previous",
    
    // Menu items
    "menu.home": "Home",
    "menu.sms": "SMS Protection",
    "menu.call": "Call Protection",
    "menu.history": "Threat History",
    "menu.education": "Scam Education",
    "menu.emergency": "Emergency Help",
    "menu.settings": "Settings",
    "menu.about": "About & Help",
    
    // Home page
    "home.protection.status": "Protection Status",
    "home.protection.message": "Active & Protected",
    "home.scan.button": "Scan",
    "home.scan.progress": "Scanning your device",
    "home.stats.sms": "SMS Threats",
    "home.stats.calls": "Call Threats",
    "home.stats.security": "Security",
    "home.security.high": "High",
    "home.security.medium": "Medium",
    "home.security.low": "Low",
    "home.fullscan": "Run Full Scan",
    "home.fullscan.desc": "Deep scan system for threats",
    "home.threat": "Threat History",
    "home.threat.desc": "View detected threats",
    "home.safety": "Safety Tips",
    "home.safety.desc": "Learn to stay protected",
    
    // Settings
    "settings.language": "Language",
    "settings.language.desc": "Change application language",
    "settings.english": "English",
    "settings.hindi": "Hindi",
    "settings.telugu": "Telugu",
    "settings.darkMode": "Dark Mode",
    "settings.darkMode.desc": "Switch between light and dark theme",
    "settings.notifications": "Notifications",
    "settings.notifications.desc": "Control app alerts",
    "settings.privacy": "Privacy Settings",
    "settings.privacy.desc": "Manage data protection",
    "settings.local": "Local Processing",
    "settings.local.desc": "Process data on device",
    "settings.cloud": "Cloud Backup",
    "settings.cloud.desc": "Backup data to cloud",
    "settings.appearance": "Appearance",
    "settings.permissions": "App Permissions",
    "settings.permissions.desc": "Control what Shield Safe Zone can access",
    "settings.sms": "SMS Access",
    "settings.calls": "Call Access",
    "settings.contacts": "Contacts Access",
    
    // About & Help
    "about.faq": "Frequently Asked Questions",
    "about.help": "Get Support",
    "about.chat": "Chat with Support",
    "about.email": "Email Support",
    "about.call": "Call Support",
    "about.learn": "Learn More",
    "about.privacy": "Privacy Policy",
    "about.terms": "Terms of Service",
    "about.rights": "All Rights Reserved",

    // Emergency
    "emergency.title": "Emergency Assistance",
    "emergency.button": "Send Emergency Alert",
    "emergency.contacts": "Trusted Contacts",
    "emergency.add": "Add Contact",
    "emergency.silent": "Silent Emergency Mode",
    "emergency.silent.desc": "Send alerts without sound or vibration",
    "emergency.templates": "Emergency Message Templates",
    
    // Call Monitoring
    "call.monitoring": "Call Monitoring",
    "call.active": "Call monitoring is active. We'll analyze incoming calls for potential scams and provide real-time warnings.",
    "call.inactive": "Call monitoring is disabled. Enable it to receive warnings about suspicious calls.",
    "call.monitored": "Monitored:",
    "call.calls": "calls analyzed in the last 7 days",
    "call.settings": "Alert Settings",
    "call.settings.desc": "Choose how you want to be alerted when a suspicious call is detected",
    "call.vibration.low": "Low (gentle pulse)",
    "call.vibration.medium": "Medium (standard vibration)",
    "call.vibration.high": "High (strong alert)",
    "call.vibration.off": "Off (visual alert only)",
    "call.history": "Call Monitoring History",
    "call.duration": "Duration:",
    "call.flagged": "Why was this call flagged?",
    "call.words": "Detected suspicious words:",
    
    // Status labels
    "status.safe": "Safe",
    "status.suspicious": "Suspicious",
    "status.blocked": "Blocked",
    
    // Education
    "education.progress": "Your Learning Progress",
    "education.articles": "Scam Education Articles",
    "education.read": "Read",
    "education.readNow": "Read Now",
    "education.test": "Test Your Knowledge",
    "education.quiz": "Take a quick quiz to test your scam awareness",
    "education.start": "Start Quiz",
    "education.badges": "Your Badges",
    "education.whatsapp": "Stay Updated on WhatsApp",
    "education.whatsapp.desc": "Receive regular scam alerts and tips directly on WhatsApp",
    "education.enroll": "Enroll for WhatsApp Updates",
    
    // Success messages
    "success.shield": "Protection Active",
    "success.shield.desc": "You're protected from scams and fraud attempts.",
    "success.scan": "Scan Complete",
    "success.scan.desc": "No threats detected on your device.",
    "success.setup": "Setup Complete",
    "success.setup.desc": "Your Shield Safe Zone is now configured.",
    "success.support": "Support Request Sent",
    "success.support.desc": "Our team will get back to you shortly.",
    
    // Toast messages
    "toast.setup.skip": "Setup Skipped",
    "toast.setup.skip.desc": "You can configure settings later.",
    
    // Setup wizard
    "setup.intro.title": "Welcome to Shield Safe Zone",
    "setup.intro.desc": "Your protection against scams starts here. Let's set up your app for maximum security.",
    "setup.intro.protection": "Real-time protection",
    "setup.intro.protection.desc": "Monitors calls and messages",
    "setup.intro.alerts": "Instant alerts",
    "setup.intro.alerts.desc": "Get notified about potential scams",
    "setup.intro.education": "Scam education",
    "setup.intro.education.desc": "Learn about common scam techniques",
    "setup.permissions.title": "Required Permissions",
    "setup.permissions.desc": "Shield Safe Zone needs access to certain features to protect you",
    "setup.permissions.sms": "SMS Access",
    "setup.permissions.sms.desc": "For monitoring suspicious messages",
    "setup.permissions.calls": "Call Access",
    "setup.permissions.calls.desc": "For monitoring suspicious calls",
    "setup.permissions.grant": "Grant",
    "setup.notifications.title": "Enable Notifications",
    "setup.notifications.desc": "Get instant alerts when potential scams are detected",
    "setup.notifications.push": "Push Notifications",
    "setup.notifications.push.desc": "For real-time scam alerts",
    "setup.notifications.enable": "Enable",
    "setup.notifications.later": "You can always change notification settings later",
    "setup.emergency.title": "Emergency Contacts",
    "setup.emergency.desc": "Add trusted contacts for emergency assistance",
    "setup.emergency.alert": "In case you fall for a scam, we can alert your trusted contacts immediately",
    "setup.emergency.setup": "Set Up Emergency Contacts",
    "setup.emergency.skip": "You can skip this step and set up emergency contacts later",
    "setup.done.title": "Setup Complete!",
    "setup.done.desc": "You're now protected against scams. You can always adjust your settings later.",
    "setup.done.next": "What's next?",
    "setup.done.protection": "Your protection is now active",
    "setup.done.sms": "SMS scam monitoring is enabled",
    "setup.done.calls": "Call monitoring is ready",
    "setup.skip": "Skip setup",
    "setup.back": "Back",
    "setup.next": "Next",
    "setup.finish": "Finish",
    
    // FAQ questions
    "faq.question.1": "How does Shield Safe Zone detect scams?",
    "faq.answer.1": "Shield Safe Zone uses advanced pattern recognition and machine learning to identify common scam patterns in SMS messages and calls. It compares incoming communications against a database of known scam patterns, which is regularly updated to protect against new threats.",
    "faq.question.2": "Will the app access my personal messages?",
    "faq.answer.2": "Shield Safe Zone only scans messages for potential scam patterns and does not store or share the content of your personal messages. You can choose local-only processing in settings for enhanced privacy.",
    "faq.question.3": "How accurate is scam detection?",
    "faq.answer.3": "Our detection system has a high accuracy rate of over 95%. However, no system is perfect, which is why we allow you to mark safe messages that might be incorrectly flagged. This feedback improves our detection algorithms over time.",
    "faq.question.4": "What should I do if I receive a scam?",
    "faq.answer.4": "If you receive a scam message or call, use the app to report it. Avoid clicking on any links or calling back suspicious numbers. If you've already interacted with a scammer, contact your bank immediately and change any compromised passwords.",
    "faq.question.5": "Does Shield Safe Zone work offline?",
    "faq.answer.5": "Basic scam detection works offline using the latest downloaded scam patterns. However, for the most up-to-date protection, we recommend regular internet connection to update the scam database."
  },
  hi: {
    // App general
    "app.name": "शील्ड सेफ जोन",
    "app.version": "v1.0.0 बीटा",
    "app.tagline": "डिजिटल घोटालों के खिलाफ आपका व्यक्तिगत कवच",
    "app.loading": "आपकी सुरक्षा सेट हो रही है...",
    
    // Actions
    "action.back": "होम पेज पर वापस जाएं",
    "action.scan": "अभी स्कैन करें",
    "action.read": "और पढ़ें",
    "action.submit": "जमा करें",
    "action.cancel": "रद्द करें",
    "action.next": "अगला",
    "action.prev": "पिछला",
    
    // Menu items
    "menu.home": "होम",
    "menu.sms": "एसएमएस सुरक्षा",
    "menu.call": "कॉल सुरक्षा",
    "menu.history": "खतरा इतिहास",
    "menu.education": "धोखाधड़ी शिक्षा",
    "menu.emergency": "आपातकालीन सहायता",
    "menu.settings": "सेटिंग्स",
    "menu.about": "जानकारी और मदद",
    
    // Home page
    "home.protection.status": "सुरक्षा स्थिति",
    "home.protection.message": "सक्रिय और सुरक्षित",
    "home.scan.button": "स्कैन",
    "home.scan.progress": "आपका डिवाइस स्कैन हो रहा है",
    "home.stats.sms": "एसएमएस खतरे",
    "home.stats.calls": "कॉल खतरे",
    "home.stats.security": "सुरक्षा",
    "home.security.high": "उच्च",
    "home.security.medium": "मध्यम",
    "home.security.low": "निम्न",
    "home.fullscan": "पूर्ण स्कैन चलाएं",
    "home.fullscan.desc": "खतरों के लिए गहरा स्कैन करें",
    "home.threat": "खतरा इतिहास",
    "home.threat.desc": "पहचाने गए खतरों को देखें",
    "home.safety": "सुरक्षा टिप्स",
    "home.safety.desc": "सुरक्षित रहना सीखें",
    
    // Settings
    "settings.language": "भाषा",
    "settings.language.desc": "एप्लिकेशन भाषा बदलें",
    "settings.english": "अंग्रेज़ी",
    "settings.hindi": "हिंदी",
    "settings.telugu": "तेलुगु",
    "settings.darkMode": "डार्क मोड",
    "settings.darkMode.desc": "लाइट और डार्क थीम के बीच स्विच करें",
    "settings.notifications": "सूचनाएं",
    "settings.notifications.desc": "ऐप अलर्ट नियंत्रित करें",
    "settings.privacy": "गोपनीयता सेटिंग्स",
    "settings.privacy.desc": "डेटा सुरक्षा प्रबंधित करें",
    "settings.local": "स्थानीय प्रोसेसिंग",
    "settings.local.desc": "डिवाइस पर डेटा संसाधित करें",
    "settings.cloud": "क्लाउड बैकअप",
    "settings.cloud.desc": "क्लाउड पर डेटा बैकअप करें",
    "settings.appearance": "दिखावट",
    "settings.permissions": "ऐप अनुमतियां",
    "settings.permissions.desc": "नियंत्रित करें कि शील्ड सेफ ज़ोन क्या एक्सेस कर सकता है",
    "settings.sms": "एसएमएस एक्सेस",
    "settings.calls": "कॉल एक्सेस",
    "settings.contacts": "कॉन्टैक्ट्स एक्सेस",
    
    // About & Help
    "about.faq": "अक्सर पूछे जाने वाले प्रश्न",
    "about.help": "सहायता प्राप्त करें",
    "about.chat": "सपोर्ट से चैट करें",
    "about.email": "ईमेल सपोर्ट",
    "about.call": "कॉल सपोर्ट",
    "about.learn": "और जानें",
    "about.privacy": "गोपनीयता नीति",
    "about.terms": "सेवा की शर्तें",
    "about.rights": "सर्वाधिकार सुरक्षित",
    
    // Emergency
    "emergency.title": "आपातकालीन सहायता",
    "emergency.button": "आपातकालीन अलर्ट भेजें",
    "emergency.contacts": "विश्वसनीय संपर्क",
    "emergency.add": "संपर्क जोड़ें",
    "emergency.silent": "साइलेंट इमरजेंसी मोड",
    "emergency.silent.desc": "बिना आवाज या कंपन के अलर्ट भेजें",
    "emergency.templates": "आपातकालीन संदेश टेम्पलेट्स",
    
    // Call Monitoring
    "call.monitoring": "कॉल निगरानी",
    "call.active": "कॉल निगरानी सक्रिय है। हम संभावित स्कैम के लिए इनकमिंग कॉल का विश्लेषण करेंगे और रीयल-टाइम चेतावनी प्रदान करेंगे।",
    "call.inactive": "कॉल निगरानी अक्षम है। संदिग्ध कॉल के बारे में चेतावनी प्राप्त करने के लिए इसे सक्षम करें।",
    "call.monitored": "निगरानी की गई:",
    "call.calls": "पिछले 7 दिनों में विश्लेषित कॉल",
    "call.settings": "अलर्ट सेटिंग्स",
    "call.settings.desc": "चुनें कि संदिग्ध कॉल का पता चलने पर आपको कैसे अलर्ट किया जाए",
    "call.vibration.low": "कम (हल्का स्पंदन)",
    "call.vibration.medium": "मध्यम (मानक कंपन)",
    "call.vibration.high": "उच्च (मजबूत अलर्ट)",
    "call.vibration.off": "बंद (केवल विजुअल अलर्ट)",
    "call.history": "कॉल निगरानी इतिहास",
    "call.duration": "अवधि:",
    "call.flagged": "इस कॉल को फ्लैग क्यों किया गया?",
    "call.words": "संदिग्ध शब्द पहचाने गए:",
    
    // Status labels
    "status.safe": "सुरक्षित",
    "status.suspicious": "संदिग्ध",
    "status.blocked": "अवरुद्ध",
    
    // Education
    "education.progress": "आपकी सीखने की प्रगति",
    "education.articles": "स्कैम शिक्षा लेख",
    "education.read": "पढ़ा गया",
    "education.readNow": "अभी पढ़ें",
    "education.test": "अपने ज्ञान का परीक्षण करें",
    "education.quiz": "अपने स्कैम जागरूकता का परीक्षण करने के लिए एक त्वरित क्विज लें",
    "education.start": "क्विज शुरू करें",
    "education.badges": "आपके बैज",
    "education.whatsapp": "व्हाट्सएप पर अपडेट रहें",
    "education.whatsapp.desc": "व्हाट्सएप पर नियमित स्कैम अलर्ट और टिप्स प्राप्त करें",
    "education.enroll": "व्हाट्सएप अपडेट के लिए नामांकन करें",
    
    // Success messages
    "success.shield": "सुरक्षा सक्रिय",
    "success.shield.desc": "आप स्कैम और धोखाधड़ी के प्रयासों से सुरक्षित हैं।",
    "success.scan": "स्कैन पूरा हुआ",
    "success.scan.desc": "आपके डिवाइस पर कोई खतरा नहीं मिला।",
    "success.setup": "सेटअप पूरा हुआ",
    "success.setup.desc": "आपका शील्ड सेफ जोन अब कॉन्फ़िगर किया गया है।",
    "success.support": "समर्थन अनुरोध भेजा गया",
    "success.support.desc": "हमारी टीम जल्द ही आपसे संपर्क करेगी।",
    
    // Toast messages
    "toast.setup.skip": "सेटअप छोड़ा गया",
    "toast.setup.skip.desc": "आप बाद में सेटिंग्स कॉन्फ़िगर कर सकते हैं।",
    
    // Setup wizard
    "setup.intro.title": "शील्ड सेफ जोन में आपका स्वागत है",
    "setup.intro.desc": "डिजिटल धोखाधड़ी से आपकी सुरक्षा यहां से शुरू होती है। चलिए अधिकतम सुरक्षा के लिए आपके ऐप को सेट करें।",
    "setup.intro.protection": "रीयल-टाइम सुरक्षा",
    "setup.intro.protection.desc": "कॉल और संदेशों की निगरानी करता है",
    "setup.intro.alerts": "तत्काल अलर्ट",
    "setup.intro.alerts.desc": "संभावित स्कैम के बारे में सूचित किया जाता है",
    "setup.intro.education": "स्कैम शिक्षा",
    "setup.intro.education.desc": "आम स्कैम तकनीकों के बारे में जानें",
    "setup.permissions.title": "आवश्यक अनुमतियां",
    "setup.permissions.desc": "आपकी सुरक्षा के लिए शील्ड सेफ जोन को कुछ विशेषताओं तक पहुंच की आवश्यकता है",
    "setup.permissions.sms": "एसएमएस एक्सेस",
    "setup.permissions.sms.desc": "संदिग्ध संदेशों की निगरानी के लिए",
    "setup.permissions.calls": "कॉल एक्सेस",
    "setup.permissions.calls.desc": "संदिग्ध कॉल की निगरानी के लिए",
    "setup.permissions.grant": "अनुमति दें",
    "setup.notifications.title": "नोटिफिकेशन सक्षम करें",
    "setup.notifications.desc": "संभावित स्कैम का पता चलने पर तत्काल अलर्ट प्राप्त करें",
    "setup.notifications.push": "पुश नोटिफिकेशन",
    "setup.notifications.push.desc": "रीयल-टाइम स्कैम अलर्ट के लिए",
    "setup.notifications.enable": "सक्षम करें",
    "setup.notifications.later": "आप बाद में नोटिफिकेशन सेटिंग्स बदल सकते हैं",
    "setup.emergency.title": "आपातकालीन संपर्क",
    "setup.emergency.desc": "आपातकालीन सहायता के लिए विश्वसनीय संपर्क जोड़ें",
    "setup.emergency.alert": "यदि आप स्कैम का शिकार हो जाते हैं, तो हम तुरंत आपके विश्वसनीय संपर्कों को अलर्ट कर सकते हैं",
    "setup.emergency.setup": "आपातकालीन संपर्क सेट करें",
    "setup.emergency.skip": "आप इस चरण को छोड़ सकते हैं और बाद में आपातकालीन संपर्क सेट कर सकते हैं",
    "setup.done.title": "सेटअप पूरा हुआ!",
    "setup.done.desc": "अब आप स्कैम से सुरक्षित हैं। आप हमेशा अपनी सेटिंग्स को बाद में समायोजित कर सकते हैं।",
    "setup.done.next": "आगे क्या है?",
    "setup.done.protection": "आपकी सुरक्षा अब सक्रिय है",
    "setup.done.sms": "एसएमएस स्कैम निगरानी सक्षम है",
    "setup.done.calls": "कॉल निगरानी तैयार है",
    "setup.skip": "सेटअप छोड़ें",
    "setup.back": "वापस",
    "setup.next": "अगला",
    "setup.finish": "समाप्त",
    
    // FAQ questions
    "faq.question.1": "शील्ड सेफ जोन स्कैम का पता कैसे लगाता है?",
    "faq.answer.1": "शील्ड सेफ जोन एसएमएस संदेशों और कॉल में सामान्य स्कैम पैटर्न की पहचान करने के लिए उन्नत पैटर्न पहचान और मशीन लर्निंग का उपयोग करता है। यह इनकमिंग संचार की तुलना ज्ञात स्कैम पैटर्न के डेटाबेस से करता है, जिसे नए खतरों से बचाव के लिए नियमित रूप से अपडेट किया जाता है।",
    "faq.question.2": "क्या ऐप मेरे व्यक्तिगत संदेशों तक पहुंचेगा?",
    "faq.answer.2": "शील्ड सेफ जोन केवल संभावित स्कैम पैटर्न के लिए संदेशों को स्कैन करता है और आपके व्यक्तिगत संदेशों की सामग्री को स्टोर या साझा नहीं करता है। बेहतर गोपनीयता के लिए आप सेटिंग्स में केवल स्थानीय प्रोसेसिंग चुन सकते हैं।",
    "faq.question.3": "स्कैम डिटेक्शन कितना सटीक है?",
    "faq.answer.3": "हमारी डिटेक्शन सिस्टम की सटीकता दर 95% से अधिक है। हालांकि, कोई भी सिस्टम पूर्ण नहीं है, इसलिए हम आपको सुरक्षित संदेशों को चिह्नित करने की अनुमति देते हैं जो गलत तरीके से फ्लैग किए गए हो सकते हैं। यह फीडबैक समय के साथ हमारे डिटेक्शन एल्गोरिदम को बेहतर बनाता है।",
    "faq.question.4": "अगर मुझे कोई स्कैम मिले तो मुझे क्या करना चाहिए?",
    "faq.answer.4": "यदि आपको स्कैम संदेश या कॉल प्राप्त होता है, तो इसकी रिपोर्ट करने के लिए ऐप का उपयोग करें। किसी भी लिंक पर क्लिक करने या संदिग्ध नंबरों पर वापस कॉल करने से बचें। यदि आप पहले ही स्कैमर के साथ बातचीत कर चुके हैं, तो तुरंत अपने बैंक से संपर्क करें और किसी भी समझौता किए गए पासवर्ड को बदलें।",
    "faq.question.5": "क्या शील्ड सेफ जोन ऑफलाइन काम करता है?",
    "faq.answer.5": "बेसिक स्कैम डिटेक्शन नवीनतम डाउनलोड किए गए स्कैम पैटर्न का उपयोग करके ऑफलाइन काम करता है। हालांकि, सबसे अप-टू-डेट सुरक्षा के लिए, हम स्कैम डेटाबेस को अपडेट करने के लिए नियमित इंटरनेट कनेक्शन की सलाह देते हैं।"
  },
  te: {
    // App general
    "app.name": "షీల్డ్ సేఫ్ జోన్",
    "app.version": "v1.0.0 బీటా",
    "app.tagline": "డిజిటల్ మోసాలకు వ్యతిరేకంగా మీ వ్యక్తిగత కవచం",
    "app.loading": "మీ రక్షణను సెటప్ చేస్తోంది...",
    
    // Actions
    "action.back": "హోమ్‌కి తిరిగి వెళ్లండి",
    "action.scan": "ఇప్పుడు స్కాన్ చేయండి",
    "action.read": "మరింత చదవండి",
    "action.submit": "సమర్పించండి",
    "action.cancel": "రద్దు చేయండి",
    "action.next": "తరువాత",
    "action.prev": "మునుపటి",
    
    // Menu items
    "menu.home": "హోమ్",
    "menu.sms": "SMS రక్షణ",
    "menu.call": "కాల్ రక్షణ",
    "menu.history": "ప్రమాద చరిత్ర",
    "menu.education": "మోసం విద్య",
    "menu.emergency": "అత్యవసర సహాయం",
    "menu.settings": "సెట్టింగ్‌లు",
    "menu.about": "గురించి & సహాయం",
    
    // Home page
    "home.protection.status": "రక్షణ స్థితి",
    "home.protection.message": "యాక్టివ్ & ప్రొటెక్టెడ్",
    "home.scan.button": "స్కాన్",
    "home.scan.progress": "మీ పరికరాన్ని స్కాన్ చేస్తోంది",
    "home.stats.sms": "SMS ప్రమాదాలు",
    "home.stats.calls": "కాల్ ప్రమాదాలు",
    "home.stats.security": "భద్రత",
    "home.security.high": "అధిక",
    "home.security.medium": "మధ్యమ",
    "home.security.low": "తక్కువ",
    "home.fullscan": "పూర్తి స్కాన్ రన్ చేయండి",
    "home.fullscan.desc": "ప్రమాదాల కోసం లోతైన స్కాన్",
    "home.threat": "ప్రమాద చరిత్ర",
    "home.threat.desc": "గుర్తించిన ప్రమాదాలను చూడండి",
    "home.safety": "భద్రతా చిట్కాలు",
    "home.safety.desc": "సురక్షితంగా ఉండటం నేర్చుకోండి",
    
    // Settings
    "settings.language": "భాష",
    "settings.language.desc": "అప్లికేషన్ భాషను మార్చండి",
    "settings.english": "ఆంగ్లం",
    "settings.hindi": "హిందీ",
    "settings.telugu": "తెలుగు",
    "settings.darkMode": "డార్క్ మోడ్",
    "settings.darkMode.desc": "లైట్ మరియు డార్క్ థీమ్ మధ్య మార్చండి",
    "settings.notifications": "నోటిఫికేషన్లు",
    "settings.notifications.desc": "యాప్ అలర్ట్‌లను నియంత్రించండి",
    "settings.privacy": "గోప్యతా సెట్టింగ్‌లు",
    "settings.privacy.desc": "డేటా రక్షణను నిర్వహించండి",
    "settings.local": "స్థానిక ప్రాసెసింగ్",
    "settings.local.desc": "పరికరంలో డేటాను ప్రాసెస్ చేయండి",
    "settings.cloud": "క్లౌడ్ బ్యాకప్",
    "settings.cloud.desc": "క్లౌడ్‌కి డేటాను బ్యాకప్ చేయండి",
    "settings.appearance": "అప్పియరెన్స్",
    "settings.permissions": "యాప్ అనుమతులు",
    "settings.permissions.desc": "షీల్డ్ సేఫ్ జోన్ ఏమి యాక్సెస్ చేయగలదో నియంత్రించండి",
    "settings.sms": "SMS యాక్సెస్",
    "settings.calls": "కాల్ యాక్సెస్",
    "settings.contacts": "కాంటాక్ట్స్ యాక్సెస్",
    
    // About & Help
    "about.faq": "తరచుగా అడిగే ప్రశ్నలు",
    "about.help": "సహాయం పొందండి",
    "about.chat": "సపోర్ట్‌తో చాట్ చేయండి",
    "about.email": "ఇమెయిల్ సపోర్ట్",
    "about.call": "కాల్ సపోర్ట్",
    "about.learn": "మరింత తెలుసుకోండి",
    "about.privacy": "గోప్యతా విధానం",
    "about.terms": "సేవా నిబంధనలు",
    "about.rights": "సర్వహక్కులు కలివి",
    
    // Emergency
    "emergency.title": "అత్యవసర సహాయం",
    "emergency.button": "అత్యవసర అలర్ట్ పంపండి",
    "emergency.contacts": "విశ్వసనీయ కాంటాక్ట్స్",
    "emergency.add": "కాంటాక్ట్ జోడించండి",
    "emergency.silent": "మౌన అత్యవసర మోడ్",
    "emergency.silent.desc": "శబ్దం లేదా వైబ్రేషన్ లేకుండా అలర్ట్‌లను పంపండి",
    "emergency.templates": "అత్యవసర సందేశ టెంప్లేట్‌లు",
    
    // Call Monitoring
    "call.monitoring": "కాల్ మానిటరింగ్",
    "call.active": "కాల్ మానిటరింగ్ యాక్టివ్‌గా ఉంది. సంభావ్య స్కామ్‌ల కోసం ఇన్‌కమింగ్ కాల్‌లను విశ్లేషించి రియల్-టైమ్ హెచ్చరికలను అందిస్తాము.",
    "call.inactive": "కాల్ మానిటరింగ్ నిలిపివేయబడింది. అనుమానాస్పద కాల్‌ల గురించి హెచ్చరికలు పొందడానికి దీనిని ప్రారంభించండి.",
    "call.monitored": "పర్యవేక్షించబడినది:",
    "call.calls": "గత 7 రోజుల్లో విశ్లేషించిన కాల్స్",
    "call.settings": "అలర్ట్ సెట్టింగ్‌లు",
    "call.settings.desc": "అనుమానాస్పద కాల్ గుర్తించినప్పుడు మీకు ఎలా అలర్ట్ చేయాలో ఎంచుకోండి",
    "call.vibration.low": "తక్కువ (సున్నితమైన స్పందన)",
    "call.vibration.medium": "మధ్యస్థం (ప్రామాణిక వైబ్రేషన్)",
    "call.vibration.high": "అధిక (బలమైన అలర్ట్)",
    "call.vibration.off": "ఆఫ్ (దృశ్యమానం అలర్ట్ మాత్రమే)",
    "call.history": "కాల్ మానిటరింగ్ చరిత్ర",
    "call.duration": "వ్యవధి:",
    "call.flagged": "ఈ కాల్‌ను ఎందుకు ఫ్లాగ్ చేశారు?",
    "call.words": "గుర్తించిన అనుమానాస్పద పదాలు:",
    
    // Status labels
    "status.safe": "సురక్షితం",
    "status.suspicious": "అనుమానాస్పదం",
    "status.blocked": "బ్లాక్ చేయబడింది",
    
    // Education
    "education.progress": "మీ నేర్చుకోవడం పురోగతి",
    "education.articles": "స్కామ్ విద్య వ్యాసాలు",
    "education.read": "చదివారు",
    "education.readNow": "ఇప్పుడు చదవండి",
    "education.test": "మీ జ్ఞానాన్ని పరీక్షించండి",
    "education.quiz": "మీ స్కామ్ అవగాహనను పరీక్షించడానికి త్వరిత క్విజ్ తీసుకోండి",
    "education.start": "క్విజ్ ప్రారంభించండి",
    "education.badges": "మీ బ్యాడ్జ్‌లు",
    "education.whatsapp": "WhatsApp లో అప్‌డేట్‌గా ఉండండి",
    "education.whatsapp.desc": "WhatsApp లో క్రమం తప్పకుండా స్కామ్ అలర్ట్‌లు మరియు చిట్కాలను పొందండి",
    "education.enroll": "WhatsApp అప్‌డేట్‌ల కోసం నమోదు చేసుకోండి",
    
    // Success messages
    "success.shield": "రక్షణ యాక్టివ్",
    "success.shield.desc": "మీరు స్కామ్‌లు మరియు మోసపూరిత ప్రయత్నాల నుండి రక్షించబడ్డారు.",
    "success.scan": "స్కాన్ పూర్తయింది",
    "success.scan.desc": "మీ పరికరంలో ఎలాంటి ప్రమాదాలు గుర్తించబడలేదు.",
    "success.setup": "సెటప్ పూర్తయింది",
    "success.setup.desc": "మీ షీల్డ్ సేఫ్ జోన్ ఇప్పుడు కాన్ఫిగర్ చేయబడింది.",
    "success.support": "మద్దతు అభ్యర్థన పంపబడింది",
    "success.support.desc": "మా బృందం త్వరలో మీకు తిరిగి సమాచారం ఇస్తుంది.",
    
    // Toast messages
    "toast.setup.skip": "సెటప్ దాటవేయబడింది",
    "toast.setup.skip.desc": "మీరు తర్వాత సెట్టింగ్‌లను కాన్ఫిగర్ చేయవచ్చు.",
    
    // Setup wizard
    "setup.intro.title": "షీల్డ్ సేఫ్ జోన్‌కి స్వాగతం",
    "setup.intro.desc": "డిజిటల్ మోసాలకు వ్యతిరేకంగా మీ రక్షణ ఇక్కడ నుండి ప్రారంభమవుతుంది. గరిష్ట భద్రత కోసం మీ యాప్‌ను సెటప్ చేద్దాం.",
    "setup.intro.protection": "రియల్-టైమ్ రక్షణ",
    "setup.intro.protection.desc": "కాల్‌లు మరియు సందేశాలను పర్యవేక్షిస్తుంది",
    "setup.intro.alerts": "తక్షణ అలర్ట్‌లు",
    "setup.intro.alerts.desc": "సంభావ్య స్కామ్‌ల గురించి తెలియజేస్తుంది",
    "setup.intro.education": "స్కామ్ విద్య",
    "setup.intro.education.desc": "సాధారణ స్కామ్ పద్ధతుల గురించి తెలుసుకోండి",
    "setup.permissions.title": "అవసరమైన అనుమతులు",
    "setup.permissions.desc": "మిమ్మల్ని రక్షించడానికి షీల్డ్ సేఫ్ జోన్‌కు కొన్ని ఫీచర్‌లకు యాక్సెస్ అవసరం",
    "setup.permissions.sms": "SMS యాక్సెస్",
    "setup.permissions.sms.desc": "అనుమానాస్పద సందేశాలను పర్యవేక్షించడానికి",
    "setup.permissions.calls": "కాల్ యాక్సెస్",
    "setup.permissions.calls.desc": "అనుమానాస్పద కాల్‌లను పర్యవేక్షించడానికి",
    "setup.permissions.grant": "అనుమతి ఇవ్వండి",
    "setup.notifications.title": "నోటిఫికేషన్‌లను ప్రారంభించండి",
    "setup.notifications.desc": "సంభావ్య స్కామ్‌లు గుర్తించినప్పుడు తక్షణ అలర్ట్‌లు పొందండి",
    "setup.notifications.push": "పుష్ నోటిఫికేషన్‌లు",
    "setup.notifications.push.desc": "రియల్-టైమ్ స్కామ్ అలర్ట్‌ల కోసం",
    "setup.notifications.enable": "ప్రారంభించండి",
    "setup.notifications.later": "మీరు ఎప్పుడైనా నోటిఫికేషన్ సెట్టింగ్‌లను మార్చవచ్చు",
    "setup.emergency.title": "అత్యవసర కాంటాక్ట్‌లు",
    "setup.emergency.desc": "అత్యవసర సహాయం కోసం విశ్వసనీయ కాంటాక్ట్‌లను జోడించండి",
    "setup.emergency.alert": "మీరు స్కామ్‌కి గురైతే, మేము మీ విశ్వసనీయ కాంటాక్ట్‌లకు వెంటనే హెచ్చరిక చేయగలం",
    "setup.emergency.setup": "అత్యవసర కాంటాక్ట్‌లను సెటప్ చేయండి",
    "setup.emergency.skip": "మీరు ఈ దశను దాటవేసి తర్వాత అత్యవసర కాంటాక్ట్‌లను సెటప్ చేయవచ్చు",
    "setup.done.title": "సెటప్ పూర్తయింది!",
    "setup.done.desc": "మీరు ఇప్పుడు స్కామ్‌ల నుండి రక్షించబడ్డారు. మీరు ఎప్పుడైనా మీ సెట్టింగ్‌లను సర్దుబాటు చేయవచ్చు.",
    "setup.done.next": "తరువాత ఏమి చేయాలి?",
    "setup.done.protection": "మీ రక్షణ ఇప్పుడు యాక్టివ్‌గా ఉంది",
    "setup.done.sms": "SMS స్కామ్ మానిటరింగ్ ప్రారంభించబడింది",
    "setup.done.calls": "కాల్ మానిటరింగ్ సిద్ధంగా ఉంది",
    "setup.skip": "సెటప్‌ని దాటవేయండి",
    "setup.back": "వెనక్కి",
    "setup.next": "తరువాత",
    "setup.finish": "ముగించు",
    
    // FAQ questions
    "faq.question.1": "షీల్డ్ సేఫ్ జోన్ స్కామ్‌లను ఎలా గుర్తిస్తుంది?",
    "faq.answer.1": "షీల్డ్ సేఫ్ జోన్ SMS సందేశాలు మరియు కాల్‌లలో సాధారణ స్కామ్ పద్ధతులను గుర్తించడానికి అధునాతన ప్యాటర్న్ గుర్తింపు మరియు మెషీన్ లెర్నింగ్‌ను ఉపయోగిస్తుంది. ఇది ఇన్‌కమింగ్ కమ్యూనికేషన్‌లను తెలిసిన స్కామ్ ప్యాటర్న్‌ల డేటాబేస్‌తో పోలిస్తుంది, ఇది కొత్త ముప్పుల నుండి రక్షించడానికి క్రమం తప్పకుండా అప్‌డేట్ చేయబడుతుంది.",
    "faq.question.2": "యాప్ నా వ్యక్తిగత సందేశాలను యాక్సెస్ చేస్తుందా?",
    "faq.answer.2": "షీల్డ్ సేఫ్ జోన్ సంభావ్య స్కామ్ ప్యాటర్న్‌ల కోసం మాత్రమే సందేశాలను స్కాన్ చేస్తుంది మరియు మీ వ్యక్తిగత సందేశాల కంటెంట్‌ను నిల్వ చేయదు లేదా షేర్ చేయదు. మెరుగైన గోప్యత కోసం మీరు సెట్టింగ్‌లలో స్థానిక-మాత్రమే ప్రాసెసింగ్‌ని ఎంచుకోవచ్చు.",
    "faq.question.3": "స్కామ్ గుర్తింపు ఎంత ఖచ్చితమైనది?",
    "faq.answer.3": "మా గుర్తింపు వ్యవస్థ 95% కంటే ఎక్కువ ఖచ్చితత్వ రేటును కలిగి ఉంది. అయినప్పటికీ, ఏ సిస్టమ్ కూడా సంపూర్ణంగా లేదు, అందుకే తప్పుగా ఫ్లాగ్ చేయబడవచ్చుని సురక్షితమైన సందేశాలను గుర్తించడానికి మేము మిమ్మల్ని అనుమతిస్తాము. ఈ అభిప్రాయం కాలక్రమేణా మా గుర్తింపు అల్గారిథమ్‌లను మెరుగుపరుస్తుంది.",
    "faq.question.4": "నాకు ఒక స్కామ్ వస్తే నేను ఏమి చేయాలి?",
    "faq.answer.4": "మీకు స్కామ్ మెసేజ్ లేదా కాల్ వస్తే, దాన్ని రిపోర్ట్ చేయడానికి యాప్‌ని ఉపయోగించండి. ఏవైనా లింక్‌లపై క్లిక్ చేయడం లేదా అనుమానాస్పద నంబర్‌లకు తిరిగి కాల్ చేయడం మానుకోండి. మీరు ఇప్పటికే స్కామర్‌తో సంభాషించినట్లయితే, వెంటనే మీ బ్యాంక్‌ని సంప్రదించండి మరియు రాజీపడిన పాస్‌వర్డ్‌లను మార్చండి.",
    "faq.question.5": "షీల్డ్ సేఫ్ జోన్ ఆఫ్‌లైన్‌లో పని చేస్తుందా?",
    "faq.answer.5": "ప్రాథమిక స్కామ్ గుర్తింపు తాజాగా డౌన్‌లోడ్ చేయబడిన స్కామ్ ప్యాటర్న్‌లను ఉపయోగించి ఆఫ్‌లైన్‌లో పని చేస్తుంది. అయినప్పటికీ, అత్యంత తాజా రక్షణ కోసం, స్కామ్ డేటాబేస్‌ని అప్‌డేట్ చేయడానికి క్రమం తప్పకుండా ఇంటర్నెట్ కనెక్షన్‌ని సిఫార్సు చేస్తాము."
  }
};

// Create the language context
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

// Language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    // Initialize with stored language or default to English
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as SupportedLanguage) || "en";
  });

  useEffect(() => {
    // Save language preference to localStorage when it changes
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    // Get translation for the current language, fallback to English if not found
    return translations[language][key] || translations.en[key] || key;
  };

  // Update language function
  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
