
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle, Plus, UserPlus, Edit, Trash, Share2, Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
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
      toast.error("Missing information", {
        description: "Please provide both name and phone number."
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
    
    toast.success(t("success.support"), {
      description: `${contact.name} ${t("emergency.contacts")}`
    });
  };
  
  const removeContact = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    setContacts(contacts.filter(c => c.id !== id));
    
    toast("Contact removed", {
      description: `${contact?.name} has been removed from emergency contacts.`
    });
  };
  
  const sendEmergencyAlert = () => {
    toast.success("Emergency alert sent", {
      description: "Your trusted contacts have been notified of your situation."
    });
  };
  
  const toggleSilentMode = () => {
    setIsSilentMode(!isSilentMode);
    
    toast(isSilentMode ? "Silent mode disabled" : "Silent mode enabled", {
      description: isSilentMode 
        ? "Emergency alerts will make sound notifications." 
        : "Emergency alerts will be sent silently."
    });
  };

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Emergency Button */}
        <Card className="border-red-300 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-center text-red-600 dark:text-red-400">{t("emergency.title")}</CardTitle>
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
            {t("emergency.button")}
          </CardFooter>
        </Card>
        
        {/* Silent Mode */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">{t("emergency.silent")}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t("emergency.silent.desc")}
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
            <h2 className="text-lg font-medium">{t("emergency.contacts")}</h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => setIsDialogOpen(true)}
              disabled={contacts.length >= 5}
            >
              <Plus className="h-4 w-4" /> {t("emergency.add")}
            </Button>
          </div>
          
          {contacts.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">{t("emergency.contacts")}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("setup.emergency.desc")}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsDialogOpen(true)}
                >
                  {t("emergency.add")}
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
                  <Plus className="h-4 w-4" /> {t("emergency.add")}
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Emergency Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("emergency.templates")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-3 rounded-md">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{t("menu.sms")}</h4>
                <Button variant="ghost" size="sm" className="h-6 p-1">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                "I'm being targeted by a scammer. Please call me immediately to help verify if this is legitimate."
              </p>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-md">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{t("about.help")}</h4>
                <Button variant="ghost" size="sm" className="h-6 p-1">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                "I need urgent assistance. Please call me or contact authorities. My last known location is attached."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Contact Dialog - Fixed with DialogTitle and DialogDescription */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("emergency.add")}</DialogTitle>
            <DialogDescription>
              {t("setup.emergency.desc")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Full Name"
                value={newContact.name || ''}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
            </div>
            
            <div className="grid w-full gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+91 98765 43210"
                value={newContact.phone || ''}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
            </div>
            
            <div className="grid w-full gap-1.5">
              <Label htmlFor="relation">Relation</Label>
              <Input
                id="relation"
                placeholder="Family, Friend, etc."
                value={newContact.relation || ''}
                onChange={(e) => setNewContact({...newContact, relation: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t("action.cancel")}</Button>
            <Button onClick={addContact}>{t("action.submit")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollArea>
  );
};

export default EmergencyAssistance;
