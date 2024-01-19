import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";

const EditGPSInformations = ({
  activeStep,
  setActiveStep,
  editAllContractDetails,
  setEditAllContractDetails,
  close,
  editAllNewRentContractDetails,
  editLessorData,
}) => {
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateChange = (e) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box
        className="d-flex justify-content-center w-100"
        sx={{ height: "calc(100% - 55px)", overflow: "hidden" }}
      >
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-3">
            GPS Details
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <InputBoxComponent
              label="Lattitude"
              placeholder="Enter Lattitude"
              sx={{ width: 300 }}
              name="lattitude"
              value={editAllContractDetails.lattitude}
              onChange={(e) => updateChange(e)}
            />
            <InputBoxComponent
              label="Longitude"
              placeholder="Enter Longitude"
              sx={{ width: 300 }}
              name="longitude"
              value={editAllContractDetails.longitude}
              onChange={(e) => updateChange(e)}
            />

            <InputBoxComponent
              label="GPS Co-ordinates"
              placeholder="Enter GPS Co-ordinates"
              sx={{ width: 300 }}
              name="gpsCoordinates"
              value={editAllContractDetails.gpsCoordinates}
              onChange={(e) => updateChange(e)}
            />
          </Grid>
        </Box>
      </Box>
      <Box className="d-flex  justify-content-end w-100 ">
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={handleBack}
          variant="contained"
          sx={{ m: 1, background: "#238520" }}
        >
          Back
        </Button>
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={() => {
            editAllNewRentContractDetails(editLessorData);
          }}
          variant="contained"
          sx={{ m: 1, background: "#238520" }}
        >
          Edit Finish
        </Button>
      </Box>
    </>
  );
};

export default EditGPSInformations;
