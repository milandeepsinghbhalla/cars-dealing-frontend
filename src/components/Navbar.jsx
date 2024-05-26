import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import myColors from "../assets/util/myColors";
import logo from "../assets/images/logo.png";
import { Link, Outlet } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
// import MobileNavbarDrawer from "";
// import MobileNavbarDrawer from "./mobileNavbarDrawer";

// import MenuIcon from '@mui/icons-material/Menu';
const navLinks = [
  {
    linkName: "Home",
    link: "/",
    visibleTo: "All",
  },
  {
    linkName: "All Cars",
    link: "/all-cars",
    visibleTo: "All",
  },
  {
    linkName: "Dashboard",
    link: "/Dashboard",
    visibleTo: "Admin",
  },
  {
    linkName: "Profile",
    link: "/profile",
    visibleTo: "All",
  },
  {
    linkName: "Our Story",
    link: "/our-story",
    visibleTo: "All",
  },
  {
    linkName: "Contact Us",
    link: "/contact-us",
    visibleTo: "All",
  },
  {
    linkName: "Login",
    link: "/login",
    visibleTo: "All",
  },
  {
    linkName: "Sign Up",
    link: "/sign-up",
    visibleTo: "All",
  },
];

const MobileNavbarDrawer = (props) => {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={props.closeDrawer}>
      <div>
        <IconButton
          size="large"
          edge="start"
          color={myColors.textBlack}
          aria-label="menu"
          sx={{ ml: "auto" }}
          onClick={props.closeDrawer}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <List>
        {navLinks.map((navItem, index) => (
          <ListItem key={index} disablePadding>
            <Link to={navItem.link}>
              <ListItemButton>
                {/* <ListItemIcon>
                {index % 2 === 0 ? <AddCircleIcon /> : <EditRoundedIcon />}
              </ListItemIcon> */}
                <ListItemText primary={navItem.linkName} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {["Handle Enquiries"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
};
export default function Navbar() {
  const appBarStyles = {
    backgroundColor: myColors.offWhite,
  };
  const NavLinkStyles = {
    color: myColors.textBlack,
  };
  const width = useWindowWidth();

  const desktopMenu = (
    <>
      <div style={NavLinkStyles}>
        <Button sx={NavLinkStyles}>Home</Button>
        <Button sx={NavLinkStyles}>All Vehicles</Button>
        <Link to={"/dashboard"}>
          <Button sx={NavLinkStyles}>Dashboard</Button>
        </Link>
        <Button sx={NavLinkStyles}>Our Story</Button>

        <Button sx={NavLinkStyles}>Contact Us</Button>

        <Button sx={NavLinkStyles}>Login</Button>
        <Button sx={NavLinkStyles}>Sign Up</Button>
      </div>
    </>
  );

  const [open, setOpen] = React.useState(false);

  const closeDrawer = () => {
    setOpen((oldOpenState) => {
      return false;
    });
  };

  const openDrawer = () => {
    setOpen(true);
  };

  const mobileMenu = (
    <>
      <IconButton
        size="large"
        edge="start"
        color={myColors.textBlack}
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={openDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={closeDrawer}>
        <MobileNavbarDrawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );

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
            {width <= 768 ? mobileMenu : desktopMenu}
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
}
