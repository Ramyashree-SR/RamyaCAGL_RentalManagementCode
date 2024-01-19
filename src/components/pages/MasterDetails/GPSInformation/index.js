import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import { AddRentContractDetails } from "../../../services/AddContractApi";
import { logDOM } from "@testing-library/react";

const GPSInformation = ({
  activeStep,
  setActiveStep,
  AddAllNewRentContactInformation,
  allNewContractDetails,
  setAllNewContractDetails,
  close,
  type,
  editAllNewRentContractDetails,
  EditLessorData,
  allNewContractDetailsErr,
  handleAddRentContractInformationError,
}) => {
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateChange = (e) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let err = handleAddRentContractInformationError();
    if (err) {
      setAllNewContractDetails(allNewContractDetails, type);
      AddAllNewRentContactInformation();
      close();
    }
  };
  // console.log(EditLessorData.uniqueID,"ID");
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
              value={allNewContractDetails?.lattitude}
              onChange={(e) => updateChange(e)}
              errorText={allNewContractDetailsErr?.lattitude}
            />
            <InputBoxComponent
              label="Longitude"
              placeholder="Enter Longitude"
              sx={{ width: 300 }}
              name="longitude"
              value={allNewContractDetails?.longitude}
              onChange={(e) => updateChange(e)}
              errorText={allNewContractDetailsErr?.longitude}
            />

            <InputBoxComponent
              label="GPS Co-ordinates"
              placeholder="Enter GPS Co-ordinates"
              sx={{ width: 300 }}
              name="gpsCoordinates"
              value={allNewContractDetails?.gpsCoordinates}
              onChange={(e) => updateChange(e)}
              errorText={allNewContractDetailsErr?.gpsCoordinates}
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

        {type === "edit" ? (
          <Button
            // disabled={activeStep && activeStep === 0}
            onClick={() => {
              editAllNewRentContractDetails(EditLessorData);
            }}
            variant="contained"
            sx={{ m: 1, background: "#238520" }}
          >
            Edit Finish
          </Button>
        ) : (
          <Button
            disabled={activeStep && activeStep === 0}
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            sx={{ m: 1, background: "#238520" }}
          >
            Add Finish
          </Button>
        )}
      </Box>
    </>
  );
};

export default GPSInformation;
