import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBarComponent from "../../atoms/SearchBarComponent";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const FormNavbarComponent = ({ formLabel = "" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper
      className="py-3"
      sx={{
        width: "100%",
        height: "80px",
        borderRadius: "0px",
        boxShadow: "0px 1px 17px  #ccc",
        position: "fixed",
        top: "0",
        zIndex: "200",
        display:"flex",
      }}
      // elevation={2}
    >
      <Grid
        container
        className="d-flex justify-content-between align-item-center flex-row "
      >
         <Grid
          item
          className="px-3 d-flex align-items-end justify-content-center"
        >
          <img
            src="./assets/cagllogo1.png"
            width={150}
            alt="logo"
            style={{ marginLeft: 20 }}
          />
        </Grid>
       
        <Grid
        item
          md={9}
          className="d-flex justify-content-end align-items-center "
        >
          <Box
            className="h-100 d-flex align-items-center justify-content-end p-2 ml-100"
            style={{ width: "400px" }}
          >
            <SearchBarComponent   />
          </Box>
          
        </Grid>
        <Grid item sm={9} md={9}>
          <Box
            style={{ width: "65%" }}
            className="d-flex justify-content-center align-items-center"
          >
            <Typography className="fw-500 fs-30 text-capitalize">
              {formLabel}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default FormNavbarComponent;
