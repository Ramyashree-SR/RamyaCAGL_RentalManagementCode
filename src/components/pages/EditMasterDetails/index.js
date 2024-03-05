import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IFSCCodeDetails } from "../../services/IfscCodeApi";
import moment from "moment/moment";
import DatePickerComponent from "../../atoms/DatePickerComponent";
import { deepOrange, green } from "@mui/material/colors";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { useToasts } from "react-toast-notifications";
import InputBoxComponent from "../../atoms/InputBoxComponent";
import DropDownComponent from "../../atoms/DropDownComponent";
import SwitchComponent from "../../atoms/SwitchComponent";
import SimpleDropDown from "../../atoms/SimpleDropDown";
import {
  getBranchIDForBranchDetails,
  getRentContractDetailsOnBranchID,
} from "../../services/BranchDetails";
import { uploadFileApi } from "../../services/UploadDoucmentApi";
import { Modal } from "react-bootstrap";
import { EditRentContractDetails } from "../../services/EditContractApi";
import { formatDateToBackEndReqirement } from "../../CommonFunction/CommonFunction";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[300]),
  color: green[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));
const EditMasterDetails = (props) => {
  const {
    type,
    handleAddRentContractInformationError,
    contractStatus,
    ifscCodes,
    setIFSCCodes,
    bankAndBranch,
    setBankAndBranch,
    recipientCount,
    setRecipientCount,
  } = props;
  const { addToast } = useToasts();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const [editAllNewContractDetails, setEditAllNewContractDetails] = useState({
    lessorName: "",
    lessorContactNumber: "",
    lessorEmailAddress: "",
    lessorPanNumber: "",
    lessorGstNumber: "",
    lessorTdsNumber: "",
    paymentMode: "",
    nationality: "",
    contractStatus: null,
    lessorElectricityBillPath: "",
    lessorTaxNumberPath: "",
    lessorBankPassBookPath: "",
    panDocumentPath: "",
    recipiants: [
      {
        lessorRecipiantsName: "",
        lessorBankName: "",
        lessorIfscNumber: "",
        lessorBranchName: "",
        lessorAccountNumber: "",
        lessorRentAmount: "",
        panNo: "",
        gstNo: "",
      },
    ],
    recipiantsID: "",
    lessorRecipiantsName: "",
    lessorBankName: "",
    lessorIfscNumber: "",
    lessorBranchName: "",
    lessorAccountNumber: "",
    lessorRentAmount: "",
    panNo: "",
    gstNo: "",

    lessorDoorNumber: "",
    lessorFloorNumber: "",
    lessorLandMark: "",
    lessorStreet: "",
    lessorWardNo: "",
    lessorCity: "",
    lessorPinCode: "",
    lessorTaluka: "",
    lessorDistrict: "",
    lessorState: "",
    lesseeBranchType: {},
    branchID: "",
    lesseeBranchName: "",
    lesseeAreaName: "",
    lesseeDivision: "",
    lesseeZone: "",
    lesseeState: "",

    lesseeApproverrenewals: "",
    lesseeApproverRelocation: "",
    lesseeEntityDetails: "",
    premesisLocation: "",
    premesisDoorNumber: "",
    premesisFloorNumber: "",
    premesisWardNo: "",
    premesisLandMark: "",
    premesisStreet: "",
    premesisCity: "",
    premesisPinCode: "",
    premesisTaluka: "",
    premesisDistrict: "",
    northPremesis: "",
    southPremesis: "",
    eastPremesis: "",
    westPremesis: "",
    lessorState: "",
    premesisBuildingType: "",
    agreementSignDate: null,
    agreementTenure: "",
    agreementActivationStatus: {},
    agreementStartDate: null,
    agreementEndDate: null,
    rentStartDate: null,
    rentEndDate: null,
    maintaineneCharge: "",
    waterCharge: "",
    electricity: "",
    documentType: "",
    documentPath: "",
    securityDepositAmount: "",
    securityDepositPaymentDate: "",
    securityDepositPaymentMode: "",
    securityDepositUtr: "",
    securityDepositLockinPeriod: "",
    securityDepositnoticePeriod: "",
    securityDepositExitTerm: "",
    standardDeducition: "",
    escalation: "",
    lattitude: "",
    longitude: "",
    gpsCoordinates: "",
    tds: "",
    gst: "",
    firstRentDate: "",
    lastRentDate: "",
    plotNumber: "",
    builtupArea: "",
    glName: "",
    glEmpId: "",
    signedDate: "",
    monthlyRent: "",
    joinaddress_Vendor: "",
    joinaddress_Premesis: "",
    priviousContractID: "",
    remarks: "",
    schedulePrimesis: "",
  });
  const [branchDetails, setBranchDetails] = useState({
    branchID: "",
    branchName: "",
    areaName: "",
    region: "",
    zone: "",
    state: "",
  });
  const [branchData, setBranchData] = useState([]);
  // console.log(type, "type");
  const [showBranchID, setShowBranchID] = useState(false);
  const [selectedBranchType, setSelectedBranchType] = useState("");
  // console.log(selectedBranchType,"selectedBranchType");
  const [showInputComponent, setShowInputComponent] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [currentRent, setCurrentRent] = useState(
    editAllNewContractDetails?.lessorRentAmount
  );
  const [tdsRate, setTdsRate] = useState(null);
  // const [escalationRate, setEscalationRate] = useState(null);
  // console.log(tdsRate, "tdsRate");

  const [originalData, setOriginalData] = useState([
    editAllNewContractDetails?.recipiants?.lessorAccountNumber,
  ]);
  // console.log(originalData, "originalData");
  const [reEnteredData, setReEnteredData] = useState([]);
  // console.log(reEnteredData, "reEnteredData");
  const [dataMatch, setDataMatch] = useState(true);

  const AgreementfileInput = useRef();
  const [agreementfile, setagreementFile] = useState({
    file: {},
    filename: "",
  });

  //   const updateChange = (e) => {
  //     console.log(e, "e");
  //     e.preventDefault();
  //     setEditAllNewContractDetails((prev) => ({
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     }));
  //   };
  let EntityDetails = [
    { id: "Commercial", label: "Commercial" },
    { id: "Residential", label: "Residential" },
    {
      id: "Both Commercial & Residential",
      label: "Both Commercial & Residential",
    },
  ];

  const handleEntityDetails = (value) => {
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      lesseeEntityDetails: value ? value?.label : null,
    }));
  };

  //   const updateAddressChange = (value) => {
  //     console.log(value);
  //     setEditAllNewContractDetails(value);
  //   };

  // console.log(editAllNewContractDetails?.joinaddress_Premesis, "address");

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
    // setEditAllNewContractDetails((prev) => ({ ...prev, [name]: value }));
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      premesisBuildingType: value ? value?.label : null,
    }));
  };

  const handleLocationChange = (value) => {
    // setEditAllNewContractDetails((prev) => ({ ...prev, [name]: value }));
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      premesisLocation: value ? value?.label : null,
    }));
  };

  const handleHeadOfficeChange = (name, value) => {
    setEditAllNewContractDetails(() => ({
      ...editAllNewContractDetails,
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
  //   const joinAddress = () => {
  //     // Combine the address components into a single string with proper formatting.
  //     const joinedAddress = `${editAllNewContractDetails.premesisDoorNumber}, ${editAllNewContractDetails.premesisFloorNumber}, ${editAllNewContractDetails.premesisLandMark}, ${editAllNewContractDetails.premesisStreet},${editAllNewContractDetails.premesisWardNo},${editAllNewContractDetails.premesisCity},${editAllNewContractDetails.premesisPinCode},${editAllNewContractDetails.premesisTaluka},${editAllNewContractDetails.premesisDistrict},${editAllNewContractDetails.lessorState}`;
  //     // setAddress(joinedAddress);
  //     setEditAllNewContractDetails((prevDetails) => ({
  //       ...prevDetails,
  //       joinaddress_Premesis: joinedAddress,
  //     }));
  //   };

  const handleBranchType = (value) => {
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      lesseeBranchType: value ? value?.label : null,
    }));
    setSelectedBranchType(value);
    getAllBranchID(value);
  };

  const handleBranchID = (_, value) => {
    getBranchIdDetails(value);
    setEditAllNewContractDetails((prevDetails) => ({
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
        setEditAllNewContractDetails(data?.data || {});
        setShowBranchID(true);
      }
    }
  };

  const addButtonClick = () => {
    setShowInputComponent(true);
  };

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

  const RentContractStatus = [
    { id: "New/Relocate", label: "New/Relocate" },
    { id: "Renewal", label: "Renewal" },
  ];

  let EscMonths = [
    { id: "1", label: "11" },
    { id: "2", label: "12" },
  ];

  const handleMonthDetails = (value) => {
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      // schedulePrimesis: value ? value?.label : null,
      schedulePrimesis: value,
    }));
  };

  let activationStatus = [
    { id: "1", label: "Open" },
    { id: "2", label: "Closed" },
  ];

  let LockinPeriod = [
    { id: "1", label: "1months" },
    { id: "2", label: "2months" },
    { id: "3", label: "3months" },
    { id: "4", label: "1years" },
    { id: "5", label: "2years" },
    { id: "6", label: "3years" },
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

  const handleEscalationChange = (e) => {
    const { name, value } = e.target;
    console.log(value, "value");
    if (name === "escalation") {
      setEditAllNewContractDetails((prevDetails) => ({
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
      if (parseInt(editAllNewContractDetails?.lessorRentAmount) > 20000) {
        setEditAllNewContractDetails((prevDetails) => ({
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
    // setEditAllNewContractDetails(newIFSCCodes);
  };

  const handleRecipientChange = (index, fieldName, newValue) => {
    // Create a copy of the editAllNewContractDetails object
    const updatedContractDetails = { ...editAllNewContractDetails };
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
    setEditAllNewContractDetails(updatedContractDetails);
  };

  const handleRecipientAccountChange = (index, fieldName, newValue) => {
    // Create a copy of the editAllNewContractDetails object
    const updatedContractDetails = { ...editAllNewContractDetails };
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
    setEditAllNewContractDetails(updatedContractDetails);
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

  // const tdsRateData = editAllNewContractDetails?.tds / 100;
  const calculateTDS = (annualRent) => {
    return annualRent > 20000
      ? (annualRent * (editAllNewContractDetails?.tds / 100)).toFixed(2)
      : "";
  };

  const calculateGST = (annualRent) => {
    return annualRent * (editAllNewContractDetails?.gst / 100).toFixed(2);
  };
  const escalationRate = 0.05; // 5% annual escalation
  const calculateCurrentRent = (year) => {
    const rent =
      editAllNewContractDetails?.lessorRentAmount *
      Math.pow(1 + escalationRate, year - 1);
    return rent.toFixed(2);
  };

  const handleDocumentType = (name, value) => {
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      documentType: value ? value?.label : null,
    }));
  };

  const handleLockinPeriod = (name, value) => {
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      securityDepositLockinPeriod: value ? value?.label : null,
    }));
  };

  const handleExitTerms = (name, value) => {
    setEditAllNewContractDetails(() => ({
      ...editAllNewContractDetails,
      [name]: value,
    }));
  };

  const handleNoticePeriod = (name, value) => {
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      securityDepositnoticePeriod: value ? value?.label : null,
    }));
  };

  const handleActivationStatus = (value) => {
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      agreementActivationStatus: value ? value?.label : null,
    }));
  };

  const handleAgreementSignDate = (val) => {
    setEditAllNewContractDetails({
      ...editAllNewContractDetails,
      agreementSignDate: val,
    });
  };

  const handleAgreementGLSignDate = (val) => {
    setEditAllNewContractDetails({
      ...editAllNewContractDetails,
      signedDate: val,
    });
  };

  const handlePaymentDate = (val) => {
    // let data = moment(val).format("MM-DD-YYYY");
    setEditAllNewContractDetails({
      ...editAllNewContractDetails,
      securityDepositPaymentDate: val,
    });
  };

  // Function to handle changes in the switch component
  const handleSwitchChange = (isChecked) => {
    // Update the state based on the switch value
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      isChecked,
    }));
  };

  const handleSwitchGSTChange = (checked) => {
    setChecked(checked);
    // If the switch is turned off, reset the GST value to null
    if (!checked) {
      setEditAllNewContractDetails((prevDetails) => ({
        ...prevDetails,
        gst: null,
      }));
    }
  };

  // Function to handle changes in the GST value
  const handleGstValueChange = (e) => {
    const { value } = e.target;
    // Update the state with the new GST value
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      gst: value,
    }));
  };

  const calculateSplitAmount = () => {
    if (recipientCount > 1) {
      const splitAmount =
        editAllNewContractDetails?.lessorRentAmount / recipientCount;
      return splitAmount.toFixed(2); // Round to 2 decimal places
    }
    return editAllNewContractDetails?.lessorRentAmount;
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
              // setEditAllNewContractDetails(...newBankAndBranch);
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
    // Create a copy of the editAllNewContractDetails object
    const updatedContractDetails = { ...editAllNewContractDetails };
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
    setEditAllNewContractDetails(updatedContractDetails);
    const updatedBankAndBranch = [...bankAndBranch];

    // Update the bank name for the recipient at the specified index.
    updatedBankAndBranch[index] = {
      ...updatedBankAndBranch[index],
      bank: value,
    };
  };

  const handleRecipientBankNameChange = (index, fieldName, value) => {
    // Create a copy of the editAllNewContractDetails object
    const updatedContractDetails = { ...editAllNewContractDetails };
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
    setEditAllNewContractDetails(updatedContractDetails);

    const updatedBankAndBranch = [...bankAndBranch];
    // Update the bank name for the recipient at the specified index.
    updatedBankAndBranch[index] = {
      ...updatedBankAndBranch[index],
      branch: value,
    };
  };

  const handleAgreementEndDate = (val) => {
    setEditAllNewContractDetails({
      ...editAllNewContractDetails,
      agreementEndDate: val,
    });
  };

  const handleRentStartDate = (val) => {
    const date = moment(val).format("YYYY-MM-DD");
    setEditAllNewContractDetails({
      ...editAllNewContractDetails,
      rentStartDate: date,
    });

    // Call the function to update tenure when either date changes
    // handleDateChange(val); //, editAllNewContractDetails.rentEndDate
  };

  const handleRentEndDate = (val) => {
    const date = moment(val).format("YYYY-MM-DD");
    setEditAllNewContractDetails({
      ...editAllNewContractDetails,
      rentEndDate: date,
    });
    handleCalculateTenure();
    //call a function to update tenure when either date changes
    // handleDateChange(val); //editAllNewContractDetails?.rentStartDate,
  };

  const calculateTenure = (startDateString, endDateString) => {
    const startDate = moment.utc(startDateString);
    const endDate = moment.utc(endDateString);
    const differenceInDays = endDate?.diff(startDate, "months") + 1;
    return differenceInDays;
  };

  // console.log(tenureValue);
  const handleDateChange = () => {
    const tenureValue = calculateTenure(
      editAllNewContractDetails?.rentStartDate,
      editAllNewContractDetails?.rentEndDate
    );
    // Update the state with the calculated Tenure value
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      agreementTenure: tenureValue,
    }));
  };

  const handleCalculateTenure = () => {
    const start = editAllNewContractDetails?.rentStartDate || new Date(); // If start date is not selected, use the current date
    const end = editAllNewContractDetails?.rentEndDate || new Date(); // If end date is not selected, use the current date

    const tenureInMonths = calculateTenure(start, end);
    // alert(`Tenure in months: ${tenureInMonths}`);
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      agreementTenure: tenureInMonths,
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
    editAllNewContractDetails?.agreementStartDate,
    editAllNewContractDetails?.agreementEndDate
  );

  const joinAddress = () => {
    // Combine the address components into a single string with proper formatting.
    const joinedAddress = `${editAllNewContractDetails.lessorDoorNumber}, ${editAllNewContractDetails.lessorFloorNumber}, ${editAllNewContractDetails.lessorLandMark}, ${editAllNewContractDetails.lessorStreet},${editAllNewContractDetails.lessorWardNo},${editAllNewContractDetails.lessorCity},${editAllNewContractDetails.lessorPinCode},${editAllNewContractDetails.lessorTaluka},${editAllNewContractDetails.lessorDistrict},${editAllNewContractDetails.lessorState}`;
    // setAddress(joinedAddress);
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      joinaddress_Vendor: joinedAddress,
    }));
  };

  let PaymentMode = [{ id: "3", label: "NEFT" }];

  const handlePaymentChange = (value) => {
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      paymentMode: value ? value?.label : null,
    }));
    // setEditAllNewContractDetails(value);
  };

  const updateChange = (e) => {
    setEditAllNewContractDetails({
      ...editAllNewContractDetails,
      [e.target.name]: e.target.value,
    });
  };

  // const [refreshCount, setRefreshCount] = useState(0);

  // const handleRefresh = () => {
  //   // Increment the refreshCount to trigger a re-render
  //   setRefreshCount((prevCount) => prevCount + 1);
  // };

  const ElectricityBillInput = useRef();
  const [electricityBillFile, setElectricityBillFile] = useState({
    file: {},
    filename: "",
  });

  const [active, setactive] = useState(null);

  const handleElectricityBillFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", electricityBillFile.file);
    payload.append("appid", "3");
    payload.append("doctype", "ElectricityBillFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      // console.log(typeof data?.fileName, "FileName");
      setactive(data?.uid); // Assuming 'responseId' is the field containing the response ID
      setEditAllNewContractDetails({
        ...editAllNewContractDetails,
        lessorElectricityBillPath: data.fileName || "", // Assuming 'filePath' is the field containing the file path
      });
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  const BankChequeFileInput = useRef();
  const [bankChequeFile, setBankChequeFile] = useState({
    file: {},
    filename: "",
  });
  const [active1, setactive1] = useState(null);

  const handleBankChequeFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", bankChequeFile.file);
    payload.append("appid", "3");
    payload.append("doctype", "BankChequeFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      setactive1(data?.uid); // Assuming 'responseId' is the field containing the response ID
      setEditAllNewContractDetails({
        ...editAllNewContractDetails,
        lessorBankPassBookPath: data?.fileName || "", // Assuming 'filePath' is the field containing the file path
      });
      // addToast("File Uploaded", { appearance: "success" });
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  const TaxReciptInput = useRef();
  const [taxReciptFile, setTaxReciptFile] = useState({
    file: {},
    filename: "",
  });
  const [active2, setactive2] = useState(null);

  const handleTaxReciptFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", taxReciptFile?.file);
    payload.append("appid", "3");
    payload.append("doctype", "TaxReciptFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      setactive2(data?.uid); // Assuming 'responseId' is the field containing the response ID
      setEditAllNewContractDetails({
        ...editAllNewContractDetails,
        lessorTaxNumberPath: data?.fileName || "", // Assuming 'filePath' is the field containing the file path
      });
      // addToast("File Uploaded", { appearance: "success" });
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  const pancardInput = useRef();
  const [pancardFile, setPancardFile] = useState({
    file: {},
    filename: "",
  });
  const [active3, setactive3] = useState("");

  const handlePancardFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", pancardFile?.file);
    payload.append("appid", "3");
    payload.append("doctype", "PancardFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      setactive3(data?.uid); // Assuming 'responseId' is the field containing the response ID
      setEditAllNewContractDetails({
        ...editAllNewContractDetails,
        panDocumentPath: data?.fileName || "", // Assuming 'filePath' is the field containing the file path
      });
    } else if (errRes) {
    }
  };

  const AnyOtherFileInput = useRef();
  const [anyOtherFile, setAnyOtherFile] = useState({
    file: {},
    filename: "",
  });
  const [active4, setactive4] = useState(null);

  const handleAnyOtherFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", anyOtherFile.file);
    payload.append("appid", "3");
    payload.append("doctype", "AnyOtherFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      if (data.error == "FALSE") {
        setactive4(data);
        // addToast("File Uploaded", { appearance: "success" });
      }
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  const [rentContractStatus, setRentContractStatus] = useState([]);

  const handleContractChange = (newValue) => {
    console.log(newValue.label, "newValue");
    setEditAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      contractStatus: newValue ? newValue.label : null,
    }));
    setRentContractStatus(newValue);
  };

  useEffect(() => {
    setEditAllNewContractDetails({ ...props.editAllNewContractData });
  }, [props.editAllNewContractData]);

  const editRentContractDetailsAllNew = async () => {
    let payload = {
      branchID: editAllNewContractDetails?.branchID,
      lessorName: editAllNewContractDetails?.lessorName,
      lessorContactNumber: editAllNewContractDetails?.lessorContactNumber,
      lessorEmailAddress: editAllNewContractDetails?.lessorEmailAddress,
      lessorPanNumber: editAllNewContractDetails?.lessorPanNumber,
      lessorGstNumber: editAllNewContractDetails?.lessorGstNumber,
      paymentMode:
        editAllNewContractDetails?.paymentMode &&
        editAllNewContractDetails?.paymentMode,
      nationality: editAllNewContractDetails?.nationality,
      contractStatus:
        editAllNewContractDetails?.contractStatus &&
        editAllNewContractDetails?.contractStatus,
      recipiants: editAllNewContractDetails?.recipiants?.map(
        (recipient, index) => ({
          lessorRentAmount: recipient?.lessorRentAmount,
        })
      ),
      recipiantsID: editAllNewContractDetails?.recipiantsID,
      lessorRecipiantsName: editAllNewContractDetails?.lessorRecipiantsName,
      lessorBankName: editAllNewContractDetails?.lessorBankName,
      lessorIfscNumber: editAllNewContractDetails?.lessorIfscNumber,
      lessorBranchName: editAllNewContractDetails?.lessorBranchName,
      lessorAccountNumber: editAllNewContractDetails?.lessorAccountNumber,
      lessorRentAmount: editAllNewContractDetails?.lessorRentAmount,
      panNo: editAllNewContractDetails?.panNo,
      gstNo: editAllNewContractDetails?.gstNo,
      lessorDoorNumber: editAllNewContractDetails?.lessorDoorNumber,
      lessorFloorNumber: editAllNewContractDetails?.lessorFloorNumber,
      lessorWardNo: editAllNewContractDetails?.lessorWardNo,
      lessorLandMark: editAllNewContractDetails?.lessorLandMark,
      lessorStreet: editAllNewContractDetails?.lessorStreet,
      lessorArea: editAllNewContractDetails?.lessorArea,
      lessorCity: editAllNewContractDetails?.lessorCity,
      lessorLocation: editAllNewContractDetails?.lessorLocation,
      lessorPinCode: editAllNewContractDetails?.lessorPinCode,
      lessorTaluka: editAllNewContractDetails?.lessorTaluka,
      lessorDistrict: editAllNewContractDetails?.lessorDistrict,
      lessorState: editAllNewContractDetails?.lessorState,

      lesseeBranchType:
        editAllNewContractDetails?.lesseeBranchType &&
        editAllNewContractDetails?.lesseeBranchType,
      lesseeBranchName:
        editAllNewContractDetails?.lesseeBranchName ||
        editAllNewContractDetails?.branchName,
      lesseeAreaName:
        editAllNewContractDetails?.lesseeAreaName ||
        editAllNewContractDetails?.areaName,
      lesseeDivision:
        editAllNewContractDetails?.lesseeDivision ||
        editAllNewContractDetails?.region,
      lesseeZone:
        editAllNewContractDetails?.lesseeZone ||
        editAllNewContractDetails?.zone,
      lesseeState:
        editAllNewContractDetails?.lesseeState ||
        editAllNewContractDetails?.lesseeState,

      lesseeEntityDetails:
        editAllNewContractDetails?.lesseeEntityDetails &&
        editAllNewContractDetails?.lesseeEntityDetails,
      premesisLocation:
        editAllNewContractDetails?.premesisLocation &&
        editAllNewContractDetails?.premesisLocation,
      premesisDoorNumber: editAllNewContractDetails?.premesisDoorNumber,
      premesisFloorNumber: editAllNewContractDetails?.premesisFloorNumber,
      premesisWardNo: editAllNewContractDetails?.premesisWardNo,
      premesisLandMark: editAllNewContractDetails?.premesisLandMark,
      premesisStreet: editAllNewContractDetails?.premesisStreet,
      premesisCity: editAllNewContractDetails?.premesisCity,
      premesisTaluka: editAllNewContractDetails?.premesisTaluka,
      premesisDistrict: editAllNewContractDetails?.premesisDistrict,
      lessorState: editAllNewContractDetails?.lessorState,
      premesisPinCode: editAllNewContractDetails?.premesisPinCode,
      premesisBuildingType:
        editAllNewContractDetails?.premesisBuildingType &&
        editAllNewContractDetails?.premesisBuildingType,
      northPremesis: editAllNewContractDetails?.northPremesis,
      southPremesis: editAllNewContractDetails?.southPremesis,
      eastPremesis: editAllNewContractDetails?.eastPremesis,
      westPremesis: editAllNewContractDetails?.westPremesis,
      agreementSignDate: formatDateToBackEndReqirement(
        editAllNewContractDetails?.agreementSignDate
      ),
      // agreementSignDate: editAllNewContractDetails?.agreementSignDate,
      agreementTenure: editAllNewContractDetails?.agreementTenure,
      agreementActivationStatus:
        editAllNewContractDetails?.agreementActivationStatus &&
        editAllNewContractDetails?.agreementActivationStatus,
      agreementStartDate: formatDateToBackEndReqirement(
        editAllNewContractDetails?.agreementStartDate
      ),
      // agreementStartDate: editAllNewContractDetails?.agreementStartDate,
      agreementEndDate: formatDateToBackEndReqirement(
        editAllNewContractDetails?.agreementEndDate
      ),
      // agreementEndDate: editAllNewContractDetails?.agreementEndDate,
      rentStartDate: formatDateToBackEndReqirement(
        editAllNewContractDetails?.rentStartDate
      ),
      // rentStartDate: editAllNewContractDetails?.rentStartDate,
      rentEndDate: formatDateToBackEndReqirement(
        editAllNewContractDetails?.rentEndDate
      ),

      maintaineneCharge: editAllNewContractDetails?.maintaineneCharge,
      waterCharge: editAllNewContractDetails?.waterCharge,
      electricity: editAllNewContractDetails?.electricity,
      documentType: editAllNewContractDetails?.documentType,
      securityDepositAmount: editAllNewContractDetails?.securityDepositAmount,
      securityDepositPaymentDate:
        editAllNewContractDetails?.securityDepositPaymentDate,
      securityDepositUtr: editAllNewContractDetails?.securityDepositUtr,
      securityDepositLockinPeriod:
        editAllNewContractDetails?.securityDepositLockinPeriod,
      securityDepositnoticePeriod:
        editAllNewContractDetails?.securityDepositnoticePeriod,
      securityDepositExitTerm:
        editAllNewContractDetails?.securityDepositExitTerm,
      standardDeducition: editAllNewContractDetails?.standardDeducition,

      rentAmount: editAllNewContractDetails?.rentAmount,
      escalation: editAllNewContractDetails?.escalation,
      schedulePrimesis: editAllNewContractDetails?.schedulePrimesis, ///used this field for the Escalation (5%)application for every esc.months 11months or 12 months

      lattitude: editAllNewContractDetails?.lattitude,
      longitude: editAllNewContractDetails?.longitude,
      gpsCoordinates: editAllNewContractDetails?.gpsCoordinates,

      firstRentDate: editAllNewContractDetails?.firstRentDate,
      lastRentDate: editAllNewContractDetails?.lastRentDate,
      plotNumber: editAllNewContractDetails?.plotNumber,
      builtupArea: editAllNewContractDetails?.builtupArea,
      renewalStatus: editAllNewContractDetails?.renewalStatus,
      tds: editAllNewContractDetails.tds,
      gst: editAllNewContractDetails.gst,

      glName: editAllNewContractDetails?.glName,
      glEmpId: editAllNewContractDetails?.glEmpId,
      signedDate: editAllNewContractDetails?.signedDate,

      monthlyRent: editAllNewContractDetails?.lessorRentAmount,
      joinaddress_Vendor: editAllNewContractDetails?.joinaddress_Vendor,
      joinaddress_Premesis: editAllNewContractDetails?.joinaddress_Premesis,
      priviousContractID: editAllNewContractDetails?.priviousContractID,
      remarks: editAllNewContractDetails?.remarks,

      lessorElectricityBillPath:
        editAllNewContractDetails?.lessorElectricityBillPath,
      lessorTaxNumberPath: editAllNewContractDetails?.lessorTaxNumberPath,
      lessorBankPassBookPath: editAllNewContractDetails?.lessorBankPassBookPath,
      panDocumentPath: editAllNewContractDetails?.panDocumentPath,
    };
    const { data, errRes } = await EditRentContractDetails(
      props.uniqueID,
      payload
    );
    if (data) {
      setBranchDetails((prev) => ({
        ...prev,
        branchID: editAllNewContractDetails?.branchID,
        branchName: editAllNewContractDetails?.lesseeBranchName,
        areaName: editAllNewContractDetails?.lesseeAreaName,
        region: editAllNewContractDetails?.lesseeDivision,
        zone: editAllNewContractDetails?.lesseeZone,
        state: editAllNewContractDetails?.lesseeState,
        // ... other fields
      }));
      setEditAllNewContractDetails({
        lessorName: "",
        lessorContactNumber: "",
        lessorEmailAddress: "",
        lessorPanNumber: "",
        lessorGstNumber: "",
        lessorTdsNumber: "",
        paymentMode: "",
        nationality: "",
        contractStatus: null,
        lessorElectricityBillPath: "",
        lessorTaxNumberPath: "",
        lessorBankPassBookPath: "",
        panDocumentPath: "",
        recipiants: [
          {
            lessorRecipiantsName: "",
            lessorBankName: "",
            lessorIfscNumber: "",
            lessorBranchName: "",
            lessorAccountNumber: "",
            lessorRentAmount: "",
            panNo: "",
            gstNo: "",
          },
        ],
        recipiantsID: "",
        lessorRecipiantsName: "",
        lessorBankName: "",
        lessorIfscNumber: "",
        lessorBranchName: "",
        lessorAccountNumber: "",
        lessorRentAmount: "",
        panNo: "",
        gstNo: "",

        lessorDoorNumber: "",
        lessorFloorNumber: "",
        lessorLandMark: "",
        lessorStreet: "",
        lessorWardNo: "",
        lessorCity: "",
        lessorPinCode: "",
        lessorTaluka: "",
        lessorDistrict: "",
        lessorState: "",
        lesseeBranchType: {},
        branchID: "",
        lesseeBranchName: "",
        lesseeAreaName: "",
        lesseeDivision: "",
        lesseeZone: "",
        lesseeState: "",

        lesseeApproverrenewals: "",
        lesseeApproverRelocation: "",
        lesseeEntityDetails: "",
        premesisLocation: "",
        premesisDoorNumber: "",
        premesisFloorNumber: "",
        premesisWardNo: "",
        premesisLandMark: "",
        premesisStreet: "",
        premesisCity: "",
        premesisPinCode: "",
        premesisTaluka: "",
        premesisDistrict: "",
        northPremesis: "",
        southPremesis: "",
        eastPremesis: "",
        westPremesis: "",
        lessorState: "",
        premesisBuildingType: "",
        agreementSignDate: null,
        agreementTenure: "",
        agreementActivationStatus: {},
        agreementStartDate: null,
        agreementEndDate: null,
        rentStartDate: null,
        rentEndDate: null,
        maintaineneCharge: "",
        waterCharge: "",
        electricity: "",
        documentType: "",
        documentPath: "",
        securityDepositAmount: "",
        securityDepositPaymentDate: "",
        securityDepositPaymentMode: "",
        securityDepositUtr: "",
        securityDepositLockinPeriod: "",
        securityDepositnoticePeriod: "",
        securityDepositExitTerm: "",
        standardDeducition: "",
        escalation: "",
        lattitude: "",
        longitude: "",
        gpsCoordinates: "",
        tds: "",
        gst: "",
        firstRentDate: "",
        lastRentDate: "",
        plotNumber: "",
        builtupArea: "",
        glName: "",
        glEmpId: "",
        signedDate: "",
        monthlyRent: "",
        joinaddress_Vendor: "",
        joinaddress_Premesis: "",
        priviousContractID: "",
        remarks: "",
        schedulePrimesis: "",
      });
      props.close();
      window.location.reload();
    }
  };

  const handleSubmit = () => {
    setEditAllNewContractDetails(editAllNewContractDetails);
    editRentContractDetailsAllNew();
  };

  const handleBack = () => {
    props.close();
  };
  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="w-100"
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="d-flex  align-items-end justify-content-end "
          >
            Edit Rent Contract Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}  */}
          <Box>
            <Grid className="d-flex m-1 px-1" lg={12}>
              <SimpleDropDown
                options={RentContractStatus}
                label="Select an option"
                textLabel="Contract Status :"
                onChange={handleContractChange}
                value={
                  RentContractStatus?.find(
                    (option) =>
                      option?.label ===
                      editAllNewContractDetails?.contractStatus
                  ) || null
                }
                sx={{ width: 300 }}
              />
            </Grid>
            <Box>
              <Typography
                className=" pt-4 px-3"
                sx={{ fontWeight: 800, fontSize: 15 }}
              >
                Branch/Office Hierarchy Details
              </Typography>
              <Grid container spacing={2} className="px-2 py-2 mt-1">
                <Grid item className="d-flex m-2 px-3" lg={12}>
                  <SimpleDropDown
                    options={BranchType}
                    label="Select an option"
                    onChange={handleBranchType}
                    value={
                      BranchType?.find(
                        (option) =>
                          option?.label ===
                          editAllNewContractDetails?.lesseeBranchType
                      ) || null
                    }
                    sx={{ width: 300 }}
                    required={true}
                  />
                </Grid>
              </Grid>

              {/* {selectedBranchType &&
              selectedBranchType?.label !== "HO-Office" &&
              selectedBranchType?.label !== "HO-Maintenance" &&
              selectedBranchType?.label !== "DO / RO-Office" &&
              selectedBranchType?.label !== "DO / RO-Maintenance" &&
              selectedBranchType?.label !== "StoreRoom-Office" &&
              selectedBranchType?.label !== "StoreRoom-Maintenance" &&
              selectedBranchType?.label !== "Training Center" &&
              selectedBranchType?.label !== "Training Center-Maintainence" ? ( */}
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
                        value={editAllNewContractDetails?.branchID}
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
                      value={editAllNewContractDetails?.branchID || ""}
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
                  )}
                </Grid>

                <Grid item className="d-flex m-2" lg={12}>
                  <InputBoxComponent
                    label="Branch Name"
                    placeholder="Enter Branch Name."
                    sx={{ width: 300 }}
                    name="branchName"
                    value={
                      editAllNewContractDetails?.lesseeBranchName ||
                      editAllNewContractDetails?.branchName ||
                      ""
                    }
                    onChange={(e) => updateChange(e)}
                    //   errorText={
                    //     editAllNewContractDetailsErr?.lesseeBranchName || ""
                    //   }
                    // readOnly
                  />
                  <InputBoxComponent
                    label="Area Name"
                    placeholder="Enter Area Name ."
                    sx={{ width: 300 }}
                    name="areaName"
                    value={
                      editAllNewContractDetails?.lesseeAreaName ||
                      editAllNewContractDetails?.areaName ||
                      ""
                    }
                    onChange={(e) => updateChange(e)}
                    //   errorText={editAllNewContractDetailsErr?.areaName || ""}
                  />
                  <InputBoxComponent
                    label="Division/Region"
                    placeholder="Enter Div/Reg No."
                    sx={{ width: 300 }}
                    name="region"
                    value={
                      editAllNewContractDetails?.lesseeDivision ||
                      editAllNewContractDetails?.region ||
                      ""
                    }
                    onChange={(e) => updateChange(e)}
                    //   errorText={editAllNewContractDetailsErr?.region || ""}
                  />
                </Grid>
                <Grid item className="d-flex m-2" lg={12}>
                  <InputBoxComponent
                    label="Zone"
                    placeholder="Enter Zone ."
                    sx={{ width: 300 }}
                    name="zone"
                    value={
                      editAllNewContractDetails?.lesseeZone ||
                      editAllNewContractDetails?.zone ||
                      ""
                    }
                    onChange={(e) => updateChange(e)}
                    //   errorText={editAllNewContractDetailsErr?.zone || ""}
                  />
                  <InputBoxComponent
                    label="State"
                    placeholder="Enter State ."
                    sx={{ width: 300 }}
                    name="state"
                    value={
                      editAllNewContractDetails?.lesseeState ||
                      editAllNewContractDetails?.state ||
                      ""
                    }
                    onChange={(e) => updateChange(e)}
                    //   errorText={editAllNewContractDetailsErr?.state}
                  />
                </Grid>
              </Grid>
              {/* ) : null} */}
            </Box>

            {/* {(selectedBranchType &&
              selectedBranchType?.label === "HO-Office") ||
            selectedBranchType?.label === "HO-Maintenance" ||
            selectedBranchType?.label === "DO / RO-Office" ||
            selectedBranchType?.label === "DO / RO-Maintenance" ||
            selectedBranchType?.label === "StoreRoom-Office" ||
            selectedBranchType?.label === "StoreRoom-Maintenance" ||
            selectedBranchType?.label === "Training Center" ||
            selectedBranchType?.label === "Training Center-Maintainence" ? ( */}
            {/* <Grid container spacing={2} className="px-2 py-2 mt-1">
                <Grid item className="d-flex m-2" lg={12}>
                  <DropDownComponent
                    label="Office Name"
                    options={premesisName}
                    sx={{ width: 300 }}
                    name="premesisOfficeName"
                    value={editAllNewContractDetails?.premesisOfficeName}
                    onChange={(val) =>
                      handleHeadOfficeChange("premesisOfficeName", val)
                    }
                  />
                </Grid>
              </Grid> */}
            {/* ) : null} */}
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
                        value={editAllNewContractDetails?.priviousContractID}
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
                      option?.label || editAllNewContractDetails?.lesseeEntityDetails
                    }
                    name="lesseeEntityDetails"
                    value={
                      type === "edit"
                        ? editAllNewContractDetails?.lesseeEntityDetails || null
                        : editAllNewContractDetails?.lesseeEntityDetails || null
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
                            editAllNewContractDetails?.lesseeEntityDetails
                        ) || null
                      }
                      sx={{ width: 300 }}
                      required={true}
                    />
                    {/* 
                    <DropDownComponent
                      label="Location"
                      sx={{ width: 300 }}
                      options={location}
                      getOptionLabel={(option) =>
                        option?.label ||
                        editAllNewContractDetails?.premesisLocation
                      }
                      // name="premesisLocation"
                      value={
                        editAllNewContractDetails?.premesisLocation || null
                      }
                      onChange={handleLocationChange}
                      required={true}
                    /> */}

                    <SimpleDropDown
                      options={location}
                      label="Location"
                      onChange={handleLocationChange}
                      value={
                        location?.find(
                          (option) =>
                            option?.label ===
                            editAllNewContractDetails?.premesisLocation
                        ) || null
                      }
                      sx={{ width: 300 }}
                      required={true}
                    />

                    {/* <DropDownComponent
                      label="Building Type"
                      sx={{ width: 300 }}
                      options={typeOfBuliding}
                      getOptionLabel={(option) =>
                        option?.label ||
                        editAllNewContractDetails?.premesisBuildingType
                      }
                      value={
                        editAllNewContractDetails?.premesisBuildingType || null
                      }
                      // onSelect={handleBulidingType}
                      onChange={handleBulidingType}
                      required={true}
                    /> */}
                    <SimpleDropDown
                      options={typeOfBuliding}
                      label="Building Type"
                      onChange={handleLocationChange}
                      value={
                        typeOfBuliding?.find(
                          (option) =>
                            option?.label ===
                            editAllNewContractDetails?.premesisBuildingType
                        ) || null
                      }
                      sx={{ width: 300 }}
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
                        value={editAllNewContractDetails?.premesisDoorNumber}
                        onChange={(e) => updateChange(e)}
                        // errorText={
                        //   editAllNewContractDetailsErr?.premesisDoorNumber
                        // }
                        required={true}
                      />
                      <InputBoxComponent
                        label="Floor No."
                        placeholder="Enter Floor No."
                        sx={{ width: 300 }}
                        name="premesisFloorNumber"
                        value={editAllNewContractDetails?.premesisFloorNumber}
                        onChange={(e) => updateChange(e)}
                        // errorText={
                        //   editAllNewContractDetailsErr?.premesisFloorNumber
                        // }
                        required={true}
                      />
                      <InputBoxComponent
                        label="Land Mark"
                        placeholder="Enter Land Mark"
                        sx={{ width: 300 }}
                        name="premesisLandMark"
                        value={editAllNewContractDetails?.premesisLandMark}
                        onChange={(e) => updateChange(e)}
                        // errorText={
                        //   editAllNewContractDetailsErr?.premesisLandMark
                        // }
                        required={true}
                      />
                    </Grid>
                    <Grid item className="d-flex m-2" md={12}>
                      <InputBoxComponent
                        label="Road/Street"
                        placeholder="Enter Road"
                        sx={{ width: 300 }}
                        name="premesisStreet"
                        value={editAllNewContractDetails?.premesisStreet}
                        onChange={(e) => updateChange(e)}
                        // errorText={editAllNewContractDetailsErr?.premesisStreet}
                        required={true}
                      />
                      <InputBoxComponent
                        label="Ward Name/No Area Name/Layout Name/Extension"
                        placeholder="Enter Ward No."
                        sx={{ width: 300 }}
                        name="premesisWardNo"
                        value={editAllNewContractDetails?.premesisWardNo}
                        onChange={(e) => updateChange(e)}
                        // errorText={editAllNewContractDetailsErr?.premesisWardNo}
                        required={true}
                      />
                      <InputBoxComponent
                        label="City"
                        sx={{ width: 300 }}
                        placeholder="Enter City"
                        name="premesisCity"
                        value={editAllNewContractDetails?.premesisCity}
                        onChange={(e) => updateChange(e)}
                        // errorText={editAllNewContractDetailsErr?.premesisCity}
                        required={true}
                      />
                    </Grid>
                    <Grid item className="d-flex m-2" md={12}>
                      <InputBoxComponent
                        label="Pincode"
                        placeholder="Enter Pincode"
                        sx={{ width: 300 }}
                        name="premesisPinCode"
                        value={editAllNewContractDetails?.premesisPinCode}
                        onChange={(e) => updateChange(e)}
                        // errorText={
                        //   editAllNewContractDetailsErr?.premesisPinCode
                        // }
                        required={true}
                      />
                      <InputBoxComponent
                        label="Taluk"
                        placeholder="Enter Taluk"
                        sx={{ width: 300 }}
                        name="premesisTaluka"
                        value={editAllNewContractDetails?.premesisTaluka}
                        onChange={(e) => updateChange(e)}
                        // errorText={editAllNewContractDetailsErr?.premesisTaluka}
                        required={true}
                      />

                      <InputBoxComponent
                        label="District "
                        sx={{ width: 300 }}
                        placeholder="Enter District"
                        name="premesisDistrict"
                        value={editAllNewContractDetails?.premesisDistrict}
                        onChange={(e) => updateChange(e)}
                        // errorText={
                        //   editAllNewContractDetailsErr?.premesisDistrict
                        // }
                        required={true}
                      />
                    </Grid>
                    <Grid item className="d-flex m-2" md={12}>
                      <InputBoxComponent
                        label="State "
                        sx={{ width: 300 }}
                        placeholder="Enter State"
                        name="lessorState"
                        value={editAllNewContractDetails?.lessorState}
                        onChange={(e) => updateChange(e)}
                        // errorText={editAllNewContractDetailsErr?.lessorState}
                        required={true}
                      />
                    </Grid>

                    <Grid item className="d-flex m-2" md={12}>
                      <InputBoxComponent
                        label="Plot Area"
                        placeholder="Enter Plot Area ."
                        sx={{ width: 300 }}
                        name="plotNumber"
                        value={editAllNewContractDetails?.plotNumber}
                        onChange={(e) => updateChange(e)}
                        // errorText={editAllNewContractDetailsErr?.plotNumber}
                        required={true}
                      />
                      <InputBoxComponent
                        label="Buit-Up Area"
                        placeholder="Enter Bulit-Up Area ."
                        sx={{ width: 300 }}
                        name="builtupArea"
                        value={editAllNewContractDetails?.builtupArea}
                        onChange={(e) => updateChange(e)}
                        // errorText={editAllNewContractDetailsErr?.builtupArea}
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
                        value={editAllNewContractDetails?.joinaddress_Premesis}
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
                      <Grid
                        container
                        spacing={2}
                        className="d-flex px-2 py-2 mt-1"
                      >
                        <Grid item className="d-flex m-2" md={12}>
                          <Grid item className="d-flex m-2" md={12}>
                            <Typography>1. </Typography>
                            <Typography>North:</Typography>
                            <InputBoxComponent
                              label="Description"
                              placeholder="Enter Description"
                              sx={{ width: 300, mt: -1.5, ml: 1 }}
                              name="northPremesis"
                              value={editAllNewContractDetails?.northPremesis}
                              onChange={(e) => updateChange(e)}
                              //   errorText={
                              //     editAllNewContractDetailsErr?.northPremesis
                              //   }
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
                              value={editAllNewContractDetails?.southPremesis}
                              onChange={(e) => updateChange(e)}
                              //   errorText={
                              //     editAllNewContractDetailsErr?.southPremesis
                              //   }
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
                              value={editAllNewContractDetails?.eastPremesis}
                              onChange={(e) => updateChange(e)}
                              //   errorText={
                              //     editAllNewContractDetailsErr?.eastPremesis
                              //   }
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
                              value={editAllNewContractDetails?.westPremesis}
                              onChange={(e) => updateChange(e)}
                              //   errorText={
                              //     editAllNewContractDetailsErr?.westPremesis
                              //   }
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
                              value={editAllNewContractDetails?.lattitude}
                              onChange={(e) => updateChange(e)}
                              //   errorText={
                              //     editAllNewContractDetailsErr?.lattitude
                              //   }
                              required={true}
                            />
                            <InputBoxComponent
                              label="Longitude"
                              placeholder="Enter Longitude"
                              sx={{ width: 300 }}
                              name="longitude"
                              value={editAllNewContractDetails?.longitude}
                              onChange={(e) => updateChange(e)}
                              //   errorText={
                              //     editAllNewContractDetailsErr?.longitude
                              //   }
                              required={true}
                            />

                            <InputBoxComponent
                              label="GPS Co-ordinates"
                              placeholder="Enter GPS Co-ordinates"
                              sx={{ width: 300 }}
                              name="gpsCoordinates"
                              value={editAllNewContractDetails?.gpsCoordinates}
                              onChange={(e) => updateChange(e)}
                              //   errorText={
                              //     editAllNewContractDetailsErr?.gpsCoordinates
                              //   }
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
          <hr />
          <Box>
            <Typography
              className="fs-20 fw-500 pt-4 px-4"
              sx={{ fontWeight: 800, fontSize: 15 }}
            >
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
                  value={editAllNewContractDetails?.agreementSignDate}
                  onChange={handleAgreementSignDate}
                  required
                />

                {/* <DropDownComponent
                  label="ActivationStatus"
                  placeholder="Enter Activation Status"
                  sx={{ width: 300, ml: 0 }}
                  size="small"
                  options={activationStatus}
                  getOptionLabel={(option) =>
                    option?.label ||
                    editAllNewContractDetails?.agreementActivationStatus
                  }
                  // name="agreementActivationStatus"
                  value={
                    editAllNewContractDetails?.agreementActivationStatus || null
                  }
                  onChange={handleActivationStatus}
                  required
                /> */}
                <SimpleDropDown
                  options={activationStatus}
                  label="ActivationStatus"
                  onChange={handleActivationStatus}
                  value={
                    activationStatus?.find(
                      (option) =>
                        option?.label ===
                        editAllNewContractDetails?.agreementActivationStatus
                    ) || null
                  }
                  sx={{ width: 300 }}
                  required={true}
                />
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
                    sx={{ width: 300, mt: -1.5, ml: 0 }}
                    name="glName"
                    value={editAllNewContractDetails?.glName}
                    onChange={(e) => updateChange(e)}
                    // errorText={editAllNewContractDetailsErr?.glName}
                    required
                  />
                  <DatePickerComponent
                    placeholder="Select Signed Date"
                    label="Signed Date"
                    size="small"
                    sx={{ width: 300, mt: 3 }}
                    name="signedDate"
                    value={editAllNewContractDetails?.signedDate}
                    onChange={handleAgreementGLSignDate}
                    required
                  />
                  <InputBoxComponent
                    label="GL Employee ID"
                    placeholder="Enter GL Employee ID"
                    sx={{ width: 300, mt: -1.5, ml: 1 }}
                    name="glEmpId"
                    value={editAllNewContractDetails?.glEmpId}
                    onChange={(e) => updateChange(e)}
                    // errorText={editAllNewContractDetailsErr?.glEmpId}
                    required
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
                  value={editAllNewContractDetails?.agreementStartDate}
                  onChange={(val) => {
                    // console.log(val, "val");
                    setEditAllNewContractDetails({
                      ...editAllNewContractDetails,
                      agreementStartDate: val,
                    });
                  }}
                  required
                />
                <DatePickerComponent
                  placeholder="Select End at"
                  label="Agreement End Date"
                  size="small"
                  sx={{ width: 300 }}
                  name="agreementEndDate"
                  value={editAllNewContractDetails?.agreementEndDate}
                  onChange={handleAgreementEndDate}
                  required
                />
              </Grid>

              <Typography className="fs-20 fw-500 pt-4 px-4">
                Rent Start & End Date
              </Typography>
              <Grid item className="d-flex m-1 px-0" md={12}>
                <DatePickerComponent
                  placeholder="Select Start From"
                  label="Rent Start Date"
                  size="small"
                  defaultValue="00-00-0000"
                  sx={{ width: 300 }}
                  name="rentStartDate"
                  value={editAllNewContractDetails?.rentStartDate}
                  onChange={handleRentStartDate}
                  required
                />
                <DatePickerComponent
                  placeholder="Select End at"
                  label="Rent End Date"
                  size="small"
                  defaultValue="00-00-0000"
                  sx={{ width: 300 }}
                  name="rentEndDate"
                  value={editAllNewContractDetails?.rentEndDate}
                  onChange={handleRentEndDate}
                  // disabled
                  required
                />

                <Button onClick={handleCalculateTenure}>=</Button>

                <InputBoxComponent
                  label="Tenure (in months)"
                  placeholder="Enter Tenure "
                  sx={{ width: 300, mt: -4.5, ml: 1 }}
                  name="agreementTenure"
                  value={editAllNewContractDetails?.agreementTenure}
                  // onChange={handleCalculateTenure}
                  //   errorText={editAllNewContractDetailsErr?.agreementTenure}
                  required
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
                  value={editAllNewContractDetails?.maintaineneCharge}
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.maintaineneCharge}
                />
                <InputBoxComponent
                  label="Water Charges"
                  placeholder="Enter Water Charges"
                  sx={{ width: 300 }}
                  name="waterCharge"
                  value={editAllNewContractDetails?.waterCharge}
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.waterCharge}
                />
              </Grid>
              <Grid item className="d-flex py-1" md={12}>
                <InputBoxComponent
                  label="Other Charges "
                  placeholder="Enter Other Charges"
                  sx={{ width: 300, ml: 1 }}
                  name="electricity"
                  value={editAllNewContractDetails?.electricity}
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.electricity}
                />

                <DropDownComponent
                  label="Document Type"
                  sx={{ width: 300, mt: 1, mr: 3 }}
                  options={DocumentType}
                  getOptionLabel={(option) =>
                    option?.label || editAllNewContractDetails?.documentType
                  }
                  name="documentType"
                  value={editAllNewContractDetails?.documentType || null}
                  onChange={(value) =>
                    handleDocumentType("documentType", value)
                  }
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
                    required
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
                      required
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
              <Grid item className="d-flex" md={12}>
                <InputBoxComponent
                  label="Security Deposit Amount"
                  placeholder="Enter SD Amount"
                  sx={{ width: 300 }}
                  name="securityDepositAmount"
                  value={editAllNewContractDetails?.securityDepositAmount}
                  onChange={(e) => updateChange(e)}
                  //   errorText={
                  //     editAllNewContractDetailsErr?.securityDepositAmount
                  //   }
                  required
                />

                <DatePickerComponent
                  label="Payment Date"
                  placeholder="Enter Payment Date"
                  sx={{ width: 300, mt: 4.5 }}
                  value={editAllNewContractDetails?.securityDepositPaymentDate}
                  onChange={handlePaymentDate}
                  required
                />

                <InputBoxComponent
                  label="UTR Number"
                  placeholder="Enter UTR Number"
                  sx={{ width: 300, ml: 1 }}
                  name="securityDepositUtr"
                  value={editAllNewContractDetails?.securityDepositUtr}
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.securityDepositUtr}
                  required
                />
              </Grid>
              <Grid item className="d-flex" md={12}>
                <InputBoxComponent
                  label="Monthly Rent"
                  placeholder="Enter Monthly Rent"
                  sx={{ width: 300 }}
                  name="lessorRentAmount"
                  value={
                    type === "edit"
                      ? editAllNewContractDetails?.lessorRentAmount
                      : editAllNewContractDetails?.lessorRentAmount
                  }
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.lessorRentAmount}
                  required
                />
                <DatePickerComponent
                  placeholder="Select Start From"
                  label="First Rent Date"
                  size="small"
                  sx={{ width: 300, mt: 4.3 }}
                  value={editAllNewContractDetails?.rentStartDate} //firstRantDate
                  onChange={handleRentStartDate}
                  required
                />
                <InputBoxComponent
                  label="Standard Deduction"
                  placeholder="Enter Standard Deduction"
                  sx={{ width: 300, ml: 1 }}
                  name="standardDeducition"
                  value={editAllNewContractDetails?.standardDeducition}
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.standardDeducition}
                  required
                />
              </Grid>

              <Grid item className="d-flex " md={12}>
                {/* <DropDownComponent
                  label="Lockin Period"
                  sx={{ width: 300, mt: 2, ml: -2 }}
                  options={LockinPeriod}
                  getOptionLabel={(option) =>
                    option?.label ||
                    editAllNewContractDetails?.securityDepositLockinPeriod
                  }
                  name="securityDepositLockinPeriod"
                  value={
                    editAllNewContractDetails?.securityDepositLockinPeriod ||
                    null
                  }
                  onChange={(value) =>
                    handleLockinPeriod("securityDepositLockinPeriod", value)
                  }
                  required
                /> */}

                <SimpleDropDown
                  options={LockinPeriod}
                  label="Lockin Period"
                  onChange={handleLockinPeriod}
                  value={
                    LockinPeriod?.find(
                      (option) =>
                        option?.label ===
                        editAllNewContractDetails?.securityDepositLockinPeriod
                    ) || null
                  }
                  sx={{ width: 300 }}
                  required={true}
                />

                {/* <DropDownComponent
                  label="Notice Period"
                  sx={{ width: 300, mt: 2, ml: 0 }}
                  options={noticePeriod}
                  getOptionLabel={(option) =>
                    option?.label ||
                    editAllNewContractDetails?.securityDepositnoticePeriod
                  }
                  name="securityDepositnoticePeriod"
                  value={
                    editAllNewContractDetails?.securityDepositnoticePeriod ||
                    null
                  }
                  onChange={(value) =>
                    handleNoticePeriod("securityDepositnoticePeriod", value)
                  }
                  required
                /> */}

                <SimpleDropDown
                  options={noticePeriod}
                  label="Notice Period"
                  onChange={handleNoticePeriod}
                  value={
                    noticePeriod?.find(
                      (option) =>
                        option?.label ===
                        editAllNewContractDetails?.securityDepositnoticePeriod
                    ) || null
                  }
                  sx={{ width: 300 }}
                  required={true}
                />

                <InputBoxComponent
                  label="Exit Terms-Remarks"
                  sx={{ width: 300, mt: -2.5, ml: 2.5 }}
                  // options={ExitTerms}
                  placeholder="Enter Remarks"
                  multiline
                  name="securityDepositExitTerm"
                  value={editAllNewContractDetails?.securityDepositExitTerm}
                  onChange={(e) => updateChange(e)}
                  required
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
                      getOptionLabel={(option) =>
                        option?.label || recipientCount
                      }
                      value={recipientCount}
                      onChange={handleDropDownChange}
                      required
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
                            {/* {type === "edit" ? ( */}
                            <InputBoxComponent
                              label="Recipiants ID"
                              placeholder={`Enter Recipiant ID ${index + 1}...`}
                              sx={{ width: 300 }}
                              name={`recipiantsID-${index}`}
                              value={
                                type === "edit"
                                  ? editAllNewContractDetails?.recipiants?.[
                                      index
                                    ] &&
                                    editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.recipiantsID
                                  : "" // Clear the value in "add" mode
                              }
                              onChange={(e) =>
                                handleRecipientChange(
                                  index,
                                  "recipiantsID",
                                  e.target.value
                                )
                              }
                              // errorText={
                              //   editAllNewContractDetailsErr?.recipiantsID
                              // }
                              required
                            />
                            {/* ) : null} */}

                            <InputBoxComponent
                              label="Rent Amount"
                              placeholder={`Enter Rent Amount ${index + 1}...`}
                              sx={{ width: 300 }}
                              name={`lessorRentAmount-${index}`}
                              value={
                                recipientCount && recipientCount?.length > 1
                                  ? editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.lessorRentAmount
                                  : editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.lessorRentAmount || //calculateSplitAmount()
                                    editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.lessorRentAmount //calculateSplitAmount()
                              }
                              onChange={(e) =>
                                handleRecipientChange(
                                  index,
                                  "lessorRentAmount",
                                  e.target.value
                                )
                              }
                              //   errorText={
                              //     editAllNewContractDetailsErr?.lessorRentAmount
                              //   }
                              required
                            />
                          </Grid>
                          <Grid item className="d-flex m-2" md={12}>
                            <InputBoxComponent
                              label="Recipiants Name"
                              placeholder={`Enter Recipiant Name ${
                                index + 1
                              }...`}
                              sx={{ width: 300 }}
                              name={`lessorRecipiantsName-${index}`}
                              value={
                                type === "edit"
                                  ? editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.lessorRecipiantsName
                                  : editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.lessorRecipiantsName || "" // Clear the value in "add" mode
                              }
                              onChange={(e) =>
                                handleRecipientChange(
                                  index,
                                  "lessorRecipiantsName",
                                  e.target.value
                                )
                              }
                              //   errorText={
                              //     editAllNewContractDetailsErr?.lessorRecipiantsName
                              // //   }
                              required
                            />

                            <InputBoxComponent
                              label="IFSC Code"
                              sx={{ width: 300 }}
                              placeholder={`Enter IFSC Code ${index + 1}...`}
                              name={`lessorIfscNumber-${index}`}
                              value={
                                editAllNewContractDetails?.recipiants?.[index]
                                  ?.lessorIfscNumber || ifscCodes?.[index]
                              }
                              onChange={(e) => handleChangeIFSCCode(e, index)}
                              //   errorText={
                              //     editAllNewContractDetailsErr?.lessorIfscNumber
                              //   }
                              required
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
                                  editAllNewContractDetails.recipiants?.[index]
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
                                // errorText={editAllNewContractDetailsErr?.bank}
                                required
                              />

                              <InputBoxComponent
                                label={`Branch Name ${index + 1}`}
                                sx={{ width: 300 }}
                                placeholder={`Enter Branch Name ${
                                  index + 1
                                }...`}
                                value={
                                  editAllNewContractDetails.recipiants?.[index]
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
                                // errorText={
                                //   editAllNewContractDetailsErr?.lessorBranchName
                                // }
                                required
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
                                  ? editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.lessorAccountNumber
                                  : editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.lessorAccountNumber || "" // Clear the value in "add" mode
                              }
                              onChange={(e) =>
                                handleRecipientAccountChange(
                                  index,
                                  "lessorAccountNumber",
                                  e.target.value
                                )
                              }
                              //   errorText={
                              //     editAllNewContractDetailsErr?.lessorAccountNumber
                              //   }
                              required
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
                                    ? editAllNewContractDetails?.recipiants?.[
                                        index
                                      ]?.lessorAccountNumber &&
                                      editAllNewContractDetails?.recipiants?.[
                                        index
                                      ]?.lessorAccountNumber
                                    : (reEnteredData?.[index] &&
                                        reEnteredData?.[index]) ||
                                      ""
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
                          <Grid
                            item
                            className="d-flex  m-2"
                            md={12}
                            key={index}
                          >
                            <InputBoxComponent
                              label="PAN No."
                              sx={{ width: 300 }}
                              placeholder={`Enter PAN No. ${index + 1}...`}
                              name={`panNo-${index}`}
                              value={
                                type === "edit"
                                  ? editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.panNo
                                  : editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.panNo || ""
                              }
                              onChange={(e) =>
                                handleRecipientChange(
                                  index,
                                  "panNo",
                                  e.target.value
                                )
                              }
                              //   errorText={editAllNewContractDetailsErr?.panNo}
                              required
                            />
                            <InputBoxComponent
                              label="GST No."
                              sx={{ width: 300 }}
                              placeholder={`Enter GST No. ${index + 1}...`}
                              name={`gstNo-${index}`}
                              value={
                                type === "edit"
                                  ? editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.gstNo
                                  : editAllNewContractDetails?.recipiants?.[
                                      index
                                    ]?.gstNo || ""
                              }
                              onChange={(e) =>
                                handleRecipientChange(
                                  index,
                                  "gstNo",
                                  e.target.value
                                )
                              }
                              //   errorText={editAllNewContractDetailsErr?.gstNo}
                              required
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
                  <Grid item className="d-flex m-2" lg={12}>
                    {/* {type === "edit" ? ( */}
                    <InputBoxComponent
                      label="Recipiant Rent Amount"
                      name="lessorRentAmount"
                      value={editAllNewContractDetails?.lessorRentAmount}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                      required
                    />
                    {/* ) : null} */}
                  </Grid>
                  {/* ))} */}
                  <Grid item className="d-flex m-2" lg={12}>
                    {/* {type === "edit" ? ( */}
                    <InputBoxComponent
                      label="Recipiant Name"
                      name="lessorRecipiantsName"
                      value={editAllNewContractDetails?.lessorRecipiantsName}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                      required
                    />
                    {/* ) : null} */}
                    {/* {type === "edit" ? ( */}
                    <InputBoxComponent
                      label="IFSC Number"
                      name="lessorIfscNumber"
                      value={editAllNewContractDetails?.lessorIfscNumber}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                      required
                    />
                    {/* ) : null} */}
                    {/* {type === "edit" ? ( */}
                    <InputBoxComponent
                      label="Bank Name"
                      name="lessorBankName"
                      value={editAllNewContractDetails?.lessorBankName}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                      required
                    />
                    {/* ) : null} */}
                  </Grid>
                  <Grid item className="d-flex m-2" lg={12}>
                    {/* {type === "edit" ? ( */}
                    <InputBoxComponent
                      label="Branch Name"
                      name="lessorBranchName"
                      value={editAllNewContractDetails?.lessorBranchName}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                      required
                    />
                    {/* ) : null} */}
                    {/* {type === "edit" ? ( */}
                    <InputBoxComponent
                      label="Account Number"
                      type="number"
                      name="lessorAccountNumber"
                      value={editAllNewContractDetails?.lessorAccountNumber}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                      required
                    />
                    {/* ) : null} */}
                    {/* {type === "edit" ? ( */}
                    <InputBoxComponent
                      label="Re-Enterered Account Number"
                      type="number"
                      name="lessorAccountNumber"
                      value={editAllNewContractDetails?.lessorAccountNumber}
                      onChange={(e) => updateChange(e)}
                      sx={{ width: 300 }}
                      required
                    />
                    {/* ) : null} */}
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
                  {/* <InputBoxComponent
                    label="Enter Renewal Tenure (in months)"
                    type="number"
                    name="agreementTenure"
                    value={editAllNewContractDetails?.agreementTenure}
                    onChange={(e) => updateChange(e)}
                    sx={{ width: 300 }}
                    readOnly
                    required
                  /> */}

                  <DropDownComponent
                    label="Escalation Months (in months)"
                    placeholder="Enter Month"
                    sx={{ width: 300 }}
                    size="small"
                    options={EscMonths}
                    getOptionLabel={(option) =>
                      option?.label ||
                      editAllNewContractDetails?.schedulePrimesis
                    }
                    // name="agreementActivationStatus"
                    value={editAllNewContractDetails?.schedulePrimesis}
                    onChange={handleMonthDetails}
                    required={true}
                  />

                  <InputBoxComponent
                    label="Enter Current Rent"
                    // type="number"
                    name="lessorRentAmount"
                    value={editAllNewContractDetails?.lessorRentAmount}
                    onChange={(e) => updateChange(e)}
                    sx={{ width: 300 }}
                    required
                  />

                  <InputBoxComponent
                    label="Enter Escalation (%)"
                    type="number"
                    name="escalation"
                    value={editAllNewContractDetails?.escalation}
                    onChange={(e) => handleEscalationChange(e)}
                    sx={{ width: 300 }}
                    required
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
                      parseInt(editAllNewContractDetails?.lessorRentAmount) >
                        20000
                    }
                    onChange={handleSwitchChange}
                  />
                  {/* parseInt(editAllNewContractDetails?.lessorRentAmount) > 20000 ? */}
                  {parseInt(editAllNewContractDetails?.lessorRentAmount) >
                    20000 && (
                    <InputBoxComponent
                      label="TDS (%)"
                      type="number"
                      name="tds"
                      value={
                        editAllNewContractDetails.tds !== null
                          ? editAllNewContractDetails.tds
                          : 0
                      }
                      // value={tdsRates*100}
                      onChange={(e) => handleTdsChange(e)}
                    />
                  )}

                  <Typography>GST Applicable?</Typography>
                  <SwitchComponent
                    // checked={parseInt(editAllNewContractDetails?.lessorRentAmount) > 20000}
                    checked={checked}
                    onChange={(isChecked) => handleSwitchGSTChange(isChecked)}
                  />

                  {checked && (
                    <InputBoxComponent
                      label="GST % "
                      type="number"
                      placeholder="Enter GST%"
                      value={editAllNewContractDetails?.gst}
                      onChange={(e) => handleGstValueChange(e)}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
          <hr />
          <Box>
            <Typography
              className="fs-20 fw-500 pt-4 px-3"
              sx={{ fontWeight: 800, fontSize: 15 }}
            >
              Vendor/Owner Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Lessor Name"
                  placeholder="Enter Lessor Name"
                  sx={{ width: 300 }}
                  name="lessorName"
                  value={editAllNewContractDetails?.lessorName}
                  onChange={(e) => updateChange(e)}
                  required
                />

                <InputBoxComponent
                  label="Contact Number."
                  placeholder="Enter Contact No."
                  sx={{ width: 300 }}
                  name="lessorContactNumber"
                  value={editAllNewContractDetails?.lessorContactNumber}
                  onChange={(e) => updateChange(e)}
                  required
                />
                <InputBoxComponent
                  label="Email Address."
                  placeholder="Enter Email Address."
                  sx={{ width: 300 }}
                  name="lessorEmailAddress"
                  value={editAllNewContractDetails?.lessorEmailAddress}
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.lessorEmailAddress}
                  required
                />
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="PAN No"
                  placeholder="Enter PAN No."
                  sx={{ width: 300 }}
                  name="lessorPanNumber"
                  value={editAllNewContractDetails?.lessorPanNumber}
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.lessorPanNumber}
                  required
                />
                <InputBoxComponent
                  label="GST No."
                  placeholder="Enter GST No."
                  sx={{ width: 300 }}
                  name="lessorGstNumber"
                  value={editAllNewContractDetails?.lessorGstNumber}
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.lessorGstNumber}
                  required
                />

                <InputBoxComponent
                  label="Nationality"
                  placeholder="Enter Nationality"
                  sx={{ width: 300 }}
                  name="nationality"
                  value={editAllNewContractDetails?.nationality}
                  onChange={(e) => updateChange(e)}
                  //   errorText={editAllNewContractDetailsErr?.nationality}
                  required
                />
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                <DropDownComponent
                  label="Payment Mode"
                  placeholder="Enter Mode"
                  sx={{ width: 300 }}
                  options={PaymentMode}
                  getOptionLabel={(option) =>
                    option?.label || editAllNewContractDetails?.paymentMode
                  }
                  // name="paymentMode"
                  value={editAllNewContractDetails?.paymentMode}
                  onChange={handlePaymentChange}
                  required
                  //   errorText={editAllNewContractDetailsErr?.paymentMode}
                />
              </Grid>
            </Grid>

            <Box>
              <Typography className="fs-20 fw-500 pt-4 px-3">
                Ownership Details
              </Typography>
              <Grid container spacing={2} className="px-2 py-2 mt-1">
                <Grid item className="d-flex m-2" lg={12}>
                  <InputBoxComponent
                    label="Electricity Bill"
                    // placeholder="Enter BankCheck"
                    sx={{ width: 200 }}
                    // name="lessorElectricityBillPath"
                    value={editAllNewContractDetails?.lessorElectricityBillPath}
                  />
                  <form
                    action="/action_page.php"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <input
                      ref={ElectricityBillInput}
                      type="file"
                      style={{
                        display: "none",
                        background: electricityBillFile.file ? "green" : "blue",
                      }}
                      onChange={(e) => {
                        setElectricityBillFile({
                          file: e.target.files[0],
                          filename: e.target.files[0].name,
                        });
                        handleElectricityBillFileUpload();
                      }}
                    />
                  </form>
                  <ColorIcon
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      ml: -2,
                    }}
                  >
                    <UploadFileIcon
                      onClick={() => {
                        ElectricityBillInput.current.click();
                      }}
                      fontSize="small"
                      sx={{ mt: 0.5 }}
                    />
                    <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
                      Upload
                    </Typography>
                  </ColorIcon>
                  {/* {active && ( */}
                  <a
                    href={`http://dedupeuat.grameenkoota.in:8080/APIFile/downloadFile/${active}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginLeft: "-10px",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <ColorIcon
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        ml: 0,
                      }}
                    >
                      <FileDownloadDoneIcon
                        fontSize="small"
                        sx={{ marginTop: 1.5 }}
                      />
                      <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
                        Download
                      </Typography>
                    </ColorIcon>
                  </a>
                  {/* )} */}

                  <InputBoxComponent
                    label="Bank Pass Book/Cheque "
                    sx={{ width: 200 }}
                    value={editAllNewContractDetails?.lessorBankPassBookPath}
                  />
                  <form
                    action="/action_page.php"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <input
                      ref={BankChequeFileInput}
                      type="file"
                      style={{
                        display: "none",
                        background: bankChequeFile.file ? "green" : "blue",
                      }}
                      onChange={(e) => {
                        setBankChequeFile({
                          file: e.target.files[0],
                          filename: e.target.files[0].name,
                        });
                        handleBankChequeFileUpload();
                      }}
                    />
                  </form>
                  <ColorIcon
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      ml: -2,
                    }}
                  >
                    <UploadFileIcon
                      onClick={() => {
                        BankChequeFileInput.current.click();
                      }}
                      fontSize="small"
                      sx={{ mt: 0.5 }}
                    />
                    <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
                      Upload
                    </Typography>
                  </ColorIcon>
                  {/* <span> */}
                  <a
                    href={`http://dedupeuat.grameenkoota.in:8080/APIFile/downloadFile/${active1}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginLeft: "-10px",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <ColorIcon
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        ml: 0,
                      }}
                    >
                      <FileDownloadDoneIcon
                        fontSize="small"
                        sx={{ marginTop: 1.5 }}
                      />
                      <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
                        Download
                      </Typography>
                    </ColorIcon>
                  </a>
                  {/* </span> */}
                </Grid>

                <Grid item className="d-flex m-2" lg={12}>
                  <InputBoxComponent
                    label="Tax Paid Recipt "
                    // placeholder="Enter BankCheck"
                    sx={{ width: 200 }}
                    name="lessorTaxNumberPath"
                    value={editAllNewContractDetails?.lessorTaxNumberPath}
                  />
                  <form
                    action="/action_page.php"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <input
                      ref={TaxReciptInput}
                      type="file"
                      style={{
                        display: "none",
                        background: taxReciptFile.file ? "green" : "blue",
                      }}
                      onChange={(e) => {
                        setTaxReciptFile({
                          file: e.target.files[0],
                          filename: e.target.files[0].name,
                        });
                        handleTaxReciptFileUpload();
                      }}
                    />
                  </form>

                  <ColorIcon
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      ml: -2,
                    }}
                  >
                    <UploadFileIcon
                      onClick={() => {
                        TaxReciptInput.current.click();
                      }}
                      fontSize="small"
                      sx={{ mt: 0.5 }}
                    />
                    <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
                      Upload
                    </Typography>
                  </ColorIcon>

                  <a
                    href={`http://dedupeuat.grameenkoota.in:8080/APIFile/downloadFile/${active2}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginLeft: "-10px",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <ColorIcon
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        ml: 0,
                      }}
                    >
                      <FileDownloadDoneIcon
                        fontSize="small"
                        sx={{ marginTop: 1.5 }}
                      />
                      <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
                        Download
                      </Typography>
                    </ColorIcon>
                  </a>

                  <InputBoxComponent
                    label="Pan Card "
                    sx={{ width: 200 }}
                    name="panDocumentPath"
                    value={editAllNewContractDetails?.panDocumentPath}
                  />
                  <form
                    action="/action_page.php"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <input
                      ref={pancardInput}
                      type="file"
                      style={{
                        display: "none",
                        background: pancardFile.file ? "green" : "blue",
                      }}
                      onChange={(e) => {
                        setPancardFile({
                          file: e.target.files[0],
                          filename: e.target.files[0].name,
                        });
                        handlePancardFileUpload();
                      }}
                    />
                  </form>
                  <ColorIcon
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      ml: -2,
                    }}
                  >
                    <UploadFileIcon
                      onClick={() => {
                        pancardInput.current.click();
                      }}
                      fontSize="small"
                      sx={{ mt: 0.5 }}
                    />
                    <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
                      Upload
                    </Typography>
                  </ColorIcon>

                  <a
                    href={`http://dedupeuat.grameenkoota.in:8080/APIFile/downloadFile/${active3}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginLeft: "-10px",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <ColorIcon
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        ml: 0,
                      }}
                    >
                      <FileDownloadDoneIcon
                        fontSize="small"
                        sx={{ marginTop: 1.5 }}
                      />
                      <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
                        Download
                      </Typography>
                    </ColorIcon>
                  </a>
                </Grid>
                <Grid item className="d-flex m-2" lg={12}>
                  <InputBoxComponent
                    label="Any Other"
                    sx={{ width: 200 }}
                    value={anyOtherFile?.filename}
                  />

                  <form
                    action="/action_page.php"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <input
                      ref={AnyOtherFileInput}
                      type="file"
                      multiple
                      style={{
                        display: "none",
                        background: anyOtherFile.file ? "green" : "blue",
                      }}
                      onChange={(e) => {
                        const files = e.target.files;
                        for (const file of files) {
                          console.log(file.name);
                        }
                        setAnyOtherFile({
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
                          AnyOtherFileInput.current.click();
                          handleAnyOtherFileUpload();
                        }}
                        fontSize="large"
                      />
                      <Typography sx={{ fontSize: 9, fontWeight: 800 }}>
                        Upload
                      </Typography>
                    </ColorIcon>
                  </form>
                </Grid>
              </Grid>
            </Box>
            <Snackbar
              open={open}
              anchorOrigin={{ vertical, horizontal }}
              autoHideDuration={1000}
              onClose={handleClose}
              action={action}
              message="File Uploaded Sucessfully!"
              key={vertical + horizontal}
              variant="success"
            />
            <Box>
              <Typography className="fs-20 fw-500 pt-4 px-3">
                Address Details
              </Typography>
              <Grid container spacing={2} className="px-2 py-2 mt-1">
                <Grid container spacing={2} className="px-2 py-2 mt-1">
                  <Grid item className="d-flex m-2" md={12}>
                    <InputBoxComponent
                      label="Door No."
                      placeholder="Enter Door No."
                      sx={{ width: 300 }}
                      name="lessorDoorNumber"
                      value={editAllNewContractDetails?.lessorDoorNumber}
                      onChange={(e) => updateChange(e)}
                      //   errorText={editAllNewContractDetailsErr?.lessorDoorNumber}
                      required
                    />
                    <InputBoxComponent
                      label="Floor No."
                      sx={{ width: 300 }}
                      placeholder="Enter Floor No."
                      name="lessorFloorNumber"
                      value={editAllNewContractDetails?.lessorFloorNumber}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                    <InputBoxComponent
                      label="Land Mark"
                      placeholder="Enter Land Mark"
                      sx={{ width: 300 }}
                      name="lessorLandMark"
                      value={editAllNewContractDetails?.lessorLandMark}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                  </Grid>
                  <Grid item className="d-flex m-2" md={12}>
                    <InputBoxComponent
                      label="Road/Street"
                      placeholder="Enter Road"
                      sx={{ width: 300 }}
                      name="lessorStreet"
                      value={editAllNewContractDetails?.lessorStreet}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                    <InputBoxComponent
                      label="Ward Name/No Area Name/Layout Name/Extension"
                      sx={{ width: 300 }}
                      placeholder="Enter Ward No."
                      name="lessorWardNo"
                      value={editAllNewContractDetails?.lessorWardNo}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                    <InputBoxComponent
                      label="City"
                      sx={{ width: 300 }}
                      placeholder="Enter City"
                      name="lessorCity"
                      value={editAllNewContractDetails?.lessorCity}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                  </Grid>
                  <Grid item className="d-flex m-2" md={12}>
                    <InputBoxComponent
                      label="Pincode"
                      sx={{ width: 300 }}
                      placeholder="Enter Pincode"
                      name="lessorPinCode"
                      value={editAllNewContractDetails?.lessorPinCode}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                    <InputBoxComponent
                      label="Taluk"
                      sx={{ width: 300 }}
                      placeholder="Enter Taluk"
                      name="lessorTaluka"
                      value={editAllNewContractDetails?.lessorTaluka}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                    <InputBoxComponent
                      label="District "
                      sx={{ width: 300 }}
                      placeholder="Enter District"
                      name="lessorDistrict"
                      value={editAllNewContractDetails?.lessorDistrict}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                  </Grid>
                  <Grid item className="d-flex m-2" md={12}>
                    <InputBoxComponent
                      label="State"
                      sx={{ width: 300 }}
                      placeholder="Enter State"
                      name="lessorState"
                      value={editAllNewContractDetails?.lessorState}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                  </Grid>

                  <Grid
                    item
                    className="d-flex flex-column align-items-start justify-content-start m-3"
                    md={12}
                  >
                    <Button onClick={joinAddress}>Join Address</Button>
                    <InputBoxComponent
                      label="Address"
                      placeholder="Enter Address"
                      multiline
                      sx={{ width: 300 }}
                      size="large"
                      value={editAllNewContractDetails?.joinaddress_Vendor}
                      readOnly
                    />

                    <InputBoxComponent
                      textLabel="Remarks"
                      placeholder="Type here...."
                      sx={{ width: 500 }}
                      multiline
                      rows={4}
                      name="remarks"
                      value={editAllNewContractDetails?.remarks}
                      onChange={(e) => updateChange(e)}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <hr style={{ border: "2px solid", borderStyle: "dashed" }} />
        </Modal.Body>
        <Modal.Footer>
          <Box className="d-flex  justify-content-end w-100">
            <Button
              onClick={() => {
                handleSubmit();
              }}
              variant="contained"
              sx={{ m: 1, background: "#238520" }}
            >
              Edit Finish
            </Button>
            <Button onClick={props.close} variant="contained" sx={{ m: 1 }}>
              Close
            </Button>
          </Box>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditMasterDetails;
