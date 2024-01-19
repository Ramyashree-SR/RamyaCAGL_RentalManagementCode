import React, { useState } from 'react'
import { Box } from '@mui/material'
import Sider from '../../molecules/Sider'
import BreadCrumbComponent from '../../atoms/BreadCrumbComponent'
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const HomeScreen = () => {
    const [selectedComponent, setSelectedComponent] = useState("");
  const handleSidebarItemClick = (item) => {
    setSelectedComponent(item);
  };
    const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
     <Box
        sx={{
          marginTop: "-10px",
          width: "100px",
          
        }}
        xs={12}
        md={6}
      >
        <MenuOpenIcon onClick={handleDrawerToggle} fontSize="large" />
        <Sider
          selectedComponent={selectedComponent}
          isOpen={drawerOpen}
          onClose={handleDrawerToggle}
          width="200px"
          // onToggleText={handleSelection}
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
          </Box>
    </Box>
    </Box>
  )
}

export default HomeScreen