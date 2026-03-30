import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import StackIcon from '../assets/align-center-alt-svgrepo-com.svg?react';
import UploadButton from './upload-button';
import ExportPDFButton from "../components/export-pdf-button";

export default function AdjustDrawer({ chartInstance, onDataUpload }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem 
          disablePadding
          sx={{ justifyContent: 'left', px: 0, py: 1 }} 
          onClick={(e) => e.stopPropagation()} // Prevents drawer from closing when clicking the button
        >
          <UploadButton onUploadSuccess={(data) => {
            onDataUpload(data);
            setOpen(false); // Optionally close drawer after successful upload
          }} />
        </ListItem>
        
        <ListItem 
          disablePadding
          sx={{ justifyContent: 'left', px: 0, py: 1 }} 
          // onClick={(e) => e.stopPropagation()} // Should it collapse on click or not? -> Yes
        >
          <ExportPDFButton chartInstance={chartInstance} />
        </ListItem>
        
        <Divider sx={{ mb: 1 }} />
        
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={text} 
                    slotProps={{ 
                      primary: { 
                        sx: { 
                          fontFamily: 'Inter', 
                          fontWeight: 400 
                        } 
                      } 
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={text} 
                    slotProps={{ 
                      primary: { 
                        sx: { 
                          fontFamily: 'Inter', 
                          fontWeight: 400 
                        } 
                      } 
                    }}
                  />
                </ListItemButton>
              </ListItem>
        ))} */}

      </List>
    </Box>
  );

  return (
    <div>
        <IconButton 
        onClick={toggleDrawer(true)}
        aria-label="open drawer"
        sx={{
            borderRadius: '50%',
            padding: '15px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                backgroundColor: '#e6e6e691', 
            },
            '& svg': {
                fontSize: '18px', 
                width: '18px',
                height: '18px',
                position: 'relative',
                top: '0px',    // Positive moves down, negative moves up
                left: '0px',  // Positive moves right, negative moves left
            }
        }}
        >
          <StackIcon />
        </IconButton>  
        
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    </div>
  );
}
