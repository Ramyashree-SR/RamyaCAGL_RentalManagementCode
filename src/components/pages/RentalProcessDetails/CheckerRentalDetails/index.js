import { Box, Grid } from "@mui/material";
import React from "react";
import NavComponent from "../../../organisms/NavComponent";
import AddDetails from "./AddDetails";

const CheckerRentalDetails = () => {
  return (
    <Box>
      <Box
        sx={{
          flexBasis: "20%",
          background: "#fff",
        }}
      >
        <NavComponent />
      </Box>
      <AddDetails />
    </Box>
  );
};

export default CheckerRentalDetails;
