import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import RentalDetails from "./RentalDetails";
import HomeScreen from "./HomeScreen";
import CheckerRentalDetails from "./CheckerRentalDetails";

const RentalProcessDetails = () => {
  return (
    <>
      <Box>
        <Routes>
          <Route path="home" element={<HomeScreen />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rentContracts" element={<RentalDetails />} />
          <Route path="checkerRentContracts" element={<CheckerRentalDetails/>}/>
        </Routes>
      </Box>
    </>
  );
};

export default RentalProcessDetails;
