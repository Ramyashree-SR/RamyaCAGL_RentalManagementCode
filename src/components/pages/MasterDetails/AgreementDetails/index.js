import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../atoms/DropDownComponent";
import DatePickerComponent from "../../../atoms/DatePickerComponent";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SwitchComponent from "../../../atoms/SwitchComponent";
import { uploadFileApi } from "../../../services/UploadDoucmentApi";
import { deepOrange, green } from "@mui/material/colors";
import { IFSCCodeDetails } from "../../../services/IfscCodeApi";

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[300]),
  color: green[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));

const AgreementDetails = ({
  activeStep,
  setActiveStep,
  AddAllNewRentContactInformation,
  allNewContractDetails,
  setAllNewContractDetails,
  close,
  onSave,
  type,
  editAllNewRentContractDetails,
  EditLessorData,
  allNewContractDetailsErr,
  handleAddRentContractInformationError,
  uniqueID,
  ifscCodes,
  setIFSCCodes,
  bankAndBranch,
  setBankAndBranch,
  recipientCount,
  setRecipientCount,
  contractStatus,
}) => {
  const [checked, setChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [active, setactive] = useState(null);
  // const [recipientCount, setRecipientCount] = useState(1);
  const [tenure, setTenure] = useState(allNewContractDetails.renewalTenure);

  const [currentRent, setCurrentRent] = useState(
    allNewContractDetails?.lessorRentAmount
  );

  // const [ifscCodes, setIFSCCodes] = useState(Array(recipientCount).fill(""));
  // // console.log(ifscCodes, "ifscCodes");
  // const [bankAndBranch, setBankAndBranch] = useState(
  //   Array(recipientCount).fill({
  //     bank: "",
  //     branch: "",
  //   })
  // );
  const [tdsRate, setTdsRate] = useState(null);
  // const [escalationRate, setEscalationRate] = useState(null);
  // console.log(tdsRate, "tdsRate");

  const [originalData, setOriginalData] = useState([
    allNewContractDetails?.recipiants?.lessorAccountNumber,
  ]);
  // console.log(originalData, "originalData");
  const [reEnteredData, setReEnteredData] = useState([]);
  // console.log(reEnteredData, "reEnteredData");
  const [dataMatch, setDataMatch] = useState(true);

  // useEffect(() => {
  //   // Check if allNewContractDetails is defined and has the 'tds' property
  //   if (
  //     allNewContractDetails?.tds !== undefined &&
  //     allNewContractDetails?.tds !== null
  //   ) {
  //     setTdsRate(allNewContractDetails.tds);
  //   }

  //   // Check if allNewContractDetails is defined and has the 'escalation' property
  //   if (allNewContractDetails?.escalation !== undefined) {
  //     setEscalationRate(allNewContractDetails.escalation);
  //   }
  // }, [allNewContractDetails]);

  const AgreementfileInput = useRef();
  const [agreementfile, setagreementFile] = useState({
    file: {},
    filename: "",
  });

  const handleAgreementFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", agreementfile.file);
    payload.append("appid", "3");
    payload.append("doctype", "RentAgreementFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      if (data.error == "FALSE") {
        setactive(data);
        // addToast("File Uploaded", { appearance: "success" });
      }
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  let activationStatus = [
    { id: "1", label: "Open" },
    { id: "2", label: "Closed" },
  ];

  let LockinPeriod = [
    { id: "1", label: "1years" },
    { id: "2", label: "2years" },
    { id: "3", label: "3years" },
  ];

  let DocumentType = [{ id: "1", label: "Rental Agreement" }];

  let noticePeriod = [
    { id: "1", label: "2months" },
    { id: "2", label: "3months" },
  ];

  let ExitTerms = [
    { id: "1", label: "Written Notice" },
    { id: "2", label: "Mail Communication" },
    { id: "3", label: "Oral Communication" },
  ];

  let recipents = [
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
  ];

  const handleDropDownChange = (newValue) => {
    setRecipientCount(newValue);
    if (newValue.id === "1") {
      setRecipientCount(1);
    } else if (newValue.id === "2") {
      setRecipientCount(2);
    } else if (newValue.id === "3") {
      setRecipientCount(3);
    } else if (newValue.id === "4") {
      setRecipientCount(4);
    } else {
      setRecipientCount();
    }
    setIFSCCodes(Array(newValue.id).fill(""));
    setBankAndBranch(Array(newValue.id).fill({ bank: "", branch: "" }));
  };

  const updateChange = (e) => {
    const { name, value } = e.target;

    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Assuming e.target.name is 'escalationRate' for setEscalationRate
  };

  const handleEscalationChange = (e) => {
    const { name, value } = e.target;
    console.log(value, "value");
    if (name === "escalation") {
      setAllNewContractDetails((prevDetails) => ({
        ...prevDetails,
        escalation: value,
        // other properties...
      }));
    }
  };

  const handleTdsChange = (e) => {
    const { name, value } = e.target;

    // Assuming e.target.name is 'tdsRate' for setTdsRate
    if (name === "tds") {
      // If currentRent is greater than 20000, update tdsRate and other details
      if (parseInt(allNewContractDetails?.lessorRentAmount) > 20000) {
        setAllNewContractDetails((prevDetails) => ({
          ...prevDetails,
          tds: value,
          // other properties...
        }));
      }
    }
  };

  const handleChangeIFSCCode = (event, index) => {
    const newIFSCCodes = [...ifscCodes];
    // console.log(newIFSCCodes, "newIFSCCodes");
    newIFSCCodes[index] = event.target.value;
    setIFSCCodes(newIFSCCodes);
    // setAllNewContractDetails(newIFSCCodes);
  };

  const handleRecipientChange = (index, fieldName, newValue) => {
    // Create a copy of the allNewContractDetails object
    const updatedContractDetails = { ...allNewContractDetails };
    // Create a copy of the recipients array within the object
    updatedContractDetails.recipiants =
      updatedContractDetails.recipiants?.slice() || [];
    // Create a copy of the specific recipient within the array
    const updatedRecipient =
      { ...updatedContractDetails.recipiants?.[index] } || {};
    // Update the specific field for the recipient
    updatedRecipient[fieldName] = newValue;
    // Update the recipient within the array
    updatedContractDetails.recipiants[index] = updatedRecipient;
    // Update the state with the modified object
    setAllNewContractDetails(updatedContractDetails);
  };

  const handleRecipientAccountChange = (index, fieldName, newValue) => {
    // Create a copy of the allNewContractDetails object
    const updatedContractDetails = { ...allNewContractDetails };
    // Create a copy of the recipients arrSay within the object
    updatedContractDetails.recipiants =
      updatedContractDetails.recipiants.slice() || [];
    // Create a copy of the specific recipient within the array
    const updatedRecipient =
      { ...updatedContractDetails.recipiants?.[index] } || {};
    // Update the specific field for the recipient
    updatedRecipient[fieldName] = newValue;
    // Update the recipient within the array
    updatedContractDetails.recipiants[index] = updatedRecipient;

    // Update the state with the modified object
    setAllNewContractDetails(updatedContractDetails);
    const updatedOriginalData = [...originalData];
    updatedOriginalData[index] = newValue;
    setOriginalData(updatedOriginalData);
  };

  useEffect(() => {
    // Check if originalData and reEnteredData match
    let match = true;
    for (let index = 0; index < originalData.length; index++) {
      if (originalData[index] !== reEnteredData[index]) {
        match = false;
        break; // Exit the loop as soon as a mismatch is found
      }
    }
    setDataMatch(match);
  }, [originalData, reEnteredData]);

  const handleReEnteredDataChange = (e, index) => {
    const updatedReEnteredData = [...reEnteredData];
    updatedReEnteredData[index] = e.target.value;
    setReEnteredData(updatedReEnteredData);
  };

  // const tdsRateData = allNewContractDetails?.tds / 100;
  const calculateTDS = (annualRent) => {
    return annualRent > 20000
      ? (annualRent * (allNewContractDetails?.tds / 100)).toFixed(2)
      : "";
  };

  const calculateGST = (annualRent) => {
    return annualRent * (allNewContractDetails?.gst / 100).toFixed(2);
  };
  const escalationRate = 0.05; // 5% annual escalation
  const calculateCurrentRent = (year) => {
    const rent =
      allNewContractDetails?.lessorRentAmount *
      Math.pow(1 + escalationRate, year - 1);
    return rent.toFixed(2);
  };

  const handleDocumentType = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  const handleLockinPeriod = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  const handleExitTerms = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  const handleNoticePeriod = (name, value) => {
    setAllNewContractDetails(() => ({
      ...allNewContractDetails,
      [name]: value,
    }));
  };

  const handleActivationStatus = (name, value) => {
    // console.log(name, value, "name, value");
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAgreementSignDate = (val) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      agreementSignDate: val,
    });
  };

  const handleAgreementGLSignDate = (val) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      signedDate: val,
    });
  };

  // const calculateLockinPeriod = (start, end) => {
  //   if (start && end) {
  //     const timeDiff = end - start;
  //     const daysDiff = timeDiff / (1000 * 3600 * 24);
  //     const years = Math.floor(daysDiff / 365);
  //     const remainingDays = daysDiff % 365;
  //     const months = Math.floor(remainingDays / 30);
  //     const remainingDays2 = remainingDays % 30;

  //     const periodString = `${years} years, ${months} months, ${remainingDays2} days`;
  //     setLockinPeriod(periodString);
  //   }
  // };

  const handleRentStartDate = (val) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      rentStartDate: val,
    });
  };

  const handleRentEndDate = (val) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      rentEndDate: val,
    });
  };

  const handlePaymentDate = (val) => {
    // let data = moment(val).format("MM-DD-YYYY");
    setAllNewContractDetails({
      ...allNewContractDetails,
      securityDepositPaymentDate: val,
    });
  };

  // Function to handle changes in the switch component
  const handleSwitchChange = (isChecked) => {
    // Update the state based on the switch value
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      isChecked,
    }));
  };

  const handleSwitchGSTChange = (checked) => {
    setChecked(checked);
    // If the switch is turned off, reset the GST value to null
    if (!checked) {
      setAllNewContractDetails((prevDetails) => ({
        ...prevDetails,
        gst: null,
      }));
    }
  };

  // Function to handle changes in the GST value
  const handleGstValueChange = (e) => {
    const { value } = e.target;
    // Update the state with the new GST value
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      gst: value,
    }));
  };

  const calculateSplitAmount = () => {
    if (recipientCount > 1) {
      const splitAmount =
        allNewContractDetails?.lessorRentAmount / recipientCount;
      return splitAmount.toFixed(2); // Round to 2 decimal places
    }
    return allNewContractDetails?.lessorRentAmount;
  };

  useEffect(() => {
    const IFSCInformation = async () => {
      try {
        for (let index = 0; index <= ifscCodes.length; index++) {
          const ifscCode = ifscCodes[index];
          const { data } = await IFSCCodeDetails(ifscCode);
          // console.log(data, "IFSCdata");
          if (data) {
            if (data) {
              const newBankAndBranch = [...bankAndBranch];
              newBankAndBranch[index] = {
                bank: data?.data.bankName,
                branch: data?.data.branchName,
              };
              setBankAndBranch(newBankAndBranch);
              // setAllNewContractDetails(...newBankAndBranch);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    IFSCInformation();
  }, [ifscCodes, recipientCount]);

  const handleRecipientBranchNameChange = (index, fieldName, value) => {
    // Create a copy of the allNewContractDetails object
    const updatedContractDetails = { ...allNewContractDetails };
    // Create a copy of the recipients array within the object
    updatedContractDetails.recipiants =
      updatedContractDetails.recipiants?.slice() || [];
    // Create a copy of the specific recipient within the array
    const updatedRecipient =
      { ...updatedContractDetails.recipiants?.[index] } || {};
    // Update the specific field for the recipient
    updatedRecipient[fieldName] = value;
    // Update the recipient within the array
    updatedContractDetails.recipiants[index] = updatedRecipient;
    // Update the state with the modified object
    setAllNewContractDetails(updatedContractDetails);
    const updatedBankAndBranch = [...bankAndBranch];

    // Update the bank name for the recipient at the specified index.
    updatedBankAndBranch[index] = {
      ...updatedBankAndBranch[index],
      bank: value,
    };
  };

  const handleRecipientBankNameChange = (index, fieldName, value) => {
    // Create a copy of the allNewContractDetails object
    const updatedContractDetails = { ...allNewContractDetails };
    // Create a copy of the recipients array within the object
    updatedContractDetails.recipiants =
      updatedContractDetails.recipiants?.slice() || [];
    // Create a copy of the specific recipient within the array
    const updatedRecipient =
      { ...updatedContractDetails.recipiants?.[index] } || {};
    // Update the specific field for the recipient
    updatedRecipient[fieldName] = value;
    // Update the recipient within the array
    updatedContractDetails.recipiants[index] = updatedRecipient;
    // Update the state with the modified object
    setAllNewContractDetails(updatedContractDetails);

    const updatedBankAndBranch = [...bankAndBranch];
    // Update the bank name for the recipient at the specified index.
    updatedBankAndBranch[index] = {
      ...updatedBankAndBranch[index],
      branch: value,
    };
  };
  // const calculateTenureInMonths = (startDate, endDate) => {
  //   // Calculate the difference in months
  //   const monthsDifference =
  //     (endDate?.getFullYear() - startDate?.getFullYear()) * 12 +
  //     (endDate?.getDays() - startDate?.getDays());
  //   // You can adjust this calculation based on your specific logic
  //   return monthsDifference;
  // };
  const calculateTenureInMonths = () => {
    const start = new Date(allNewContractDetails?.agreementStartDate);
    const end = allNewContractDetails?.agreementEndDate
      ? new Date(allNewContractDetails?.agreementEndDate)
      : new Date(); // If no end date is provided, use the current date

    const diffInMilliseconds = end - start;
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    // You can further format the tenure as needed (e.g., months, days, etc.)
    const years = Math.floor(diffInYears);
    const remainingMonths = Math.floor((diffInYears - years) * 12);

    return remainingMonths;
  };

  const handleAgreementEndDate = (val) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      agreementEndDate: val,
    });
    // Call the function to update tenure when either date changes
    handleDateChange(allNewContractDetails?.agreementStartDate, val);
    handleRenewalDateChange(allNewContractDetails.agreementStartDate, val);
  };

  const handleRenewalDateChange = (startDate, endDate) => {
    // Calculate Tenure
    const tenureValue = calculateTenureInMonths(startDate, endDate);
    // Update the state with the calculated Tenure value
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      renewalTenure: tenureValue,
    }));
  };

  const handleDateChange = (startDate, endDate) => {
    // Calculate Tenure
    const tenureValue = calculateTenureInMonths(startDate, endDate);
    // Update the state with the calculated Tenure value
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      agreementTenure: tenureValue,
    }));
  };

  const handleRentChange = (e) => {
    setCurrentRent(parseFloat(e.target.value));
  };

  const calculateNextPeriod = (currentStartDate, monthOffset) => {
    const nextStartDate = new Date(currentStartDate);
    nextStartDate.setMonth(currentStartDate.getMonth() + monthOffset);
    const nextEndDate = new Date(nextStartDate);
    nextEndDate.setMonth(nextStartDate.getMonth()); //+11
    return { startDate: nextStartDate, endDate: nextEndDate };
  };

  const calculateStartEndDateList = (startDate, endDate) => {
    const periods = [];
    let currentStartDate = new Date(startDate);
    while (currentStartDate < endDate) {
      const { startDate: nextStartDate, endDate: nextEndDate } =
        calculateNextPeriod(currentStartDate, 11);
      periods?.push({ startDate: currentStartDate, endDate: nextEndDate });
      currentStartDate = nextStartDate;
    }
    return periods;
  };

  const startEndDatesList = calculateStartEndDateList(
    allNewContractDetails.agreementStartDate,
    allNewContractDetails.agreementEndDate
  );

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    const ValidateError = handleAddRentContractInformationError();
    const isEmptyField = Object.values(allNewContractDetails).some(
      (value) => value === ""
    );
    if (!ValidateError && !isEmptyField) {
      onSave(allNewContractDetails, type);
    }
  };

  return (
    <>
      <Box sx={{ height: "calc(100% - 75px)", overflowY: "scroll" }}>
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-4">
            Agreement Details
          </Typography>
          <Grid container spacing={2} className="px-1 py-3 mt-1 ">
            <Grid item className="d-flex m-2" md={12}>
              <DatePickerComponent
                placeholder="Select Excuetion Date"
                label="Execution Date"
                size="small"
                sx={{ width: 300 }}
                name="agreementSignDate"
                value={allNewContractDetails?.agreementSignDate}
                onChange={handleAgreementSignDate}
              />

              <DropDownComponent
                label="ActivationStatus"
                placeholder="Enter Activation Status"
                sx={{ width: 300, ml: 0 }}
                size="small"
                options={activationStatus}
                name="agreementActivationStatus"
                value={allNewContractDetails?.agreementActivationStatus}
                onChange={(val) =>
                  handleActivationStatus("agreementActivationStatus", val)
                }
              />
              {/* <DropDownComponent
                options={ScheduleType}
                label="Schedule Premesis"
                placeholder="Enter Schedule Premesis"
                sx={{ width: 300, ml: 0 }}
                name="agreementTenure"
                value={allNewContractDetails?.agreementTenure}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.agreementTenure}
              /> */}
            </Grid>
          </Grid>

          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-4">
              GL Authority Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" md={12}>
                <InputBoxComponent
                  label="GL Name"
                  placeholder="Enter GL Name"
                  sx={{ width: 300, mt: -1.5, ml: 1 }}
                  name="glName"
                  value={allNewContractDetails?.glName}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.glName}
                />
                <DatePickerComponent
                  placeholder="Select Signed Date"
                  label="Signed Date"
                  size="small"
                  sx={{ width: 300 }}
                  name="signedDate"
                  value={allNewContractDetails?.signedDate}
                  onChange={handleAgreementGLSignDate}
                />
                <InputBoxComponent
                  label="GL Employee ID"
                  placeholder="Enter GL Employee ID"
                  sx={{ width: 300, mt: -1.5, ml: 1 }}
                  name="glEmpId"
                  value={allNewContractDetails?.glEmpId}
                  onChange={(e) => updateChange(e)}
                  errorText={allNewContractDetailsErr?.glEmpId}
                />
              </Grid>
            </Grid>
          </Box>

          <Typography className="fs-20 fw-500 pt-2 px-4">
            Agreement Start & End Date
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1 ">
            <Grid item className="d-flex m-2" md={12}>
              <DatePickerComponent
                placeholder="Select Start From"
                label="Agreement Start Date"
                size="small"
                sx={{ width: 300 }}
                name="agreementStartDate"
                value={allNewContractDetails?.agreementStartDate}
                onChange={(val) => {
                  setAllNewContractDetails({
                    ...allNewContractDetails,
                    agreementStartDate: val,
                  });
                  // Call the function to update tenure when either date changes
                  handleDateChange(
                    new Date(val),
                    allNewContractDetails.agreementEndDate
                  );
                  handleRenewalDateChange(
                    new Date(val),
                    allNewContractDetails.agreementEndDate
                  );
                }}
                // onChange={handleAgreementStartDate}
              />
              <DatePickerComponent
                placeholder="Select End at"
                label="Agreement End Date"
                size="small"
                sx={{ width: 300 }}
                name="agreementEndDate"
                value={allNewContractDetails?.agreementEndDate}
                onChange={handleAgreementEndDate}
              />

              <InputBoxComponent
                label="Tenure (in months)"
                placeholder="Enter Tenure "
                sx={{ width: 300, mt: -1.5, ml: 1 }}
                name="agreementTenure"
                value={allNewContractDetails?.agreementTenure}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.agreementTenure}
                readOnly
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
                sx={{ width: 300 }}
                name="rentStartDate"
                value={allNewContractDetails?.rentStartDate}
                onChange={handleRentStartDate}
              />
              <DatePickerComponent
                placeholder="Select End at"
                label="Rent End Date"
                size="small"
                sx={{ width: 300 }}
                name="rentEndDate"
                value={allNewContractDetails?.rentEndDate}
                onChange={handleRentEndDate}
                // disabled
              />
            </Grid>
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
                value={allNewContractDetails?.maintaineneCharge}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.maintaineneCharge}
              />
              <InputBoxComponent
                label="Water Charges"
                placeholder="Enter Water Charges"
                sx={{ width: 300 }}
                name="waterCharge"
                value={allNewContractDetails?.waterCharge}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.waterCharge}
              />
            </Grid>
            <Grid item className="d-flex py-1" md={12}>
              <InputBoxComponent
                label="Other Charges "
                placeholder="Enter Other Charges"
                sx={{ width: 300, ml: 1 }}
                name="electricity"
                value={allNewContractDetails?.electricity}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.electricity}
              />

              <DropDownComponent
                label="Document Type"
                sx={{ width: 300, mt: 1.5, mr: 3 }}
                options={DocumentType}
                // onSelect={handleDocumentType}
                name="documentType"
                value={allNewContractDetails?.documentType}
                onChange={(value) => handleDocumentType("documentType", value)}
              />
              <form
                action="/action_page.php"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => AgreementfileInput.current.click()}
                >
                  File
                </Button>

                <input
                  ref={AgreementfileInput}
                  type="file"
                  style={{
                    display: "none",
                    background: agreementfile.file ? "green" : "blue",
                  }}
                  onChange={(e) => {
                    setagreementFile({
                      file: e.target.files[0],
                      filename: e.target.files[0].name,
                    });
                  }}
                />

                <ColorIcon
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <UploadFileIcon
                    onClick={() => {
                      handleAgreementFileUpload();
                      // handleRefresh();
                    }}
                    fontSize="large"
                    // sx={{ background: "#FFFFF", color: "green" }}
                  />
                  <Typography sx={{ fontSize: 9, fontWeight: 800 }}>
                    Upload
                  </Typography>
                </ColorIcon>
              </form>
            </Grid>

            <Typography className="fs-20 fw-500 px-4 py-1 mt-1">
              Security Deposit Details
            </Typography>
            <Grid item className="d-flex m-2" md={12}>
              <InputBoxComponent
                label="Security Deposit Amount"
                placeholder="Enter SD Amount"
                sx={{ width: 300 }}
                name="securityDepositAmount"
                value={allNewContractDetails?.securityDepositAmount}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.securityDepositAmount}
              />

              <DatePickerComponent
                label="Payment Date"
                placeholder="Enter Payment Date"
                sx={{ width: 300, mt: 1.5 }}
                // name="securityDepositPaymentDate"
                value={allNewContractDetails?.securityDepositPaymentDate}
                onChange={handlePaymentDate}
              />

              <InputBoxComponent
                label="UTR Number"
                placeholder="Enter UTR Number"
                sx={{ width: 300, ml: 1 }}
                name="securityDepositUtr"
                value={allNewContractDetails?.securityDepositUtr}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.securityDepositUtr}
              />
            </Grid>
            <Grid item className="d-flex m-2" md={12}>
              <InputBoxComponent
                label="Monthly Rent"
                placeholder="Enter Monthly Rent"
                sx={{ width: 300, my: -1.3 }}
                name="lessorRentAmount"
                value={allNewContractDetails?.lessorRentAmount}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.lessorRentAmount}
              />
              <DatePickerComponent
                placeholder="Select Start From"
                label="First Rent Date"
                size="small"
                sx={{ width: 300 }}
                value={allNewContractDetails?.rentStartDate} //firstRantDate
                onChange={handleRentStartDate}
              />
              <InputBoxComponent
                label="Standard Deduction"
                placeholder="Enter Standard Deduction"
                sx={{ width: 300, my: -1.3, ml: 1 }}
                name="standardDeducition"
                value={allNewContractDetails?.standardDeducition}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.standardDeducition}
              />
            </Grid>

            <Grid item className="d-flex m-2" md={12}>
              <DropDownComponent
                label="Lockin Period"
                sx={{ width: 300, mr: 1 }}
                options={LockinPeriod}
                name="securityDepositLockinPeriod"
                value={allNewContractDetails?.securityDepositLockinPeriod}
                onChange={(value) =>
                  handleLockinPeriod("securityDepositLockinPeriod", value)
                }
              />

              <DropDownComponent
                label="Notice Period"
                sx={{ width: 300 }}
                options={noticePeriod}
                // onSelect={handleNoticePeriod}
                name="securityDepositnoticePeriod"
                value={allNewContractDetails?.securityDepositnoticePeriod}
                onChange={(value) =>
                  handleNoticePeriod("securityDepositnoticePeriod", value)
                }
                // onChange={(e) => updateChange(e)}
              />

              <InputBoxComponent
                label="Exit Terms-Remarks"
                sx={{ width: 300, mt: -1.5, ml: 1 }}
                // options={ExitTerms}
                placeholder="Enter Remarks"
                multiline
                name="securityDepositExitTerm"
                value={allNewContractDetails?.securityDepositExitTerm}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
          </Grid>

          <Box
            className="d-flex align-items-start justify-content-start w-100 "
            sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}
          >
            <Box>
              <Typography className="fs-20 fw-500 pt-4 px-3 py-4">
                Rent Term Details
              </Typography>
              {type === "add" && ( //|| contractStatus==="Renewal"
                <Grid
                  container
                  spacing={2}
                  className="d-flex align-items-center justify-content-center py-1 px-0"
                >
                  <DropDownComponent
                    label="Recipiants"
                    placeholder="Enter Recipiant"
                    sx={{ width: 300, ml: 1 }}
                    options={recipents}
                    value={recipientCount}
                    onChange={handleDropDownChange}
                  />
                  <Grid item className="d-flex flex-column" lg={12}>
                    {Array.from({ length: recipientCount }, (_, index) => (
                      <Grid
                        container
                        spacing={2}
                        className="d-flex px-3"
                        key={index}
                      >
                        <Typography className="px-2 py-2">{`Recipiant - ${
                          index + 1
                        }`}</Typography>
                        <Grid item className="d-flex flex-row m-0" md={12}>
                          {type === "edit" ? (
                            <InputBoxComponent
                              label="Recipiants ID"
                              placeholder={`Enter Recipiant ID ${index + 1}...`}
                              sx={{ width: 300 }}
                              name={`recipiantsID-${index}`}
                              value={
                                type === "edit"
                                  ? allNewContractDetails?.recipiants?.[
                                      index
                                    ] &&
                                    allNewContractDetails?.recipiants?.[index]
                                      ?.recipiantsID
                                  : "" // Clear the value in "add" mode
                              }
                              onChange={(e) =>
                                handleRecipientChange(
                                  index,
                                  "recipiantsID",
                                  e.target.value
                                )
                              }
                              errorText={allNewContractDetailsErr?.recipiantsID}
                            />
                          ) : null}

                          <InputBoxComponent
                            label="Rent Amount"
                            placeholder={`Enter Rent Amount ${index + 1}...`}
                            sx={{ width: 300 }}
                            name={`lessorRentAmount-${index}`}
                            value={
                              recipientCount && recipientCount > 1
                                ? calculateSplitAmount()
                                : calculateSplitAmount() ||
                                  allNewContractDetails?.recipiants?.[index]
                                    ?.lessorRentAmount
                            }
                            onChange={(e) =>
                              handleRecipientChange(
                                index,
                                "lessorRentAmount",
                                e.target.value
                              )
                            }
                            errorText={
                              allNewContractDetailsErr?.lessorRentAmount
                            }
                            readOnly={false}
                          />
                        </Grid>
                        <Grid item className="d-flex m-2" md={12}>
                          <InputBoxComponent
                            label="Recipiants Name"
                            placeholder={`Enter Recipiant Name ${index + 1}...`}
                            sx={{ width: 300 }}
                            name={`lessorRecipiantsName-${index}`}
                            value={
                              type === "edit"
                                ? allNewContractDetails?.recipiants?.[index]
                                    ?.lessorRecipiantsName
                                : allNewContractDetails?.recipiants?.[index]
                                    ?.lessorRecipiantsName || "" // Clear the value in "add" mode
                            }
                            onChange={(e) =>
                              handleRecipientChange(
                                index,
                                "lessorRecipiantsName",
                                e.target.value
                              )
                            }
                            errorText={
                              allNewContractDetailsErr?.lessorRecipiantsName
                            }
                          />

                          <InputBoxComponent
                            label="IFSC Code"
                            sx={{ width: 300 }}
                            placeholder={`Enter IFSC Code ${index + 1}...`}
                            name={`lessorIfscNumber-${index}`}
                            value={
                              allNewContractDetails?.recipiants?.[index]
                                ?.lessorIfscNumber || ifscCodes?.[index]
                            }
                            onChange={(e) => handleChangeIFSCCode(e, index)}
                            errorText={
                              allNewContractDetailsErr?.lessorIfscNumber
                            }
                          />
                        </Grid>

                        {bankAndBranch?.[index] && bankAndBranch?.[index] ? (
                          <Grid item className="d-flex m-2" md={12}>
                            <InputBoxComponent
                              label={`Bank Name ${index + 1}`}
                              sx={{ width: 300 }}
                              placeholder={`Enter Bank Name ${index + 1}...`}
                              name={`lessorBankName-${index}`}
                              value={
                                allNewContractDetails.recipiants?.[index]
                                  ?.lessorBankName ||
                                bankAndBranch?.[index]?.bank
                              }
                              onChange={(e) =>
                                handleRecipientBankNameChange(
                                  index,
                                  "lessorBankName",
                                  e.target.value
                                )
                              }
                              errorText={allNewContractDetailsErr?.bank}
                            />

                            <InputBoxComponent
                              label={`Branch Name ${index + 1}`}
                              sx={{ width: 300 }}
                              placeholder={`Enter Branch Name ${index + 1}...`}
                              value={
                                allNewContractDetails.recipiants?.[index]
                                  ?.lessorBranchName ||
                                bankAndBranch?.[index]?.branch
                              }
                              onChange={(e) =>
                                handleRecipientBranchNameChange(
                                  index,
                                  "lessorBranchName",
                                  e.target.value
                                )
                              }
                              errorText={
                                allNewContractDetailsErr?.lessorBranchName
                              }
                            />
                          </Grid>
                        ) : null}

                        <Grid item className="d-flex m-2" md={12}>
                          <InputBoxComponent
                            label="A/c No."
                            sx={{ width: 300 }}
                            placeholder={`Enter A/c no. ${index + 1}...`}
                            name={`lessorAccountNumber-${index}`}
                            value={
                              type === "edit"
                                ? allNewContractDetails?.recipiants?.[index]
                                    ?.lessorAccountNumber
                                : allNewContractDetails?.recipiants?.[index]
                                    ?.lessorAccountNumber || "" // Clear the value in "add" mode
                            }
                            onChange={(e) =>
                              handleRecipientAccountChange(
                                index,
                                "lessorAccountNumber",
                                e.target.value
                              )
                            }
                            errorText={
                              allNewContractDetailsErr?.lessorAccountNumber
                            }
                          />
                          <Grid className="d-flex flex-column">
                            <InputBoxComponent
                              label="Re-Enter A/c No."
                              // type="password"
                              sx={{ width: 300 }}
                              placeholder={`Enter Re-enter A/c no. ...`}
                              name={`AccountNumber-${index}`}
                              value={
                                type === "edit"
                                  ? allNewContractDetails?.recipiants?.[index]
                                      ?.lessorAccountNumber &&
                                    allNewContractDetails?.recipiants?.[index]
                                      ?.lessorAccountNumber
                                  : reEnteredData?.[index]  && reEnteredData?.[index]|| ""
                              }
                              onChange={(e) =>
                                handleReEnteredDataChange(e, index)
                              }
                            />
                            {!dataMatch && (
                              <Typography style={{ color: "red" }}>
                                {" "}
                                *Account Number Doesn't match
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                        <Grid item className="d-flex  m-2" md={12} key={index}>
                          <InputBoxComponent
                            label="PAN No."
                            sx={{ width: 300 }}
                            placeholder={`Enter PAN No. ${index + 1}...`}
                            name={`panNo-${index}`}
                            value={
                              type === "edit"
                                ? allNewContractDetails?.recipiants?.[index]
                                    ?.panNo
                                : allNewContractDetails?.recipiants?.[index]
                                    ?.panNo || ""
                            }
                            onChange={(e) =>
                              handleRecipientChange(
                                index,
                                "panNo",
                                e.target.value
                              )
                            }
                            errorText={allNewContractDetailsErr?.panNo}
                          />
                          <InputBoxComponent
                            label="GST No."
                            sx={{ width: 300 }}
                            placeholder={`Enter GST No. ${index + 1}...`}
                            name={`gstNo-${index}`}
                            value={
                              type === "edit"
                                ? allNewContractDetails?.recipiants?.[index]
                                    ?.gstNo
                                : allNewContractDetails?.recipiants?.[index]
                                    ?.gstNo || ""
                            }
                            onChange={(e) =>
                              handleRecipientChange(
                                index,
                                "gstNo",
                                e.target.value
                              )
                            }
                            errorText={allNewContractDetailsErr?.gstNo}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                spacing={2}
                className="d-flex align-items-center justify-content-center py-1 px-0"
              >
                {/* {Array.from({ length: recipientCount }, (_, index) => (
                  <Grid item className="d-flex m-2" lg={12}>
                    {type === "edit" ? (
                      <InputBoxComponent
                        label="Recipiants ID"
                        placeholder={`Enter Recipiant ID ${index + 1}...`}
                        sx={{ width: 300 }}
                        name={`recipiantsID-${index}`}
                        value={
                          type === "edit"
                            ? allNewContractDetails?.recipiantsID
                            : "" // Clear the value in "add" mode
                        }
                        onChange={(e) =>
                          handleRecipientChange(
                            index,
                            "recipiantsID",
                            e.target.value
                          )
                        }
                        errorText={allNewContractDetailsErr?.recipiantsID}
                      />
                    ) : null} */}
                <Grid item className="d-flex m-2" lg={12}>
                  {type === "edit" ? (
                    <InputBoxComponent
                      label="Recipiant Rent Amount"
                      name="lessorRentAmount"
                      value={allNewContractDetails?.lessorRentAmount}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                    />
                  ) : null}
                </Grid>
                {/* ))} */}
                <Grid item className="d-flex m-2" lg={12}>
                  {type === "edit" ? (
                    <InputBoxComponent
                      label="Recipiant Name"
                      name="lessorRecipiantsName"
                      value={allNewContractDetails?.lessorRecipiantsName}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                    />
                  ) : null}
                  {type === "edit" ? (
                    <InputBoxComponent
                      label="IFSC Number"
                      name="lessorIfscNumber"
                      value={allNewContractDetails?.lessorIfscNumber}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                    />
                  ) : null}
                  {type === "edit" ? (
                    <InputBoxComponent
                      label="Bank Name"
                      name="lessorBankName"
                      value={allNewContractDetails?.lessorBankName}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                    />
                  ) : null}
                </Grid>
                <Grid item className="d-flex m-2" lg={12}>
                  {type === "edit" ? (
                    <InputBoxComponent
                      label="Branch Name"
                      name="lessorBranchName"
                      value={allNewContractDetails?.lessorBranchName}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                    />
                  ) : null}
                  {type === "edit" ? (
                    <InputBoxComponent
                      label="Account Number"
                      type="number"
                      name="lessorAccountNumber"
                      value={allNewContractDetails?.lessorAccountNumber}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                    />
                  ) : null}
                  {type === "edit" ? (
                    <InputBoxComponent
                      label="Re-Enterered Account Number"
                      type="number"
                      name="lessorAccountNumber"
                      value={allNewContractDetails?.lessorAccountNumber}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box
            className="d-flex flex-column align-items-start justify-content-start w-100 py-0 px-2"
            sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}
          >
            <Typography className="d-flex fs-20 fw-500 pt-4 px-0">
              Rent Term Calculation
            </Typography>
            <Grid
              container
              spacing={2}
              className="d-flex flex-column px-0 py-2 mt-1 "
            >
              <Grid item className="d-flex m-2" md={6}>
                <InputBoxComponent
                  label="Enter Renewal Tenure (in months)"
                  type="number"
                  name="agreementTenure"
                  value={allNewContractDetails?.agreementTenure}
                  onChange={(e) => updateChange(e)}
                  sx={{ width: 300 }}
                  readOnly
                />

                <InputBoxComponent
                  label="Enter Current Rent"
                  // type="number"
                  name="lessorRentAmount"
                  value={allNewContractDetails?.lessorRentAmount}
                  onChange={(e) => updateChange(e)}
                  sx={{ width: 300 }}
                />

                <InputBoxComponent
                  label="Enter Escalation (%)"
                  type="number"
                  name="escalation"
                  value={allNewContractDetails?.escalation}
                  onChange={(e) => handleEscalationChange(e)}
                  sx={{ width: 300 }}
                />
              </Grid>
              <Grid
                item
                className="d-flex align-items-center justify-content-start"
                sx={{ ml: 5 }}
              >
                <Typography>TDS Applicable? </Typography>
                <SwitchComponent
                  // checked={isChecked}
                  checked={
                    isChecked ||
                    parseInt(allNewContractDetails?.lessorRentAmount) > 20000
                  }
                  onChange={handleSwitchChange}
                />
                {/* parseInt(allNewContractDetails?.lessorRentAmount) > 20000 ? */}
                {parseInt(allNewContractDetails?.lessorRentAmount) > 20000 && (
                  <InputBoxComponent
                    label="TDS (%)"
                    type="number"
                    name="tds"
                    value={
                      allNewContractDetails.tds !== null
                        ? allNewContractDetails.tds
                        : 0
                    }
                    // value={tdsRates*100}
                    onChange={(e) => handleTdsChange(e)}
                  />
                )}

                <Typography>GST Applicable?</Typography>
                <SwitchComponent
                  // checked={parseInt(allNewContractDetails?.lessorRentAmount) > 20000}
                  checked={checked}
                  onChange={(isChecked) => handleSwitchGSTChange(isChecked)}
                />

                {checked && (
                  <InputBoxComponent
                    label="GST % "
                    type="number"
                    placeholder="Enter GST%"
                    value={allNewContractDetails?.gst}
                    onChange={(e) => handleGstValueChange(e)}
                  />
                )}
              </Grid>

              {/* <Grid className="d-flex mt-2 flex-column align-items-start justify-content-center">
                {allNewContractDetails?.agreementTenure > 2 ? (
                  <Grid container spacing={2} className=" py-2 mt-1 ">
                    {startEndDatesList &&
                      startEndDatesList?.length > 0 &&
                      startEndDatesList?.map((period, index) => {
                        if (!period) {
                         
                          return (
                            <div key={index}>Period is undefined or null</div>
                          );
                        }
                        const annualRent = parseFloat(
                          calculateCurrentRent(index + 1)
                        );
                        const tdsData = calculateTDS(annualRent);
                        const currentRentDeductedTds = annualRent - tdsData;
                        const gstAmount = calculateGST(currentRentDeductedTds);
                        const currentRentAddedGSt =
                          currentRentDeductedTds + gstAmount;
                        // const netAmount=
                        return (
                          <Grid
                            item
                            key={index}
                            className="d-flex flex-column m-2 py-0 px-0"
                          >
                            <Grid className="d-flex m-2 py-0 px-5">
                              <Typography>{index + 1}:</Typography>
                              <DatePickerComponent
                                label="Start Date"
                                value={period.startDate.toLocaleDateString()}
                                sx={{ width: 220 }}
                                readOnly
                              />
                              <DatePickerComponent
                                label="End Date"
                                value={period.endDate.toLocaleDateString()}
                                sx={{ width: 220 }}
                                readOnly
                              />
                            </Grid>
                            <Grid className="d-flex flex-row py-3 px-5">
                              <InputBoxComponent
                                label="Current Rent"
                                value={`₹ ${calculateCurrentRent(index + 1)}`}
                                sx={{ widh: 100, mt: -1 }}
                              />
                              <span>-</span>
                              <InputBoxComponent
                                label="TDS Amount"
                                value={
                                  tdsData > 0
                                    ? ` ₹ ${tdsData}`
                                    : "Not Applicable"
                                  //tds > 0 ? `10% (TDS: ₹ ${tds})` : "Not Applicable"
                                }
                                sx={{ width: 150, mt: -1 }}
                              />

                            
                              <span>*</span>
                              <InputBoxComponent
                                label="GST Amount"
                                value={
                                  gstAmount > 0
                                    ? ` ₹ ${gstAmount}`
                                    : "Not Applicable"
                                  //tds > 0 ? `10% (TDS: ₹ ${tds})` : "Not Applicable"
                                }
                                sx={{ width: 150, mt: -1 }}
                              />
                              <span>=</span>
                              <InputBoxComponent
                                label="Net Amount"
                                value={`₹ ${currentRentAddedGSt}`}
                                sx={{ width: 150, mt: -1 }}
                              />
                            </Grid>
                          </Grid>
                        );
                      })}
                  </Grid>
                ) : null}
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box className="d-flex justify-content-end w-100">
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={handleBack}
          variant="contained"
          sx={{ m: 1, background: "#238520" }}
        >
          Back
        </Button>

        <Button
          // disabled={activeStep && activeStep === 0}
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

export default AgreementDetails;

{
  /* <Grid item className="d-flex flex-row m-4" md={6}>
                <InputBoxComponent
                  label="Enter Tenure (in months)"
                  type="number"
                  value={tenure}
                  onChange={handleTenureChange}
                  sx={{ width: 300 }}
                />

                <InputBoxComponent
                  label="Enter Current Rent"
                  type="number"
                  value={currentRent}
                  onChange={handleCurrentRentChange}
                  sx={{ width: 300 }}
                />
              </Grid>
              <Grid>
                {tenure === 60 ? (
                  <Grid container spacing={2} className="px-2 py-2 mt-1 ">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Grid item key={index} className="d-flex m-2 py-0 px-5">
                        <InputBoxComponent
                          label={`Rent Amount ${index + 1}`}
                          type="number"
                          value={rentAmounts?.[index]}
                          onChange={(e) => handleRentChange(e, index)}
                          sx={{ width: 300 }}
                        />

                        <InputBoxComponent
                          label={`Escalation ${index + 1} (%)`}
                          type="number"
                          value={escalations[index]}
                          onChange={(e) => handleEscalationChange(e, index)}
                          sx={{ width: 300 }}
                        />

                        <Typography>
                          Current Rent for Year {index + 1}: $
                          {calculateCurrentRent(index)}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                ) : null}
              </Grid>
            </Grid> */
}

// useEffect(() => {
//   if (
//     allNewContractDetails?.agreementStartDate &&
//     allNewContractDetails?.agreementEndDate
//   ) {
//     const startDateObj = new Date(allNewContractDetails?.agreementStartDate);
//     const endDateObj = new Date(allNewContractDetails?.agreementEndDate);

//     if (startDateObj > endDateObj) {
//       alert("Start date should be before the end date.");
//       return;
//     }

//     const timeDifference = endDateObj - startDateObj;

//     const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
//     const months = Math.floor(
//       (timeDifference % (1000 * 60 * 60 * 24 * 365)) /
//         (1000 * 60 * 60 * 24 * 30.44)
//     );
//     const days = Math.floor(
//       (timeDifference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
//     );

//     setYears(years);
//     setMonths(months);
//     setDays(days);
//   }
// }, [
//   allNewContractDetails?.agreementStartDate,
//   allNewContractDetails?.agreementEndDate,
// ]);

// const [tenure, setTenure] = useState(allNewContractDetails.renewalTenure);
// const [rentAmounts, setRentAmounts] = useState(new Array(5).fill(0));
// const [escalations, setEscalations] = useState(new Array(5).fill(0));

// const [currentRent, setCurrentRent] = useState(
//   allNewContractDetails.lessorRentAmount
// );
// const handleCurrentRentChange = (e) => {
//   setCurrentRent(parseFloat(e.target.value));
// };

// const handleTenureChange = (e) => {
//   setTenure(parseInt(e.target.value, 10));
// };

// const handleRentChange = (e, index) => {
//   const newRentAmounts = [...rentAmounts];
//   newRentAmounts[index] = parseFloat(e.target.value);
//   setRentAmounts(newRentAmounts);
// };

// const handleEscalationChange = (e, index) => {
//   const newEscalations = [...escalations];
//   newEscalations[index] = parseFloat(e.target.value);
//   setEscalations(newEscalations);
// };

// const calculateCurrentRent = (index) => {
//   const currentYearRent =
//     rentAmounts[index] * Math.pow(1 + escalations[index] / 100, tenure / 12);
//   return parseFloat(currentYearRent).toFixed(2);
// };
