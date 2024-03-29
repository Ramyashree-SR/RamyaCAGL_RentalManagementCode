import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Button,
  styled,
  Box,
  TablePagination,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {
  blue,
  deepOrange,
  green,
  pink,
  red,
  yellow,
} from "@mui/material/colors";
import CustomModal from "../../pages/RentalProcessDetails/RentalDetails/CustomModal";
import ViewDetailsModal from "../../pages/RentalProcessDetails/RentalDetails/ViewDetailsModal";
import EditIcon from "@mui/icons-material/Edit";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BranchDetailsModal from "../../pages/RentalProcessDetails/RentalDetails/BranchDetailsModal";
import ViewRentDocumentModal from "../RentalProcessDetails/RentalDetails/ViewRentDocumentModal";
import GavelIcon from "@mui/icons-material/Gavel";
import DropDownComponent from "../../atoms/DropDownComponent";
import MenuComponent from "../../molecules/MenuComponent";
import RentContractInformation from "../../molecules/RentContractInformation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "4px",
    paddingX: "4px",
    width: 8,
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette?.info.dark,
    color: theme.palette?.common?.white,
    fontSize: 12,
    fontWeight: 650,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: "#FFFFFF", //#CFE8F7, #C5EBF6 ,#D5F7DC
    fontFamily: "sans-serif",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette?.action?.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: deepOrange[500],
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: deepOrange[700],
  },
}));

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[300]),
  color: pink[900],
  // color:yellow[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));

const useStyles = makeStyles({
  tableHeader: {
    fontWeight: "600 !important",
    fontSize: "12px !important",
    borderBottom: "1px solid #70B3D1 !important",
    borderRight: "1px solid #70B3D1  !!!important",
    // minWidth: "10px",
    padding: "4px -1px",
  },
  tableRow: {
    border: "none !important",
    color: "#373737",
    // color:red[900],
    fontWeight: "500",
    fontSize: "12px",
    // minWidth: "10px",
  },
});

