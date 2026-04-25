import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FileTable } from "./FileTable";
import { AddUserModal } from "./AddUserModal"; // Suggest renaming this component to AddFileModal later
import { toast } from "sonner";

interface FileItem {
  id: string;
  filename: string;
  size: string;
  time: string;
}

const initialFiles: FileItem[] = [
  { id: "1", filename: "Acme_Employees.xlsx", size: "2.4 MB", time: "Apr 25, 2026 10:12 AM" },
  { id: "2", filename: "TechNova_Org.xlsx", size: "1.8 MB", time: "Apr 25, 2026 09:47 AM" },
  { id: "3", filename: "BrightPath_Team.xlsx", size: "3.1 MB", time: "Apr 24, 2026 04:22 PM" },
  { id: "4", filename: "Zenith_Staff.xlsx", size: "2.9 MB", time: "Apr 24, 2026 01:15 PM" },
  { id: "5", filename: "BlueWave_Hierarchy.xlsx", size: "1.6 MB", time: "Apr 23, 2026 11:03 AM" },
  { id: "6", filename: "Acme_Final.xlsx", size: "2.7 MB", time: "Apr 23, 2026 05:40 PM" },
  { id: "7", filename: "TechNova_New.xlsx", size: "1.9 MB", time: "Apr 22, 2026 08:55 AM" },
  { id: "8", filename: "BrightPath_Update.xlsx", size: "3.3 MB", time: "Apr 21, 2026 06:18 PM" },
  { id: "9", filename: "Zenith_Latest.xlsx", size: "2.5 MB", time: "Apr 21, 2026 02:09 PM" },
  { id: "10", filename: "BlueWave_FINAL.xlsx", size: "1.7 MB", time: "Apr 20, 2026 12:33 PM" },
];

export function FileManagement() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNewFile = () => setIsAddModalOpen(true);
  const handleCloseModal = () => setIsAddModalOpen(false);

  const handleAddFile = (newFile: FileItem) => {
    setFiles((prev) => [newFile, ...prev]);
    toast.success(`${newFile.filename} has been added successfully!`);
  };

  const handleDeleteFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    if (file) toast.success(`${file.filename} deleted successfully.`);
  };

  const handleEditFile = (file: FileItem) => toast.info(`Editing ${file.filename}...`);
  const handleViewFile = (file: FileItem) => toast.info(`Viewing ${file.filename}...`);

  const filteredFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 h-full flex flex-col">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-xl text-gray-900 mb-0.5 font-['Inter']">File Management</h1>
            <p className="text-gray-600 text-sm font-['Inter']">Manage excel files for org-charts</p>
          </div>
          <Button onClick={handleAddNewFile} className="font-['Inter'] cursor-pointer bg-linear-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg">
            <Plus className="w-4 h-4 mr-2" /> Upload File
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1 flex flex-col">
          <div className="mb-6">
            <h2 className="text-base text-gray-900 mb-0.5 font-['Inter']">File Directory</h2>
            <p className="text-gray-600 text-sm font-['Inter']">{filteredFiles.length} files found</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-80 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search file..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="flex-1">
            <FileTable
              fileItems={filteredFiles}
              onEditFile={handleEditFile}
              onViewFile={handleViewFile}
              onDeleteFile={handleDeleteFile}
            />
          </div>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onAddUser={handleAddFile} // Ensure this component accepts these props
      />
    </div>
  );
}