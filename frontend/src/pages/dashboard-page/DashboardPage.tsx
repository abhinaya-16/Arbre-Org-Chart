import React, { useState } from 'react';
import { Sidebar } from './components/SideBar';
import { FileManagement } from './components/FileManagement';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('file-management');

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'file-management':
        return <FileManagement />;
      case 'dashboard':
        return (
          <div className="flex-1 bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-xl text-gray-900 mb-0.5 font-['Inter']">Dashboard</h1>
              <p className="text-gray-600 text-sm font-['Inter']">Dashboard content coming soon...</p>
            </div>
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
    <div className="h-screen w-screen flex bg-gray-50">
      <Sidebar 
        activeItem={activeMenuItem} 
        onItemClick={handleMenuItemClick} 
      />
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
      <Toaster />
    </div>
  );
}