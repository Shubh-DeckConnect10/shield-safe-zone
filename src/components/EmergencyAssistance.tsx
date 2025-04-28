
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle, Plus, UserPlus, Edit, Trash, Share2, Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

const EmergencyAssistance = () => {
  const { t } = useLanguage();
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: "contact1",
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      relation: "Family"
    },
    {
      id: "contact2",
      name: "Priya Patel",
      phone: "+91 88123 45678",
      relation: "Friend"
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({});
  const [isSilentMode, setIsSilentMode] = useState(false);
  
  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error(t("missing_information"), {
        description: t("provide_name_phone")
      });
      return;
    }
    
    const contact = {
      id: `contact${Date.now()}`,
      name: newContact.name,
      phone: newContact.phone,
      relation: newContact.relation || "Other"
    };
    
    setContacts([...contacts, contact]);
    setNewContact({});
    setIsDialogOpen(false);
    
    toast.success(t("contact_added"), {
      description: `${contact.name} ${t("contact_added_desc")}`
    });
  };
  
  const removeContact = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    setContacts(contacts.filter(c => c.id !== id));
    
    toast(t("contact_removed"), {
      description: `${contact?.name} ${t("contact_removed_desc")}`
    });
  };
  
  const sendEmergencyAlert = () => {
    toast.success(t("emergency_alert_sent"), {
      description: t("contacts_notified")
    });
  };
  
  const toggleSilentMode = () => {
    setIsSilentMode(!isSilentMode);
    
    toast(isSilentMode ? t("silent_mode_disabled") : t("silent_mode_enabled"), {
      description: isSilentMode 
        ? t("sound_alerts") 
        : t("silent_alerts")
    });
  };

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Emergency Button */}
        <Card className="border-red-300 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-center text-red-600 dark:text-red-400">{t("emergency_assistance")}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <Button 
              variant="destructive" 
              size="lg" 
              className="h-20 w-20 rounded-full shadow-lg flex items-center justify-center"
              onClick={sendEmergencyAlert}
            >
              <AlertCircle className="h-10 w-10" />
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            {t("press_emergency_button")}
          </CardFooter>
        </Card>
        
        {/* Silent Mode */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">{t("silent_emergency_mode")}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t("send_alerts_without_sound")}
                  </p>
                </div>
              </div>
              <Switch 
                checked={isSilentMode} 
                onCheckedChange={toggleSilentMode} 
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Emergency Contacts */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">{t("trusted_contacts")}</h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => setIsDialogOpen(true)}
              disabled={contacts.length >= 5}
            >
              <Plus className="h-4 w-4" /> {t("add")}
            </Button>
          </div>
          
          {contacts.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">{t("no_contacts_yet")}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("add_trusted_help")}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsDialogOpen(true)}
                >
                  {t("add_emergency_contact")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {contacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {contact.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{contact.name}</h3>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">
                            {contact.phone} • {contact.relation}
                          </p>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-destructive"
                              onClick={() => removeContact(contact.id)}
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {contacts.length < 5 && (
                <Button 
                  variant="outline" 
                  className="w-full gap-1 border-dashed"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" /> {t("add_more_contacts")}
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Emergency Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("emergency_message_templates")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-3 rounded-md">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{t("scam_alert")}</h4>
                <Button variant="ghost" size="sm" className="h-6 p-1">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {t("scam_alert_message")}
              </p>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-md">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{t("help_needed")}</h4>
                <Button variant="ghost" size="sm" className="h-6 p-1">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {t("help_needed_message")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Contact Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("add_emergency_contact")}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                placeholder={t("full_name")}
                value={newContact.name || ''}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
            </div>
            
            <div className="grid w-full gap-1.5">
              <Label htmlFor="phone">{t("phone_number")}</Label>
              <Input
                id="phone"
                placeholder="+91 98765 43210"
                value={newContact.phone || ''}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
            </div>
            
            <div className="grid w-full gap-1.5">
              <Label htmlFor="relation">{t("relation")}</Label>
              <Input
                id="relation"
                placeholder={t("family_friend")}
                value={newContact.relation || ''}
                onChange={(e) => setNewContact({...newContact, relation: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t("cancel")}</Button>
            <Button onClick={addContact}>{t("add")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollArea>
  );
};

export default EmergencyAssistance;
