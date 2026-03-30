import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import UploadIcon from '../assets/cloud-up-arrow-svgrepo-com.svg?react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onUploadSuccess }) {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newData = await response.json();
        if (onUploadSuccess) onUploadSuccess(newData);
      } 
      else {
        console.error("Upload failed");
      }
    } 
    catch (error) {
      console.error("Error connecting to server:", error);
    }
  };
  
  return (
    <Button
      component="label"
      variant="contained"
      fullWidth // Make the button take the full width of its container
      tabIndex={-1}
      disableElevation
      startIcon={<UploadIcon style={{ width: 20, height: 20 }} />}
      sx={{
        borderRadius: 0,
        fontSize: 14,
        fontFamily: 'Inter',
        color: '#000',
        backgroundColor: '#fff',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#e6e6e691',
        },
        '& .MuiButton-startIcon': {
          marginRight: '8px', // Adjust space between icon and text
          display: 'flex',
          alignItems: 'center',
        },
      }}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        accept=".xlsx, .xls" // Restrict to Excel files
        onChange={handleFileChange}
      />
    </Button>
  );
}
