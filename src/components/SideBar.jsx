import Router from '../utils/routes';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Cancel from '@mui/icons-material/Cancel';
import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PortraitIcon from '@mui/icons-material/Portrait';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import GroupIcon from '@mui/icons-material/Group';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import logo from '../assests/msn-logo.png'
const drawerWidth = 240;



function ResponsiveDrawer(props) {
    const navigate = useNavigate();

    const [clienteId, setClienteId] = useState(0)


    const [anchorEl, setAnchorEl] = React.useState(null);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const paths = ['/home', '/clientes', '/aeropuertos', '/equipos', '/refacciones', '/mecanicos'];
  const paths2 = ['/incidencias', '/usuarios'];
  const icons = [<HomeIcon />, <ConstructionIcon />, <AirplanemodeActiveIcon />, <HomeRepairServiceIcon />, <BuildCircleIcon />, <PortraitIcon />]
  const icons2 = [<MoveToInboxIcon />, <GroupIcon/>]

  const logout = () => {

    localStorage.clear();
    navigate('/')

  }
  const side1 = ['Inicio', 'Clientes', 'Aeropuertos', 'Equipos', 'Refacciones', 'Mecanicos']
  const side2 = ['Incidencias', 'Usuarios']

  const side11 = ['Inicio']
  const side22 = ['Incidencias']

  useEffect(() => {
    const userClientId = localStorage.getItem("userClientId");
    setClienteId(userClientId)
  }, [])

  const drawer = (
    <div>
    <img src={logo} alt="logo" width={'80%'} style={{padding: '5%'}} />
      <Toolbar />
      <Divider />
      <List>
        {clienteId == 2 ? ( side1.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate(paths[index])}>
              <ListItemIcon>
                {icons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))) : (
            side11.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => navigate(paths[index])}>
                    <ListItemIcon>
                      {icons[index]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
         )))}
      </List>
      <Divider />
      <List>
        {clienteId == 2 ? (
            side2.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => navigate(paths2[index])}>
                    <ListItemIcon>
                    {icons2[index]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
        ))): (
            side22.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => navigate(paths2[index])}>
                    <ListItemIcon>
                    {icons2[index]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
        )))}
      </List>
      <Divider />
      <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={'Cerrar sesión'} />
            </ListItemButton>
          </ListItem>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#0093FF'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            MSN SERVICIOS AEREOS
          </Typography>
          {/* <div>
              <IconButton
              
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate('/')}>Cerrar Sesión</MenuItem>
              </Menu>
            </div> */}
        </Toolbar>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 2, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, paddingTop: '5%' }}
      >
        
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;