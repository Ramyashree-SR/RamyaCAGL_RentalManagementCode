import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/styles";
import { Alert, Button, Icon, Snackbar, TextField } from "@mui/material";
import { blue, deepOrange, green, pink, red } from "@mui/material/colors";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PanToolIcon from "@mui/icons-material/PanTool";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useState } from "react";
import { useEffect } from "react";
import { getRentDueDetails } from "../../services/RentDueApi";
import RentDueDetails from "../../pages/RentalProcessDetails/RentalDetails/RentDueDetails";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LockClockIcon from "@mui/icons-material/LockClock";
import LockIcon from "@mui/icons-material/Lock";
import { AddRentProvisionDetails } from "../../services/ProvisionsApi";
import PaymentReportDetails from "../../pages/RentalProcessDetails/RentalDetails/PaymentReportDetails";

import ReceiptIcon from "@mui/icons-material/Receipt";

import ProvisionsDetails from "../../pages/RentalProcessDetails/RentalDetails/ProvisionsDetails";
import { useToasts } from "react-toast-notifications";
import CloseIcon from "@mui/icons-material/Close";
import EditMasterDetails from "../../pages/EditMasterDetails";

import AdjustIcon from "@mui/icons-material/Adjust";
import SdAdjustmentModal from "../../pages/RentalProcessDetails/RentalDetails/SdAdjustmentModal";

