
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageSquare, Mail, Phone, FileQuestion, ChevronRight, ExternalLink, Shield } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutHelp = () => {
  const { t } = useLanguage();
  
  const faqs = [
    {
      question: t("faq.question.1"),
      answer: t("faq.answer.1")
    },
    {
      question: t("faq.question.2"),
      answer: t("faq.answer.2")
    },
    {
      question: t("faq.question.3"),
      answer: t("faq.answer.3")
    },
    {
      question: t("faq.question.4"),
      answer: t("faq.answer.4")
    },
    {
      question: t("faq.question.5"),
      answer: t("faq.answer.5")
    }
  ];
  
  const showContactSupport = () => {
    toast.success(t("success.support"), {
      description: t("success.support.desc")
    });
  };

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* App Info */}
        <div className="text-center space-y-2 py-4">
          <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{t("app.name")}</h1>
          <p className="text-sm text-muted-foreground">{t("app.version")}</p>
          <p className="text-sm max-w-[250px] mx-auto text-muted-foreground">
            {t("app.tagline")}
          </p>
        </div>
        
        <Separator />
        
        {/* FAQ Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-primary" />
            <span>{t("about.faq")}</span>
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>{t("about.help")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            <Button 
              className="w-full justify-start gap-2" 
              variant="outline"
              onClick={showContactSupport}
            >
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>{t("about.chat")}</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            
            <Button className="w-full justify-start gap-2" variant="outline">
              <Mail className="h-4 w-4 text-primary" />
              <span>{t("about.email")}</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            
            <Button className="w-full justify-start gap-2" variant="outline">
              <Phone className="h-4 w-4 text-primary" />
              <span>{t("about.call")}</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Learn More */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium">{t("about.learn")}</h3>
            
            <Button variant="outline" className="w-full justify-between">
              <span>{t("about.privacy")}</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="w-full justify-between">
              <span>{t("about.terms")}</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Credits */}
        <div className="text-center text-xs text-muted-foreground space-y-1 pt-2">
          <p>© 2025 {t("app.name")}</p>
          <p>{t("about.rights")}</p>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AboutHelp;
