import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import StepperComponent from "../../molecules/StepperComponent";
import { Modal, ModalFooter } from "react-bootstrap";
import moment from "moment/moment";

import { getAllRentContractDetails } from "../../services/RentContractsApi";
import {
  emailRegex,
  gstRegex,
  mobileRegex,
  nameWithSpaces,
  nameWithSpacesAndNumbers,
  numbers,
  numbersRegex,
  panCardRegex,
  pincodeRegex,
} from "../../../constants/RegexConstacts";
import EditGeneralInformation from "./EditGeneralInformation/index";
import EditLesseeInformation from "./EditLesseeInformation/index";
import EditPremesisInformation from "./EditPremesisInformation";
import EditAgreementInformation from "./EditAgreementInformation/index";
import EditRentTermsDetails from "./EditRentTermsDetails";
import EditGPSInformations from "./EditGPSInformations";
import { EditRentContractDetails } from "../../services/EditContractApi";

let errObj = {
  uniqueID: "",
  lessorName: "",
  lessorContactNumber: "",
  lessorEmailAddress: "",
  lessorPanNumber: "",
  lessorGstNumber: "",
  lessorTdsNumber: "",
  paymentMode: "",
  lessorElectricityBillNumber: "",
  lessorTaxNumber: "",
  lessorBankPassBookNumber: "",
  lessorCheuque: "",
  recipiants: [
    {
      lessorRecipiantsName: "",
      lessorBankName: "",
      lessorIfscNumber: "",
      lessorBranchName: "",
      lessorAccountNumber: "",
    },
  ],
  lessorDoorNumber: "",
  lessorFloorNumber: "",
  lessorLandMark: "",
  lessorStreet: "",
  lessorWardNo: "",
  lessorArea: "",
  lessorCity: "",
  lessorLocation: "",
  lessorPinCode: "",
  lessorTaluka: "",
  lessorDistrict: "",
  lessorState: "",
  branchID: "",
  lesseebranchName: "",
  lesseeAreaName: "",
  regionName: "",
  lesseeZone: "",
  lesseeState: "",
  lesseeBranchType: "",
  approverRenewal: "",
  approverRelocation: "",
  enitityDetails: "",
  agreementSignDate: "",
  tenurePeriod: "",
  agreementStartDate: "",
  agreementEndDate: "",
  rentStartDate: "",
  rentEndDate: "",
  refreshStartDate: "",
  refreshEndDate: "",
  maintainenceCharges: "",
  waterCharges: "",
  electricityCharges: "",
  documentType: "",
  paymentDate: "",
  agreementpaymentMode: "",
  securityDepositAmount: "",
  monthlyRent: "",
  firstMonthValue: "",
  lastMonthValue: "",
  utrDetails: "",
  lockinPeriod: "",
  noticePeriod: "",
  exitterms: "",
  rentAmount: "",
  escalation: "",
  renewalTenure: "",
  lattitude: "",
  longitude: "",
  coordinates: "",
};

