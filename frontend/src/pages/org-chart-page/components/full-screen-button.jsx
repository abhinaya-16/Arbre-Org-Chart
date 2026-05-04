import Button from '@mui/material/Button';
import FullScreenIcon from '../assets/full-screen.svg?react';
// collapses the navbar and expands the chart to full screen, or restores it back to normal size if already in full screen mode

export default function FullScreenButton({ chartInstance }) {

  const handleFullScreen = () => {
    if (chartInstance) {
      chartInstance.fullscreen();
    }
  };

 return (
    <Button 
      variant="outlined" 
      fullWidth
      onClick={handleFullScreen}
      startIcon={<FullScreenIcon style={{ width: 18, height: 18 }} />}
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
      Full Screen
    </Button>
  );
}
