import {
  Badge,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";


const NavbarComponent = ({ formLabel = "" }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "12%",
        borderRadius: "0px",
        position: "fixed",
        top: "0",
        zIndex: "200",
      }}
      
    >
      <Grid className="d-flex align-items-center justify-content-between"  >
        <Grid >
          <img
            src="./assets/cagllogo1.png"
            width={120}
            alt="logo"
            style={{ marginLeft: 20 }}
           
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mr: 3,
          }}
         
        >
          <Typography
            sx={{ fontSize: 30, fontFamily: "sans-serif", fontWeight: "bold" }}
          >
            {formLabel}
          </Typography>
        </Grid>

         {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mr: 3,
            mt:2
          }}
        ></Box>  */}
      </Grid>
    </Paper>
  );
};

export default NavbarComponent;
