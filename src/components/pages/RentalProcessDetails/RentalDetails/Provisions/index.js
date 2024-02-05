import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { deepOrange, green, red } from "@mui/material/colors";
import {
  DeleteAllSelectedProvisions,
  getBranchWiseProvisionsList,
} from "../../../../services/ProvisionsListApi";
import ReusableTable from "../../../../molecules/ReusableTable";
import { ProvisionsColumns } from "../../../../../constants/ProvisionList";
import ExcelExport from "./../../../../../ExcelExport/index";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useToasts } from "react-toast-notifications";

const Provisions = (props) => {
  const addToast = useToasts();
  const [dataSelect, setDataSelect] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [provisionsList, setProvisionsList] = useState([]);
  const [provisionMonthFilter, setProvisionMonthFilter] = useState("All");
  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchText, setSearchText] = useState("");
  const [filterDetails, setFilterDetails] = useState(provisionsList);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [confirmDeleteVal, setconfirmDeleteVal] = useState(null);
  const [yearData, setYearData] = useState(null);
  const [contractID, setContractID] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [removeRowData, setRemoveRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [state, setState] = useState({
    opened: false,
    vertical: "bottom",
    horizontal: "center",
  });

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

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    if (value) {
      // Access value.month here
      setSelectedMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
  };

  const handleChange = (newValue) => {
    // console.log(newValue, "newValue");
    setSelectedYear(newValue.label);
  };

  const handleSelectChange = (value) => {
    // console.log(value, "value");
    setDataSelect(value.label);
  };

  useEffect(() => {
    // Filter the data based on Status
    const filtered = provisionsList?.filter((value) => {
      if (provisionMonthFilter === "All") {
        return value;
      } else if (value?.month?.includes?.(provisionMonthFilter)) {
        return value;
      }
    });
    setFilterDetails(filtered);
  }, [provisionsList, provisionMonthFilter]);

  // console.log(filterDetails, "filterDetails");

  useEffect(() => {
    getProvisionListDetails();
  }, [selectedYear]);

  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Clear existing payment report data
      setRemoveRowData([]);
      // Fetch new data based on the new month and year
      deleteSelectedProvisionDetailsFromTable();
    }
  }, [refreshKey]);
  // Parse the provided rent end date
  // const endDateObject = new Date(rentEndDate);
  const endDateObject = new Date();

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }

  // Extract the year from the rent end date
  const currentYear = endDateObject?.getFullYear();
  const currentMonth = endDateObject?.toLocaleString("default", {
    month: "long",
  });
  console.log(currentMonth, "currentMonth");

  // Generate an array of years, including the current MOnth
  const yearOptions = Array?.from({ length: 10 }, (_, index) => ({
    value: currentYear - index, // currentYear
    label: `${currentYear - index}`,
  }));

  const getProvisionListDetails = async () => {
    const { data } = await getBranchWiseProvisionsList(
      inputValue,
      selectedYear
    );
    if (data) {
      if (data) {
        let getData = data?.data;
        setProvisionsList(getData);
        // props.close();
      } else {
        setProvisionsList([]);
      }
    }
  };

  const handleBranchIDChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleProvisionMonthChange = (e) => {
    setProvisionMonthFilter(e.target.value);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleConfirmDelete = (row) => {
    setconfirmDelete(true);
    // Filter the data to keep only records for the current month
    // const newData = provisionsList?.filter(
    //   (item) => !(item.year === currentYear && item.month === currentMonth)
    // );
    // setProvisionsList(newData);

    deleteSelectedProvisionDetailsFromTable();
  };

  // Function to get the details of the selected rows
  const getSelectedRowDetails = () => {
    return selectedRows?.map((rowId) =>
      provisionsList?.find((row) => row?.contractID === rowId)
    );
  };

  const { vertical, horizontal, opened } = state;

  const handleClick = (newState) => {
    setState({ ...newState, opened: true });
  };
  const selectedRowDatas = getSelectedRowDetails();
  console.log(selectedRowDatas, "selectedRowDatas");

  const deleteSelectedProvisionDetailsFromTable = async () => {
    if (confirmDelete) {
      let payload = [
        {
          contractID: selectedRowDatas?.contractID,
          year: selectedRowDatas?.year,
          month: selectedRowDatas?.month,
        },
      ];
      const { data, errRes } = await DeleteAllSelectedProvisions(payload);
      console.log(data, "bulkdata");
      if (data) {
        setRemoveRowData(data);
        handleClose();
        props.close();
        // addToast(data?.msg, { appearance: "success" });
      }
    }
  };

  const getProvisionReport = Object.values(filterDetails)?.map((item) => ({
    ContractID: item.contractID,
    Month: item.month,
    Year: item.year,
    BranchID: item.info?.branchID,
    BranchName: item.info?.lesseeBranchName,
    AreaName: item.info?.lesseeAreaName,
    Division: item.lesseeDivision,
    Zone: item.info?.lesseeZone,
    State: item.info?.lesseeState,
    BankName: item.info?.lessorBankName,
    IFSCNumber: item.info?.lessorIfscNumber,
    AccountNumber: item.info?.lessorAccountNumber,
    ProvisionAmount: item.provisionAmount,
    Provisiontype: item.provisiontype,
    Remark: item.remark,
  }));
  // showCheckbox={currentYear === 2024 && currentMonth === "February"}
  const withCheckbox = selectedYear === `${currentYear}`;
  const currentYearAndMonth = selectedYear === `${currentYear}`;
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
            Provisions Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Container>
            <Row>
              <Col xs={12}> */}
          <Grid className="d-flex flex-column m-2" sx={{ position: "fixed" }}>
            <Grid className="d-flex" sx={{ mt: -2 }}>
              <InputBoxComponent
                label="ID"
                placeholder="Enter ID"
                sx={{ width: 200, mt: -1 }}
                name="inputValue"
                value={inputValue}
                onChange={(e) => {
                  handleBranchIDChange(e);
                }}
              />

              <DropDownComponent
                label="Year"
                placeholder="Select "
                sx={{ width: 200, mt: 0.5 }}
                size="small"
                options={yearOptions}
                getOptionLabel={(option) => option?.label || option}
                value={selectedYear}
                onChange={handleChange}
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
                  excelData={getProvisionReport}
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
          <Box
            sm={12}
            xs={12}
            sx={{
              marginLeft: "1px auto auto 1px",
              width: "100%",
            }}
          >
            {selectedYear ? ( //selectedYear  ,selectedMonth
              <ReusableTable
                data={provisionsList}
                columns={ProvisionsColumns}
                sx={{ mt: 8 }} // height: 320
                searchText={searchText}
                provisionMonthFilter={provisionMonthFilter}
                handleProvisionMonthChange={handleProvisionMonthChange}
                setOpen={setOpen}
                setconfirmDeleteVal={setconfirmDeleteVal}
                setYearData={setYearData}
                setContractID={setContractID}
                setMonthData={setMonthData}
                yearData={yearData}
                withCheckbox={withCheckbox && currentMonth === "February"}
                currentYearAndMonth={currentYearAndMonth}
                currentMonth={currentMonth}
                handleConfirmDelete={handleConfirmDelete}
                monthData={monthData}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
              />
            ) : null}
          </Box>
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
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <Typography>Are you sure you want to delete?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Back</Button>
              <Button
                onClick={() => {
                  handleConfirmDelete();
                  handleClick({
                    vertical: "bottom",
                    horizontal: "center",
                  });
                  setRefreshKey((prevKey) => prevKey + 1);
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close} variant="contained">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Provisions;
