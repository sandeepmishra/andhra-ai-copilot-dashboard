
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MainContent } from '@/components/dashboard/MainContent';
import { ChatPanel } from '@/components/dashboard/ChatPanel';
import { SidebarProvider } from '@/components/ui/sidebar';

const Index = () => {
  const [activeView, setActiveView] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <SidebarProvider>
        <div className="flex w-full">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          
          <div className="flex-1 flex">
            <MainContent 
              activeView={activeView} 
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
            />
            
            {isChatOpen && (
              <ChatPanel onClose={() => setIsChatOpen(false)} />
            )}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
