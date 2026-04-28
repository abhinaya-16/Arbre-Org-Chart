import React, { useState } from "react";
import { Search, Plus, EyeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FileTable } from "./FileTable";
import { AddFileModal } from "./AddFileModal"; 
import { toast } from "sonner";
//import OrgChartPage from "../../org-chart-page/OrgChartPage";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [selectedFileId, setSelectedFileId] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNewFile = () => setIsAddModalOpen(true);
  const handleCloseModal = () => setIsAddModalOpen(false);

  const handleSelectFile = (id: string) => {
    setSelectedFileId(id);
  };

  const handleAddFile = (newFile: FileItem) => {
    setFiles((prev) => [newFile, ...prev]);
    toast.success(`${newFile.filename} has been added successfully!`);
  };

  const handleDeleteFile = (fileId: string) => {
    if (selectedFileId === fileId) setSelectedFileId(null);
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    toast.success(`File deleted successfully.`);
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
            <p className="text-gray-600 text-sm font-['Inter']">
              Manage your excel files to generate their org-charts
            </p>
          </div>
          <Button 
            onClick={handleAddNewFile} 
            className="cursor-pointer font-['Inter'] bg-linear-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1 flex flex-col shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-base text-gray-900 mb-0.5 font-['Inter']">File Directory</h2>
              <p className="text-gray-600 text-sm font-['Inter']">
                Search files ({filteredFiles.length} files)
              </p>
            </div>
            <Button 
              // onClick={() => {
              //   if (selectedFileId) {
              //     navigate("/org-chart");
              //   } else {
              //     toast.error("Please select a file first");
              //   }
              // }}
              onClick={() => {navigate("/org-chart");}}
              className="cursor-pointer font-['Inter'] bg-white border border-gray-200 duration-200 hover:shadow-[0px_4px_10px_rgba(0,0,0,0.10)] text-black transition-all"
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              View Selected Chart
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-80 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search file..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <FileTable
              fileItems={filteredFiles}
              selectedFileId={selectedFileId}
              onSelectFile={handleSelectFile}
              onEditFile={handleEditFile}
              onViewFile={handleViewFile}
              onDeleteFile={handleDeleteFile}
            />
          </div>
        </div>
      </div>

      <AddFileModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onAddFile={handleAddFile}
      />
    </div>
  );
}