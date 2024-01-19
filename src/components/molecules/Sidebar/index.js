import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import RentalDetails from "../../pages/RentalDetails";
import { IconButton, Paper } from "@mui/material";
import ButtonComponent from "../../atoms/ButtonComponent";

const SideBar = ({
  openDrawer,
  setOpenDrawer,
  pinned,
  setPinned,
  sidebarConstants,
}) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ display: "flex", zIndex: "100" }}>
    <Box
    sx={{
      height: "calc(100vh - 65px)",
      width: "200px",
      // overflowY: "scroll",
      zIndex: 1201,
      marginTop: "65px",
    }}
    className="navbar-bg-color d-flex flex-column align-items-center pb-2 hide-scrollbar"
      // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 200 ,height: anchor === "left" || anchor === "right" ? "auto" : 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Rent", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      </Box>
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <>
      <Paper
        className=" d-flex align-items-center"
        sx={{
          width: 70,
          height: "100%",
          borderRadius: "0px",
          boxShadow: "0px 1px 17px  #ccc",
          position: "fixed",
          top: "0",
          // zIndex: "100",
          // marginTop: 15,
        }}
      >
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </Paper>
    </>
  );
};

export default SideBar;
