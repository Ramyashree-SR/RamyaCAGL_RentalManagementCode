import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../atoms/DropDownComponent";
import { AddRentContractDetails } from "../../../services/AddContractApi";

// const premesisInformation = {
//   location: "",
//   branchId: "",
//   branchName: "",
//   areaName: "",
//   division: "",
//   zone: "",
//   state: "",
//   buildingType: "",
//   doorNo: "",
//   floorNo: "",
//   landMark: "",
//   roadName: "",
//   wardName: "",
//   city: "",
//   pincode: "",
//   taluk: "",
//   district: "",
// };

const PremisesInformation = ({
  activeStep,
  setActiveStep,
  onSave,
  type,
  allNewContractDetails,
  setAllNewContractDetails,
  allNewContractDetailsErr,
  handleAddRentContractInformationError,
}) => {
  // const [premesisInfo, setPremesisInfo] = useState(premesisInformation);
  const handleNext = () => {
    let err = handleAddRentContractInformationError();
    if (err) {
      onSave(allNewContractDetails, type);
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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

  // const NewRentContractLesseeDetails = async () => {
  //   // if (props.type === "add") {
  //   let payload = {
  //     location: premesisInfo?.premesisLocation,
  //     branchId: premesisInfo?.branchID,
  //     branchName: premesisInfo?.premesisBranchName,
  //     areaName: premesisInfo?.premesisAreaName,
  //     division: premesisInfo?.premesisDivision,
  //     zone: premesisInfo?.premesisZone,
  //     state: premesisInfo?.premesisState,
  //     buildingType: premesisInfo?.premesisBuildingType,
  //     doorNo: premesisInfo?.premesisDoorNumber,
  //     floorNo: premesisInfo?.premesisFloorNumber,
  //     landMark: premesisInfo?.premesisLandMark,
  //     roadName: premesisInfo?.premesisStreet,
  //     wardName: premesisInfo?.premesisWardNo,
  //     city: premesisInfo?.premesisCity,
  //     pincode: premesisInfo?.premesisPinCode,
  //     taluk: premesisInfo?.premesisTaluka,
  //     district: premesisInfo?.premesisDistrict,
  //   };
  //   const { data } = await AddRentContractDetails(payload);
  //   if (data?.data) {
  //     setPremesisInfo({
  //       location: "",
  //       branchId: "",
  //       branchName: "",
  //       areaName: "",
  //       division: "",
  //       zone: "",
  //       state: "",
  //       buildingType: "",
  //       doorNo: "",
  //       floorNo: "",
  //       landMark: "",
  //       roadName: "",
  //       wardName: "",
  //       city: "",
  //       pincode: "",
  //       taluk: "",
  //       district: "",
  //     });
  //   }
  // };

  const updateChange = (e) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBulidingType = (value) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      premesisBuildingType: value,
    });
  };

  const handleLocationChange = (value) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      premesisLocation: value,
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
                onSelect={handleLocationChange}
                // value={allNewContractDetails?.premesisLocation}
                // onChange={(value) =>
                //   handleLocationChange("premesisLocation", value)
                // }
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
                  value={allNewContractDetails?.branchID}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.branchID}
                />
                <InputBoxComponent
                  label="Branch Name"
                  placeholder="Enter Branch Name"
                  sx={{ width: 300 }}
                  name="premesisBranchName"
                  value={allNewContractDetails?.premesisBranchName}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisBranchName}
                />
                <InputBoxComponent
                  label="Area Name"
                  placeholder="Enter Area Name ."
                  sx={{ width: 300 }}
                  name="premesisAreaName"
                  value={allNewContractDetails?.premesisAreaName}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisAreaName}
                />
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Division/Region"
                  placeholder="Division/Region"
                  sx={{ width: 300 }}
                  name="premesisDivision"
                  value={allNewContractDetails?.premesisDivision}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisDivision}
                />
                <InputBoxComponent
                  label="Zone"
                  placeholder="Enter Zone ."
                  sx={{ width: 300 }}
                  name="premesisZone"
                  value={allNewContractDetails?.premesisZone}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisZone}
                />
                <InputBoxComponent
                  label="State"
                  placeholder="Enter State ."
                  sx={{ width: 300 }}
                  name="premesisState"
                  value={allNewContractDetails?.premesisState}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisState}
                />
              </Grid>
            </Grid>

            <Grid item className="d-flex m-3" lg={12}>
              <DropDownComponent
                label="Building Type"
                sx={{ width: 300 }}
                options={typeOfBuliding}
                // name="branchName"
                // value={allNewContractDetails?.premesisBuildingType}
                onSelect={handleBulidingType}
                // onChange={(value) =>
                //   handleBulidingType("premesisBuildingType", value)
                // }
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
                  value={allNewContractDetails?.premesisDoorNumber}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisDoorNumber}
                />
                <InputBoxComponent
                  label="Floor No."
                  sx={{ width: 300 }}
                  name="premesisFloorNumber"
                  value={allNewContractDetails?.premesisFloorNumber}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisFloorNumber}
                />
                <InputBoxComponent
                  label="Land Mark"
                  placeholder=""
                  sx={{ width: 300 }}
                  name="premesisLandMark"
                  value={allNewContractDetails?.premesisLandMark}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisLandMark}
                />
              </Grid>
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="Road/Street"
                  sx={{ width: 300 }}
                  name="premesisStreet"
                  value={allNewContractDetails?.premesisStreet}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisStreet}
                />
                <InputBoxComponent
                  label="Ward Name/No Area Name/Layout Name/Extension"
                  sx={{ width: 300 }}
                  name="premesisWardNo"
                  value={allNewContractDetails?.premesisWardNo}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisWardNo}
                />
                <InputBoxComponent
                  label="City"
                  sx={{ width: 300 }}
                  name="premesisCity"
                  value={allNewContractDetails?.premesisCity}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisCity}
                />
              </Grid>
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="Pincode"
                  sx={{ width: 300 }}
                  name="premesisPinCode"
                  value={allNewContractDetails?.premesisPinCode}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisPinCode}
                />
                <InputBoxComponent
                  label="Taluk"
                  sx={{ width: 300 }}
                  name="premesisTaluka"
                  value={allNewContractDetails?.premesisTaluka}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisTaluka}
                />
                <InputBoxComponent
                  label="District "
                  sx={{ width: 300 }}
                  name="premesisDistrict"
                  value={allNewContractDetails?.premesisDistrict}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisDistrict}
                />
              </Grid>
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="State "
                  sx={{ width: 300 }}
                  name="premesisState"
                  value={allNewContractDetails?.premesisState}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.premesisState}
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

export default PremisesInformation;
