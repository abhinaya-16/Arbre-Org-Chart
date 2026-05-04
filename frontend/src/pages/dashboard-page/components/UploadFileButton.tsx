import React from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useMsal } from "@azure/msal-react";

interface UploadFileButtonProps {
  onUploadSuccess?: () => void;
}

export const UploadFileButton: React.FC<UploadFileButtonProps> = ({
  onUploadSuccess,
}) => {
  const { accounts } = useMsal(); // 2. Get account info
  const user = accounts[0];
  const userId = user?.homeAccountId || ""; // 3. Extract the unique ID

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

    // const now = new Date();

    // const formattedTime = `${now.toLocaleString("en-US", {
    //     month: "short",
    //     day: "2-digit",
    //     year: "numeric",
    //     })} ${now.toLocaleString("en-US", {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     hour12: true,
    // })}`;

    // const formatFileSize = (bytes: number) => {
    //     const kb = bytes / 1024;
    //     const mb = bytes / (1024 * 1024);

    //     const format = (num: number) =>
    //         num % 1 === 0 ? num.toString() : num.toFixed(1);

    //     if (bytes < 1024 * 1024) {
    //         return `${format(kb)} KB`;
    //     }
    //     return `${format(mb)} MB`;
    // };

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "x-user-id": userId, // 4. Add the header here!
        },
      });

      if (response.ok) {
        toast.success("File uploaded successfully");
        if (onUploadSuccess) {
          onUploadSuccess(); 
        }
      } else {
        const errorData = await response.text();
        toast.error(`Upload failed: ${errorData}`);
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