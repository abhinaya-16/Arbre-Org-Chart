import React from "react";
import { MoreHorizontal, FileEdit, Eye, Trash2, CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const formatTime = (iso: string) => {
  const date = new Date(iso);

  return `${date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })} ${date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
};

interface FileItem {
  id: string;
  filename: string;
  size: string;
  time: string;
  url: string;
}

interface FileTableProps {
  fileItems: FileItem[];
  selectedFile: FileItem | null;
  onSelectFile: (file: FileItem) => void;
  // onEditFile: (file: FileItem) => void;
  // onViewFile: (file: FileItem) => void;
  onDeleteFile: (fileId: string) => void;
}

export function FileTable({
  fileItems,
  selectedFile,
  onSelectFile,
  onDeleteFile,
}: FileTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                File
              </th>
              <th className="w-px whitespace-nowrap text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="w-px whitespace-nowrap text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="w-px whitespace-nowrap text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="w-px whitespace-nowrap text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fileItems.map((file) => {
              const isSelected = selectedFile?.id === file.id;
              
              return (
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-900 font-['Inter'] font-medium">
                    {file.filename}
                  </td>
                  <td className="w-px whitespace-nowrap py-3 px-4">
                    {isSelected ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        Selected
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        Deselected
                      </span>
                    )}
                  </td>
                  <td className="w-px whitespace-nowrap py-3 px-4 text-sm text-gray-600 font-['Inter']">
                    {file.size}
                  </td>
                  <td className="w-px whitespace-nowrap py-3 px-4 text-sm text-gray-500 font-['Inter']">
                    {formatTime(file.time)}
                  </td>
                  <td 
                    className="w-px whitespace-nowrap py-3 px-7 text-left"
                    onClick={(e) => e.stopPropagation()} // Prevents selection when clicking actions
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 font-['Inter'] bg-white border border-gray-200 rounded-md shadow-lg">
                        <DropdownMenuItem 
                          key={file.id} 
                          onClick={() => onSelectFile(file)}
                          className={`hover:bg-gray-50 transition-colors cursor-pointer group ${
                            isSelected ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          <CheckIcon className="w-4 h-4 mr-2" /> Select
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onClick={() => onViewFile(file)} className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditFile(file)} className="cursor-pointer">
                          <FileEdit className="w-4 h-4 mr-2" /> Edit File
                        </DropdownMenuItem> */}
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600 cursor-pointer" 
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${file.filename}?`)) {
                              onDeleteFile(file.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete File
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}