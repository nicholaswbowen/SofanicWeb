import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from './AuthProvider';

const drawerWidth = 240;

const Loady = () => {
  return (
    <Grid container spacing={2}>
    {Array(5).fill('').map((text,index) => {
      return (
        <Grid item key={index}>
          <Skeleton
            variant="rectangular"
            height={30}
            sx={{ width: '75px', height: '50px' }}
            key={index}
          />
        </Grid>
      )
    })}
    </Grid>
  )
}

function Root(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logOut, loading } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        navigate("/login"); // Redirect to the login page after logout
      })
      .catch((error) => console.error(error));
  };
 
  const navItemsLoggedIn = [
    {label: 'Home', action: () => navigate('/')},
    {label: 'About', action: () => navigate('/about')},
    {label: 'Uploader', action: () => navigate('/uploader')},
    {label: 'Contact', action: () => navigate('/contact')},
    {label: 'Sign out', action: handleSignOut },
  ];

  const navItemsLoggedOut = [
    {label: 'Home', action: () => navigate('/')},
    {label: 'About', action: () => navigate('/about')},
    {label: 'Contact', action: () => navigate('/contact')},
    {label: 'Login', action: () => navigate('/login') },
    {label: 'Sign up', action: () => navigate('/signup') },
  ];

  const navItems = user ? navItemsLoggedIn : navItemsLoggedOut;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sofanic
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding >
            <ListItemButton sx={{ textAlign: 'center' }} onClick={item.action}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', marginTop: '48px'}}>
      <AppBar component="nav">
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Sofanic
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {loading ? <Loady /> : navItems.map((item) => (
              <Button key={item.label} sx={{ color: '#fff' }} onClick={item.action}>
                {item.label}
              </Button>
            )) }
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
      <Box sx={{
          display: 'flex-grow',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        </Box>
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
      </nav>
      <Outlet />
    </Box>
  );
}

export default Root;

Root.propTypes = {
  window: PropTypes.object.isRequired
}