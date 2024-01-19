import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import TableViewIcon from "@mui/icons-material/TableView";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SummarizeIcon from "@mui/icons-material/Summarize";

function Sider({ isOpen, onClose, height, width, onToggleText }) {
  const [selectedComponent, setSelectedComponent] = useState([]);
  const handleDrawerClose = () => {
    onClose();
  };
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  let navigate = useNavigate();

  const handleListItem = (componentName) => {
    onToggleText(componentName);
    setSelectedComponent(componentName);
    navigate("/");
    onClose();
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToRentContracts = () => {
    navigate("/rentContracts");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const navigateToRentReport = () => {
    navigate("/rentReport");
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <Box sx={{ display: "flex", zIndex: "100" }}>
      <Paper>
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            style: { width, height, marginTop: 0 }, // Set the margin to 20px
          }}
          sx={{
            "& .MuiDrawer-paper": {
              marginTop: "10px", // Set the margin to 20px
              backgroundColor: "#CFE8F7",
              height: "100%",
            },
          }}
        >
          <Box
            sx={{
              p: 1,
              borderColor: "#000000",
              borderBottom: "1px solid #000000 !important", //#70B3D1
              // borderRadius: "10px",
            }}
          >
            <img
              src="./assets/cagllogo1.png"
              width={150}
              alt="logo"
              style={{ marginLeft: 5 }}
            />
            {/* <span className="icon close_icon" onClick={OpenSidebar}>
              X
            </span> */}
          </Box>
          <hr />
          <List>
            {/* <Link to={"./HomeScreen"}> */}
            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => {
                handleListItem("/home");
                navigateToHome();
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ color: "#000000" }} />
            </ListItem>
            {/* </Link>
              <Link to={"./Dashboard"}> */}
            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => {
                handleListItem("/dashboard");
                navigateToDashboard();
              }}
            >
              <ListItemIcon>
                <DashboardCustomizeIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ color: "#000000" }} />
            </ListItem>
            {/* </Link>
            <Link to={"./RentalDetails"}> */}
            {/* {selectedComponent ? ( */}
            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => {
                handleListItem("/rentContracts");
                navigateToRentContracts();
              }}
            >
              <ListItemIcon>
                <TableViewIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="RentContracts" sx={{ color: "#000000" }} />
            </ListItem>
            {/* // ):null} */}
            {/* </Link> */}

            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => {
                handleListItem("/rentReport");
                navigateToRentReport();
              }}
            >
              <ListItemIcon>
                <SummarizeIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="RentReport" sx={{ color: "#000000" }} />
            </ListItem>

            <ListItem
              button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 25,
                justifyContent: "center",
                "& .MuiListItemIcon-root": {
                  minWidth: "31px",
                },
              }}
              onClick={() => handleListItem("Logout")}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "#000000" }} />
            </ListItem>
          </List>
        </Drawer>
      </Paper>
    </Box>
  );
}

export default Sider;
