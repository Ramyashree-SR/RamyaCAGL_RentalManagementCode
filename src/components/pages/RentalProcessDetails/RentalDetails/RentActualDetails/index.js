import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange, green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { useToasts } from "react-toast-notifications";
import { AddRentActualDetails } from "../../../../services/RentActualApi";
import { getRentPaymentReportDetails } from "../../../../services/PaymentReportApi";
import RentActualPaymentTable from "../../../../molecules/RentActualPaymentTable";
import ExcelExport from "../../../../../ExcelExport";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const RentActualDetails = (props) => {
  const { addToast } = useToasts();
  const [getActualPaymentReport, setGetAcualPaymentReport] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [rentActualData, setRentActualData] = useState([]);
  const [addRentActual, setAddRentActual] = useState({
    contractID: "",
    branchID: "",
    year: "",
    Amount: "",
    month: "",
    startDate: "",
    endDate: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [confirmSubmit, setconfirmSubmit] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [filteredData, setFilteredData] = useState(getActualPaymentReport);

  const months = [
    { id: 1, label: "January" },
    { id: 2, label: "February" },
    { id: 3, label: "March" },
    { id: 4, label: "April" },
    { id: 5, label: "May" },
    { id: 6, label: "June" },
    { id: 7, label: "July" },
    { id: 8, label: "August" },
    { id: 9, label: "September" },
    { id: 10, label: "October" },
    { id: 11, label: "November" },
    { id: 12, label: "December" },
  ];
  useEffect(() => {
    getAllActualPaymentReportDetailsOfMonth();
  }, [selectedMonth]);

  useEffect(() => {
    // Filter the data based on searchText
    const filtered = getActualPaymentReport?.filter((value) => {
      if (searchText === "") {
        return value;
      } else if (
        value?.info?.lesseeBranchName
          ?.toString()
          .toLowerCase()
          ?.includes?.(searchText) ||
        value?.info?.uniqueID
          ?.toString()
          .toLowerCase()
          ?.includes?.(searchText) ||
        value?.info?.branchID?.toString().toLowerCase()?.includes?.(searchText)
      ) {
        return value;
      }
    });
    setFilteredData(filtered);
  }, [getActualPaymentReport, searchText]);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const endDateObject = new Date();

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }
  const currentYear = endDateObject?.getFullYear();

  const yearOptions = Array.from({ length: 1 }, (_, index) => ({
    id: currentYear, // currentYear - index,
    label: `${currentYear}`,
  }));

  const handleChange = (newValue) => {
    let value = newValue?.label;
    setSelectedYear(value);
    // getAllPaymentReportDetailsOfMonth(value);
  };

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    // console.log(value, "value");
    if (value) {
      // Access value.month here
      setSelectedMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
    // getAllActualPaymentReportDetailsOfMonth(value);
  };

  const getAllActualPaymentReportDetailsOfMonth = async () => {
    const { data } = await getRentPaymentReportDetails(
      "all",
      selectedMonth,
      selectedYear
    );
    // console.log(data?.data, "allData");
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetAcualPaymentReport(getData);
      } else {
        setGetAcualPaymentReport([]);
        setRentActualData([]);
      }
    }
  };

  const handleSaveSelectedRows = () => {
    // Save edited data in the main table
    if (editedData) {
      const updatedData = getActualPaymentReport?.map((item) =>
        item.info?.uniqueID === editedData.id
          ? { ...item, [editedData?.field]: editedData?.value }
          : item
      );
      setTableData(updatedData);
    }
    // Save selected rows data with consideration of edited data
    if (selectedRows?.length > 0) {
      const selectedRowsData = getSelectedRowDetails()?.map((row) => {
        // Check if the row has edited data, use it if available
        const editedDataRow =
          editedData && row.info?.uniqueID === editedData?.id
            ? { ...row, [editedData.field]: editedData?.value }
            : row;

        return editedDataRow;
      });

      // Update the data with selected rows and edited data
      const updatedData = selectedRowsData?.map((item) =>
        selectedRows.includes(item.info?.uniqueID)
          ? selectedRowsData.find(
              (row) => row?.info?.uniqueID === item.info?.uniqueID
            )
          : item
      );
      setTableData(updatedData);
      return updatedData;
    }
    // Clear the local storage for edited data
    localStorage.removeItem("editedData");

    // If no selected rows, return the original data
    return getActualPaymentReport;
    // // Remove rows after making a payment
    // const updatedDataAfterPayment = getActualPaymentReport?.filter(
    //   (item) => !selectedRows.includes(item.info?.uniqueID)
    // );
  };

  // Function to get the details of the selected rows
  const getSelectedRowDetails = () => {
    return selectedRows?.map((rowId) =>
      getActualPaymentReport?.find((row) => row?.info?.uniqueID === rowId)
    );
  };

  const handleConfirmSubmit = () => {
    setconfirmSubmit(true);
    AddRentActualFortheMonth();
  };

  const AddRentActualFortheMonth = async () => {
    let selectedRowsDatas = handleSaveSelectedRows();
    // Assuming selectedRowsData is an array of objects
    const payload = selectedRowsDatas?.map((selectRow) => ({
      contractID: selectRow?.info?.uniqueID,
      branchID: selectRow?.info?.branchID,
      year: selectedYear,
      amount:
        editedData?.[selectRow?.info?.uniqueID]?.actualAmount ||
        selectRow?.actualAmount,
      month: selectedMonth,
      startDate: selectRow?.info?.rentStartDate,
      endDate: selectRow?.info?.rentEndDate,
    }));
    const { data, errRes } = await AddRentActualDetails(payload);
    // console.log(data, "dataRes");
    if (data) {
      let getData = data?.data;
      setAddRentActual(getData);
      props.close();
      addToast("Rent Actual Payment Done Successfully", {
        appearance: "success",
      });
      window.location.reload();
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
      props.close();
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        centered
        // className="w-100"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Branch-wise Rent Actual Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <Grid
                  container
                  className="d-flex flex-row "
                  sx={{ position: "relative", top: 2, width: "100%" }}
                >
                  <Grid
                    item
                    className="d-flex ml-2"
                    sx={{ flexBasis: "50%", mt: 0 }}
                  >
                    <DropDownComponent
                      label="Year"
                      placeholder="Select "
                      sx={{ width: 200 }}
                      size="small"
                      getOptionLabel={(option) => option?.label || option}
                      options={yearOptions}
                      value={selectedYear}
                      onChange={handleChange}
                    />
                    <DropDownComponent
                      label="Month"
                      placeholder="Select "
                      sx={{ width: 200 }}
                      size="small"
                      getOptionLabel={(option) => option?.label || option}
                      options={months}
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    />
                    <Grid className="d-flex flex-row align-items-center justify-content-around">
                      <TextField
                        id="outlined-size-small"
                        placeholder="Search"
                        InputProps={{
                          "aria-label": "Without label",
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{ display: showClearIcon }}
                              onClick={(event) => {
                                setShowClearIcon(event.target.value);
                              }}
                            >
                              <ClearIcon />
                            </InputAdornment>
                          ),
                        }}
                        size="small"
                        value={searchText}
                        onChange={(e, value) => {
                          setSearchText(e.target.value);
                        }}
                        sx={{
                          // backgroundColor: "#FAFAFA",
                          borderRadius: "100px",
                          "& .MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                              borderColor: "#A6A6A6",
                            },
                          },
                          "& .MuiOutlinedInput-root:focus": {
                            "& > fieldset": {
                              outline: "none",
                              borderColor: "#ECECEC",
                            },
                          },
                          "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                              borderColor: "#c4c4c4",
                              borderRadius: "100px",
                            },
                            width: 350,
                            ml: 3,
                          },
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      className="d-flex flex-row align-items-end justify-content-end"
                      sx={{
                        mt: 0.1,
                        ml: 10,
                        width: 120,
                        height: 40,
                      }}
                    >
                      <ExcelExport
                        excelData={filteredData}
                        fileName={"ProvisionsList"}
                        sx={{
                          mr: 1,
                          backgroundColor: deepOrange[600],
                          width: 120,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Col>
              <Box sm={12} xs={12}>
                {selectedMonth && (
                  <RentActualPaymentTable
                    data={getActualPaymentReport}
                    sx={{ mt: 2 }}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    getSelectedRowDetails={getSelectedRowDetails}
                    tableData={tableData}
                    setTableData={setTableData}
                    editedData={editedData}
                    setEditedData={setEditedData}
                    searchText={searchText}
                    filteredData={filteredData}
                  />
                )}
              </Box>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Grid
            item
            className="d-flex align-item-end justify-content-end"
            sx={{
              fontSize: 15,
              fontWeight: 700,

              mt: 0,
              mr: 2,
            }}
          >
            {selectedRows?.length > 0 ? (
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                }}
                sx={{ backgroundColor: green[900] }}
              >
                Confirm Payment
              </Button>
            ) : null}
            <Dialog
              open={open}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <Typography>Are you sure you want to submit?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} variant="contained">
                  Back
                </Button>
                <Button
                  onClick={handleConfirmSubmit}
                  variant="contained"
                  sx={{ backgroundColor: green[900] }}
                >
                  Make Payment
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Button onClick={props.close} variant="contained">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentActualDetails;
