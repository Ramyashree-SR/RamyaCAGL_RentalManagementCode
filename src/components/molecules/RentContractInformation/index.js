import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { blue, deepOrange, pink } from "@mui/material/colors";
import HandshakeIcon from "@mui/icons-material/Handshake";
import GavelIcon from "@mui/icons-material/Gavel";
import ViewDetailsModal from "../../pages/RentalProcessDetails/RentalDetails/ViewDetailsModal";
import BranchDetailsModal from "../../pages/RentalProcessDetails/RentalDetails/BranchDetailsModal";
import CustomModal from "../../pages/RentalProcessDetails/RentalDetails/CustomModal";

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[300]),
  color: pink[900],
  // color:yellow[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));

const RentContractInformation = ({
  handleBranch = () => {},
  handleBank = () => {},
  handleAgreement = () => {},
  modalOpen,
  handleModalClose,
  selectedItem,
  customInputModalOpen,
  handleCustomInputModalClose,
  branchModal,
  setBranchModal,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Rent Contract Details">
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
              <GavelIcon size="small" />
            </ColorIcon>
            <Typography sx={{ fontSize: 9, fontWeight: 800, color: pink[900] }}>
              Contract <br />
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
          onClick={handleBank}
          sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
        >
          <AccountBalanceWalletIcon size="small" sx={{ color: blue[900] }} />
          &nbsp;Bank Information
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleBranch();
            // getAllRentDueDetailsByUniqueID(uniqueID);
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
        >
          <ApartmentIcon fontSize="small" sx={{ color: blue[900] }} />
          &nbsp; Branch Information
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleAgreement();
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: blue[900] }}
        >
          <HandshakeIcon fontSize="small" sx={{ color: blue[900] }} />
          &nbsp; Agreement Information
        </MenuItem>
      </Menu>
      <ViewDetailsModal
        show={modalOpen}
        close={handleModalClose}
        selectedItem={selectedItem}
      />

      <BranchDetailsModal
        show={branchModal}
        close={() => setBranchModal(false)}
        selectedItem={selectedItem}
      />

      <CustomModal
        show={customInputModalOpen}
        close={handleCustomInputModalClose}
        selectedItem={selectedItem}
      />
    </React.Fragment>
  );
};

export default RentContractInformation;
