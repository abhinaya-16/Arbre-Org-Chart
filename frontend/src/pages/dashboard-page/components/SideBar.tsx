import React from "react";
import Logo from "../assets/ArbreLogo.svg";
import {
  FileText,
  Settings,
  Workflow,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({
  activeItem,
  onItemClick,
  isCollapsed,
  onToggle
}: SidebarProps) {
  const menuItems = [
    { id: "chart-view", label: "Chart View", icon: Workflow, },
    { id: "file-directory", label: "File Directory", icon: FileText,},
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`relative bg-white border-r border-gray-200 h-full transition-all duration-300 ease-in-out ${
      isCollapsed ? "w-20" : "w-64"
    }`}>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="absolute -right-3 top-9 h-6 w-6 rounded-full border border-gray-200 bg-white p-0 hover:bg-gray-100 z-50 cursor-pointer shadow-sm"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      <div className="p-6">
        <div className={`flex items-center space-x-2 mb-8 ${isCollapsed ? "justify-center" : ""}`}>
          <img src={Logo} alt="Arbre Logo" className="h-8 w-8 object-contain shrink-0" />
          {!isCollapsed && (
            <span className="text-gray-900 font-['Inter'] text-lg truncate">Arbre Org Chart</span>
          )}
        </div>
        <div className="mb-6">
          {!isCollapsed && (
            <h3 className="text-xs uppercase text-gray-500 tracking-wider mb-3">
              Administration
            </h3>
          )}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item.id)}
                  className={`cursor-pointer font-['Inter'] text-sm w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    isCollapsed ? "justify-center" : "space-x-3"
                  } ${
                    activeItem === item.id
                      ? "bg-gray-100 text-gray-900 border-r-2 border-gray-600"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  title={isCollapsed ? item.label : ""} // Show tooltip when collapsed
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}