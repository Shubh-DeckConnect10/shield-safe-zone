
import { Card, CardContent } from "@/components/ui/card";

const AboutAppCard = () => {
  return (
    <Card>
      <CardContent className="p-4 text-center text-sm text-muted-foreground">
        <div className="space-y-1">
          <p>Shield Safe Zone</p>
          <p>v1.0.0 Beta</p>
          <p>© 2025 Shield Safe Zone</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutAppCard;
