import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate('/login');
  };
  return (
    <Box
      position={'absolute'}
      width='100vw'
      height='4rem'
      boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
      top='0'
      display='flex'
      justifyContent='flex-end'
      alignItems='center'
    >
      <Box mr='1.5rem'>
        <IconButton
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon style={{ fontSize: '40' }} />
        </IconButton>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleOpen}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default NavBar;
