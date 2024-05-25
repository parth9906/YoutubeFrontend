import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callAPIWithAxios } from '../utils/makeAPICall';
import { LOGOUT_USER_URL } from '../constants.url';
import { logoutUser } from '../store/userSlice';
import { openSnackBar } from '../store/snackBarSlice';
import { Message } from '@mui/icons-material';

const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {

  const user = useSelector(store=>store?.user?.user)
  const accessToken = useSelector(store=> store?.user?.accessToken)
  const headers = {
    Authorization: "Bearer " + accessToken,
  }
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItem = async (setting) => {
    if(setting === 'Profile'){
      navigate('/profile')
    }
    else if(setting === 'Logout'){
      const data = await callAPIWithAxios(LOGOUT_USER_URL,{}, headers);
      if(data?.success === true){
        dispatch(logoutUser());
        dispatch(openSnackBar({message: data?.message, color: 'success'}))
      }else{
        dispatch(openSnackBar({message: data?.message, color: 'danger'}))
      }
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '-2px',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div className='flex items-center'>
              <img className='w-8' src="src\assets\appLogo.jpg" alt="logo" />
              <div>PlayTube</div>
            </div>
          </Typography>
        

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.fullName} src={user?.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={()=>handleMenuItem(setting)}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
