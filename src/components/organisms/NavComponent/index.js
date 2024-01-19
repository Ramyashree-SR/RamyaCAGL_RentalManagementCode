import React, { useEffect, useState } from "react";
import NavbarComponent from "../../molecules/NavbarComponent";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Sider from "../../molecules/Sider";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import RentalDetails from "../../pages/RentalProcessDetails/RentalDetails";

import BreadCrumbComponent from "../../atoms/BreadCrumbComponent";
import { Link } from "react-router-dom";
import Dashboard from "../../pages/RentalProcessDetails/Dashboard";
import HomeScreen from "../../pages/RentalProcessDetails/HomeScreen";
import RentReport from "../../pages/RentalProcessDetails/RentReport";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const NavComponent = ({ children }) => {
  const [selectedComponent, setSelectedComponent] = useState([]);
  const handleSidebarItemClick = (item) => {
    setSelectedComponent(item);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSelection = (name) => {
    switch (name) {
      case "home":
        setSelectedComponent(<HomeScreen />);
        break;
      case "dashboard":
        setSelectedComponent(<Dashboard />);
        break;
      case "rentContracts":
        setSelectedComponent(<RentalDetails />);
        break;
      case "rentReport":
        setSelectedComponent(<RentReport />);
        break;
      default:
        setSelectedComponent(null);
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          marginTop: "100px",
          width: "100px",
        }}
      >
        <NavbarComponent formLabel="Rental Management" />
      </Box>

      <Box
        sx={{
          marginTop: "-30px",
          width: "100px",
        }}
      >
        <MenuOpenIcon onClick={handleDrawerToggle} fontSize="large" />
        <Sider
          selectedComponent={selectedComponent}
          isOpen={drawerOpen}
          onClose={handleDrawerToggle}
          width="200px"
          onToggleText={handleSelection}
        />
        <Box
          className="px-2 py-2 d-flex flex-column h-100 hide-scrollbar"
          sx={{
            marginTop: "-40px",
            overflowY: "hidden !important",
            width: "calc(100vw - 80px)",
            marginLeft: "30px",
          }}
        >
          <Box style={{ height: "40px" }} className="px-0 ">
            <BreadCrumbComponent />
          </Box>

          <Box className="px-3 py-0">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NavComponent;
