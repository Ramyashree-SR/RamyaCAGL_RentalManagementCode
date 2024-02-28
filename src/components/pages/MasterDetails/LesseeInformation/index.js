import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../atoms/DropDownComponent";
import {
  getBranchIDForBranchDetails,
  getRentContractDetailsOnBranchID,
} from "../../../services/BranchDetails";
import ReusableTable from "../../../molecules/ReusableTable";
import { columns } from "../../../../constants/ScheduleTable";
import AddIcon from "@mui/icons-material/Add";
import SimpleDropDown from "../../../atoms/SimpleDropDown";

const LesseeInformation = ({
  activeStep,
  setActiveStep,
  onSave,
  type,
  allNewContractDetails,
  setAllNewContractDetails,
  allNewContractDetailsErr,
  handleAddRentContractInformationError,
  branchDetails,
  setBranchDetails,
  contractStatus,
}) => {
  // const [address, setAddress] = useState(
  //   allNewContractDetails?.joinaddress_Premesis
  // );
  const [branchData, setBranchData] = useState([]);
  // console.log(type, "type");
  const [showBranchID, setShowBranchID] = useState(false);
  const [selectedBranchType, setSelectedBranchType] = useState("");
  // console.log(selectedBranchType,"selectedBranchType");
  const [showInputComponent, setShowInputComponent] = useState(false);

  const updateChange = (e) => {
    console.log(e, "e");
    e.preventDefault();
    setAllNewContractDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  let EntityDetails = [
    { id: "Commercial", label: "Commercial" },
    { id: "Residential", label: "Residential" },
    {
      id: "Both Commercial & Residential",
      label: "Both Commercial & Residential",
    },
  ];

  const handleEntityDetails = (value) => {
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      lesseeEntityDetails: value ? value?.label : null,
    }));
  };

  const updateAddressChange = (value) => {
    console.log(value);
    setAllNewContractDetails(value);
  };

  // console.log(allNewContractDetails?.joinaddress_Premesis, "address");

  let BranchType = [
    { id: "GL-Office", label: "GL-Office" },
    { id: "GL-Hostel", label: "GL-Hostel" },
    { id: "GL-Maintenance", label: "GL-Maintenance" },
    { id: "RF-Office", label: "RF-Office" },
    { id: "RF-Hostel", label: "RF-Hostel" },
    { id: "RF-Maintenance", label: "RF-Maintenance" },
    { id: "HO-Office", label: "HO-Office" },
    { id: "HO-Maintenance", label: "HO-Maintenance" },
    { id: "DO / RO-Office", label: "DO / RO-Office" },
    { id: "DO / RO-Maintenance", label: "DO / RO-Maintenance" },
    { id: "StoreRoom-Office", label: "StoreRoom-Office" },
    { id: "StoreRoom-Maintenance", label: "StoreRoom-Maintenance" },
    { id: "Training Center", label: "Training Center" },
    {
      id: "Training Center-Maintainence",
      label: "Training Center-Maintainence",
    },
    { id: "Others", label: "Others" },
  ];

  const handleBulidingType = (value) => {
    // setAllNewContractDetails((prev) => ({ ...prev, [name]: value }));
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      premesisBuildingType: value ? value?.label : null,
    }));
  };

  const handleLocationChange = (value) => {
    // setAllNewContractDetails((prev) => ({ ...prev, [name]: value }));
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      premesisLocation: value ? value?.label : null,
    }));
  };

  const handleHeadOfficeChange = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
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

  const premesisName = [
    { id: "Head Office-Bangalore", label: "Head Office-Bangalore" },
    { id: "Corporate Office-Chennai", label: "Corporate Office-Chennai" },
    {
      id: "Retail Back Office-Bangalore",
      label: "Retail Back Office-Bangalore",
    },
  ];
  const joinAddress = () => {
    // Combine the address components into a single string with proper formatting.
    const joinedAddress = `${allNewContractDetails.premesisDoorNumber}, ${allNewContractDetails.premesisFloorNumber}, ${allNewContractDetails.premesisLandMark}, ${allNewContractDetails.premesisStreet},${allNewContractDetails.premesisWardNo},${allNewContractDetails.premesisCity},${allNewContractDetails.premesisPinCode},${allNewContractDetails.premesisTaluka},${allNewContractDetails.premesisDistrict},${allNewContractDetails.lessorState}`;
    // setAddress(joinedAddress);
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      joinaddress_Premesis: joinedAddress,
    }));
  };

  const handleBranchType = (value) => {
    // setAllNewContractDetails((prev) => ({ ...prev, [name]: value }));
    // console.log(value?.label, "value");
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      lesseeBranchType: value ? value?.label : null,
    }));
    setSelectedBranchType(value);
    getAllBranchID(value);
  };

  const handleBranchID = (_, value) => {
    getBranchIdDetails(value);
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      branchID: value ? value?.label : null,
    }));
    setShowBranchID(true);
  };

  useEffect(() => {
    getAllBranchID();
  }, []);

  const getAllBranchID = async (branchType) => {
    const { data } = await getBranchIDForBranchDetails(branchType?.label);
    if (data) {
      setBranchData(data || []);
      setShowBranchID(true);
    } else {
      setShowBranchID(true);
      setBranchData([]);
    }
  };

  const getBranchIdDetails = async (branchID) => {
    const { data } = await getRentContractDetailsOnBranchID(branchID);
    if (data) {
      if (data) {
        setAllNewContractDetails(data?.data || {});
        setShowBranchID(true);
      }
    }
  };

  const handleNext = () => {
    const ValidateError = handleAddRentContractInformationError();
    // console.log("ValidateError", ValidateError);
    // Check for empty fields
    const isEmptyField = Object.values(allNewContractDetails).some(
      (value) => value === ""
    );
    if (!ValidateError && !isEmptyField) {
      // console.log("ValidateError", ValidateError);
      onSave(allNewContractDetails, type);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addButtonClick = () => {
    setShowInputComponent(true);
  };

  return (
    <>
      <Box sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}>
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-3">
            Branch/Office Hierarchy Details
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2 px-3" lg={12}>
              {/* <DropDownComponent
                label="Premesis Type"
                sx={{ width: 300 }}
                options={BranchType}
                getOptionLabel={(option) =>
                  option?.label || allNewContractDetails?.lesseeBranchType
                }
                // name="lesseeBranchType"
                value={
                  type === "edit"
                    ? allNewContractDetails?.lesseeBranchType
                    : allNewContractDetails?.lesseeBranchType || null
                }
                onChange={handleBranchType}
                // onChange={(val) => handleBranchType("lesseeBranchType", val)}
                required={true}
              /> */}

              <SimpleDropDown
                options={BranchType}
                label="Select an option"
                onChange={handleBranchType}
                value={
                  BranchType?.find(
                    (option) =>
                      option?.label === allNewContractDetails?.lesseeBranchType
                  ) || null
                }
                sx={{ width: 300 }}
                required={true}
              />
            </Grid>
          </Grid>

          {(selectedBranchType &&
            selectedBranchType?.label !== "HO-Office" &&
            selectedBranchType?.label !== "HO-Maintenance" &&
            selectedBranchType?.label !== "DO / RO-Office" &&
            selectedBranchType?.label !== "DO / RO-Maintenance" &&
            selectedBranchType?.label !== "StoreRoom-Office" &&
            selectedBranchType?.label !== "StoreRoom-Maintenance" &&
            selectedBranchType?.label !== "Training Center" &&
            selectedBranchType?.label !== "Training Center-Maintainence") ||
          type === "edit" ? (
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" lg={12}>
                {showInputComponent ? (
                  <Box>
                    <TextField
                      id="outlined-basic"
                      label="Branch ID"
                      variant="outlined"
                      size="small"
                      sx={{ m: 1, width: 300 }}
                      name="branchID"
                      value={allNewContractDetails?.branchID}
                      onChange={(e) => updateChange(e)}
                      required={true}
                    />
                  </Box>
                ) : (
                  <Autocomplete
                    size="small"
                    sx={{ width: 300, ml: 1, borderRadius: 10 }}
                    options={branchData}
                    getOptionLabel={(option) =>
                      option?.label ? option?.label : option || ""
                    }
                    isOptionEqualToValue={(option, value) =>
                      value === undefined ||
                      value === "" ||
                      option?.label === value?.label
                    }
                    value={
                      type === "edit"
                        ? allNewContractDetails?.branchID
                        : allNewContractDetails?.branchID || ""
                    }
                    onChange={handleBranchID}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Branch ID"
                        variant="outlined"
                      />
                    )}
                    noOptionsText={
                      showBranchID ? (
                        <Box>
                          <Box
                            onClick={() => addButtonClick()}
                            className="d-flex "
                          >
                            <AddIcon className="color-blue" />
                            <Typography className="fs-14">
                              Add Branch
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Typography>No Options Available</Typography>
                      )
                    }
                  />

                  // <Autocomplete
                  //   size="small"
                  //   sx={{ width: 300, ml: 1, borderRadius: 10 }}
                  //   defaultValue={null}
                  //   options={branchData}
                  //   getOptionLabel={(option) =>
                  //     option?.label ? option?.label : option || ""
                  //   }
                  //   isOptionEqualToValue={(option, value) =>
                  //     value === undefined ||
                  //     value === "" ||
                  //     option?.label === value?.label
                  //   }
                  //   value={
                  //     type === "edit"
                  //       ? allNewContractDetails?.branchID
                  //       : allNewContractDetails?.branchID || null
                  //   }
                  //   onChange={handleBranchID}
                  //   renderInput={(params) => (
                  //     <TextField
                  //       {...params}
                  //       label="Branch ID"
                  //       variant="outlined"
                  //     />
                  //   )}
                  //   noOptionsText={
                  //     showBranchID ? (
                  //       <Typography
                  //         onClick={addButtonClick}
                  //         variant="body1"
                  //         className="fs-14"
                  //       >
                  //         <Box className="d-flex align-center">
                  //           <AddIcon className="color-blue" />
                  //           <span>Add Branch</span>
                  //         </Box>
                  //       </Typography>
                  //     ) : (
                  //       <Typography variant="body1">
                  //         No Options Available
                  //       </Typography>
                  //     )
                  //   }
                  // />
                )}
              </Grid>

              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Branch Name"
                  placeholder="Enter Branch Name."
                  sx={{ width: 300 }}
                  name="branchName"
                  value={
                    type === "edit"
                      ? allNewContractDetails?.lesseeBranchName ||
                        allNewContractDetails?.branchName
                      : allNewContractDetails?.lesseeBranchName ||
                        allNewContractDetails?.branchName ||
                        ""
                  }
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.lesseeBranchName || ""}
                  // readOnly
                />
                <InputBoxComponent
                  label="Area Name"
                  placeholder="Enter Area Name ."
                  sx={{ width: 300 }}
                  name="areaName"
                  value={
                    type === "edit"
                      ? allNewContractDetails?.lesseeAreaName ||
                        allNewContractDetails?.areaName
                      : allNewContractDetails?.lesseeAreaName ||
                        allNewContractDetails?.areaName ||
                        ""
                  }
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.areaName || ""}
                />
                <InputBoxComponent
                  label="Division/Region"
                  placeholder="Enter Div/Reg No."
                  sx={{ width: 300 }}
                  name="region"
                  value={
                    type === "edit"
                      ? allNewContractDetails?.lesseeDivision ||
                        allNewContractDetails?.region
                      : allNewContractDetails?.lesseeDivision ||
                        allNewContractDetails?.region ||
                        ""
                  }
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.region || ""}
                />
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Zone"
                  placeholder="Enter Zone ."
                  sx={{ width: 300 }}
                  name="zone"
                  value={
                    type === "edit"
                      ? allNewContractDetails?.lesseeZone ||
                        allNewContractDetails?.zone
                      : allNewContractDetails?.lesseeZone ||
                        allNewContractDetails?.zone ||
                        ""
                  }
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.zone || ""}
                />
                <InputBoxComponent
                  label="State"
                  placeholder="Enter State ."
                  sx={{ width: 300 }}
                  name="state"
                  value={
                    type === "edit"
                      ? allNewContractDetails?.lesseeState ||
                        allNewContractDetails?.state
                      : allNewContractDetails?.lesseeState ||
                        allNewContractDetails?.state ||
                        ""
                  }
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.state}
                />
              </Grid>
            </Grid>
          ) : null}
        </Box>

        {(selectedBranchType && selectedBranchType?.label === "HO-Office") ||
        selectedBranchType?.label === "HO-Maintenance" ||
        selectedBranchType?.label === "DO / RO-Office" ||
        selectedBranchType?.label === "DO / RO-Maintenance" ||
        selectedBranchType?.label === "StoreRoom-Office" ||
        selectedBranchType?.label === "StoreRoom-Maintenance" ||
        selectedBranchType?.label === "Training Center" ||
        selectedBranchType?.label === "Training Center-Maintainence" ? (
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2" lg={12}>
              <DropDownComponent
                label="Office Name"
                options={premesisName}
                sx={{ width: 300 }}
                name="premesisOfficeName"
                value={allNewContractDetails?.premesisOfficeName}
                onChange={(val) =>
                  handleHeadOfficeChange("premesisOfficeName", val)
                }
              />
            </Grid>
          </Grid>
        ) : null}
        <Box
          className="d-flex justify-content-center w-100"
          sx={{ height: "calc(100% - 55px)" }}
        >
          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-3">
              Premesis Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex " lg={12}>
                {contractStatus === "Renewal" ? (
                  <InputBoxComponent
                    label="Previous Contract ID."
                    placeholder="Enter contract Id."
                    sx={{ width: 300, mt: -5, ml: 3 }}
                    name="priviousContractID"
                    value={allNewContractDetails?.priviousContractID}
                    onChange={(e) => updateChange(e)}
                    required={true}
                  />
                ) : null}
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                {/* <DropDownComponent
                  label="Entity Details "
                  sx={{ width: 300 }}
                  options={EntityDetails}
                  getOptionLabel={(option) =>
                    option?.label || allNewContractDetails?.lesseeEntityDetails
                  }
                  name="lesseeEntityDetails"
                  value={
                    type === "edit"
                      ? allNewContractDetails?.lesseeEntityDetails || null
                      : allNewContractDetails?.lesseeEntityDetails || null
                  }
                  // onSelect={handleEntityDetails}
                  onChange={handleEntityDetails}
                  required={true}
                /> */}

                <SimpleDropDown
                  options={EntityDetails}
                  label="Entity Details"
                  onChange={handleEntityDetails}
                  value={
                    EntityDetails?.find(
                      (option) =>
                        option?.label ===
                        allNewContractDetails?.lesseeEntityDetails
                    ) || null
                  }
                  sx={{ width: 300 }}
                  required={true}
                />

                <DropDownComponent
                  label="Location"
                  sx={{ width: 300 }}
                  options={location}
                  getOptionLabel={(option) =>
                    option?.label || allNewContractDetails?.premesisLocation
                  }
                  // name="premesisLocation"
                  value={
                    type === "edit"
                      ? allNewContractDetails?.premesisLocation || null
                      : allNewContractDetails?.premesisLocation || null
                  }
                  onChange={handleLocationChange}
                  required={true}
                />
                <DropDownComponent
                  label="Building Type"
                  sx={{ width: 300 }}
                  options={typeOfBuliding}
                  // name="premesisBuildingType"
                  getOptionLabel={(option) =>
                    option?.label || allNewContractDetails?.premesisBuildingType
                  }
                  value={
                    type === "edit"
                      ? allNewContractDetails?.premesisBuildingType || null
                      : allNewContractDetails?.premesisBuildingType || null
                  }
                  // onSelect={handleBulidingType}
                  onChange={handleBulidingType}
                  required={true}
                />
              </Grid>
            </Grid>

            <Box>
              <Typography className="fs-20 fw-500 pt-4 px-3">
                Premises Address Details
              </Typography>
              <Grid container spacing={2} className="px-2 py-2 mt-1">
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Door No."
                    placeholder="Enter Door No."
                    sx={{ width: 300 }}
                    name="premesisDoorNumber"
                    value={allNewContractDetails?.premesisDoorNumber}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisDoorNumber}
                    required={true}
                  />
                  <InputBoxComponent
                    label="Floor No."
                    placeholder="Enter Floor No."
                    sx={{ width: 300 }}
                    name="premesisFloorNumber"
                    value={allNewContractDetails?.premesisFloorNumber}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisFloorNumber}
                    required={true}
                  />
                  <InputBoxComponent
                    label="Land Mark"
                    placeholder="Enter Land Mark"
                    sx={{ width: 300 }}
                    name="premesisLandMark"
                    value={allNewContractDetails?.premesisLandMark}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisLandMark}
                    required={true}
                  />
                </Grid>
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Road/Street"
                    placeholder="Enter Road"
                    sx={{ width: 300 }}
                    name="premesisStreet"
                    value={allNewContractDetails?.premesisStreet}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisStreet}
                    required={true}
                  />
                  <InputBoxComponent
                    label="Ward Name/No Area Name/Layout Name/Extension"
                    placeholder="Enter Ward No."
                    sx={{ width: 300 }}
                    name="premesisWardNo"
                    value={allNewContractDetails?.premesisWardNo}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisWardNo}
                    required={true}
                  />
                  <InputBoxComponent
                    label="City"
                    sx={{ width: 300 }}
                    placeholder="Enter City"
                    name="premesisCity"
                    value={allNewContractDetails?.premesisCity}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisCity}
                    required={true}
                  />
                </Grid>
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Pincode"
                    placeholder="Enter Pincode"
                    sx={{ width: 300 }}
                    name="premesisPinCode"
                    value={allNewContractDetails?.premesisPinCode}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisPinCode}
                    required={true}
                  />
                  <InputBoxComponent
                    label="Taluk"
                    placeholder="Enter Taluk"
                    sx={{ width: 300 }}
                    name="premesisTaluka"
                    value={allNewContractDetails?.premesisTaluka}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisTaluka}
                    required={true}
                  />

                  <InputBoxComponent
                    label="District "
                    sx={{ width: 300 }}
                    placeholder="Enter District"
                    name="premesisDistrict"
                    value={allNewContractDetails?.premesisDistrict}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.premesisDistrict}
                    required={true}
                  />
                </Grid>
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="State "
                    sx={{ width: 300 }}
                    placeholder="Enter State"
                    name="lessorState"
                    value={allNewContractDetails?.lessorState}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorState}
                    required={true}
                  />
                </Grid>

                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Plot Area"
                    placeholder="Enter Plot Area ."
                    sx={{ width: 300 }}
                    name="plotNumber"
                    value={allNewContractDetails?.plotNumber}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.plotNumber}
                    required={true}
                  />
                  <InputBoxComponent
                    label="Buit-Up Area"
                    placeholder="Enter Bulit-Up Area ."
                    sx={{ width: 300 }}
                    name="builtupArea"
                    value={allNewContractDetails?.builtupArea}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.builtupArea}
                    required={true}
                  />
                </Grid>

                <Grid
                  item
                  className="d-flex flex-column align-items-start justify-content-start m-3"
                  md={12}
                >
                  <Button onClick={joinAddress}>Join Address</Button>
                  {/* {address ? ( */}
                  <InputBoxComponent
                    label="Address"
                    placeholder="Enter Address"
                    multiline
                    sx={{ width: 300 }}
                    size="large"
                    value={allNewContractDetails?.joinaddress_Premesis}
                    // onChange={() => updateAddressChange()}
                    readOnly
                    required={true}
                  />
                  {/* ) : null} */}
                </Grid>

                <Box>
                  <Typography className="fs-20 fw-500 pt-4 px-4">
                    Premesis Schedule Details
                  </Typography>
                  <Grid container spacing={2} className="d-flex px-2 py-2 mt-1">
                    <Grid item className="d-flex m-2" md={12}>
                      <Grid item className="d-flex m-2" md={12}>
                        <Typography>1. </Typography>
                        <Typography>North:</Typography>
                        <InputBoxComponent
                          label="Description"
                          placeholder="Enter Description"
                          sx={{ width: 300, mt: -1.5, ml: 1 }}
                          name="northPremesis"
                          value={allNewContractDetails?.northPremesis}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.northPremesis}
                          multiline
                          required={true}
                        />
                      </Grid>
                      <Grid item className="d-flex  m-2" md={12}>
                        <Typography>2.</Typography>
                        <Typography>South:</Typography>
                        <InputBoxComponent
                          label="Description"
                          placeholder="Enter Description"
                          sx={{ width: 300, mt: -1.5, ml: 1 }}
                          name="southPremesis"
                          value={allNewContractDetails?.southPremesis}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.southPremesis}
                          multiline
                          required={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid item className="d-flex m-2" md={12}>
                      <Grid item className="d-flex m-2" md={12}>
                        <Typography>3.</Typography>
                        <Typography>East:</Typography>
                        <InputBoxComponent
                          label="Description"
                          placeholder="Enter Description"
                          sx={{ width: 300, mt: -1.5, ml: 1 }}
                          name="eastPremesis"
                          value={allNewContractDetails?.eastPremesis}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.eastPremesis}
                          multiline
                          required={true}
                        />
                      </Grid>
                      <Grid item className="d-flex m-2" md={12}>
                        <Typography>4.</Typography>
                        <Typography>West:</Typography>
                        <InputBoxComponent
                          label="Description"
                          placeholder="Enter Description"
                          sx={{ width: 300, mt: -1.5, ml: 1 }}
                          name="westPremesis"
                          value={allNewContractDetails?.westPremesis}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.westPremesis}
                          multiline
                          required={true}
                        />
                      </Grid>
                      {/* <ReusableTable columns={columns}required={true}/> */}
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  className="d-flex justify-content-center w-100"
                  sx={{ overflow: "hidden" }}
                >
                  <Box>
                    <Typography className="fs-20 fw-500 pt-4 px-4">
                      GPS Details
                    </Typography>
                    <Grid container spacing={2} className="px-3 py-0 mt-0">
                      <Grid item className="d-flex m-2" md={12}>
                        <InputBoxComponent
                          label="Lattitude"
                          placeholder="Enter Lattitude"
                          sx={{ width: 300 }}
                          name="lattitude"
                          value={allNewContractDetails?.lattitude}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.lattitude}
                          required={true}
                        />
                        <InputBoxComponent
                          label="Longitude"
                          placeholder="Enter Longitude"
                          sx={{ width: 300 }}
                          name="longitude"
                          value={allNewContractDetails?.longitude}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.longitude}
                          required={true}
                        />

                        <InputBoxComponent
                          label="GPS Co-ordinates"
                          placeholder="Enter GPS Co-ordinates"
                          sx={{ width: 300 }}
                          name="gpsCoordinates"
                          value={allNewContractDetails?.gpsCoordinates}
                          onChange={(e) => updateChange(e)}
                          errorText={allNewContractDetailsErr?.gpsCoordinates}
                          required={true}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="d-flex justify-content-end w-100">
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={handleBack}
          variant="contained"
          sx={{ m: 1 }}
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

export default LesseeInformation;
