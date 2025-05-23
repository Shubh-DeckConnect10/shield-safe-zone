
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageSquare, Mail, Phone, FileQuestion, ChevronRight, ExternalLink, Shield } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

const AboutHelp = () => {
  const faqs = [
    {
      question: "How does Shield Safe Zone detect scams?",
      answer: "Shield Safe Zone uses advanced pattern recognition and machine learning to identify common scam patterns in SMS messages and calls. It compares incoming communications against a database of known scam patterns, which is regularly updated to protect against new threats."
    },
    {
      question: "Will the app access my personal messages?",
      answer: "Shield Safe Zone only scans messages for potential scam patterns and does not store or share the content of your personal messages. You can choose local-only processing in settings for enhanced privacy."
    },
    {
      question: "How accurate is scam detection?",
      answer: "Our detection system has a high accuracy rate of over 95%. However, no system is perfect, which is why we allow you to mark safe messages that might be incorrectly flagged. This feedback improves our detection algorithms over time."
    },
    {
      question: "What should I do if I receive a scam?",
      answer: "If you receive a scam message or call, use the app to report it. Avoid clicking on any links or calling back suspicious numbers. If you've already interacted with a scammer, contact your bank immediately and change any compromised passwords."
    },
    {
      question: "Does Shield Safe Zone work offline?",
      answer: "Basic scam detection works offline using the latest downloaded scam patterns. However, for the most up-to-date protection, we recommend regular internet connection to update the scam database."
    }
  ];
  
  const showContactSupport = () => {
    toast.success("Support ticket created", {
      description: "Our team will get back to you within 24 hours."
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
          <h1 className="text-2xl font-bold">Shield Safe Zone</h1>
          <p className="text-sm text-muted-foreground">Version 1.0.0 Beta</p>
          <p className="text-sm max-w-[250px] mx-auto text-muted-foreground">
            Your trusted guardian against digital scams and fraud
          </p>
        </div>
        
        <Separator />
        
        {/* FAQ Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-primary" />
            <span>Frequently Asked Questions</span>
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
              <span>Need Help?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            <Button 
              className="w-full justify-start gap-2" 
              variant="outline"
              onClick={showContactSupport}
            >
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>Chat with Support</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            
            <Button className="w-full justify-start gap-2" variant="outline">
              <Mail className="h-4 w-4 text-primary" />
              <span>Email Support</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            
            <Button className="w-full justify-start gap-2" variant="outline">
              <Phone className="h-4 w-4 text-primary" />
              <span>Call Support</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Learn More */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium">Learn More</h3>
            
            <Button variant="outline" className="w-full justify-between">
              <span>Privacy Policy</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="w-full justify-between">
              <span>Terms of Service</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Credits */}
        <div className="text-center text-xs text-muted-foreground space-y-1 pt-2">
          <p>© 2025 Shield Safe Zone</p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AboutHelp;
