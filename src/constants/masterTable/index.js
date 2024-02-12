import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import { green, red } from "@mui/material/colors";

const columns = [
  {
    id: "uniqueID",
    label: "ID.",
    // minWidth: 70,
    align: "center",
    // backgroundColor: red[900],
  },
  { id: "lesseeBranchType", label: "Type", minWidth: 70, align: "center" },
  {
    id: "agreementActivationStatus",
    label: "Activation Status",
    // minWidth:120,
    align: "center",
  },
  { id: "branchID", label: "Offical ID", align: "center" },
  {
    id: "lesseeBranchName",
    label: "Office Name",
    minWidth: 70,
    align: "center",
  },
  { id: "premesisDistrict", label: "District", minWidth: 70, align: "center" },
  { id: "lesseeDivision", label: "RO Name", minWidth: 70, align: "center" },
  { id: "lesseeState", label: "State", minWidth: 70, align: "center" },
  { id: "lessorName", label: "Lesssor Name", minWidth: 70, align: "center" },
  {
    id: "lessorContactNumber",
    label: "Contact No.",
    minWidth: 70,
    align: "center",
  },

  {
    id: "rentStartDate",
    label: "Rent Start Date",
    minWidth: 70,
    align: "center",
  },
  {
    id: "rentEndDate",
    label: "Rent End Date",
    minWidth: 70,
    align: "center",
  },

  {
    id: "securityDepositAmount",
    label: "Security Deposit (Rs.)",
    minWidth: 70,
    align: "center",
  },
  {
    id: "lessorRentAmount",
    label: "Monthly Rent (Rs.)",
    minWidth: 70,
    align: "center",
  },
  // { id: "col23", label: "TDS(%)", minWidth: 70, align: "center" },

  {
    id: "edit",
    label: "",
    minWidth: 10,
    icon: null,
    actions: ["edit"],
    align: "center",
    display: "flex",
    flexDirection: "row",
    modalIcon: "",
  },
  // {
  //   id: "viewBank",
  //   label: "",
  //   minWidth: -10,

  //   icon: null,
  //   actions: ["viewBank"],
  //   align: "center",
  //   display: "flex",
  //   flexDirection: "row",
  //   modalIcon: "",
  // },
  // {
  //   id: "viewBranch",
  //   label: "Actions",
  //   minWidth: -10,
  //   align: "center",
  //   icon: null,
  //   actions: ["viewBranch"],
  // },
  // {
  //   id: "viewAgreement",
  //   label: "",
  //   minWidth: -10,
  //   align: "center",
  //   icon: null,
  //   actions: ["viewAgreement"],
  // },
  {
    id: "viewUploadedAgreement",
    label: "",
    minWidth: 70,
    align: "center",
    icon: null,
    actions: ["viewUploadedAgreement"],
  },
];
export { columns };
