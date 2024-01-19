import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../atoms/DropDownComponent";
import UploadDocumentFile from "../../../atoms/UploadDocumentFile";

const EditGeneralInformation = ({
  activeStep,
  setActiveStep,
  onSave,
  setRecipiantsData,
  editAllContractDetails,
  setEditAllContractDetails,
  editAllContractDetailsErr,
  handleAddRentContractInformationError,
}) => {
  let PaymentMode = [
    { id: "1", label: "Cash" },
    { id: "2", label: "Credit/Debit Card" },
    { id: "3", label: "NEFT" },
  ];

  let recipents = [
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const [textFieldCount, setTextFieldCount] = useState(0);

  const handleDropdownChange = (value) => {
    // setRecipiantsData(value)
    setSelectedOption(value);
    if (value.id === "1") {
      setTextFieldCount(1);
    } else if (value.id === "2") {
      setTextFieldCount(2);
    } else if (value.id === "3") {
      setTextFieldCount(3);
    } else if (value.id === "4") {
      setTextFieldCount(4);
    } else {
      setTextFieldCount(0);
    }
  };

  const handlePaymentChange = (value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      paymentMode: value,
    });
  };

  const updateChange = (e) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleNext = () => {
    // let err = handleAddRentContractInformationError();
    // if (!err) {
    onSave(editAllContractDetails);
    // }

    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Box
        className="d-flex justify-content-center w-100"
        sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}
      >
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-3">
            General Details
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2" lg={12}>
              <InputBoxComponent
                label="Lessor Name"
                placeholder="Enter Lessor Name"
                sx={{ width: 300 }}
                name="lessorName"
                value={editAllContractDetails.lessorName}
                onChange={(e) => updateChange(e)}
                errorText={editAllContractDetailsErr.lessorName}
              />

              <InputBoxComponent
                label="Contact Number."
                placeholder="Enter Contact No."
                sx={{ width: 300 }}
                name="lessorContactNumber"
                value={editAllContractDetails.lessorContactNumber}
                onChange={(e) => updateChange(e)}
                errorText={editAllContractDetailsErr.lessorContactNumber}
              />
              <InputBoxComponent
                label="Email Address."
                placeholder="Enter Email Address."
                sx={{ width: 300 }}
                name="lessorEmailAddress"
                value={editAllContractDetails.lessorEmailAddress}
                onChange={(e) => updateChange(e)}
                errorText={editAllContractDetailsErr.lessorEmailAddress}
              />
            </Grid>
            <Grid item className="d-flex m-2" lg={12}>
              <InputBoxComponent
                label="PAN No"
                placeholder="Enter PAN No."
                sx={{ width: 300 }}
                name="lessorPanNumber"
                value={editAllContractDetails.lessorPanNumber}
                onChange={(e) => updateChange(e)}
                errorText={editAllContractDetailsErr.lessorPanNumber}
              />
              <InputBoxComponent
                label="GST No."
                placeholder="Enter GST No."
                sx={{ width: 300 }}
                name="lessorGstNumber"
                value={editAllContractDetails.lessorGstNumber}
                onChange={(e) => updateChange(e)}
                errorText={editAllContractDetailsErr.lessorGstNumber}
              />
              {/* <InputBoxComponent
                label="TDS No."
                placeholder="Enter TDS No."
                sx={{ width: 300 }}
                name="lessorTdsNumber"
                value={editAllContractDetails.lessorTdsNumber}
                onChange={(e) => updateChange(e)}
                errorText={editAllContractDetailsErr.lessorTdsNumber}
              /> */}
            </Grid>
            <Grid item className="d-flex m-2" lg={12}>
              <DropDownComponent
                label="Payment Mode"
                placeholder="Enter Mode"
                sx={{ width: 300 }}
                options={PaymentMode}
                name="paymentMode"
                value={editAllContractDetails.paymentMode}
                // onSelect={handlePaymentChange}
                onChange={(event, newValue) => {
                  handlePaymentChange("paymentMode", event, newValue);
                }}
                errorText={editAllContractDetailsErr.paymentMode}
              />
              <DropDownComponent
                label="Recipiants"
                placeholder="Enter Recipiant"
                sx={{ width: 300, ml: 1 }}
                options={recipents}
                onSelect={handleDropdownChange}
                errorText={editAllContractDetailsErr.paymentMode}
              />
            </Grid>
            <Grid item className="d-flex m-2" lg={12}></Grid>
            {textFieldCount > 0 &&
              Array.from({ length: textFieldCount }, (_, index) => (
                <Grid container spacing={2} className="px-2 py-2 mt-1">
                  <Grid item className="d-flex m-2" md={12} key={index}>
                    <InputBoxComponent
                      label="Recipiants"
                      placeholder={`Enter Recipiant Name ${index + 1}...`}
                      sx={{ width: 300 }}
                      name="lessorRecipiantsName"
                      value={editAllContractDetails.lessorRecipiantsName}
                      onChange={(e) => updateChange(e)}
                      errorText={editAllContractDetailsErr.lessorRecipiantsName}
                    />

                    <InputBoxComponent
                      label="Bank Name "
                      sx={{ width: 300 }}
                      placeholder={`Enter Bank Name ${index + 1}...`}
                      name="lessorBankName"
                      value={editAllContractDetails.lessorBankName}
                      onChange={(e) => updateChange(e)}
                      errorText={editAllContractDetailsErr.lessorBankName}
                    />
                  </Grid>
                  <Grid item className="d-flex m-2" md={12} key={index}>
                    <InputBoxComponent
                      label="Branch Name"
                      sx={{ width: 300 }}
                      placeholder={`Enter Branch Name ${index + 1}...`}
                      name="lessorBranchName"
                      value={editAllContractDetails.lessorBranchName}
                      onChange={(e) => updateChange(e)}
                      errorText={editAllContractDetailsErr.lessorBranchName}
                    />

                    <InputBoxComponent
                      label="IFSC Code"
                      sx={{ width: 300 }}
                      placeholder={`Enter IFSC Code ${index + 1}...`}
                      name="lessorIfscNumber"
                      value={editAllContractDetails.lessorIfscNumber}
                      onChange={(e) => updateChange(e)}
                      errorText={editAllContractDetailsErr.lessorIfscNumber}
                    />
                  </Grid>
                  <Grid item className="d-flex m-2" md={12} key={index}>
                    <InputBoxComponent
                      label="A/c No."
                      sx={{ width: 300 }}
                      placeholder={`Enter A/c no. ${index + 1}...`}
                      name="lessorAccountNumber"
                      value={editAllContractDetails.lessorAccountNumber}
                      onChange={(e) => updateChange(e)}
                      errorText={editAllContractDetailsErr.lessorAccountNumber}
                    />
                  </Grid>
                </Grid>
              ))}
          </Grid>

          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-3">
              Ownership Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" lg={12}>
                {/* <InputBoxComponent
                  label="Electicity Bill No."
                  placeholder="Enter Bill No."
                  sx={{ width: 300 }}
                  name="lessorElectricityBillNumber"
                  value={editAllContractDetails.lessorElectricityBillNumber}
                  onChange={(e) => updateChange(e)}
                  errorText={
                    editAllContractDetailsErr.lessorElectricityBillNumber
                  }
                /> */}
                <UploadDocumentFile
                  sx={{ ml: 3, mt: 1 }}
                  textLabel="Electicity Bill "
                />

                {/* <InputBoxComponent
                  label="Tax Paid Receipt No."
                  placeholder="Enter Receipt No."
                  sx={{ width: 300 }}
                  name="lessorTaxNumber"
                  value={editAllContractDetails.lessorTaxNumber}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorTaxNumber}
                /> */}
                <UploadDocumentFile
                  sx={{ ml: 3, mt: 1 }}
                  textLabel="Bank Pass Book"
                />
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                {/* <InputBoxComponent
                  label="Bank Pass Book No."
                  placeholder="Enter Passbook No."
                  sx={{ width: 300 }}
                  name="lessorBankPassBookNumber"
                  value={editAllContractDetails.lessorBankPassBookNumber}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorBankPassBookNumber}
                /> */}
                <UploadDocumentFile
                  sx={{ ml: 3, mt: 1 }}
                  textLabel="Tax Paid Receipt "
                />
                {/* <InputBoxComponent
                  label="Cheuque."
                  placeholder="Enter Cheuque No."
                  sx={{ width: 300 }}
                  value={editAllContractDetails.lessorCheuque}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorCheuque}
                /> */}
                <UploadDocumentFile
                  sx={{ ml: 3, mt: 1 }}
                  textLabel="Cheuque "
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-3">
              Address Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="Door No."
                  placeholder=""
                  sx={{ width: 300 }}
                  name="lessorDoorNumber"
                  value={editAllContractDetails.lessorDoorNumber}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorDoorNumber}
                />
                <InputBoxComponent
                  label="Floor No."
                  sx={{ width: 300 }}
                  name="lessorFloorNumber"
                  value={editAllContractDetails.lessorFloorNumber}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorFloorNumber}
                />
                <InputBoxComponent
                  label="Land Mark"
                  placeholder=""
                  sx={{ width: 300 }}
                  name="lessorLandMark"
                  value={editAllContractDetails.lessorLandMark}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorLandMark}
                />
              </Grid>
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="Road/Street"
                  sx={{ width: 300 }}
                  name="lessorStreet"
                  value={editAllContractDetails.lessorStreet}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorStreet}
                />
                <InputBoxComponent
                  label="Ward Name/No Area Name/Layout Name/Extension"
                  sx={{ width: 300 }}
                  name="lessorArea"
                  value={editAllContractDetails.lessorWardNo}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorWardNo}
                />
                <InputBoxComponent
                  label="City"
                  sx={{ width: 300 }}
                  name="lessorCity"
                  value={editAllContractDetails.lessorCity}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorCity}
                />
              </Grid>
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="Location"
                  sx={{ width: 300 }}
                  name="lessorLocation"
                  value={editAllContractDetails.lessorLocation}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorLocation}
                />
                <InputBoxComponent
                  label="Pincode"
                  sx={{ width: 300 }}
                  name="lessorPinCode"
                  value={editAllContractDetails.lessorPinCode}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorPinCode}
                />
                <InputBoxComponent
                  label="Taluk"
                  sx={{ width: 300 }}
                  name="lessorTaluka"
                  value={editAllContractDetails.lessorTaluka}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorTaluka}
                />
              </Grid>
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="District "
                  sx={{ width: 300 }}
                  name="lessorDistrict"
                  value={editAllContractDetails.lessorDistrict}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorDistrict}
                />
                <InputBoxComponent
                  label="State"
                  sx={{ width: 300 }}
                  name="lessorState"
                  value={editAllContractDetails.lessorState}
                  onChange={(e) => updateChange(e)}
                  errorText={editAllContractDetailsErr.lessorState}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <hr style={{ border: "2px solid", borderStyle: "dashed" }} />
      </Box>
      <Box className="d-flex  justify-content-end w-100">
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

export default EditGeneralInformation;
