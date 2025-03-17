import React from 'react';
import { Plus, Camera, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link to="/dashboard/plants">
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Plant
        </Button>
      </Link>
      <Link to="/dashboard/gallery">
        <Button variant="outline" size="sm">
          <Camera className="mr-2 h-4 w-4" />
          Add Photo
        </Button>
      </Link>
      <Link to="/dashboard/reminders">
        <Button variant="outline" size="sm">
          <Bell className="mr-2 h-4 w-4" />
          Set Reminder
        </Button>
      </Link>
    </div>
  );
}