const TableComponent = ({
  data,
  columns,
  setUniqueID,
  searchText,
  activationStatusFilter,
  handleActivationStatusFilterChange,
  openProvisionsListModal,
  setOpenProvisionsListModal,
  setOpenRentDueModal,
  openRentDueModal,
  branchIDData,
  uniqueID,
  rentContractDetails,
  rentEndDate,
  rentStartDate,
  agreementTenure,
  setRentStartDate,
  setAgreementTenure,
  setRentEndDate,
  monthlyRent,
  setMonthlyRent,
  lessorName,
  setLessorName,
  setLesseeBranchName,
  lesseeBranchName,
  setOpenPaymentReportData,
  openPaymentReportData,
  activationStatusFilterDue,
  setOpenSdReportModal,
  openSdReportModal,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [branchModal, setBranchModal] = useState(false);
  const [agreementModal, setAgreementModal] = useState(false);
  const [customInputModalOpen, setCustomInputModalOpen] = useState(false);
  const [editAllNewContractData, setEditAllNewContractData] = useState({});
  const [openEditLessorModal, setOpenEditLessorModal] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleEditRow = (event, rowData) => {
  //   setModalType("edit");
  //   setOpenLessorModal(true);
  //   setOpenEditLessorModal(true);
  //   setEditLessorData(rowData);
  // };
  const handleEditRow = (event, rowData) => {
    setOpenEditLessorModal(true);
    setEditAllNewContractData(rowData);
  };

  const handleModalOpen = (rowData) => {
    setSelectedItem(rowData);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const handleCustomInputModalOpen = (rowData) => {
    setSelectedItem(rowData);
    setCustomInputModalOpen(true);
  };

  const handleCustomInputModalClose = () => {
    setCustomInputModalOpen(false);
  };

  const handleBranchModalOpen = (rowData) => {
    setSelectedItem(rowData);
    setBranchModal(true);
  };

  const changeProvisions = () => {
    setOpenProvisionsListModal(true);
  };

  const handleRentDueDetails = () => {
    setOpenRentDueModal(true);
  };
  const handleDocumentModalOpen = () => {
    setAgreementModal(true);
  };

  const handlePaymentReport = () => {
    setOpenPaymentReportData(true);
  };

  const handleSd = () => {
    setOpenSdReportModal(true);
  };
  // Apply the filter
  const filteredData =
    data &&
    data?.filter((item) => {
      if (activationStatusFilter === "All") {
        return item; // Show all rows if 'all' is selected
      }
      return item["agreementActivationStatus"] === activationStatusFilter; // Customize the filtering condition based on your data structure
    });

  const filterOptions =
    data &&
    data?.reduce((options, item) => {
      if (!options.includes(item["agreementActivationStatus"])) {
        options?.push(item["agreementActivationStatus"]);
      }
      return options;
    }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        // overflowY: "scroll",
        // overflowX: "scroll",
      }}
    >
      <TableContainer sx={{ height: "360px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell
                sx={{
                  border: "none !important",
                  color: "#FFFFFF",
                  fontWeight: "500",
                  fontSize: "10px",
                  borderRight: "1px solid #000000 !important",
                  backgroundColor: "#01579b",
                  // backgroundColor: blue[900],
                }}
              >
                Sl No.
              </StyledTableCell>
              {columns &&
                columns?.map((column) => (
                  // console.log(column,"column");
                  <StyledTableCell key={column.id}>
                    {column.label}
                    {column && column.label === "Activation Status" && (
                      <select
                        value={activationStatusFilter || "All"}
                        onChange={handleActivationStatusFilterChange}
                      >
                        {/* <option value=""></option> */}
                        <option value="All">All</option>
                        {filterOptions?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {column.icon && (
                      <IconButton size="small">{column.icon}</IconButton>
                    )}
                  </StyledTableCell>
                ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredData) &&
              filteredData
                ?.filter((value) => {
                  if (searchText === "") {
                    return value;
                  } else if (
                    Object.values(value)
                      .join("")
                      .toLowerCase()
                      .includes(searchText.toLowerCase().toString())
                  ) {
                    return value;
                  }
                })

                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      sx={{
                        borderBottom: "1px solid #70B3D1 !important",
                        borderRight: "1px solid #70B3D1 !important",
                      }}
                    >
                      {index + 1}
                    </StyledTableCell>
                    {columns &&
                      columns?.map((column, columnIndex) => {
                        const value = row[column.id] || "";
                        return (
                          <StyledTableCell
                            key={columnIndex}
                            classes={{ root: classes.tableHeader }}
                          >
                            {column?.format && typeof value === "number"
                              ? column?.format(value)
                              : value}
                            {/* Add icons to the data cells */}
                            {column?.actions && (
                              <Box>
                                {column?.actions.includes("edit") && (
                                  //   <ColorIcon
                                  //     sx={{
                                  //       display: "flex",
                                  //       flexDirection: "column",
                                  //     }}
                                  //   >
                                  //     <EditIcon
                                  //         size="small"
                                  //         onClick={(e) => {
                                  //           handleEditRow(e, row);
                                  //           setUniqueID(row.uniqueID);
                                  //         }}
                                  //       />

                                  //      <Typography
                                  //       sx={{ fontSize: 9, fontWeight: 800 }}
                                  //     >
                                  //       Edit Details
                                  //     </Typography>
                                  //  </ColorIcon>

                                  <MenuComponent
                                    // handleEdit={(e) => {
                                    //   handleEditRow(e, row);
                                    //   setUniqueID(row.uniqueID);
                                    //   setEditLessorRenewData(row);
                                    // }}
                                    handleEdit={(e) => {
                                      handleEditRow(e, row);
                                      setUniqueID(row.uniqueID);
                                    }}
                                    handleEditProvisions={() => {
                                      changeProvisions();
                                      setAgreementTenure(row.agreementTenure);
                                      setRentStartDate(row.rentStartDate);
                                      setRentEndDate(row.rentEndDate);
                                      setMonthlyRent(row.monthlyRent);
                                      setUniqueID(row.uniqueID);
                                      setLessorName(row.lessorName);
                                      setLesseeBranchName(row.lesseeBranchName);
                                    }}
                                    handleRentDue={() => {
                                      handleRentDueDetails();
                                      setUniqueID(row.uniqueID);
                                      setAgreementTenure(row.agreementTenure);
                                      setRentStartDate(row.rentStartDate);
                                      setRentEndDate(row.rentEndDate);
                                      setLessorName(row.lessorName);
                                      setLesseeBranchName(row.lesseeBranchName);
                                    }}
                                    handleEditReport={() => {
                                      handlePaymentReport();
                                      setUniqueID(row.uniqueID);
                                      setRentStartDate(row.rentStartDate);
                                      setRentEndDate(row.rentEndDate);
                                      setMonthlyRent(row.monthlyRent);
                                      setUniqueID(row.uniqueID);
                                      setLessorName(row.lessorName);
                                      setLesseeBranchName(row.lesseeBranchName);
                                    }}
                                    handleSDReport={() => {
                                      handleSd();
                                      setUniqueID(row.uniqueID);
                                      setRentStartDate(row.rentStartDate);
                                      setRentEndDate(row.rentEndDate);
                                      setMonthlyRent(row.monthlyRent);
                                      setLessorName(row.lessorName);
                                      setLesseeBranchName(row.lesseeBranchName);
                                    }}
                                    openRentDueModal={openRentDueModal}
                                    setOpenRentDueModal={setOpenRentDueModal}
                                    selectedItem={selectedItem}
                                    // branchIDforDue={branchIDforDue}
                                    branchIDData={branchIDData}
                                    uniqueID={uniqueID}
                                    rentStartDate={rentStartDate}
                                    rentEndDate={rentEndDate}
                                    agreementTenure={agreementTenure}
                                    rentContractDetails={rentContractDetails}
                                    openProvisionsListModal={
                                      openProvisionsListModal
                                    }
                                    monthlyRent={monthlyRent}
                                    activationStatusFilter={
                                      activationStatusFilter
                                    }
                                    setOpenProvisionsListModal={
                                      setOpenProvisionsListModal
                                    }
                                    lessorName={lessorName}
                                    lesseeBranchName={lesseeBranchName}
                                    openPaymentReportData={
                                      openPaymentReportData
                                    }
                                    setOpenPaymentReportData={
                                      setOpenPaymentReportData
                                    }
                                    activationStatusFilterDue={
                                      activationStatusFilterDue
                                    }
                                    editAllNewContractData={
                                      editAllNewContractData
                                    }
                                    openEditLessorModal={openEditLessorModal}
                                    setOpenEditLessorModal={
                                      setOpenEditLessorModal
                                    }
                                    openSdReportModal={openSdReportModal}
                                    setOpenSdReportModal={setOpenSdReportModal}
                                  />
                                )}

                                {/* {column?.actions.includes("viewBank") && (
                                  <ColorIcon
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      minWidth: "5px",
                                      padding: "1px -1px",
                                    }}
                                  >
                                    <AccountBalanceWalletIcon
                                      onClick={() => {
                                        handleModalOpen(row);
                                      }}
                                    />
                                    <Typography
                                      sx={{ fontSize: 8, fontWeight: 800 }}
                                    >
                                      Bank Details
                                    </Typography>
                                  </ColorIcon>
                                )} */}

                                {/* <ViewDetailsModal
                                  show={modalOpen}
                                  close={handleModalClose}
                                  selectedItem={selectedItem}
                                /> */}

                                {/* {column?.actions.includes("viewBranch") && (
                                  <ColorIcon
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      minWidth: "2px",
                                      padding: "-1px -1px",
                                    }}
                                  >
                                    <ApartmentIcon
                                      size="small"
                                      onClick={() => handleBranchModalOpen(row)}
                                    />

                                    <Typography
                                      sx={{ fontSize: 8, fontWeight: 800 }}
                                    >
                                      Branch Details
                                    </Typography>
                                  </ColorIcon>
                                )} */}

                                {/* <BranchDetailsModal
                                  show={branchModal}
                                  close={() => setBranchModal(false)}
                                  selectedItem={selectedItem}
                                /> */}

                                {/* {column?.actions.includes("viewAgreement") && (
                                  <ColorIcon
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      minWidth: "5px",
                                      padding: "1px -1px",
                                    }}
                                  >
                                    <HandshakeIcon
                                      size="small"
                                      onClick={() =>
                                        handleCustomInputModalOpen(row)
                                      }
                                    />

                                    <Typography
                                      sx={{ fontSize: 8, fontWeight: 800 }}
                                    >
                                      Agreement Details
                                    </Typography>
                                  </ColorIcon>
                                )} */}
                              </Box>
                            )}

                            {/* <CustomModal
                              show={customInputModalOpen}
                              close={handleCustomInputModalClose}
                              selectedItem={selectedItem}
                            /> */}

                            {column?.actions?.includes(
                              "viewContractDetails"
                            ) && (
                              <RentContractInformation
                                handleBranch={() => {
                                  handleBranchModalOpen(row);
                                }}
                                handleBank={() => {
                                  handleModalOpen(row);
                                }}
                                handleAgreement={() => {
                                  handleCustomInputModalOpen(row);
                                }}
                                modalOpen={modalOpen}
                                handleModalClose={handleModalClose}
                                selectedItem={selectedItem}
                                customInputModalOpen={customInputModalOpen}
                                handleCustomInputModalClose={
                                  handleCustomInputModalClose
                                }
                                branchModal={branchModal}
                                setBranchModal={setBranchModal}
                              />
                            )}
                          </StyledTableCell>
                        );
                      })}
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
