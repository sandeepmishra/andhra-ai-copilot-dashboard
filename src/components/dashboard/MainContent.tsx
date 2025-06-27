
import React from 'react';
import { DashboardOverview } from './views/DashboardOverview';
import { DataUpload } from './views/DataUpload';
import { VisualizationHub } from './views/VisualizationHub';
import { GeospatialView } from './views/GeospatialView';
import { ActivityLog } from './views/ActivityLog';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainContentProps {
  activeView: string;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
}

export const MainContent = ({ activeView, isChatOpen, setIsChatOpen }: MainContentProps) => {
  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardOverview />;
      case 'upload':
        return <DataUpload />;
      case 'visualization':
        return <VisualizationHub />;
      case 'geospatial':
        return <GeospatialView />;
      case 'activity':
        return <ActivityLog />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white capitalize">
              {activeView === 'overview' ? 'Dashboard Overview' : activeView.replace(/([A-Z])/g, ' $1')}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              AI-powered CDR/IPDR analysis and investigation tools
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setIsChatOpen(!isChatOpen)}
              variant={isChatOpen ? "default" : "outline"}
              size="sm"
              className="flex items-center space-x-2"
            >
              {isChatOpen ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
              <span>{isChatOpen ? 'Close Chat' : 'Open AI Chat'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
};
