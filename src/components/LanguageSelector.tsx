
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'en' | 'hi' | 'te');
    
    // Show appropriate toast in new language
    const messages = {
      en: "Language changed to English",
      hi: "भाषा हिंदी में बदल गई है",
      te: "భాష తెలుగులో మార్చబడింది"
    };
    toast(messages[value as keyof typeof messages]);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <Label className="text-base font-medium">{t("settings.language")}</Label>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {t("settings.language.desc")}
      </p>
      
      <RadioGroup value={language} onValueChange={handleLanguageChange} className="mb-6">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="en" id="language-en" />
          <Label htmlFor="language-en">{t("settings.english")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="hi" id="language-hi" />
          <Label htmlFor="language-hi">{t("settings.hindi")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="te" id="language-te" />
          <Label htmlFor="language-te">{t("settings.telugu")}</Label>
        </div>
      </RadioGroup>
    </>
  );
};

export default LanguageSelector;
