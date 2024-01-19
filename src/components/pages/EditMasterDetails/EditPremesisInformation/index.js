import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../atoms/DropDownComponent";

const EditPremesisInformation = ({
  activeStep,
  setActiveStep,
  onSave,
  editAllContractDetails,
  setEditAllContractDetails,
}) => {
  const handleNext = () => {
    onSave(editAllContractDetails);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let location = [
    { id: "Urban", label: "Urban" },
    { id: "Rural", label: "Rural" },
  ];

  let typeOfBuliding = [
    { id: "Duplex", label: "Duplex" },
    { id: "Apartment", label: "Apartment" },
    { id: "Complex", label: "Complex" },
    { id: "Individual", label: "Individual" },
  ];

  const updateChange = (e) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBulidingType = (name, value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [name]: value,
    });
  };

  return (
    <>
      <Box
        className="d-flex justify-content-center w-100"
        sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}
      >
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-3">
            Premesis Details
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2" lg={12}>
              <DropDownComponent
                label="Location"
                sx={{ width: 300 }}
                options={location}
                value={editAllContractDetails?.premesisLocation}
              />
            </Grid>
          </Grid>

          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-3">
              Office Hierarchy
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Branch ID"
                  placeholder="Enter Branch ID"
                  sx={{ width: 300 }}
                  name="branchID"
                  value={editAllContractDetails?.branchID}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="Branch Name"
                  placeholder="Enter Branch Name"
                  sx={{ width: 300 }}
                  name="premesisBranchName"
                  value={editAllContractDetails?.premesisBranchName}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="Area Name"
                  placeholder="Enter Area Name ."
                  sx={{ width: 300 }}
                  name="premesisAreaName"
                  value={editAllContractDetails?.premesisAreaName}
                  onChange={(e) => updateChange(e)}
                />
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Division/Region"
                  placeholder="Division/Region"
                  sx={{ width: 300 }}
                  name="premesisDivision"
                  value={editAllContractDetails?.premesisDivision}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="Zone"
                  placeholder="Enter Zone ."
                  sx={{ width: 300 }}
                  name="premesisZone"
                  value={editAllContractDetails?.premesisZone}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="State"
                  placeholder="Enter State ."
                  sx={{ width: 300 }}
                  name="premesisState"
                  value={editAllContractDetails?.premesisState}
                  onChange={(e) => updateChange(e)}
                />
              </Grid>
            </Grid>

            <Grid item className="d-flex m-3" lg={12}>
              <DropDownComponent
                label="Building Type"
                sx={{ width: 300 }}
                options={typeOfBuliding}
                name="branchName"
                value={editAllContractDetails?.premesisBuildingType}
                // onSelect={handleBulidingType}
                onChange={(value) =>
                  handleBulidingType("premesisBuildingType", value)
                }
              />
            </Grid>
          </Box>
          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-3">
              Premises Address Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="Door No."
                  placeholder=""
                  sx={{ width: 300 }}
                  name="premesisDoorNumber"
                  value={editAllContractDetails?.premesisDoorNumber}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="Floor No."
                  sx={{ width: 300 }}
                  name="premesisFloorNumber"
                  value={editAllContractDetails?.premesisFloorNumber}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="Land Mark"
                  placeholder=""
                  sx={{ width: 300 }}
                  name="premesisLandMark"
                  value={editAllContractDetails?.premesisLandMark}
                  onChange={(e) => updateChange(e)}
                />
              </Grid>
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="Road/Street"
                  sx={{ width: 300 }}
                  name="premesisStreet"
                  value={editAllContractDetails?.premesisStreet}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="Ward Name/No Area Name/Layout Name/Extension"
                  sx={{ width: 300 }}
                  name="premesisWardNo"
                  value={editAllContractDetails?.premesisWardNo}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="City"
                  sx={{ width: 300 }}
                  name="premesisCity"
                  value={editAllContractDetails?.premesisCity}
                  onChange={(e) => updateChange(e)}
                />
              </Grid>
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="Pincode"
                  sx={{ width: 300 }}
                  name="premesisPinCode"
                  value={editAllContractDetails?.premesisPinCode}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="Taluk"
                  sx={{ width: 300 }}
                  name="premesisTaluka"
                  value={editAllContractDetails?.premesisTaluka}
                  onChange={(e) => updateChange(e)}
                />
                <InputBoxComponent
                  label="District "
                  sx={{ width: 300 }}
                  name="premesisDistrict"
                  value={editAllContractDetails?.premesisDistrict}
                  onChange={(e) => updateChange(e)}
                />
              </Grid>
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="State "
                  sx={{ width: 300 }}
                  name="premesisState"
                  value={editAllContractDetails?.premesisState}
                  onChange={(e) => updateChange(e)}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Box className="d-flex  justify-content-end w-100">
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
          onClick={handleNext}
          variant="contained"
          sx={{ m: 1, background: "#238520" }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default EditPremesisInformation;