const EditMasterDetails = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepData1, setStepData1] = useState("");
  const [stepData2, setStepData2] = useState("");
  const [stepData3, setStepData3] = useState("");
  const [stepData4, setStepData4] = useState("");
  const [stepData5, setStepData5] = useState("");
  const [stepData6, setStepData6] = useState("");
  const [editAllContractDetails, setEditAllContractDetails] = useState({
    uniqueID: "",
    lessorName: "",
    lessorContactNumber: "",
    lessorEmailAddress: "",
    lessorPanNumber: "",
    lessorGstNumber: "",
    lessorTdsNumber: "",
    paymentMode: "",
    lessorElectricityBillNumber: "",
    lessorTaxNumber: "",
    lessorBankPassBookNumber: "",
    lessorCheuque: "",
    recipiants: [
      {
        lessorRecipiantsName: "",
        lessorBankName: "",
        lessorIfscNumber: "",
        lessorBranchName: "",
        lessorAccountNumber: "",
      },
    ],
    lessorDoorNumber: "",
    lessorFloorNumber: "",
    lessorLandMark: "",
    lessorStreet: "",
    lessorWardNo: "",
    lessorArea: "",
    lessorCity: "",
    lessorLocation: "",
    lessorPinCode: "",
    lessorTaluka: "",
    lessorDistrict: "",
    lessorState: "",
    branchID: "",
    lesseebranchName: "",
    lesseeAreaName: "",
    regionName: "",
    lesseeZone: "",
    lesseeState: "",
    lesseeBranchType: "",
    approverRenewal: "",
    approverRelocation: "",
    enitityDetails: "",
    agreementSignDate: "",
    tenurePeriod: "",
    agreementStartDate: "",
    agreementEndDate: "",
    rentStartDate: "",
    rentEndDate: "",
    refreshStartDate: "",
    refreshEndDate: "",
    maintainenceCharges: "",
    waterCharges: "",
    electricityCharges: "",
    documentType: "",
    paymentDate: "",
    agreementpaymentMode: "",
    securityDepositAmount: "",
    monthlyRent: "",
    firstMonthValue: "",
    lastMonthValue: "",
    utrDetails: "",
    lockinPeriod: "",
    noticePeriod: "",
    exitterms: "",
    rentAmount: "",
    escalation: "",
    renewalTenure: "",
    lattitude: "",
    longitude: "",
    coordinates: "",
  });

  const [editAllContractDetailsErr, setEditAllContractDetailsErr] =
    useState(errObj);

  const handleClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //   useEffect(() => {
  //     let errObj = {
  //       uniqueID: "",
  //       lessorName: "",
  //       lessorContactNumber: "",
  //       lessorEmailAddress: "",
  //       lessorPanNumber: "",
  //       lessorGstNumber: "",
  //       lessorTdsNumber: "",
  //       paymentMode: "",
  //       lessorElectricityBillNumber: "",
  //       lessorTaxNumber: "",
  //       lessorBankPassBookNumber: "",
  //       lessorCheuque: "",
  //       recipiants: [
  //         {
  //           lessorRecipiantsName: "",
  //           lessorBankName: "",
  //           lessorIfscNumber: "",
  //           lessorBranchName: "",
  //           lessorAccountNumber: "",
  //         },
  //       ],
  //       lessorDoorNumber: "",
  //       lessorFloorNumber: "",
  //       lessorLandMark: "",
  //       lessorStreet: "",
  //       lessorWardNo: "",
  //       lessorArea: "",
  //       lessorCity: "",
  //       lessorLocation: "",
  //       lessorPinCode: "",
  //       lessorTaluka: "",
  //       lessorDistrict: "",
  //       lessorState: "",
  //       branchID: "",
  //       lesseebranchName: "",
  //       lesseeAreaName: "",
  //       regionName: "",
  //       lesseeZone: "",
  //       lesseeState: "",
  //       lesseeBranchType: "",
  //       approverRenewal: "",
  //       approverRelocation: "",
  //       enitityDetails: "",
  //       agreementSignDate: "",
  //       tenurePeriod: "",
  //       agreementStartDate: "",
  //       agreementEndDate: "",
  //       rentStartDate: "",
  //       rentEndDate: "",
  //       refreshStartDate: "",
  //       refreshEndDate: "",
  //       maintainenceCharges: "",
  //       waterCharges: "",
  //       electricityCharges: "",
  //       documentType: "",
  //       paymentDate: "",
  //       agreementpaymentMode: "",
  //       securityDepositAmount: "",
  //       monthlyRent: "",
  //       firstMonthValue: "",
  //       lastMonthValue: "",
  //       utrDetails: "",
  //       lockinPeriod: "",
  //       noticePeriod: "",
  //       exitterms: "",
  //       rentAmount: "",
  //       escalation: "",
  //       renewalTenure: "",
  //       lattitude: "",
  //       longitude: "",
  //       coordinates: "",
  //     };
  //     setEditAllContractDetails(errObj);
  //   }, []);

  //   const handleAddRentContractInformationError = () => {
  //     let errorInForm = false;
  //     let errObj = {
  //       uniqueID: "",
  //       lessorName: "",
  //       lessorContactNumber: "",
  //       lessorEmailAddress: "",
  //       lessorPanNumber: "",
  //       lessorGstNumber: "",
  //       lessorTdsNumber: "",
  //       paymentMode: "",
  //       lessorElectricityBillNumber: "",
  //       lessorTaxNumber: "",
  //       lessorBankPassBookNumber: "",
  //       lessorCheuque: "",
  //       recipiants: [
  //         {
  //           lessorRecipiantsName: "",
  //           lessorBankName: "",
  //           lessorIfscNumber: "",
  //           lessorBranchName: "",
  //           lessorAccountNumber: "",
  //         },
  //       ],
  //       lessorDoorNumber: "",
  //       lessorFloorNumber: "",
  //       lessorLandMark: "",
  //       lessorStreet: "",
  //       lessorWardNo: "",
  //       lessorArea: "",
  //       lessorCity: "",
  //       lessorLocation: "",
  //       lessorPinCode: "",
  //       lessorTaluka: "",
  //       lessorDistrict: "",
  //       lessorState: "",
  //       branchID: "",
  //       lesseebranchName: "",
  //       lesseeAreaName: "",
  //       regionName: "",
  //       lesseeZone: "",
  //       lesseeState: "",
  //       lesseeBranchType: "",
  //       approverRenewal: "",
  //       approverRelocation: "",
  //       enitityDetails: "",
  //       agreementSignDate: "",
  //       tenurePeriod: "",
  //       agreementStartDate: "",
  //       agreementEndDate: "",
  //       rentStartDate: "",
  //       rentEndDate: "",
  //       refreshStartDate: "",
  //       refreshEndDate: "",
  //       maintainenceCharges: "",
  //       waterCharges: "",
  //       electricityCharges: "",
  //       documentType: "",
  //       paymentDate: "",
  //       agreementpaymentMode: "",
  //       securityDepositAmount: "",
  //       monthlyRent: "",
  //       firstMonthValue: "",
  //       lastMonthValue: "",
  //       utrDetails: "",
  //       lockinPeriod: "",
  //       noticePeriod: "",
  //       exitterms: "",
  //       rentAmount: "",
  //       escalation: "",
  //       renewalTenure: "",
  //       lattitude: "",
  //       longitude: "",
  //       coordinates: "",
  //     };
  //     if (editAllContractDetails.lessorName === "") {
  //       errorInForm = true;
  //       errObj.lessorName = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorContactNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorContactNumber = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorEmailAddress === "") {
  //       errorInForm = true;
  //       errObj.lessorEmailAddress = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorPanNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorPanNumber = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorGstNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorGstNumber = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorTdsNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorTdsNumber = "*This field is required";
  //     }
  //     // if (editAllContractDetails.paymentMode === "") {
  //     //   errorInForm = true;
  //     //   errObj.paymentMode = "*This field is required";
  //     // }
  //     if (editAllContractDetails.lessorElectricityBillNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorElectricityBillNumber = "*This field is required";
  //     }
  //     // if (editAllContractDetails.lessorBankName === "") {
  //     //   errorInForm = true;
  //     //   errObj.lessorBankName = "*This field is required";
  //     // }
  //     if (editAllContractDetails.lessorTaxNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorTaxNumber = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorBankPassBookNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorBankPassBookNumber = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorCheuque === "") {
  //       errorInForm = true;
  //       errObj.lessorCheuque = "*This field is required";
  //     }

  //     if (editAllContractDetails.lessorRecipiantsName === "") {
  //       errorInForm = true;
  //       errObj.lessorRecipiantsName = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorBankName === "") {
  //       errorInForm = true;
  //       errObj.lessorBankName = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorBranchName === "") {
  //       errorInForm = true;
  //       errObj.lessorBranchName = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorAccountNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorAccountNumber = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorIfscNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorIfscNumber = "*This field is required";
  //     }
  //     if (editAllContractDetails.recipiantsIFSCCode === "") {
  //       errorInForm = true;
  //       errObj.recipiantsIFSCCode = "*This field is required";
  //     }
  //     if (editAllContractDetails.recipiantsAccountNo === "") {
  //       errorInForm = true;
  //       errObj.recipiantsAccountNo = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorDoorNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorDoorNumber = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorFloorNumber === "") {
  //       errorInForm = true;
  //       errObj.lessorFloorNumber = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorLandMark === "") {
  //       errorInForm = true;
  //       errObj.lessorLandMark = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorLocation === "") {
  //       errorInForm = true;
  //       errObj.lessorLocation = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorWardNo === "") {
  //       errorInForm = true;
  //       errObj.lessorWardNo = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorCity === "") {
  //       errorInForm = true;
  //       errObj.lessorCity = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorArea === "") {
  //       errorInForm = true;
  //       errObj.lessorArea = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorDistrict === "") {
  //       errorInForm = true;
  //       errObj.lessorDistrict = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorStreet === "") {
  //       errorInForm = true;
  //       errObj.lessorStreet = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorTaluka === "") {
  //       errorInForm = true;
  //       errObj.lessorTaluka = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorWardNo === "") {
  //       errorInForm = true;
  //       errObj.lessorWardNo = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorPinCode === "") {
  //       errorInForm = true;
  //       errObj.lessorPinCode = "*This field is required";
  //     }
  //     if (editAllContractDetails.lessorState === "") {
  //       errorInForm = true;
  //       errObj.lessorState = "*This field is required";
  //     }
  //     if (editAllContractDetails.branchName === "") {
  //       errorInForm = true;
  //       errObj.branchName = "*This field is required";
  //     }
  //     if (editAllContractDetails.branchName === "") {
  //       errorInForm = true;
  //       errObj.branchName = "*This field is required";
  //     }
  //     if (editAllContractDetails.branchType === "") {
  //       errorInForm = true;
  //       errObj.branchType = "*This field is required";
  //     }
  //     if (editAllContractDetails.areaName === "") {
  //       errorInForm = true;
  //       errObj.areaName = "*This field is required";
  //     }
  //     if (editAllContractDetails.regionName === "") {
  //       errorInForm = true;
  //       errObj.regionName = "*This field is required";
  //     }
  //     if (editAllContractDetails.zone === "") {
  //       errorInForm = true;
  //       errObj.zone = "*This field is required";
  //     }
  //     if (editAllContractDetails.state === "") {
  //       errorInForm = true;
  //       errObj.state = "*This field is required";
  //     }
  //     if (editAllContractDetails.approverRenewal === "") {
  //       errorInForm = true;
  //       errObj.approverRenewal = "*This field is required";
  //     }
  //     if (editAllContractDetails.approverRelocation === "") {
  //       errorInForm = true;
  //       errObj.approverRelocation = "*This field is required";
  //     }
  //     if (editAllContractDetails.enitityDetails === "") {
  //       errorInForm = true;
  //       errObj.enitityDetails = "*This field is required";
  //     }
  //     if (editAllContractDetails.agreementSignDate === "") {
  //       errorInForm = true;
  //       errObj.agreementSignDate = "*This field is required";
  //     }
  //     if (editAllContractDetails.tenurePeriod === "") {
  //       errorInForm = true;
  //       errObj.tenurePeriod = "*This field is required";
  //     }
  //     if (editAllContractDetails.agreementStartDate === "") {
  //       errorInForm = true;
  //       errObj.agreementStartDate = "*This field is required";
  //     }
  //     if (editAllContractDetails.agreementEndDate === "") {
  //       errorInForm = true;
  //       errObj.agreementEndDate = "*This field is required";
  //     }
  //     if (editAllContractDetails.rentStartDate === "") {
  //       errorInForm = true;
  //       errObj.rentStartDate = "*This field is required";
  //     }
  //     if (editAllContractDetails.rentEndDate === "") {
  //       errorInForm = true;
  //       errObj.rentEndDate = "*This field is required";
  //     }
  //     // if (editAllContractDetails.refreshStartDate === "") {
  //     //   errorInForm = true;
  //     //   errObj.refreshStartDate = "*This field is required";
  //     // }
  //     // if (editAllContractDetails.refreshEndDate === "") {
  //     //   errorInForm = true;
  //     //   errObj.refreshEndDate = "*This field is required";
  //     // }
  //     if (editAllContractDetails.maintainenceCharges === "") {
  //       errorInForm = true;
  //       errObj.maintainenceCharges = "*This field is required";
  //     }
  //     if (editAllContractDetails.electricityCharges === "") {
  //       errorInForm = true;
  //       errObj.electricityCharges = "*This field is required";
  //     }
  //     if (editAllContractDetails.waterCharges === "") {
  //       errorInForm = true;
  //       errObj.waterCharges = "*This field is required";
  //     }
  //     if (editAllContractDetails.documentType === "") {
  //       errorInForm = true;
  //       errObj.documentType = "*This field is required";
  //     }
  //     if (editAllContractDetails.paymentDate === "") {
  //       errorInForm = true;
  //       errObj.paymentDate = "*This field is required";
  //     }
  //     if (editAllContractDetails.agreementpaymentMode === "") {
  //       errorInForm = true;
  //       errObj.agreementpaymentMode = "*This field is required";
  //     }
  //     if (editAllContractDetails.securityDepositAmount === "") {
  //       errorInForm = true;
  //       errObj.securityDepositAmount = "*This field is required";
  //     }
  //     if (editAllContractDetails.monthlyRent === "") {
  //       errorInForm = true;
  //       errObj.monthlyRent = "*This field is required";
  //     }
  //     if (editAllContractDetails.firstMonthValue === "") {
  //       errorInForm = true;
  //       errObj.firstMonthValue = "*This field is required";
  //     }
  //     if (editAllContractDetails.lastMonthValue === "") {
  //       errorInForm = true;
  //       errObj.lastMonthValue = "*This field is required";
  //     }
  //     if (editAllContractDetails.utrDetails === "") {
  //       errorInForm = true;
  //       errObj.utrDetails = "*This field is required";
  //     }
  //     if (editAllContractDetails.lockinPeriod === "") {
  //       errorInForm = true;
  //       errObj.lockinPeriod = "*This field is required";
  //     }
  //     if (editAllContractDetails.exitterms === "") {
  //       errorInForm = true;
  //       errObj.exitterms = "*This field is required";
  //     }
  //     if (editAllContractDetails.noticePeriod === "") {
  //       errorInForm = true;
  //       errObj.noticePeriod = "*This field is required";
  //     }
  //     if (editAllContractDetails.rentAmount === "") {
  //       errorInForm = true;
  //       errObj.rentAmount = "*This field is required";
  //     }
  //     if (editAllContractDetails.escalation === "") {
  //       errorInForm = true;
  //       errObj.escalation = "*This field is required";
  //     }
  //     if (editAllContractDetails.renewalTenure === "") {
  //       errorInForm = true;
  //       errObj.renewalTenure = "*This field is required";
  //     }
  //     if (editAllContractDetails.longitude === "") {
  //       errorInForm = true;
  //       errObj.longitude = "*This field is required";
  //     }
  //     if (editAllContractDetails.lattitude === "") {
  //       errorInForm = true;
  //       errObj.lattitude = "*This field is required";
  //     }
  //     if (editAllContractDetails.coordinates === "") {
  //       errorInForm = true;
  //       errObj.coordinates = "*This field is required";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails.lessorName) &&
  //       editAllContractDetails.lessorName !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorName = "*Invalid Lessor Name";
  //     }
  //     if (
  //       !mobileRegex.test(editAllContractDetails &&editAllContractDetails?.lessorContactNumber) &&
  //       editAllContractDetails.lessorContactNumber !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorContactNumber = "*Invalid Number";
  //     }
  //     if (
  //       !emailRegex.test(editAllContractDetails &&editAllContractDetails?.lessorEmailAddress) &&
  //       editAllContractDetails.lessorEmailAddress !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorEmailAddress = "*Invalid Email";
  //     }
  //     if (
  //       !panCardRegex.test(editAllContractDetails &&editAllContractDetails?.lessorPanNumber) &&
  //       editAllContractDetails.lessorPanNumber !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorPanNumber = "*Invalid Pan Number";
  //     }
  //     if (
  //       !gstRegex.test(editAllContractDetails &&editAllContractDetails?.lessorGstNumber) &&
  //       editAllContractDetails.lessorGstNumber !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorGstNumber = "*Invalid GST Number";
  //     }
  //     // if (
  //     //   !nameWithSpaces.test(editAllContractDetails &&editAllContractDetails?.lessorTdsNumber) &&
  //     //   editAllContractDetails.lessorTdsNumber !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.lessorTdsNumber = "*Invalid TDS Number";
  //     // }
  //     // if (
  //     //   !nameWithSpaces.test(editAllContractDetails &&editAllContractDetails?.paymentMode) &&
  //     //   editAllContractDetails.paymentMode !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.paymentMode = "*Invalid Payment Mode";
  //     // }
  //     // if (
  //     //   !numbersRegex.test(editAllContractDetails?.lessorElectricityBillNumber) &&
  //     //   editAllContractDetails.lessorElectricityBillNumber !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.lessorElectricityBillNumber = "*Invalid Electricity Bill Number";
  //     // }
  //     // if (
  //     //   !numbersRegex.test(editAllContractDetails?.lessorTaxNumber) &&
  //     //   editAllContractDetails.lessorTaxNumber !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.lessorTaxNumber = "*Invalid Tax Number";
  //     // }
  //     // if (
  //     //   !numbersRegex.test(editAllContractDetails?.lessorBankPassBookNumber) &&
  //     //   editAllContractDetails.lessorBankPassBookNumber !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.lessorBankPassBookNumber = "*Invalid BankPassbook Number";
  //     // }
  //     // if (
  //     //   !numbersRegex.test(editAllContractDetails?.lessorCheuque) &&
  //     //   editAllContractDetails.lessorCheuque !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.lessorCheuque = "*Invalid Cheuque";
  //     // }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorRecipiantsName) &&
  //       editAllContractDetails.lessorRecipiantsName !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorRecipiantsName = "*Invalid recipiantName";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorBankName) &&
  //       editAllContractDetails.lessorBankName !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorBankName = "*Invalid Bank name";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorBranchName) &&
  //       editAllContractDetails.lessorBranchName !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorBranchName = "*Invalid Branch Name";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorAccountNumber) &&
  //       editAllContractDetails.lessorAccountNumber !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorAccountNumber = "*Invalid Account Number";
  //     }
  //     if (
  //       !nameWithSpacesAndNumbers.test(
  //         editAllContractDetails?.lessorIfscNumber
  //       ) &&
  //       editAllContractDetails.lessorIfscNumber !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorIfscNumber = "*Invalid IFSC Code";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.lessorDoorNumber) &&
  //       editAllContractDetails.lessorDoorNumber !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorDoorNumber = "*Invalid Door Number";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.lessorFloorNumber) &&
  //       editAllContractDetails.lessorFloorNumber !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorFloorNumber = "*Invalid Floor Number";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorLandMark) &&
  //       editAllContractDetails.lessorLandMark !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorLandMark = "*Invalid LandMark";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorStreet) &&
  //       editAllContractDetails.lessorStreet !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorStreet = "*Invalid Street Name";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.lessorWardNo) &&
  //       editAllContractDetails.lessorWardNo !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorWardNo = "*Invalid Ward Number";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorArea) &&
  //       editAllContractDetails.lessorArea !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorArea = "*Invalid Area Name";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorCity) &&
  //       editAllContractDetails.lessorCity !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorCity = "*Invalid City name";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorLocation) &&
  //       editAllContractDetails.lessorLocation !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorLocation = "*Invalid Location";
  //     }
  //     if (
  //       !pincodeRegex.test(editAllContractDetails?.lessorPinCode) &&
  //       editAllContractDetails.lessorPinCode !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorPinCode = "*Invalid Pincode";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorTaluka) &&
  //       editAllContractDetails.lessorTaluka !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorTaluka = "*Invalid Taluk Name";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorDistrict) &&
  //       editAllContractDetails.lessorDistrict !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorDistrict = "*Invalid District Name";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lessorState) &&
  //       editAllContractDetails.lessorState !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lessorState = "*Invalid State";
  //     }

  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lesseebranchName) &&
  //       editAllContractDetails.lesseebranchName !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lesseebranchName = "*Invalid Branch name";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lesseeAreaName) &&
  //       editAllContractDetails.lesseeAreaName !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lesseeAreaName = "*Invalid Area name";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.regionName) &&
  //       editAllContractDetails.regionName !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.regionName = "*Invalid Region name";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lesseeZone) &&
  //       editAllContractDetails.lesseeZone !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lesseeZone = "*Invalid Zone name";
  //     }
  //     // if (
  //     //   !nameWithSpaces.test(editAllContractDetails?.approverRenewal) &&
  //     //   editAllContractDetails.approverRenewal !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.approverRenewal = "*Invalid Renewala name";
  //     // }
  //     // if (
  //     //   !nameWithSpaces.test(editAllContractDetails?.approverRelocation) &&
  //     //   editAllContractDetails.approverRelocation !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.approverRelocation = "*Invalid Relocations name";
  //     // }
  //     // if (
  //     //   !nameWithSpaces.test(editAllContractDetails?.enitityDetails) &&
  //     //   editAllContractDetails.enitityDetails !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.enitityDetails = "*Invalid Entity name";
  //     // }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.tenurePeriod) &&
  //       editAllContractDetails.tenurePeriod !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.tenurePeriod = "*Invalid Tenure";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.maintainenceCharges) &&
  //       editAllContractDetails.maintainenceCharges !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.maintainenceCharges = "*Invalid Maintainence Charges";
  //     }

  //     if (
  //       !numbersRegex.test(editAllContractDetails?.waterCharges) &&
  //       editAllContractDetails.waterCharges !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.waterCharges = "*Invalid Water Charges";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.electricityCharges) &&
  //       editAllContractDetails.electricityCharges !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.electricityCharges = "*Invalid Electricity Charges";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.securityDepositAmount) &&
  //       editAllContractDetails.securityDepositAmount !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.securityDepositAmount = "*Invalid SD Amount";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.monthlyRent) &&
  //       editAllContractDetails.monthlyRent !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.monthlyRent = "*Invalid Monthly Rent";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.firstMonthValue) &&
  //       editAllContractDetails.firstMonthValue !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.firstMonthValue = "*Invalid FirstMonth Value";
  //     }
  //     if (
  //       !nameWithSpaces.test(editAllContractDetails?.lastMonthValue) &&
  //       editAllContractDetails.lastMonthValue !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lastMonthValue = "*Invalid Last Month Value";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.utrDetails) &&
  //       editAllContractDetails.utrDetails !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.utrDetails = "*Invalid UTR Details";
  //     }
  //     // if (
  //     //   !numbersRegex.test(editAllContractDetails?.lockinPeriod) &&
  //     //   editAllContractDetails.lockinPeriod !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.lockinPeriod = "*Invalid Lockin Period";
  //     // }
  //     // if (
  //     //   !nameWithSpaces.test(editAllContractDetails?.noticePeriod) &&
  //     //   editAllContractDetails.noticePeriod !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.noticePeriod = "*Invalid Notice Period";
  //     // }
  //     // if (
  //     //   !nameWithSpaces.test(editAllContractDetails?.exitterms) &&
  //     //   editAllContractDetails.exitterms !== ""
  //     // ) {
  //     //   errorInForm = true;
  //     //   errObj.exitterms = "*Invalid exit terms";
  //     // }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.rentAmount) &&
  //       editAllContractDetails.rentAmount !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.rentAmount = "*Invalid Rent Amount";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.escalation) &&
  //       editAllContractDetails.escalation !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.escalation = "*Invalid Escalation";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.renewalTenure) &&
  //       editAllContractDetails.renewalTenure !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.renewalTenure = "*Invalid Renewal Tenure ";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.lattitude) &&
  //       editAllContractDetails.lattitude !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.lattitude = "*Invalid Lattitude Value";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.longitude) &&
  //       editAllContractDetails.longitude !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.longitude = "*Invalid Longitude Value";
  //     }
  //     if (
  //       !numbersRegex.test(editAllContractDetails?.coordinates) &&
  //       editAllContractDetails.coordinates !== ""
  //     ) {
  //       errorInForm = true;
  //       errObj.coordinates = "*Invalid Co-ordinates";
  //     }
  //     setEditAllContractDetailsErr({ ...errObj });
  //     return errorInForm;
  //   };

  const handleSaveData = (stepData) => {
    // Update the state for the current step
    switch (activeStep) {
      case 0:
        setStepData1(stepData);
        break;
      case 1:
        setStepData2(stepData);
        break;
      case 2:
        setStepData3(stepData);
        break;
      case 3:
        setStepData4(stepData);
        break;
      case 4:
        setStepData5(stepData);
        break;
      case 5:
        setStepData6(stepData);
        break;
      default:
        break;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // useEffect(() => {
  //   setEditAllContractDetails(props.editLessorData);
  // }, [props.editLessorData]);

  // useEffect(() => {
  //   setEditAllContractDetails(props.editLessorData);
  // }, [props.editLessorData]);

  // const getEditDetails = async () => {
  //   const { data } = await getAllRentContractDetails();
  //   console.log(data?.data, "dtaa");
  //   if (data) {
  //     if (data) {
  //       const sendData = data?.data;
  //       setEditAllContractDetails({
  //         ...sendData,
  //       });
  //     }
  //   }
  // };

  console.log(props.editLessorData, "props.editLessorData");
  useEffect(() => {
    // getEditDetails(props.editLessorData);
    setEditAllContractDetails({
      uniqueID: props?.EditLessorData?.uniqueID,
      branchID: props?.EditLessorData?.branchID,
      lessorName: props?.EditLessorData?.lessorName,
      lessorContactNumber: props?.EditLessorData?.lessorContactNumber,
      lessorEmailAddress: props?.EditLessorData?.lessorEmailAddress,
      lessorPanNumber: props?.EditLessorData?.lessorPanNumber,
      lessorGstNumber: props?.EditLessorData?.lessorGstNumber,
      lessorTdsNumber: props?.EditLessorData?.lessorTdsNumber,
      paymentMode: props?.EditLessorData?.paymentMode,
      recipiants: [
        {
          lessorRecipiantsName: props?.EditLessorData?.lessorRecipiantsName,
          lessorBankName: props?.EditLessorData?.lessorBankName,
          lessorBranchName: props?.EditLessorData?.lessorBranchName,
          lessorIfscNumber: props?.EditLessorData?.lessorIfscNumber,
          lessorAccountNumber: props?.EditLessorData?.lessorAccountNumber,
        },
      ],
      // lessorElectricityBillNumber:
      //   props?.EditLessorData?.lessorElectricityBillNumber,
      // lessorTaxNumber: props?.EditLessorData?.lessorTaxNumber,
      // lessorBankPassBookNumber: props?.EditLessorData?.lessorBankPassBookNumber,
      // lessorCheuque: props?.EditLessorData?.lessorCheuque,
      // lessorDoorNumber: props?.EditLessorData?.lessorDoorNumber,
      // lessorFloorNumber: props?.EditLessorData?.lessorFloorNumber,
      // lessorWardNo: props?.EditLessorData?.lessorWardNo,
      // lessorLandMark: props?.EditLessorData?.lessorLandMark,
      // lessorStreet: props?.EditLessorData?.lessorStreet,
      // lessorArea: props?.EditLessorData?.lessorArea,
      // lessorCity: props?.EditLessorData?.lessorCity,
      // lessorLocation: props?.EditLessorData?.lessorLocation,
      // lessorPinCode: props?.EditLessorData?.lessorPinCode,
      // lessorTaluka: props?.EditLessorData?.lessorTaluka,
      // lessorDistrict: props?.EditLessorData?.lessorDistrict,
      // lessorState: props?.EditLessorData?.lessorState,

      // lesseebranchName: props?.EditLessorData?.lesseeBranchName,
      // lessseeAreaName: props?.EditLessorData?.lesseeAreaName,
      // regionName: props?.EditLessorData?.lesseeDivision,
      // lesseeZone: props?.EditLessorData?.lesseeZone,
      // lesseeState: props?.EditLessorData?.lesseeState,
      // lesseeBranchType: props?.EditLessorData?.lesseeBranchType,
      // approverRenewal: props?.EditLessorData?.lesseeApproverrenewals,
      // approverRelocation: props?.EditLessorData?.lesseeApproverRelocation,
      // enitityDetails: props?.EditLessorData?.lesseeEntityDetails,

      // location: props?.EditLessorData?.premesisLocation,
      // branchName: props?.EditLessorData?.premesisBranchName,
      // areaName: props?.EditLessorData?.premesisAreaName,
      // division: props?.EditLessorData?.premesisDivision,
      // zone: props?.EditLessorData?.premesisZone,
      // state: props?.EditLessorData?.premesisState,
      // buildingType: props?.EditLessorData?.premesisBuildingType,
      // doorNo: props?.EditLessorData?.premesisDoorNumber,
      // floorNo: props?.EditLessorData?.premesisFloorNumber,
      // landMark: props?.EditLessorData?.premesisLandMark,
      // roadName: props?.EditLessorData?.premesisStreet,
      // wardName: props?.EditLessorData?.premesisWardNo,
      // city: props?.EditLessorData?.premesisCity,
      // pincode: props?.EditLessorData?.premesisPinCode,
      // taluk: props?.EditLessorData?.premesisTaluka,
      // district: props?.EditLessorData?.premesisDistrict,

      // agreementSignDate: moment(
      //   new Date(props?.EditLessorData?.agreementSignDate)
      // ).format("YYYY-MM-DD"),
      // agreementSignDate: props?.EditLessorData?.agreementSignDate,
      // tenurePeriod: props?.EditLessorData?.agreementTenure,
      // activationStatus: props?.EditLessorData?.agreementActivationStatus,
      // agreementStartDate: props?.EditLessorData?.agreementStartDate,
      // agreementEndDate: props?.EditLessorData?.agreementEndDate,
      // rentStarttDate: props?.EditLessorData?.rentStartDate,
      // rentEndDate: props?.EditLessorData?.rentEndDate,
      // refreshStartDate: props?.EditLessorData?.agreementRefreshStartDate,
      // refreshEndDate: props?.EditLessorData?.agreementRefreshEndDate,
      // maintainenceCharges: props?.EditLessorData?.maintaineneCharge,
      // waterCharges: props?.EditLessorData?.waterCharge,
      // electricityCharges: props?.EditLessorData?.electricity,
      // documentType: props?.EditLessorData?.documentType,
      // paymentDate: props?.EditLessorData?.securityDepositPaymentDate,
      // agreementpaymentMode: props?.EditLessorData?.securityDepositPaymentMode,
      // securityDepositAmount: props?.EditLessorData?.securityDepositAmount,
      // monthlyRent: props?.EditLessorData?.securityDepositUtr,
      // firstMonthValue: props?.EditLessorData?.firstMonthvalue,
      // lastMonthValue: props?.EditLessorData?.lastMonthvalue,
      // utrDetails: props?.EditLessorData?.securityDepositUtr,
      // lockinPeriod: props?.EditLessorData?.securityDepositLockinPeriod,
      // noticePeriod: props?.EditLessorData?.securityDepositnoticePeriod,
      // exitterms: props?.EditLessorData?.securityDepositExitTerm,

      // rentAmount: props?.EditLessorData?.rentAmount,
      // escalation: props?.EditLessorData?.escalation,
      // renewalTenure: props?.EditLessorData?.renewalTenure,

      // lattitude: props?.EditLessorData?.lattitude,
      // longitude: props?.EditLessorData?.longitude,
      // coordinates: props?.EditLessorData?.gpsCoordinates,
    });
  }, [props.EditLessorData]);

  const editAllNewRentContractDetails = async () => {
    let payload = {
      uniqueID: editAllContractDetails?.uniqueID,
      branchID: editAllContractDetails?.branchID,
      lessorName: editAllContractDetails?.lessorName,
      lessorContactNumber: editAllContractDetails?.lessorContactNumber,
      lessorEmailAddress: editAllContractDetails?.lessorEmailAddress,
      lessorPanNumber: editAllContractDetails?.lessorPanNumber,
      lessorGstNumber: editAllContractDetails?.lessorGstNumber,
      lessorTdsNumber: editAllContractDetails?.lessorTdsNumber,
      paymentMode: editAllContractDetails?.paymentMode,
      recipiants: [
        {
          lessorRecipiantsName: editAllContractDetails?.lessorRecipiantsName,
          lessorBankName: editAllContractDetails?.lessorBankName,
          lessorBranchName: editAllContractDetails?.lessorBranchName,
          lessorIfscNumber: editAllContractDetails?.lessorIfscNumber,
          lessorAccountNumber: editAllContractDetails?.lessorAccountNumber,
        },
      ],
      lessorElectricityBillNumber:
        editAllContractDetails?.lessorElectricityBillNumber,
      lessorTaxNumber: editAllContractDetails?.lessorTaxNumber,
      lessorBankPassBookNumber:
        editAllContractDetails?.lessorBankPassBookNumber,
      lessorCheuque: editAllContractDetails?.lessorCheuque,
      lessorDoorNumber: editAllContractDetails?.lessorDoorNumber,
      lessorFloorNumber: editAllContractDetails?.lessorFloorNumber,
      lessorWardNo: editAllContractDetails?.lessorWardNo,
      lessorLandMark: editAllContractDetails?.lessorLandMark,
      lessorStreet: editAllContractDetails?.lessorStreet,
      lessorArea: editAllContractDetails?.lessorArea,
      lessorCity: editAllContractDetails?.lessorCity,
      lessorLocation: editAllContractDetails?.lessorLocation,
      lessorPinCode: editAllContractDetails?.lessorPinCode,
      lessorTaluka: editAllContractDetails?.lessorTaluka,
      lessorDistrict: editAllContractDetails?.lessorDistrict,
      lessorState: editAllContractDetails?.lessorState,

      lesseebranchName: editAllContractDetails?.lesseeBranchName,
      lesseeAreaName: editAllContractDetails?.lesseeAreaName,
      regionName: editAllContractDetails?.lesseeDivision,
      lesseeZone: editAllContractDetails?.lesseeZone,
      lesseeState: editAllContractDetails?.lesseeState,
      lesseeBranchType: editAllContractDetails?.lesseeBranchType,
      approverRenewal: editAllContractDetails?.lesseeApproverrenewals,
      approverRelocation: editAllContractDetails?.lesseeApproverRelocation,
      enitityDetails: editAllContractDetails?.lesseeEntityDetails,

      location: editAllContractDetails?.premesisLocation,
      branchName: editAllContractDetails?.premesisBranchName,
      areaName: editAllContractDetails?.premesisAreaName,
      division: editAllContractDetails?.premesisDivision,
      zone: editAllContractDetails?.premesisZone,
      state: editAllContractDetails?.premesisState,
      buildingType: editAllContractDetails?.premesisBuildingType,
      doorNo: editAllContractDetails?.premesisDoorNumber,
      floorNo: editAllContractDetails?.premesisFloorNumber,
      landMark: editAllContractDetails?.premesisLandMark,
      roadName: editAllContractDetails?.premesisStreet,
      wardName: editAllContractDetails?.premesisWardNo,
      city: editAllContractDetails?.premesisCity,
      pincode: editAllContractDetails?.premesisPinCode,
      taluk: editAllContractDetails?.premesisTaluka,
      district: editAllContractDetails?.premesisDistrict,

      // agreementSignDate: moment(
      //   new Date(editAllContractDetails?.agreementSignDate)
      // ).format("YYYY-MM-DD"),
      agreementSignDate: editAllContractDetails?.agreementSignDate,
      tenurePeriod: editAllContractDetails?.agreementTenure,
      activationStatus: editAllContractDetails?.agreementActivationStatus,
      agreementStartDate: editAllContractDetails?.agreementStartDate,
      agreementEndDate: editAllContractDetails?.agreementEndDate,
      rentStarttDate: editAllContractDetails?.rentStartDate,
      rentEndDate: editAllContractDetails?.rentEndDate,
      refreshStartDate: editAllContractDetails?.agreementRefreshStartDate,
      refreshEndDate: editAllContractDetails?.agreementRefreshEndDate,
      maintainenceCharges: editAllContractDetails?.maintaineneCharge,
      waterCharges: editAllContractDetails?.waterCharge,
      electricityCharges: editAllContractDetails?.electricity,
      documentType: editAllContractDetails?.documentType,
      paymentDate: editAllContractDetails?.securityDepositPaymentDate,
      agreementpaymentMode: editAllContractDetails?.securityDepositPaymentMode,
      securityDepositAmount: editAllContractDetails?.securityDepositAmount,
      monthlyRent: editAllContractDetails?.securityDepositUtr,
      firstMonthValue: editAllContractDetails?.firstMonthvalue,
      lastMonthValue: editAllContractDetails?.lastMonthvalue,
      utrDetails: editAllContractDetails?.securityDepositUtr,
      lockinPeriod: editAllContractDetails?.securityDepositLockinPeriod,
      noticePeriod: editAllContractDetails?.securityDepositnoticePeriod,
      exitterms: editAllContractDetails?.securityDepositExitTerm,

      rentAmount: editAllContractDetails?.rentAmount,
      escalation: editAllContractDetails?.escalation,
      renewalTenure: editAllContractDetails?.renewalTenure,

      lattitude: editAllContractDetails?.lattitude,
      longitude: editAllContractDetails?.longitude,
      coordinates: editAllContractDetails?.gpsCoordinates,
    };
    const { data } = await EditRentContractDetails(payload);
    // console.log(data, "EditData");
    if (data?.data) {
      setEditAllContractDetails(data?.data);
      props.getContractDetails();
    }
    // }
  };

  const steps = [
    {
      label: (
        <Button onClick={handleClick} sx={{ fontSize: 12 }}>
          Lessor Information
        </Button>
      ),
      content: (
        <EditGeneralInformation
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSave={handleSaveData}
          editAllContractDetails={editAllContractDetails}
          setEditAllContractDetails={setEditAllContractDetails}
          editAllContractDetailsErr={editAllContractDetailsErr}
          //   handleAddRentContractInformationError={
          //     handleAddRentContractInformationError
          //   }
        />
      ),
    },
    {
      label: (
        <Button onClick={handleClick} sx={{ fontSize: 12 }}>
          Lessee Information
        </Button>
      ),
      content: (
        <EditLesseeInformation
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSave={handleSaveData}
          editAllContractDetailsErr={editAllContractDetailsErr}
          editAllContractDetails={editAllContractDetails}
          setEditAllContractDetails={setEditAllContractDetails}

          //   handleAddRentContractInformationError={
          //     handleAddRentContractInformationError
          //   }
        />
      ),
    },
    {
      label: (
        <Button onClick={handleClick} sx={{ fontSize: 12 }}>
          Premises Information
        </Button>
      ),
      content: (
        <EditPremesisInformation
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSave={handleSaveData}
          editAllContractDetailsErr={editAllContractDetailsErr}
          editAllContractDetails={editAllContractDetails}
          setEditAllContractDetails={setEditAllContractDetails}
          //   handleAddRentContractInformationError={
          //     handleAddRentContractInformationError
          //   }
        />
      ),
    },
    {
      label: (
        <Button onClick={handleClick} sx={{ fontSize: 12 }}>
          Agreement Information
        </Button>
      ),
      content: (
        <EditAgreementInformation
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSave={handleSaveData}
          editAllContractDetailsErr={editAllContractDetailsErr}
          editAllContractDetails={editAllContractDetails}
          setEditAllContractDetails={setEditAllContractDetails}

          //   handleAddRentContractInformationError={
          //     handleAddRentContractInformationError
          //   }
        />
      ),
    },
    {
      label: (
        <Button onClick={handleClick} sx={{ fontSize: 12 }}>
          Rent Terms Information
        </Button>
      ),
      content: (
        <EditRentTermsDetails
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSave={handleSaveData}
          editAllContractDetailsErr={editAllContractDetailsErr}
          editAllContractDetails={editAllContractDetails}
          setEditAllContractDetails={setEditAllContractDetails}

          //   handleAddRentContractInformationError={
          //     handleAddRentContractInformationError
          //   }
        />
      ),
    },
    {
      label: (
        <Button onClick={handleClick} sx={{ fontSize: 12 }}>
          GPS Co-ordinate Information
        </Button>
      ),
      content: (
        <EditGPSInformations
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSave={handleSaveData}
          close={props.close}
          editAllContractDetailsErr={editAllContractDetailsErr}
          editAllContractDetails={editAllContractDetails}
          setEditAllContractDetails={setEditAllContractDetails}
          editAllNewRentContractDetails={editAllNewRentContractDetails}

          //   handleAddRentContractInformationError={
          //     handleAddRentContractInformationError
          //   }
        />
      ),
    },
    // Add more steps as needed
  ];

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
          <Modal.Title id="contained-modal-title-vcenter">
            Edit New Rent Contract Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            className="px-4 h-100 w-100 px-0 py-2"
            sx={{ position: "sticky" }}
          >
            <Box
              className="w-20 h-100 rounded d-flex px-0 py-0"
              sx={{ border: "1px solid #70B3D1" }}
            >
              <Box
                className="w-30 h-100 py-0 px-"
                sx={{
                  borderRight: "1px solid #70B3D1",
                }}
              >
                <StepperComponent
                  steps={steps}
                  setStep={setActiveStep}
                  activeStep={activeStep}
                  onStepperClick={(ind) => {
                    setActiveStep(ind);
                  }}
                />
              </Box>
              <Box className="w-100 d-flex flex-column ">
                <Box sx={{ height: "100%" }}>{steps[activeStep]?.content}</Box>
              </Box>
            </Box>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close} variant="contained">
            Close
          </Button>
          {/* <Box>
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
              onClick={() => handleSaveData(null)}
              variant="contained"
              sx={{ m: 1, background: "#238520" }}
            >
              {activeStep === 5 ? "Finish" : "Next"}
            </Button>
          </Box> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditMasterDetails;

//overflowY: "scroll"
