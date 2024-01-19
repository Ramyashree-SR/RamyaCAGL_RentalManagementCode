import { Box } from "@mui/material";
import React from "react";
import NavbarComponent from "../../molecules/NavbarComponent";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import RentalDetails from "./RentalDetails";
import NavComponent from "../../organisms/NavComponent";
import HomeScreen from "./HomeScreen";

const RentalProcessDetails = () => {
  return (
    <>
      <Box>
        {/* <Box
          sx={{
            background: "#fff",
          }}
        >
          <NavComponent />
        </Box> */}
        <Routes>
          <Route path="home" element={<HomeScreen />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rentContracts" element={<RentalDetails />} />
        </Routes>
      </Box>
    </>
  );
};

export default RentalProcessDetails;
