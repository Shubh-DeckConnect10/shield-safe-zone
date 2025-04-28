
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Translations for all UI text
const translations: Record<Language, Record<string, string>> = {
  en: {
    // App-wide
    "app.name": "Shield Safe Zone",
    "app.version": "Version 1.0.0 Beta",
    "app.tagline": "Your trusted guardian against digital scams and fraud",
    "app.loading": "Loading...",
    
    // Navigation & Menu
    "menu.home": "Home",
    "menu.sms": "SMS Detection",
    "menu.call": "Call Monitoring",
    "menu.history": "Threat History",
    "menu.education": "Scam Education",
    "menu.emergency": "Emergency Help",
    "menu.settings": "Settings",
    "menu.about": "About/Help",
    
    // Home Page
    "home.protection.status": "Protected",
    "home.protection.message": "All systems active",
    "home.scan.button": "Quick Scan",
    "home.scan.progress": "Scanning for threats...",
    "home.stats.sms": "SMS Protected",
    "home.stats.calls": "Calls Screened",
    "home.stats.security": "Security Level",
    "home.security.high": "High",
    "home.fullscan": "Full System Scan",
    "home.fullscan.desc": "Check all apps & messages",
    "home.threat": "Threat History",
    "home.threat.desc": "View detected scam attempts",
    "home.safety": "Stay Safe",
    "home.safety.desc": "Learn how to avoid scams",
    
    // Success Messages
    "success.scan": "Quick scan completed!",
    "success.scan.desc": "No threats detected, you're safe!",
    "success.shield": "Shield Safe Zone activated!",
    "success.shield.desc": "You're now protected from scams.",
    "success.setup": "Setup completed!",
    "success.setup.desc": "You're now protected against scams.",
    "success.support": "Support ticket created",
    "success.support.desc": "Our team will get back to you within 24 hours.",
    
    // SMS Scam Detection Page
    "sms.title": "SMS Monitoring",
    "sms.active": "SMS monitoring is active. We'll analyze your messages for potential scams and provide real-time warnings.",
    "sms.inactive": "SMS monitoring is disabled. Enable it to protect yourself from scam messages.",
    "sms.monitored": "Monitored:",
    "sms.messages": "messages",
    "sms.filter": "Filter Level",
    "sms.filter.low": "Low (only obvious scams)",
    "sms.filter.medium": "Medium (recommended)",
    "sms.filter.high": "High (maximum protection)",
    "sms.history": "Recent Messages",
    "sms.safe": "Safe",
    "sms.suspicious": "Suspicious",
    "sms.blocked": "Blocked",
    "sms.flagged": "Why was this message flagged?",
    "sms.words": "Detected suspicious words:",
    
    // Call Protection Page
    "call.title": "Call Monitoring",
    "call.active": "Call monitoring is active. We'll analyze incoming calls for potential scams and provide real-time warnings.",
    "call.inactive": "Call monitoring is disabled. Enable it to receive warnings about suspicious calls.",
    "call.monitored": "Monitored:",
    "call.calls": "calls",
    "call.alert": "Alert Settings",
    "call.alert.desc": "Choose how you want to be alerted when a suspicious call is detected",
    "call.vibration.low": "Low (gentle pulse)",
    "call.vibration.medium": "Medium (standard vibration)",
    "call.vibration.high": "High (strong alert)",
    "call.vibration.off": "Off (visual alert only)",
    "call.history": "Call Monitoring History",
    "call.duration": "Duration:",
    "call.flagged": "Why was this call flagged?",
    "call.words": "Detected suspicious words:",
    
    // Education Hub
    "edu.title": "Your Learning Progress",
    "edu.articles": "Articles Read",
    "edu.scam": "Scam Education Articles",
    "edu.read": "Read",
    "edu.readnow": "Read Now",
    "edu.quiz.title": "Test Your Knowledge",
    "edu.quiz.desc": "Take a quick quiz to test your scam awareness",
    "edu.quiz.start": "Start Quiz",
    "edu.badges": "Your Badges",
    "edu.whatsapp.title": "Stay Updated on WhatsApp",
    "edu.whatsapp.desc": "Receive regular scam alerts and tips directly on WhatsApp",
    "edu.whatsapp.enroll": "Enroll for WhatsApp Updates",
    
    // Emergency Page
    "emergency.title": "Emergency Assistance",
    "emergency.button.desc": "Press the button to send emergency alerts to your trusted contacts",
    "emergency.silent": "Silent Emergency Mode",
    "emergency.silent.desc": "Send alerts without sound or vibration",
    "emergency.contacts": "Trusted Contacts",
    "emergency.contacts.add": "Add",
    "emergency.contacts.none": "No Contacts Yet",
    "emergency.contacts.none.desc": "Add trusted contacts who can help in emergency situations.",
    "emergency.contacts.add.full": "Add Emergency Contact",
    "emergency.contacts.add.more": "Add More Contacts",
    "emergency.templates": "Emergency Message Templates",
    "emergency.template.scam": "Scam Alert",
    "emergency.template.scam.text": "I'm being targeted by a scammer. Please call me immediately to help verify if this is legitimate.",
    "emergency.template.help": "Help Needed",
    "emergency.template.help.text": "I need urgent assistance. Please call me or contact authorities. My last known location is attached.",
    
    // Settings Page
    "settings.appearance": "Appearance",
    "settings.dark": "Dark Mode",
    "settings.dark.desc": "Use dark theme for the app",
    "settings.notifications": "Notifications",
    "settings.notify.scam": "Scam Alerts",
    "settings.notify.scam.desc": "Get notified about potential threats",
    "settings.notify.updates": "App Updates",
    "settings.notify.updates.desc": "Be notified when updates are available",
    "settings.language": "Language",
    "settings.language.desc": "Choose your preferred language",
    "settings.english": "English",
    "settings.hindi": "Hindi",
    "settings.telugu": "Telugu",
    "settings.privacy": "Privacy",
    "settings.privacy.local": "Local Processing",
    "settings.privacy.local.desc": "Process data on-device when possible",
    "settings.privacy.analytics": "Share Analytics",
    "settings.privacy.analytics.desc": "Help improve the app with anonymous data",
    "settings.advanced": "Advanced Settings",
    "settings.advanced.desc": "Configure advanced security options",
    
    // About/Help Page
    "about.faq": "Frequently Asked Questions",
    "about.help": "Need Help?",
    "about.chat": "Chat with Support",
    "about.email": "Email Support",
    "about.call": "Call Support",
    "about.learn": "Learn More",
    "about.privacy": "Privacy Policy",
    "about.terms": "Terms of Service",
    "about.rights": "All Rights Reserved",
    
    // Threat History Page
    "history.title": "Threat History",
    "history.desc": "Review detected scams and threats",
    "history.empty": "No threats detected yet",
    "history.empty.desc": "You're protected and no scams have been detected so far.",
    "history.filter": "Filter Threats",
    "history.filter.all": "All Threats",
    "history.filter.sms": "SMS Threats",
    "history.filter.call": "Call Threats",
    "history.date": "Date",
    "history.type": "Type",
    "history.status": "Status",
    "history.details": "View Details",
    "history.reported": "Reported",
    "history.blocked": "Blocked",
    
    // Setup Wizard
    "setup.welcome": "Welcome to Shield Safe Zone",
    "setup.desc": "Let's set up your scam protection",
    "setup.step": "Step",
    "setup.of": "of",
    "setup.permissions": "Required Permissions",
    "setup.permissions.desc": "These permissions are needed to protect you against scams",
    "setup.next": "Next",
    "setup.skip": "Skip",
    "setup.complete": "Complete Setup",
    
    // Dialog & Form Labels
    "dialog.add": "Add Contact",
    "dialog.name": "Name",
    "dialog.phone": "Phone Number",
    "dialog.relation": "Relation",
    "dialog.cancel": "Cancel",
    "dialog.add.action": "Add Contact",
    
    // Common Actions
    "action.view": "View",
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.cancel": "Cancel",
    "action.save": "Save",
    "action.confirm": "Confirm",
    "action.continue": "Continue",
    "action.skip": "Skip",
    "action.back": "Back",
    
    // Common Status Labels
    "status.protected": "Protected",
    "status.at.risk": "At Risk",
    "status.critical": "Critical",
    "status.analyzing": "Analyzing",
    "status.detected": "Detected",
    
    // Toast Messages
    "toast.language": "Language changed",
    "toast.protection.on": "Protection activated",
    "toast.protection.off": "Protection deactivated",
    "toast.setup.skip": "Setup skipped",
    "toast.setup.skip.desc": "You can complete setup later in Settings.",
    "toast.contact.add": "Contact added",
    "toast.contact.add.desc": "has been added as an emergency contact.",
    "toast.contact.remove": "Contact removed",
    "toast.contact.remove.desc": "has been removed from emergency contacts.",
    "toast.alert.sent": "Emergency alert sent",
    "toast.alert.sent.desc": "Your trusted contacts have been notified of your situation.",
    "toast.silent.on": "Silent mode enabled",
    "toast.silent.on.desc": "Emergency alerts will be sent silently.",
    "toast.silent.off": "Silent mode disabled",
    "toast.silent.off.desc": "Emergency alerts will make sound notifications.",
    "toast.article": "Article marked as read",
    "toast.article.desc": "Great job learning about",
    "toast.badge": "Badge Earned!",
    "toast.badge.desc": "You've earned the Scam Spotter badge!",
    "toast.quiz": "Quiz Starting",
    "toast.quiz.desc": "Get ready to test your scam awareness knowledge!",
    
    // Common Words
    "common.today": "Today",
    "common.yesterday": "Yesterday",
    "common.day.ago": "days ago",
    "common.family": "Family",
    "common.friend": "Friend",
    "common.other": "Other",
    "common.safe": "Safe",
    "common.suspicious": "Suspicious",
    "common.blocked": "Blocked",
    "common.scams": "scams",
  },
  
  // Hindi translations
  hi: {
    // App-wide
    "app.name": "शील्ड सेफ जोन",
    "app.version": "संस्करण 1.0.0 बीटा",
    "app.tagline": "डिजिटल धोखाधड़ी से आपका विश्वसनीय रक्षक",
    "app.loading": "लोड हो रहा है...",
    
    // Navigation & Menu
    "menu.home": "होम",
    "menu.sms": "एसएमएस जांच",
    "menu.call": "कॉल मॉनिटरिंग",
    "menu.history": "धोखाधड़ी इतिहास",
    "menu.education": "धोखाधड़ी शिक्षा",
    "menu.emergency": "आपातकालीन सहायता",
    "menu.settings": "सेटिंग्स",
    "menu.about": "जानकारी/सहायता",
    
    // Home Page
    "home.protection.status": "सुरक्षित",
    "home.protection.message": "सभी सिस्टम सक्रिय",
    "home.scan.button": "त्वरित स्कैन",
    "home.scan.progress": "खतरों के लिए स्कैन कर रहा है...",
    "home.stats.sms": "एसएमएस सुरक्षित",
    "home.stats.calls": "कॉल स्क्रीन किए",
    "home.stats.security": "सुरक्षा स्तर",
    "home.security.high": "उच्च",
    "home.fullscan": "पूर्ण सिस्टम स्कैन",
    "home.fullscan.desc": "सभी ऐप और संदेश जांचें",
    "home.threat": "धोखाधड़ी इतिहास",
    "home.threat.desc": "पहचानी गई धोखाधड़ी देखें",
    "home.safety": "सुरक्षित रहें",
    "home.safety.desc": "धोखाधड़ी से बचने के तरीके सीखें",
    
    // Success Messages
    "success.scan": "त्वरित स्कैन पूरा हुआ!",
    "success.scan.desc": "कोई खतरा नहीं मिला, आप सुरक्षित हैं!",
    "success.shield": "शील्ड सेफ जोन सक्रिय!",
    "success.shield.desc": "अब आप धोखाधड़ी से सुरक्षित हैं।",
    "success.setup": "सेटअप पूरा हुआ!",
    "success.setup.desc": "अब आप धोखाधड़ी से सुरक्षित हैं।",
    "success.support": "सहायता टिकट बनाया गया",
    "success.support.desc": "हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।",
    
    // SMS Scam Detection Page
    "sms.title": "एसएमएस मॉनिटरिंग",
    "sms.active": "एसएमएस मॉनिटरिंग सक्रिय है। हम संभावित धोखाधड़ी के लिए आपके संदेशों का विश्लेषण करेंगे और वास्तविक समय में चेतावनी प्रदान करेंगे।",
    "sms.inactive": "एसएमएस मॉनिटरिंग अक्षम है। धोखाधड़ी संदेशों से खुद को बचाने के लिए इसे सक्रिय करें।",
    "sms.monitored": "मॉनिटर किए गए:",
    "sms.messages": "संदेश",
    "sms.filter": "फिल्टर स्तर",
    "sms.filter.low": "निम्न (केवल स्पष्ट धोखाधड़ी)",
    "sms.filter.medium": "मध्यम (अनुशंसित)",
    "sms.filter.high": "उच्च (अधिकतम सुरक्षा)",
    "sms.history": "हाल के संदेश",
    "sms.safe": "सुरक्षित",
    "sms.suspicious": "संदिग्ध",
    "sms.blocked": "अवरुद्ध",
    "sms.flagged": "यह संदेश क्यों फ्लैग किया गया?",
    "sms.words": "संदिग्ध शब्द पहचाने गए:",
    
    // Call Protection Page
    "call.title": "कॉल मॉनिटरिंग",
    "call.active": "कॉल मॉनिटरिंग सक्रिय है। हम संभावित धोखाधड़ी के लिए आने वाले कॉल का विश्लेषण करेंगे और वास्तविक समय में चेतावनी प्रदान करेंगे।",
    "call.inactive": "कॉल मॉनिटरिंग अक्षम है। संदिग्ध कॉल के बारे में चेतावनी प्राप्त करने के लिए इसे सक्रिय करें।",
    "call.monitored": "मॉनिटर किए गए:",
    "call.calls": "कॉल",
    "call.alert": "अलर्ट सेटिंग्स",
    "call.alert.desc": "संदिग्ध कॉल का पता चलने पर आप किस तरह से सूचित होना चाहते हैं",
    "call.vibration.low": "निम्न (हल्का स्पंदन)",
    "call.vibration.medium": "मध्यम (मानक कंपन)",
    "call.vibration.high": "उच्च (मजबूत अलर्ट)",
    "call.vibration.off": "बंद (केवल दृश्य अलर्ट)",
    "call.history": "कॉल मॉनिटरिंग इतिहास",
    "call.duration": "अवधि:",
    "call.flagged": "यह कॉल क्यों फ्लैग किया गया?",
    "call.words": "संदिग्ध शब्द पहचाने गए:",
    
    // Education Hub
    "edu.title": "आपकी सीखने की प्रगति",
    "edu.articles": "पढ़े गए लेख",
    "edu.scam": "धोखाधड़ी शिक्षा लेख",
    "edu.read": "पढ़ा गया",
    "edu.readnow": "अभी पढ़ें",
    "edu.quiz.title": "अपने ज्ञान का परीक्षण करें",
    "edu.quiz.desc": "अपनी धोखाधड़ी जागरूकता का परीक्षण करने के लिए एक त्वरित प्रश्नोत्तरी लें",
    "edu.quiz.start": "प्रश्नोत्तरी शुरू करें",
    "edu.badges": "आपके बैज",
    "edu.whatsapp.title": "व्हाट्सएप पर अपडेट रहें",
    "edu.whatsapp.desc": "नियमित धोखाधड़ी अलर्ट और सुझाव सीधे व्हाट्सएप पर प्राप्त करें",
    "edu.whatsapp.enroll": "व्हाट्सएप अपडेट के लिए नामांकन करें",
    
    // Emergency Page
    "emergency.title": "आपातकालीन सहायता",
    "emergency.button.desc": "अपने विश्वसनीय संपर्कों को आपातकालीन अलर्ट भेजने के लिए बटन दबाएं",
    "emergency.silent": "शांत आपातकालीन मोड",
    "emergency.silent.desc": "बिना ध्वनि या कंपन के अलर्ट भेजें",
    "emergency.contacts": "विश्वसनीय संपर्क",
    "emergency.contacts.add": "जोड़ें",
    "emergency.contacts.none": "अभी तक कोई संपर्क नहीं",
    "emergency.contacts.none.desc": "आपातकालीन स्थितियों में मदद कर सकने वाले विश्वसनीय संपर्क जोड़ें।",
    "emergency.contacts.add.full": "आपातकालीन संपर्क जोड़ें",
    "emergency.contacts.add.more": "अधिक संपर्क जोड़ें",
    "emergency.templates": "आपातकालीन संदेश टेम्पलेट",
    "emergency.template.scam": "धोखाधड़ी अलर्ट",
    "emergency.template.scam.text": "मैं एक धोखेबाज द्वारा निशाना बनाया जा रहा हूं। कृपया यह सत्यापित करने में मदद के लिए मुझे तुरंत कॉल करें कि क्या यह वैध है।",
    "emergency.template.help": "सहायता चाहिए",
    "emergency.template.help.text": "मुझे तत्काल सहायता की आवश्यकता है। कृपया मुझे कॉल करें या अधिकारियों से संपर्क करें। मेरा अंतिम ज्ञात स्थान संलग्न है।",
    
    // Settings Page
    "settings.appearance": "दिखावट",
    "settings.dark": "डार्क मोड",
    "settings.dark.desc": "ऐप के लिए डार्क थीम का उपयोग करें",
    "settings.notifications": "सूचनाएँ",
    "settings.notify.scam": "धोखाधड़ी अलर्ट",
    "settings.notify.scam.desc": "संभावित खतरों के बारे में सूचित रहें",
    "settings.notify.updates": "ऐप अपडेट",
    "settings.notify.updates.desc": "जब अपडेट उपलब्ध हों तब सूचित करें",
    "settings.language": "भाषा",
    "settings.language.desc": "अपनी पसंदीदा भाषा चुनें",
    "settings.english": "अंग्रेज़ी",
    "settings.hindi": "हिंदी",
    "settings.telugu": "तेलुगु",
    "settings.privacy": "गोपनीयता",
    "settings.privacy.local": "स्थानीय प्रसंस्करण",
    "settings.privacy.local.desc": "जब संभव हो तब डेटा को डिवाइस पर ही संसाधित करें",
    "settings.privacy.analytics": "विश्लेषण साझा करें",
    "settings.privacy.analytics.desc": "गुमनाम डेटा के साथ ऐप में सुधार में मदद करें",
    "settings.advanced": "उन्नत सेटिंग्स",
    "settings.advanced.desc": "उन्नत सुरक्षा विकल्प कॉन्फ़िगर करें",
    
    // About/Help Page
    "about.faq": "अक्सर पूछे जाने वाले प्रश्न",
    "about.help": "सहायता चाहिए?",
    "about.chat": "सपोर्ट से चैट करें",
    "about.email": "ईमेल सपोर्ट",
    "about.call": "कॉल सपोर्ट",
    "about.learn": "अधिक जानें",
    "about.privacy": "गोपनीयता नीति",
    "about.terms": "सेवा की शर्तें",
    "about.rights": "सर्वाधिकार सुरक्षित",
    
    // Threat History Page
    "history.title": "धोखाधड़ी इतिहास",
    "history.desc": "पहचानी गई धोखाधड़ी और खतरों की समीक्षा करें",
    "history.empty": "अभी तक कोई खतरा पहचाना नहीं गया",
    "history.empty.desc": "आप सुरक्षित हैं और अब तक कोई धोखाधड़ी का पता नहीं चला है।",
    "history.filter": "खतरे फ़िल्टर करें",
    "history.filter.all": "सभी खतरे",
    "history.filter.sms": "एसएमएस खतरे",
    "history.filter.call": "कॉल खतरे",
    "history.date": "तारीख",
    "history.type": "प्रकार",
    "history.status": "स्थिति",
    "history.details": "विवरण देखें",
    "history.reported": "रिपोर्ट किया गया",
    "history.blocked": "अवरोधित",
    
    // Setup Wizard
    "setup.welcome": "शील्ड सेफ जोन में आपका स्वागत है",
    "setup.desc": "आइए आपकी धोखाधड़ी सुरक्षा सेटअप करें",
    "setup.step": "चरण",
    "setup.of": "का",
    "setup.permissions": "आवश्यक अनुमतियां",
    "setup.permissions.desc": "धोखाधड़ी से बचाने के लिए इन अनुमतियों की आवश्यकता है",
    "setup.next": "अगला",
    "setup.skip": "छोड़ें",
    "setup.complete": "सेटअप पूरा करें",
    
    // Dialog & Form Labels
    "dialog.add": "संपर्क जोड़ें",
    "dialog.name": "नाम",
    "dialog.phone": "फोन नंबर",
    "dialog.relation": "संबंध",
    "dialog.cancel": "रद्द करें",
    "dialog.add.action": "संपर्क जोड़ें",
    
    // Common Actions
    "action.view": "देखें",
    "action.edit": "संपादित करें",
    "action.delete": "हटाएं",
    "action.cancel": "रद्द करें",
    "action.save": "सहेजें",
    "action.confirm": "पुष्टि करें",
    "action.continue": "जारी रखें",
    "action.skip": "छोड़ें",
    "action.back": "वापस",
    
    // Common Status Labels
    "status.protected": "सुरक्षित",
    "status.at.risk": "जोखिम में",
    "status.critical": "महत्वपूर्ण",
    "status.analyzing": "विश्लेषण",
    "status.detected": "पता चला",
    
    // Toast Messages
    "toast.language": "भाषा बदल गई है",
    "toast.protection.on": "सुरक्षा सक्रिय की गई",
    "toast.protection.off": "सुरक्षा निष्क्रिय की गई",
    "toast.setup.skip": "सेटअप छोड़ा गया",
    "toast.setup.skip.desc": "आप बाद में सेटिंग्स में सेटअप पूरा कर सकते हैं।",
    "toast.contact.add": "संपर्क जोड़ा गया",
    "toast.contact.add.desc": "आपातकालीन संपर्क के रूप में जोड़ा गया है।",
    "toast.contact.remove": "संपर्क हटाया गया",
    "toast.contact.remove.desc": "आपातकालीन संपर्कों से हटा दिया गया है।",
    "toast.alert.sent": "आपातकालीन अलर्ट भेजा गया",
    "toast.alert.sent.desc": "आपके विश्वसनीय संपर्कों को आपकी स्थिति के बारे में सूचित कर दिया गया है।",
    "toast.silent.on": "साइलेंट मोड सक्रिय",
    "toast.silent.on.desc": "आपातकालीन अलर्ट शांति से भेजे जाएंगे।",
    "toast.silent.off": "साइलेंट मोड निष्क्रिय",
    "toast.silent.off.desc": "आपातकालीन अलर्ट ध्वनि सूचनाएं बजाएंगे।",
    "toast.article": "लेख पढ़ा हुआ चिह्नित किया गया",
    "toast.article.desc": "इसके बारे में जानने का शानदार काम",
    "toast.badge": "बैज अर्जित किया!",
    "toast.badge.desc": "आपने स्कैम स्पॉटर बैज अर्जित किया है!",
    "toast.quiz": "प्रश्नोत्तरी शुरू हो रही है",
    "toast.quiz.desc": "अपने धोखाधड़ी जागरूकता ज्ञान का परीक्षण करने के लिए तैयार हो जाइए!",
    
    // Common Words
    "common.today": "आज",
    "common.yesterday": "कल",
    "common.day.ago": "दिन पहले",
    "common.family": "परिवार",
    "common.friend": "दोस्त",
    "common.other": "अन्य",
    "common.safe": "सुरक्षित",
    "common.suspicious": "संदिग्ध",
    "common.blocked": "अवरुद्ध",
    "common.scams": "धोखाधड़ी",
  },
  
  // Telugu translations
  te: {
    // App-wide
    "app.name": "షీల్డ్ సేఫ్ జోన్",
    "app.version": "వెర్షన్ 1.0.0 బీటా",
    "app.tagline": "డిజిటల్ మోసాల నుండి మీ విశ్వసనీయ రక్షకుడు",
    "app.loading": "లోడ్ అవుతోంది...",
    
    // Navigation & Menu
    "menu.home": "హోమ్",
    "menu.sms": "SMS మోస గుర్తింపు",
    "menu.call": "కాల్ పర్యవేక్షణ",
    "menu.history": "ముప్పు చరిత్ర",
    "menu.education": "మోసం విద్య",
    "menu.emergency": "అత్యవసర సహాయం",
    "menu.settings": "సెట్టింగులు",
    "menu.about": "గురించి/సహాయం",
    
    // Home Page
    "home.protection.status": "రక్షించబడింది",
    "home.protection.message": "అన్ని సిస్టమ్‌లు యాక్టివ్‌గా ఉన్నాయి",
    "home.scan.button": "త్వరిత స్కాన్",
    "home.scan.progress": "ముప్పుల కోసం స్కాన్ చేస్తోంది...",
    "home.stats.sms": "SMS రక్షించబడినవి",
    "home.stats.calls": "కాల్స్ స్క్రీన్ చేయబడినవి",
    "home.stats.security": "భద్రతా స్థాయి",
    "home.security.high": "అధిక",
    "home.fullscan": "పూర్తి సిస్టమ్ స్కాన్",
    "home.fullscan.desc": "అన్ని యాప్‌లు & సందేశాలను తనిఖీ చేయండి",
    "home.threat": "ముప్పు చరిత్ర",
    "home.threat.desc": "గుర్తించబడిన మోసాలను చూడండి",
    "home.safety": "సురక్షితంగా ఉండండి",
    "home.safety.desc": "మోసాలను ఎలా నివారించాలో నేర్చుకోండి",
    
    // Success Messages
    "success.scan": "త్వరిత స్కాన్ పూర్తయింది!",
    "success.scan.desc": "ఎటువంటి ముప్పులు కనుగొనబడలేదు, మీరు సురక్షితంగా ఉన్నారు!",
    "success.shield": "షీల్డ్ సేఫ్ జోన్ యాక్టివేట్ చేయబడింది!",
    "success.shield.desc": "ఇప్పుడు మీరు మోసాల నుండి రక్షించబడ్డారు.",
    "success.setup": "సెటప్ పూర్తయింది!",
    "success.setup.desc": "ఇప్పుడు మీరు మోసాల నుండి రక్షించబడ్డారు.",
    "success.support": "సపోర్ట్ టికెట్ సృష్టించబడింది",
    "success.support.desc": "మా టీమ్ 24 గంటల లోపు మీకు తిరిగి సమాధానం ఇస్తుంది.",
    
    // SMS Scam Detection Page
    "sms.title": "SMS పర్యవేక్షణ",
    "sms.active": "SMS పర్యవేక్షణ యాక్టివ్‌గా ఉంది. సంభావ్య మోసాల కోసం మేము మీ సందేశాలను విశ్లేషిస్తాము మరియు రియల్-టైమ్ హెచ్చరికలను అందిస్తాము.",
    "sms.inactive": "SMS పర్యవేక్షణ నిలిపివేయబడింది. మోస సందేశాల నుండి మిమ్మల్ని రక్షించుకోవడానికి దీన్ని ప్రారంభించండి.",
    "sms.monitored": "పర్యవేక్షించబడినవి:",
    "sms.messages": "సందేశాలు",
    "sms.filter": "ఫిల్టర్ స్థాయి",
    "sms.filter.low": "తక్కువ (స్పష్టమైన మోసాలు మాత్రమే)",
    "sms.filter.medium": "మధ్యస్థం (సిఫార్సు చేయబడింది)",
    "sms.filter.high": "ఎక్కువ (గరిష్ట రక్షణ)",
    "sms.history": "ఇటీవలి సందేశాలు",
    "sms.safe": "సురక్షితం",
    "sms.suspicious": "అనుమానాస్పదంగా",
    "sms.blocked": "నిరోధించబడింది",
    "sms.flagged": "ఈ సందేశం ఎందుకు ఫ్లాగ్ చేయబడింది?",
    "sms.words": "అనుమానాస్పద పదాలు గుర్తించబడ్డాయి:",
    
    // Call Protection Page
    "call.title": "కాల్ పర్యవేక్షణ",
    "call.active": "కాల్ పర్యవేక్షణ యాక్టివ్‌గా ఉంది. సంభావ్య మోసాల కోసం మేము ఇన్‌కమింగ్ కాల్‌లను విశ్లేషిస్తాము మరియు రియల్-టైమ్ హెచ్చరికలను అందిస్తాము.",
    "call.inactive": "కాల్ పర్యవేక్షణ నిలిపివేయబడింది. అనుమానాస్పద కాల్‌ల గురించి హెచ్చరికలను స్వీకరించడానికి దీన్ని ప్రారంభించండి.",
    "call.monitored": "పర్యవేక్షించబడినవి:",
    "call.calls": "కాల్స్",
    "call.alert": "అలర్ట్ సెట్టింగులు",
    "call.alert.desc": "అనుమానాస్పద కాల్ గుర్తించినప్పుడు మీకు ఎలా తెలియజేయాలో ఎంచుకోండి",
    "call.vibration.low": "తక్కువ (సున్నితమైన స్పందన)",
    "call.vibration.medium": "మధ్యస్థం (ప్రామాణిక వైబ్రేషన్)",
    "call.vibration.high": "ఎక్కువ (బలమైన అలర్ట్)",
    "call.vibration.off": "ఆఫ్ (విజువల్ అలర్ట్ మాత్రమే)",
    "call.history": "కాల్ పర్యవేక్షణ చరిత్ర",
    "call.duration": "వ్యవధి:",
    "call.flagged": "ఈ కాల్ ఎందుకు ఫ్లాగ్ చేయబడింది?",
    "call.words": "అనుమానాస్పద పదాలు గుర్తించబడ్డాయి:",
    
    // Education Hub
    "edu.title": "మీ అభ్యాస పురోగతి",
    "edu.articles": "చదివిన వ్యాసాలు",
    "edu.scam": "మోసం విద్య వ్యాసాలు",
    "edu.read": "చదవబడింది",
    "edu.readnow": "ఇప్పుడే చదవండి",
    "edu.quiz.title": "మీ జ్ఞానాన్ని పరీక్షించండి",
    "edu.quiz.desc": "మీ మోసం అవగాహనను పరీక్షించడానికి త్వరిత క్విజ్ తీసుకోండి",
    "edu.quiz.start": "క్విజ్ ప్రారంభించండి",
    "edu.badges": "మీ బ్యాడ్జీలు",
    "edu.whatsapp.title": "వాట్సాప్‌లో అప్‌డేట్‌గా ఉండండి",
    "edu.whatsapp.desc": "క్రమం తప్పకుండా మోసం అలర్ట్‌లు మరియు చిట్కాలను నేరుగా వాట్సాప్‌లో స్వీకరించండి",
    "edu.whatsapp.enroll": "వాట్సాప్ నవీకరణల కోసం నమోదు చేసుకోండి",
    
    // Emergency Page
    "emergency.title": "అత్యవసర సహాయం",
    "emergency.button.desc": "మీ విశ్వసనీయ పరిచయాలకు అత్యవసర అలర్ట్‌లను పంపడానికి బటన్‌ను నొక్కండి",
    "emergency.silent": "నిశ్శబ్ద అత్యవసర మోడ్",
    "emergency.silent.desc": "శబ్దం లేదా వైబ్రేషన్ లేకుండా అలర్ట్‌లను పంపండి",
    "emergency.contacts": "విశ్వసనీయ పరిచయాలు",
    "emergency.contacts.add": "జోడించు",
    "emergency.contacts.none": "ఇంకా పరిచయాలు లేవు",
    "emergency.contacts.none.desc": "అత్యవసర పరిస్థితులలో సహాయపడగల విశ్వసనీయ పరిచయాలను జోడించండి.",
    "emergency.contacts.add.full": "అత్యవసర పరిచయాన్ని జోడించండి",
    "emergency.contacts.add.more": "మరిన్ని పరిచయాలను జోడించండి",
    "emergency.templates": "అత్యవసర సందేశ టెంప్లేట్‌లు",
    "emergency.template.scam": "మోసం అలర్ట్",
    "emergency.template.scam.text": "నేను ఒక మోసగాడి ద్వారా లక్ష్యంగా ఉన్నాను. ఇది చట్టబద్ధమైనదా కాదా సత్యాపించడంలో సహాయపడటానికి దయచేసి నాకు వెంటనే కాల్ చేయండి.",
    "emergency.template.help": "సహాయం అవసరం",
    "emergency.template.help.text": "నాకు తక్షణ సహాయం అవసరం. దయచేసి నాకు కాల్ చేయండి లేదా అధికారులను సంప్రదించండి. నా చివరిగా తెలిసిన ప్రాంతం జతచేయబడింది.",
    
    // Settings Page
    "settings.appearance": "అపియరెన్స్",
    "settings.dark": "డార్క్ మోడ్",
    "settings.dark.desc": "యాప్ కోసం డార్క్ థీమ్ ఉపయోగించండి",
    "settings.notifications": "నోటిఫికేషన్లు",
    "settings.notify.scam": "మోసం అలర్ట్‌లు",
    "settings.notify.scam.desc": "సంభావ్య ముప్పుల గురించి తెలియజేయబడండి",
    "settings.notify.updates": "యాప్ నవీకరణలు",
    "settings.notify.updates.desc": "నవీకరణలు అందుబాటులో ఉన్నప్పుడు తెలియజేయబడండి",
    "settings.language": "భాష",
    "settings.language.desc": "మీ ఇష్టమైన భాషను ఎంచుకోండి",
    "settings.english": "ఆంగ్లం",
    "settings.hindi": "హిందీ",
    "settings.telugu": "తెలుగు",
    "settings.privacy": "గోప్యత",
    "settings.privacy.local": "స్థానిక ప్రాసెసింగ్",
    "settings.privacy.local.desc": "సాధ్యమైనప్పుడు డేటాను పరికరంలోనే ప్రాసెస్ చేయండి",
    "settings.privacy.analytics": "వినియోగ గణాంకాలు పంచుకోండి",
    "settings.privacy.analytics.desc": "అనామక డేటాతో యాప్‌ను మెరుగుపరచడానికి సహాయపడండి",
    "settings.advanced": "అధునాతన సెట్టింగులు",
    "settings.advanced.desc": "అధునాతన భద్రతా ఎంపికలను కాన్ఫిగర్ చేయండి",
    
    // About/Help Page
    "about.faq": "తరచుగా అడిగే ప్రశ్నలు",
    "about.help": "సహాయం కావాలా?",
    "about.chat": "సపోర్ట్‌తో చాట్ చేయండి",
    "about.email": "ఇమెయిల్ సపోర్ట్",
    "about.call": "కాల్ సపోర్ట్",
    "about.learn": "మరింత తెలుసుకోండి",
    "about.privacy": "గోప్యతా విధానం",
    "about.terms": "సేవా నియమాలు",
    "about.rights": "సర్వహక్కులు రిజర్వు చేయబడ్డాయి",
    
    // Threat History Page
    "history.title": "ముప్పు చరిత్ర",
    "history.desc": "గుర్తించబడిన మోసాలు మరియు ముప్పులను సమీక్షించండి",
    "history.empty": "ఇంకా ఎటువంటి ముప్పులు గుర్తించబడలేదు",
    "history.empty.desc": "మీరు రక్షించబడ్డారు మరియు ఇంతవరకు ఎటువంటి మోసాలు గుర్తించబడలేదు.",
    "history.filter": "ముప్పులను ఫిల్టర్ చేయండి",
    "history.filter.all": "అన్ని ముప్పులు",
    "history.filter.sms": "SMS ముప్పులు",
    "history.filter.call": "కాల్ ముప్పులు",
    "history.date": "తేదీ",
    "history.type": "రకం",
    "history.status": "స్థితి",
    "history.details": "వివరాలను చూడండి",
    "history.reported": "నివేదించబడింది",
    "history.blocked": "నిరోధించబడింది",
    
    // Setup Wizard
    "setup.welcome": "షీల్డ్ సేఫ్ జోన్‌కి స్వాగతం",
    "setup.desc": "మీ మోసం రక్షణను సెటప్ చేద్దాం",
    "setup.step": "దశ",
    "setup.of": "లో",
    "setup.permissions": "అవసరమైన అనుమతులు",
    "setup.permissions.desc": "మోసాల నుండి మిమ్మల్ని రక్షించడానికి ఈ అనుమతులు అవసరం",
    "setup.next": "తదుపరి",
    "setup.skip": "దాటవేయండి",
    "setup.complete": "సెటప్ పూర్తి చేయండి",
    
    // Dialog & Form Labels
    "dialog.add": "పరిచయాన్ని జోడించండి",
    "dialog.name": "పేరు",
    "dialog.phone": "ఫోన్ నంబర్",
    "dialog.relation": "సంబంధం",
    "dialog.cancel": "రద్దు చేయండి",
    "dialog.add.action": "పరిచయాన్ని జోడించండి",
    
    // Common Actions
    "action.view": "చూడండి",
    "action.edit": "సవరించండి",
    "action.delete": "తొలగించండి",
    "action.cancel": "రద్దు చేయండి",
    "action.save": "సేవ్ చేయండి",
    "action.confirm": "నిర్ధారించండి",
    "action.continue": "కొనసాగించండి",
    "action.skip": "దాటవేయండి",
    "action.back": "వెనుకకు",
    
    // Common Status Labels
    "status.protected": "రక్షించబడింది",
    "status.at.risk": "ప్రమాదంలో",
    "status.critical": "క్రిటికల్",
    "status.analyzing": "విశ్లేషిస్తోంది",
    "status.detected": "గుర్తించబడింది",
    
    // Toast Messages
    "toast.language": "భాష మార్చబడింది",
    "toast.protection.on": "రక్షణ ప్రారంభించబడింది",
    "toast.protection.off": "రక్షణ నిలిపివేయబడింది",
    "toast.setup.skip": "సెటప్ దాటవేయబడింది",
    "toast.setup.skip.desc": "మీరు తర్వాత సెట్టింగులలో సెటప్ పూర్తి చేయవచ్చు.",
    "toast.contact.add": "పరిచయం జోడించబడింది",
    "toast.contact.add.desc": "అత్యవసర పరిచయంగా జోడించబడింది.",
    "toast.contact.remove": "పరిచయం తొలగించబడింది",
    "toast.contact.remove.desc": "అత్యవసర పరిచయాల నుండి తొలగించబడింది.",
    "toast.alert.sent": "అత్యవసర అలర్ట్ పంపబడింది",
    "toast.alert.sent.desc": "మీ విశ్వసనీయ పరిచయాలకు మీ పరిస్థితి గురించి తెలియజేయబడింది.",
    "toast.silent.on": "నిశ్శబ్ద మోడ్ ప్రారంభించబడింది",
    "toast.silent.on.desc": "అత్యవసర అలర్ట్‌లు నిశ్శబ్దంగా పంపబడతాయి.",
    "toast.silent.off": "నిశ్శబ్ద మోడ్ నిలిపివేయబడింది",
    "toast.silent.off.desc": "అత్యవసర అలర్ట్‌లు శబ్ద నోటిఫికేషన్‌లను ఇస్తాయి.",
    "toast.article": "వ్యాసం చదివినట్లుగా మార్క్ చేయబడింది",
    "toast.article.desc": "గురించి నేర్చుకోవడం చాలా బాగుంది",
    "toast.badge": "బ్యాడ్జ్ సంపాదించారు!",
    "toast.badge.desc": "మీరు స్కామ్ స్పాటర్ బ్యాడ్జ్ సంపాదించారు!",
    "toast.quiz": "క్విజ్ ప్రారంభమవుతోంది",
    "toast.quiz.desc": "మీ మోసం అవగాహన జ్ఞానాన్ని పరీక్షించడానికి సిద్ధంగా ఉండండి!",
    
    // Common Words
    "common.today": "నేడు",
    "common.yesterday": "నిన్న",
    "common.day.ago": "రోజుల క్రితం",
    "common.family": "కుటుంబం",
    "common.friend": "స్నేహితుడు",
    "common.other": "ఇతర",
    "common.safe": "సురక్షితం",
    "common.suspicious": "అనుమానాస్పదం",
    "common.blocked": "నిరోధించబడింది",
    "common.scams": "మోసాలు",
  }
};

// LanguageProvider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load preferred language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'hi', 'te'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Show toast notification for language change
    const msgs = {
      en: "Language changed to English",
      hi: "भाषा हिंदी में बदल गई है",
      te: "భాష తెలుగులో మార్చబడింది"
    };
    // Toast implementation will be handled in the consuming component
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
