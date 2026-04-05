import Button from '@mui/material/Button';
import PDFicon from '../assets/file-pdf-svgrepo-com.svg?react';
import jsPDF from 'jspdf';

export default function ExportIconButton({ chartInstance }) {

  const handleExport = () => {
    if (!chartInstance) return;

    chartInstance.exportImg({
      save: false, 
      full: true, 
      onLoad: (base64) => {
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: "a4"
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        pdf.addImage(
          base64, 
          'PNG', 
          10, 
          10, 
          pdfWidth - 20, 
          0 // Auto-calculate height to maintain aspect ratio
        );
        pdf.save('org-chart.pdf');
      },
    });
  };
  return (
    <Button 
      onClick={handleExport}
      variant="outlined" 
      fullWidth
      startIcon={<PDFicon style={{ width: 18, height: 18 }} />}
      sx={{
        borderRadius: '50px', 
        border: '1px solid #ccc',
        fontSize: 12,
        fontFamily: 'Inter',
        color: '#000',
        backgroundColor: '#fff',
        textTransform: 'none',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        '&:hover': {
          //backgroundColor: '#e8e8e8',
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
        },
        '& .MuiButton-startIcon': {
          marginRight: '6px', // Adjust space between icon and text
          display: 'flex',
          alignItems: 'center',
        },
      }}
    >
      Export PDF
    </Button>
  );
}
