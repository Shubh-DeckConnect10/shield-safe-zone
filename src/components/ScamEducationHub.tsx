
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BookOpen, Award, ChevronRight, CheckCircle, TrendingUp, ArrowRight, BarChart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ScamArticle {
  id: string;
  title: string;
  description: string;
  readTime: string;
  isRead: boolean;
  category: string;
}

interface ScamBadge {
  id: string;
  name: string;
  description: string;
  progress: number;
  icon: JSX.Element;
}

const ScamEducationHub = () => {
  const [articles, setArticles] = useState<ScamArticle[]>([
    {
      id: "article1",
      title: "How to Identify Banking Scam Messages",
      description: "Learn the warning signs of fake banking messages and how to verify genuine communications.",
      readTime: "3 min read",
      isRead: false,
      category: "Banking"
    },
    {
      id: "article2",
      title: "The UPI Scam Tactics to Watch For",
      description: "Understand how scammers try to access your UPI accounts and how to keep them secure.",
      readTime: "5 min read",
      isRead: true,
      category: "UPI"
    },
    {
      id: "article3",
      title: "Avoiding KYC Update Scams",
      description: "Protect yourself from fraudsters asking for KYC updates that steal your personal information.",
      readTime: "4 min read",
      isRead: false,
      category: "KYC"
    },
    {
      id: "article4",
      title: "Digital Arrest Scams: What to Do",
      description: "How to recognize and respond to fake police or government arrest threats over the phone.",
      readTime: "6 min read",
      isRead: false,
      category: "Government"
    }
  ]);
  
  const [badges, setBadges] = useState<ScamBadge[]>([
    {
      id: "badge1",
      name: "Scam Spotter",
      description: "Complete 3 articles about identifying scams",
      progress: 33,
      icon: <Award className="h-8 w-8 text-amber-500" />
    },
    {
      id: "badge2",
      name: "Quiz Master",
      description: "Score 100% on the scam awareness quiz",
      progress: 0,
      icon: <Award className="h-8 w-8 text-blue-500" />
    },
    {
      id: "badge3",
      name: "Security Guardian",
      description: "Keep protection active for 7 consecutive days",
      progress: 85,
      icon: <Award className="h-8 w-8 text-green-500" />
    }
  ]);

  const markArticleAsRead = (id: string) => {
    setArticles(articles.map(article => 
      article.id === id 
        ? { ...article, isRead: true } 
        : article
    ));
    
    const article = articles.find(a => a.id === id);
    if (article) {
      toast.success("Article marked as read", {
        description: `Great job learning about ${article.category} scams!`
      });
      
      // Update badge progress if it's the scam spotter badge
      const spotterId = "badge1";
      const readCount = articles.filter(a => a.isRead || a.id === id).length;
      const progress = Math.min(Math.round((readCount / 3) * 100), 100);
      
      setBadges(badges.map(badge => 
        badge.id === spotterId 
          ? { ...badge, progress } 
          : badge
      ));
      
      if (progress === 100) {
        toast("Badge Earned!", {
          description: "You've earned the Scam Spotter badge!"
        });
      }
    }
  };

  const startQuiz = () => {
    toast("Quiz Starting", {
      description: "Get ready to test your scam awareness knowledge!"
    });
    // Quiz functionality would be implemented here
  };

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Education Progress */}
        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>Your Learning Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Articles Read</span>
              <span className="text-sm font-medium">{articles.filter(a => a.isRead).length}/{articles.length}</span>
            </div>
            <Progress value={(articles.filter(a => a.isRead).length / articles.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Articles */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Scam Education Articles</span>
          </h2>
          
          {articles.map((article) => (
            <Card key={article.id}>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium flex items-center gap-2">
                    {article.isRead && <CheckCircle className="h-4 w-4 text-green-500" />}
                    <span>{article.title}</span>
                  </h3>
                  <Badge>{article.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {article.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => markArticleAsRead(article.id)}
                    disabled={article.isRead}
                  >
                    {article.isRead ? 'Read' : 'Read Now'}
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz Section */}
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Test Your Knowledge</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Take a quick quiz to test your scam awareness
                </p>
              </div>
              <Button
                onClick={startQuiz}
                className="gap-1"
              >
                Start Quiz
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Your Badges</span>
          </h2>
          
          {badges.map((badge) => (
            <Card key={badge.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-muted/50 rounded-full p-2">
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{badge.name}</h3>
                      <span className="text-sm font-medium">{badge.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {badge.description}
                    </p>
                    <Progress value={badge.progress} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* WhatsApp Education */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stay Updated on WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Receive regular scam alerts and tips directly on WhatsApp
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2">
              <BarChart className="h-4 w-4" />
              Enroll for WhatsApp Updates
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default ScamEducationHub;
