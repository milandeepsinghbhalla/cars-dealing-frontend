// import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import myColors from "../assets/util/myColors";
import logo from "../assets/images/logo.png";
import { Outlet } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const appBarStyles = {
    backgroundColor: myColors.offWhite,
  };
  const NavLinkStyles = {
    color: myColors.textBlack,
  };
  const width = useWindowWidth();

  const desktopMenu =  <>
      <div style={NavLinkStyles}>
        <Button sx={NavLinkStyles}>Home</Button>
        <Button sx={NavLinkStyles}>All Vehicles</Button>
        <Button sx={NavLinkStyles}>Dashboard</Button>
        <Button sx={NavLinkStyles}>Our Story</Button>

        <Button sx={NavLinkStyles}>Contact Us</Button>

        <Button sx={NavLinkStyles}>Login</Button>
        <Button sx={NavLinkStyles}>Sign Up</Button>
      </div>
    </>

  const mobileMenu = <>
      <IconButton
            size="large"
            edge="start"
            color={myColors.textBlack}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
  </>
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={appBarStyles} position="static">
          <Toolbar>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
            <Typography
              pt={2}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={logo} alt="" height={70} />
            </Typography>
            { width<=768?mobileMenu:desktopMenu }
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
}
