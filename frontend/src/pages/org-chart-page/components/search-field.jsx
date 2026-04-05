import { styled, alpha } from '@mui/material/styles';
import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '../assets/search-alt-svgrepo-com.svg?react';

const Search = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isFocused',})((
    { theme, isFocused }) => ({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      // When not focused, it's a circle. When focused, it's a pill.
      borderRadius: '50px', 
      border: '1px solid #ccc',
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      transition: theme.transitions.create(['width', 'background-color'], {
        duration: theme.transitions.duration.standard,
      }),
      // Initial state: roughly a circle
      width: isFocused ? '250px' : '48px', 
      height: '48px',
      overflow: 'hidden',
      
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.8),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function SearchField({ chartInstance, data }) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (!chartInstance || !data) return;
      const employee = data.find(emp => 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (employee) {
        // 1. Clear previous highlights
        chartInstance.clearHighlighting();
        // 2. Set the new highlighted node
        chartInstance.setHighlighted(employee.id)
        // 3. Expand all parents and center the node
        chartInstance.setUpToTheRootHighlighted(employee.id)
        .render();
        setSearchQuery("");
      } 
      else {
        alert("Employee not found");
      }
    }
  };

  return (
   <Search isFocused={isFocused} sx={{ color: '#000' }}>
        <SearchIconWrapper
            sx={{
               '& svg': {
                fontSize: '18px',
                width: '18px',
                height: '18px',
                }
            }}
        >
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            placeholder={isFocused ? "Search" : ""}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            inputProps={{ 'aria-label': 'search' }}
            // Ensure the input takes up no space when not focused so the circle stays small
            sx={{ opacity: isFocused ? 1 : 0, transition: 'opacity 0.2s' }}
        />
    </Search>
  );
}