
import React from 'react';
import { 
  LayoutDashboard, FileUp, MessageSquare, Activity, 
  MapPin, BarChart3, Settings, Users, Shield 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Data Upload', icon: FileUp },
    { id: 'analysis', label: 'AI Analysis', icon: MessageSquare },
    { id: 'visualization', label: 'Visualization', icon: BarChart3 },
    { id: 'geospatial', label: 'Geospatial', icon: MapPin },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'suspects', label: 'Suspects', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-lg font-bold text-white">AP Police</h1>
            <p className="text-sm text-slate-400">CDR/IPDR Analysis</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
              activeView === item.id
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">SI</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">SI Kumar</p>
            <p className="text-xs text-slate-400">Cyber Crime Unit</p>
          </div>
        </div>
      </div>
    </div>
  );
};
