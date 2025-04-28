import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/LanguageContext";

interface Threat {
  id: string;
  date: string;
  type: "SMS" | "Call";
  description: string;
  source: string;
  status: "Flagged" | "Resolved" | "Ignored";
}

const ThreatHistory = () => {
  const { t } = useLanguage();
  const [threats, setThreats] = useState<Threat[]>([
    {
      id: "1",
      date: "2024-01-20 14:30",
      type: "SMS",
      description: "Potential phishing attempt detected in SMS",
      source: "+91 9876543210",
      status: "Flagged",
    },
    {
      id: "2",
      date: "2024-01-19 09:15",
      type: "Call",
      description: "Caller ID spoofing suspected",
      source: "+1 5551234567",
      status: "Resolved",
    },
    {
      id: "3",
      date: "2024-01-18 18:45",
      type: "SMS",
      description: "Message contains suspicious links",
      source: "Unknown",
      status: "Ignored",
    },
  ]);

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("threat_history")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A history of threats detected by Shield Safe Zone.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threats.map((threat) => (
                  <TableRow key={threat.id}>
                    <TableCell className="font-medium">{threat.date}</TableCell>
                    <TableCell>{threat.type}</TableCell>
                    <TableCell>{threat.source}</TableCell>
                    <TableCell>{threat.description}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{threat.status}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem>
                                  <Info className="mr-2 h-4 w-4" /> <span>View Details</span>
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Threat Details</DialogTitle>
                                  <DialogDescription>
                                    Here are more details about the detected threat.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="date" className="text-right">
                                      Date
                                    </label>
                                    <input
                                      type="text"
                                      id="date"
                                      value={threat.date}
                                      className="col-span-3 bg-muted rounded-md px-2 py-1.5"
                                      readOnly
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="type" className="text-right">
                                      Type
                                    </label>
                                    <input
                                      type="text"
                                      id="type"
                                      value={threat.type}
                                      className="col-span-3 bg-muted rounded-md px-2 py-1.5"
                                      readOnly
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="source" className="text-right">
                                      Source
                                    </label>
                                    <input
                                      type="text"
                                      id="source"
                                      value={threat.source}
                                      className="col-span-3 bg-muted rounded-md px-2 py-1.5"
                                      readOnly
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="description" className="text-right">
                                      Description
                                    </label>
                                    <textarea
                                      id="description"
                                      value={threat.description}
                                      className="col-span-3 bg-muted rounded-md px-2 py-1.5 resize-none"
                                      readOnly
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="status" className="text-right">
                                      Status
                                    </label>
                                    <input
                                      type="text"
                                      id="status"
                                      value={threat.status}
                                      className="col-span-3 bg-muted rounded-md px-2 py-1.5"
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                          <DropdownMenuItem>Ignore Threat</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default ThreatHistory;
