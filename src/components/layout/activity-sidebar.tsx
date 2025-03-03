'use client';

import { Card } from '@/components/ui/card';

export function ActivitySidebar() {
  return (
    <div className="flex h-full flex-col">
      {/* Welcome Message */}
      <div className="p-6 border-b">
        <h3 className="text-heading-sm font-semibold">Activity Feed</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Track your recent activities and notifications
        </p>
      </div>

      {/* Activity Feed */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">No recent activities</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
