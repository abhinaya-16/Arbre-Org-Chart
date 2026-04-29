import React from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface UploadFileButtonProps {
  onUploadSuccess?: (file: {
    id: string;
    filename: string;
    size: string;
    time: string;
  }) => void;
}

export const UploadFileButton: React.FC<UploadFileButtonProps> = ({
  onUploadSuccess,
}) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Restrict to Excel files
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      toast.error("Only Excel files (.xlsx, .xls) are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const now = new Date();

    const formattedTime = `${now.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        })} ${now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })}`;

    const formatFileSize = (bytes: number) => {
        const kb = bytes / 1024;
        const mb = bytes / (1024 * 1024);

        const format = (num: number) =>
            num % 1 === 0 ? num.toString() : num.toFixed(1);

        if (bytes < 1024 * 1024) {
            return `${format(kb)} KB`;
        }
        return `${format(mb)} MB`;
    };

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await response.json();

        const newFile = {
          id: Date.now().toString(),
          filename: file.name,
          size: formatFileSize(file.size),
          time: formattedTime,
        };

        toast.success("File uploaded successfully");

        if (onUploadSuccess) {
          onUploadSuccess(newFile);
        }
      } else {
        toast.error("Upload failed");
      }
    } 
    catch (error) {
      console.error("Upload error:", error);
      toast.error("Error connecting to server");
    }
  };

  return (
    <Button
      asChild
      className="cursor-pointer font-['Inter'] bg-linear-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white transition-all"
    >
      <label>
        <Upload className="w-4 h-4 mr-2" />
        Upload File
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </Button>
  );
};