import React from "react";
import { MoreHorizontal, FileEdit, Eye, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface FileItem {
  id: string;
  filename: string;
  size: string;
  time: string;
}

interface FileTableProps {
  fileItems: FileItem[];
  onEditFile: (file: FileItem) => void;
  onViewFile: (file: FileItem) => void;
  onDeleteFile: (fileId: string) => void;
}

export function FileTable({
  fileItems,
  onEditFile,
  onViewFile,
  onDeleteFile,
}: FileTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">File</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fileItems.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-900 font-['Inter']">{file.filename}</td>
                  <td className="w-px whitespace-nowrap py-3 px-4 text-sm text-gray-600 font-['Inter']">{file.size}</td>
                  <td className="w-px whitespace-nowrap py-3 px-4 text-sm text-gray-500 font-['Inter']">{file.time}</td>
                  <td className="w-px whitespace-nowrap px-7 text-left">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => onViewFile(file)}>
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditFile(file)}>
                          <FileEdit className="w-4 h-4 mr-2" /> Edit File
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600" 
                          onClick={() => {
                            if (confirm(`Delete ${file.filename}?`)) onDeleteFile(file.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}