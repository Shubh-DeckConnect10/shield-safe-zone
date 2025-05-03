
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Card, CardContent } from '@/components/ui/card';

const CapacitorStatus = () => {
  const [platform, setPlatform] = useState<string>('web');
  const [isNative, setIsNative] = useState<boolean>(false);

  useEffect(() => {
    // Check if running on a native platform
    setPlatform(Capacitor.getPlatform());
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  if (process.env.NODE_ENV === 'development') {
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium">Capacitor Status</h3>
          <p className="text-xs text-muted-foreground">Platform: {platform}</p>
          <p className="text-xs text-muted-foreground">
            Running on: {isNative ? 'Native Device' : 'Web Browser'}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return null; // Don't show in production
};

export default CapacitorStatus;
