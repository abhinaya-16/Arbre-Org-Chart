import React from "react";
import Logo from "../assets/ArbreLogo.svg";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Settings,
  FolderTreeIcon,
  TreePalm,
  TreesIcon,
  LucideTentTree,
  GitBranch,
  GitBranchIcon,
  Workflow,
  DatabaseIcon,
} from "lucide-react";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function Sidebar({
  activeItem,
  onItemClick,
}: SidebarProps) {
  const menuItems = [
    { id: "chart-view", label: "Chart View", icon: Workflow, },
    { id: "file-directory", label: "File Directory", icon: FileText,},
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-60 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <img src={Logo} alt="Arbre Logo" className="h-8 w-8 object-contain" />
          <span className="text-gray-900 font-['Inter'] text-lg">Arbre Org Chart</span>
        </div>

        <div className="mb-6">
          <h3 className="text-xs uppercase text-gray-500 tracking-wider mb-3">
            Administration
          </h3>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item.id)}
                  className={`cursor-pointer font-['Inter'] text-sm w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeItem === item.id
                      ? "bg-gray-100 text-gray-900 border-r-2 border-gray-600"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}