const ColorIcon = styled(Icon)(({ theme }) => ({
  //   color: theme.palette?.getContrastText(pink[900]),
  color: pink[900],
  "&:hover": {
    color: deepOrange[700],
  },
}));
export default function MenuComponent({
  handleEdit = () => {},
  handleEditProvisions = () => {},
  handleRentDue = () => {},
  handleEditReport = () => {},
  handleSDReport = () => {},
  openRentDueModal,
  setOpenRentDueModal,
  uniqueID,
  branchIDData,
  rentContractDetails,
  rentStartDate,
  rentEndDate,
  agreementTenure,
  openProvisionsListModal,
  setOpenProvisionsListModal,
  monthlyRent,
  lessorName,
  activationStatusFilter,
  lesseeBranchName,
  openPaymentReportData,
  setOpenPaymentReportData,
  activationStatusFilterDue,
  getContractDetails,
  editAllNewContractData,
  openEditLessorModal,
  setOpenEditLessorModal,
  setOpenSdReportModal,
  openSdReportModal,
}) {
  const { addToast } = useToasts();
  const [fullscreen, setFullscreen] = useState(true);
  const [rentDueDetails, setRentDueDetails] = useState([]);
  const [addProvisions, setAddProvisions] = useState({
    provisionID: "",
    provisiontype: "",
    contractID: "",
    branchID: "",
    year: "",
    month: "",
    provisionAmount: "",
    remark: "",
    dateTime: "",
  });
  const [selectedValue, setSelectedValue] = useState("Paid");
  const [typeProvisionsData, setTypeProvisionsData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Clear existing data
      setTypeProvisionsData(null);
      setAddProvisions([]);
      setRentDueDetails([]);
      handleClose();
      // Fetch new data based on the new month and year
      getAllRentDueDetailsByUniqueID();
    }
  }, [refreshKey]);

  useEffect(() => {
    getAllRentDueDetailsByUniqueID();
  }, [uniqueID]);

  const getAllRentDueDetailsByUniqueID = async () => {
    const { data } = await getRentDueDetails(uniqueID);
    if (data) {
      if (data) {
        let getData = data?.data;
        setRentDueDetails(getData);
      }
    }
  };

  const AddProvisionFortheMonth = async () => {
    let payload = {
      provisiontype: typeProvisionsData,
      contractID: uniqueID,
      branchID: branchIDData,
      year: addProvisions?.year?.label,
      month: addProvisions?.month?.label,
      provisionAmount: addProvisions?.provisionAmount,
      remark: addProvisions?.remark,
      dateTime: addProvisions.dateTime,
      paymentFlag: selectedValue
    };
    const { data, errRes } = await AddRentProvisionDetails(
      typeProvisionsData,
      payload
    );
    if (data) {
      setAddProvisions({
        provisionID: "",
        provisiontype: "",
        branchID: "",
        contractID: "",
        year: "",
        month: "",
        provisionAmount: "",
        remark: "",
        dateTime: "",
      });
      setOpenProvisionsListModal(false);
      if (typeProvisionsData === "Make") {
        addToast("Provision Successfully Made......", {
          appearance: "success",
        });
      } else if (typeProvisionsData === "Reverse") {
        addToast("Provision Successfully Reversed.......", {
          appearance: "success",
        });
      }
      // setRefreshKey((prevKey) => prevKey + 1);
    } else if (!data?.error) {
      if (typeProvisionsData === "Make") {
        // addToast(errRes?.msg, { appearance: "error" });
        addToast(<pre>{JSON.stringify(errRes, null, 4)}</pre>, {
          appearance: "error",
          autoClose: 9000,
        });
        setOpenProvisionsListModal(false);
      } else if (typeProvisionsData === "Reverse") {
        addToast(<pre>{JSON.stringify(errRes, null, 4)}</pre>, {
          appearance: "error",
          autoClose: 9000,
        });
        setOpenProvisionsListModal(false);
      }
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Contract Info">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0, display: "flex", flexDirection: "column" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ColorIcon
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <EditIcon size="small" />
            </ColorIcon>
            <Typography sx={{ fontSize: 9, fontWeight: 800, color: pink[900] }}>
              Edit <br />
              Details
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            background: "#CFE8F7",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              mr: 2,
              background: "#CFE8F7",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 1,
              left: 10,
              width: 10,
              height: 11,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              background: "#CFE8F7",
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
        >
          <EditNoteIcon size="small" sx={{ color: blue[900] }} />
          &nbsp;Edit Contract
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleRentDue();
            getAllRentDueDetailsByUniqueID(uniqueID);
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
        >
          <PendingActionsIcon fontSize="small" sx={{ color: blue[900] }} />
          &nbsp; Rent Due
        </MenuItem>

        {activationStatusFilter === "Open" ? (
          <MenuItem
            onClick={() => {
              handleEditProvisions();
              setRefreshKey((prevKey) => prevKey + 1);
            }}
            sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
          >
            <LockIcon fontSize="small" sx={{ color: blue[900] }} />
            &nbsp; Provisions
          </MenuItem>
        ) : null}

        {activationStatusFilter === "Open" ? (
          <MenuItem
            onClick={() => {
              handleEditReport();
            }}
            sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
          >
            <ReceiptIcon fontSize="small" sx={{ color: blue[900] }} />
            &nbsp; Payment Report
          </MenuItem>
        ) : null}

        {activationStatusFilter === "Open" ? (
          <MenuItem
            onClick={() => {
              handleSDReport();
            }}
            sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
          >
            <AdjustIcon fontSize="small" sx={{ color: blue[900] }} />
            &nbsp; SD Ajustment
          </MenuItem>
        ) : null}
      </Menu>
      <RentDueDetails
        show={openRentDueModal}
        close={() => setOpenRentDueModal(false)}
        fullscreen={fullscreen}
        branchIDData={branchIDData}
        rentDueDetails={rentDueDetails}
        rentContractDetails={rentContractDetails}
        rentStartDate={rentStartDate}
        rentEndDate={rentEndDate}
        uniqueID={uniqueID}
        lessorName={lessorName}
        lesseeBranchName={lesseeBranchName}
        activationStatusFilterDue={activationStatusFilterDue}
        setRefreshKey={setRefreshKey}
      />
      {activationStatusFilter === "Open" && (
        <ProvisionsDetails
          show={openProvisionsListModal}
          close={() => setOpenProvisionsListModal(false)}
          fullscreen={fullscreen}
          branchIDData={branchIDData}
          rentEndDate={rentEndDate}
          rentStartDate={rentStartDate}
          agreementTenure={agreementTenure}
          addProvisions={addProvisions}
          setAddProvisions={setAddProvisions}
          AddProvisionFortheMonth={AddProvisionFortheMonth}
          monthlyRent={monthlyRent}
          uniqueID={uniqueID}
          lessorName={lessorName}
          lesseeBranchName={lesseeBranchName}
          setTypeProvisionsData={setTypeProvisionsData}
          typeProvisionsData={typeProvisionsData}
          setRefreshKey={setRefreshKey}
          refreshKey={refreshKey}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      )}

      {activationStatusFilter === "Open" && (
        <PaymentReportDetails
          show={openPaymentReportData}
          close={() => setOpenPaymentReportData(false)}
          fullscreen={fullscreen}
          uniqueID={uniqueID}
          branchIDData={branchIDData}
          rentEndDate={rentEndDate}
          rentStartDate={rentStartDate}
          lessorName={lessorName}
          lesseeBranchName={lesseeBranchName}
          monthlyRent={monthlyRent}
        />
      )}

      <EditMasterDetails
        show={openEditLessorModal}
        close={() => setOpenEditLessorModal(false)}
        openEditLessorModal={openEditLessorModal}
        getContractDetails={getContractDetails}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        uniqueID={uniqueID}
        editAllNewContractData={editAllNewContractData}
      />
      {activationStatusFilter === "Open" && (
        <SdAdjustmentModal
          show={openSdReportModal}
          close={() => setOpenSdReportModal(false)}
          openSdReportModal={openSdReportModal}
          fullscreen={fullscreen}
          uniqueID={uniqueID}
          branchIDData={branchIDData}
          rentEndDate={rentEndDate}
          rentStartDate={rentStartDate}
          lessorName={lessorName}
          lesseeBranchName={lesseeBranchName}
          monthlyRent={monthlyRent}
        />
      )}
    </React.Fragment>
  );
}
