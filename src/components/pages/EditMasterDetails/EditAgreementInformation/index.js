import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../atoms/DropDownComponent";
import DatePickerComponent from "../../../atoms/DatePickerComponent";
import UploadDocumentFile from "../../../atoms/UploadDocumentFile";


const EditAgreementInformation = ({
  activeStep,
  setActiveStep,
  onSave,
  type,
  editAllContractDetails,
  setEditAllContractDetails
}) => {
  

  const handleNext = () => {
    onSave(editAllContractDetails, type);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let activationStatus = [
    { id: "1", label: "Open" },
    { id: "2", label: "Close" },
  ];

 

  let LockinPeriod = [
    { id: "1", label: "1years" },
    { id: "2", label: "2years" },
    { id: "3", label: "3years" },
  ];

  let DocumentType = [
    { id: "1", label: "PAN Card" },
    { id: "2", label: "Electricity Bill" },
    { id: "3", label: "Rental Agreement NOC" },
    { id: "4", label: "AadharCard" },
    { id: "1", label: "Tax Paid Receipt" },
    { id: "1", label: "Bank Pass Book" },
  ];

  let noticePeriod = [
    { id: "1", label: "2months" },
    { id: "2", label: "3months" },
  ];

  let ExitTerms = [
    { id: "1", label: "Written Notice" },
    { id: "2", label: "Mail Communication" },
    { id: "3", label: "Oral Communication" },
  ];

 

  const updateChange = (e) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDocumentType = (value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      documentType: value,
    });
  };

  const handleLockinPeriod = (value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      lockinPeriod: value,
    });
  };
  const handleexitTerms = (value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      exitterms: value,
    });
  };

  const handleNoticePeriod = (value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      noticePeriod: value,
    });
  };

  const handleActivationStatus = (value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      activationStatus: value,
    });
  };

  const handleAgreementSignDate = (val) => {
    // console.log(val, "val");
    // let data = moment(val).format("YYYY-MM-DD");
    setEditAllContractDetails({
      ...editAllContractDetails,
      agreementSignDate: val,
    });
  };

  const handleAgreementStartDate = (val) => {
    // let data = moment(val).format("YYYY-MM-DD");
    setEditAllContractDetails({
      ...editAllContractDetails,
      agreementStartDate: val,
    });
  };

  const handleAgreementEndDate = (val) => {
    // let data = moment(val).formatByString("YYYY-MM-DD");
    setEditAllContractDetails({
      ...editAllContractDetails,
      agreementEndDate: val,
    });
  };

  const handleRentStartDate = (val) => {
    // let data = moment(val).format("YYYY-MM-DD");
    setEditAllContractDetails({
      ...editAllContractDetails,
      rentStartDate: val,
    });
  };

  const handleRentEndDate = (val) => {
    // let data = moment(val).format("YYYY-MM-DD");
    setEditAllContractDetails({
      ...editAllContractDetails,
      rentEndDate: val,
    });
  };


  return (
    <>
      <Box sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}>
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-4">
            Agreement Details
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1 ">
            <Grid item className="d-flex m-2" md={12}>
              <DatePickerComponent
                placeholder="Select Sign Date"
                label="Agreement Sign Date"
                size="small"
                sx={{ width: 200 }}
                name="agreementSignDate"
                value={editAllContractDetails?.agreementSignDate}
                onChange={handleAgreementSignDate}
              />
              <InputBoxComponent
                label="Tenure"
                placeholder="Enter Tenure"
                sx={{ width: 300 }}
                size="large"
                name="agreementTenure"
                value={editAllContractDetails?.agreementTenure}
                onChange={(e) => updateChange(e)}
              />
              <DropDownComponent
                label="ActivationStatus"
                placeholder="Enter Activation Status"
                sx={{ width: 200, ml: 2 }}
                size="large"
                options={activationStatus}
                name="agreementActivationStatus"
                value={editAllContractDetails?.agreementActivationStatus}
                onSelect={handleActivationStatus}
              />
            </Grid>
          </Grid>

          <Typography className="fs-20 fw-500 pt-4 px-4">
            Agreement Start & End Date
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1 ">
            <Grid item className="d-flex m-2" md={12}>
              <DatePickerComponent
                placeholder="Select Start From"
                label="Agreement Start Date"
                size="small"
                sx={{ width: 200 }}
                name="agreementStartDate"
                value={editAllContractDetails?.agreementStartDate}
                onChange={handleAgreementStartDate}
              />
              <DatePickerComponent
                placeholder="Select End at"
                label="Agreement End Date"
                size="small"
                sx={{ width: 200 }}
                name="agreementEndDate"
                value={editAllContractDetails?.agreementEndDate}
                onChange={handleAgreementEndDate}
              />
            </Grid>

            <Typography className="fs-20 fw-500 pt-4 px-4">
              Rent Start & End Date
            </Typography>
            <Grid item className="d-flex m-2" md={12}>
              <DatePickerComponent
                placeholder="Select Start From"
                label="Rent Start Date"
                size="small"
                sx={{ width: 200 }}
                name="rentStartDate"
                value={editAllContractDetails?.rentStartDate}
                onChange={handleRentStartDate}
              />
              <DatePickerComponent
                placeholder="Select End at"
                label="Rent End Date"
                size="small"
                sx={{ width: 200 }}
                name="rentEndDate"
                value={editAllContractDetails?.rentEndDate}
                onChange={handleRentEndDate}
              />
            </Grid>

            {/* <Typography className="fs-20 fw-500 pt-4 px-4">
              Refresh Date
            </Typography> */}
            {/* <Grid item className="d-flex m-2" md={12}>
              <DatePickerComponent
                placeholder="Select Start From"
                label="Revised Start Date"
                size="small"
                sx={{ width: 200 }}
                name="agreementRefreshStartDate"
                value={editAllContractDetails?.agreementRefreshStartDate}
                onChange={handleRefreshStartDate}
              />
              <DatePickerComponent
                placeholder="Select End at"
                label="Revised End Date"
                size="small"
                sx={{ width: 200 }}
                name="agreementRefreshEndDate"
                value={editAllContractDetails?.agreementRefreshEndDate}
                onChange={handleRefreshEndDate}
              />
            </Grid> */}
          </Grid>
        </Box>
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-4">
            Maintainence
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2" md={12}>
              <InputBoxComponent
                label="Maintainene Charges"
                placeholder="Enter Maintainene Charges"
                sx={{ width: 300 }}
                name="maintaineneCharge"
                value={editAllContractDetails?.maintaineneCharge}
                onChange={(e) => updateChange(e)}
              />
              <InputBoxComponent
                label="Water Charges"
                placeholder="Enter Water Charges"
                sx={{ width: 300 }}
                name="waterCharge"
                value={editAllContractDetails?.waterCharge}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
            <Grid item className="d-flex py-1" md={12}>
              <InputBoxComponent
                label="Electricity "
                placeholder="Enter Electricity "
                sx={{ width: 300, ml: 1 }}
                name="electricity"
                value={editAllContractDetails?.electricity}
                onChange={(e) => updateChange(e)}
              />

              <DropDownComponent
                label="Document Type"
                sx={{ width: 300, mt: 0.5, ml: 0.5 }}
                options={DocumentType}
                name="documentType"
                value={editAllContractDetails?.documentType}
                onSelect={handleDocumentType}
              />
              <UploadDocumentFile sx={{ mt: 1, ml: 2 }} size="small" />
            </Grid>

            <Typography className="fs-20 fw-500 pt-4 px-4">
              Security Deposit Details
            </Typography>
            <Grid item className="d-flex m-2" md={12}>
              <InputBoxComponent
                label="Security Deposit Amount"
                placeholder="Enter SD Amount"
                sx={{ width: 300 }}
                name="securityDepositAmount"
                value={editAllContractDetails?.securityDepositAmount}
                onChange={(e) => updateChange(e)}
              />

              <DatePickerComponent
                label="Payment Date"
                placeholder="Enter Payment Date"
                sx={{ width: 500 }}
                name="securityDepositPaymentDate"
                value={editAllContractDetails?.securityDepositPaymentDate}
                onChange={(e) => updateChange(e)}
              />

              <InputBoxComponent
                label="Payment Details"
                placeholder="Enter Payment Details"
                sx={{ width: 300 }}
                name="securityDepositPaymentMode"
                value={editAllContractDetails?.securityDepositPaymentMode}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
            <Grid item className="d-flex m-2" md={12}>
              <InputBoxComponent
                label="UTR Details"
                placeholder="Enter UTR Details"
                sx={{ width: 300 }}
                multiline
                name="securityDepositUtr"
                value={editAllContractDetails?.securityDepositUtr}
                onChange={(e) => updateChange(e)}
              />

              <InputBoxComponent
                label="Monthly Rent"
                placeholder="Enter Monthly Rent"
                sx={{ width: 300 }}
                name="rentAmount"
                value={editAllContractDetails?.rentAmount}
                onChange={(e) => updateChange(e)}
              />

              <InputBoxComponent
                label="First Month Value"
                placeholder="Enter First Month Value"
                sx={{ width: 300 }}
                name="firstMonthValue"
                value={editAllContractDetails?.firstMonthValue}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
            <Grid item className="d-flex m-2" md={12}>
              <InputBoxComponent
                label="Last Month Value"
                placeholder="Enter Last Month Value"
                sx={{ width: 300 }}
                name="lastMonthvalue"
                value={editAllContractDetails?.lastMonthvalue}
                onChange={(e) => updateChange(e)}
              />
              <InputBoxComponent
                label="Standard Deduction"
                placeholder="Enter Standard Deduction"
                sx={{ width: 300 }}
                name="standardDeduction"
                value={editAllContractDetails?.standardDeduction}
                onChange={(e) => updateChange(e)}
              />

              <DropDownComponent
                label="Lockin Period"
                sx={{ width: 300, ml: 1 }}
                options={LockinPeriod}
                name="securityDepositLockinPeriod"
                value={editAllContractDetails?.securityDepositLockinPeriod}
                onSelect={handleLockinPeriod}
              />
            </Grid>
            <Grid item className="d-flex ml-2" md={12}>
              <DropDownComponent
                label="Notice Period"
                sx={{ width: 300, ml: 1 }}
                options={noticePeriod}
                name="securityDepositnoticePeriod"
                value={editAllContractDetails?.securityDepositnoticePeriod}
                onSelect={handleNoticePeriod}
              />

              <DropDownComponent
                label="Exit Terms"
                sx={{ width: 300, ml: 2 }}
                options={ExitTerms}
                name="securityDepositExitTerm"
                value={editAllContractDetails?.securityDepositExitTerm}
                onSelect={handleexitTerms}
              />
            </Grid>
          </Grid>
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

export default EditAgreementInformation;
