import React, { useState } from 'react';
import { Sidebar } from './components/SideBar';
import { FileManagement } from './components/FileManagement';
import { Toaster } from './components/ui/sonner';
import OrgChartPage from '../org-chart-page/OrgChartPage';

export default function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('file-management');

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'file-management':
        return <FileManagement />;
      case 'chart-view':
        return (
          // <div className="flex-1 bg-gray-50 p-6">
          //   <div className="max-w-7xl mx-auto">
          //     {/* <h1 className="text-xl text-gray-900 mb-0.5 font-['Inter']">Chart View</h1>
          //     <p className="text-gray-600 text-sm font-['Inter']">Chart view coming soon...</p> */}
          //     <OrgChartPage />
          //   </div>
          // </div>
          <div className="pt-0">
            <OrgChartPage />
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-xl text-gray-900 mb-0.5 font-['Inter']">Settings</h1>
              <p className="text-gray-600 text-sm font-['Inter']">Settings content coming soon...</p>
            </div>
          </div>
        );
      default:
        return <FileManagement />;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-gray-50 overflow-hidden">
      <Sidebar 
        activeItem={activeMenuItem} 
        onItemClick={handleMenuItemClick} 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
      <Toaster />
    </div>
  );
}