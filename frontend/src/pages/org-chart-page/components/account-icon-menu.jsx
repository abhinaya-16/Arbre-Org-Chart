import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import IconButton from '@mui/material/IconButton';
import AvatarIcon from '../assets/user-svgrepo-com.svg?react';
import LogoutIcon from '../assets/arrow-right-from-bracket-svgrepo-com.svg?react';
import SettingsIcon from '../assets/sun-alt-svgrepo-com.svg?react';
import AvatarIcon2 from '../assets/circle-user-svgrepo-com.svg?react';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        <Tooltip title="Account settings">

          <IconButton 
            aria-label="avatar"

            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}

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
            <AvatarIcon />
          </IconButton> 

        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.18))',
              mt: 2,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 19,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{ fontFamily: 'Inter', fontWeight: 400 , fontSize: 14, py: 0, px: 1.5}}>
          <IconButton
            sx={{
              '& svg': {
                  fontSize: '18px', 
                  width: '20px',
                  height: '20px',
                  position: 'relative',
                  top: '0px',    // Positive moves down, negative moves up
                  left: '0px',  // Positive moves right, negative moves left
              },
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}>
            <AvatarIcon2 />
          </IconButton>
          My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, py: 0, px: 1.5 }}>
          <ListItemIcon>
            <IconButton
            sx={{
              '& svg': {
                  fontSize: '18px', 
                  width: '20px',
                  height: '20px',
                  position: 'relative',
                  top: '0px',    // Positive moves down, negative moves up
                  left: '0px',  // Positive moves right, negative moves left
              },
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}>
            <SettingsIcon />
          </IconButton>
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, py: 0, px: 1.5 }}>
          <ListItemIcon>
            <IconButton
            sx={{
              '& svg': {
                  fontSize: '18px', 
                  width: '20px',
                  height: '20px',
                  position: 'relative',
                  top: '0px',    // Positive moves down, negative moves up
                  left: '0px',  // Positive moves right, negative moves left
              },
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}>
            <LogoutIcon />
          </IconButton>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
