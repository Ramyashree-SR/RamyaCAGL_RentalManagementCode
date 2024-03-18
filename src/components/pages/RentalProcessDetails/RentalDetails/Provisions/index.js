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
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { blue, deepOrange, green, pink, red } from "@mui/material/colors";
import {
  DeleteAllSelectedProvisions,
  getBranchWiseProvisionsList,
} from "../../../../services/ProvisionsListApi";
import ReusableTable from "../../../../molecules/ReusableTable";
import { ProvisionsColumns } from "../../../../../constants/ProvisionList";
import ExcelExport from "./../../../../../ExcelExport/index";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[300]),
  color: pink[900],
  // color:yellow[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));

const Provisions = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [provisionsList, setProvisionsList] = useState([]);
  const [provisionMonthFilter, setProvisionMonthFilter] = useState("All");
  const [selectedYear, setSelectedYear] = useState(null);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchText, setSearchText] = useState("");
  const [filterDetails, setFilterDetails] = useState(provisionsList);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [confirmDeleteVal, setconfirmDeleteVal] = useState(null);
  const [yearData, setYearData] = useState(null);
  const [contractID, setContractID] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [removeRowData, setRemoveRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    opened: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const handleClose = () => {
    setOpen(false);
    setSelectedRows([]); // Reset selected rows when closing the dialog
  };

  useEffect(() => {
    // Filter the data based on Status and selectedRows
    const filtered = provisionsList?.filter((value) => {
      if (provisionMonthFilter === "All") {
        return value;
      } else if (value?.month?.includes?.(provisionMonthFilter)) {
        return value;
      }
    });
    setFilterDetails(filtered);
  }, [provisionsList, provisionMonthFilter]);

  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      //     // Clear existing data
      setInputValue("");
      setSelectedYear(null);
      setSearchText("");
      setRemoveRowData([]);
    }
  }, [refreshKey]);

  const handleChange = (newValue) => {
    setSelectedYear(newValue?.label);
    setLoading(!loading);
  };

  useEffect(() => {
    getProvisionListDetails();
  }, [selectedYear]);

  // Parse the provided rent end date
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
    // console.log(data, "Provisiondata");
    if (data) {
      if (data) {
        let getData = data?.data;
        setProvisionsList(getData);
        setLoading(false);
      } else {
        setProvisionsList([]);
      }
    }
  };

  const handleBranchIDChange = (e) => {
    setInputValue(e.target.value);
    // setLoading(!loading);
  };

  const handleProvisionMonthChange = (e) => {
    setProvisionMonthFilter(e.target.value);
  };

  const deleteSelectedProvisionDetailsFromTable = async (selectedRowsData) => {
    if (confirmDelete) {
      const payload = selectedRowsData
        ?.filter((row) => row.month === currentMonth)
        ?.map((row) => ({
          contractID: row?.contractID,
          year: row?.year,
          month: row?.month,
        }));

      try {
        // Make API call to delete selected provisions
        const { data } = await DeleteAllSelectedProvisions(payload);
        if (data) {
          // Set response data to removeRowData state
          setRemoveRowData([]);
          handleClose();
        }
      } catch (error) {
        setRemoveRowData([]);
        console.error("Error deleting provisions:", error);
        // Handle error if needed
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

  const withCheckbox = selectedYear === `${currentYear}`;
  const currentYearAndMonth = selectedYear === `${currentYear}`;

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await getProvisionListDetails();
    } finally {
      setLoading(false);
    }
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
          <img
            src="./assets/cagllogo1.png"
            alt="logo"
            width="80px"
            height="40px"
            margnTop="-2px"
          />
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 600, fontFamily: "sans-serif" }}
          >
            Provisions Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <ColorIcon>
                  <Grid className="d-flex flex-column align-items-center justify-content-center">
                    <LoopRoundedIcon
                      onClick={handleRefresh}
                      sx={{ color: green[700], fontSize: 15 }}
                    />
                    <Grid className="d-flex flex-column align-items-start justify-content-start">
                      <Typography
                        onClick={handleRefresh}
                        sx={{ fontSize: 8, color: green[700] }}
                      >
                        Refresh
                      </Typography>
                    </Grid>
                  </Grid>
                </ColorIcon>
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
              // position: "fixed",
              width: "100%",
              mt: 2,
            }}
          >
            {loading ? (
              <div className="d-flex align-items-center justify-content-center flex-column py-5 mt-5">
                <div
                  className="spinner-border text-success"
                  role="status"
                  style={{ width: "2rem", height: "2rem" }}
                ></div>
                <span className="visible text-success">Loading...</span>
              </div>
            ) : (
              selectedYear && (
                <ReusableTable
                  data={provisionsList}
                  columns={ProvisionsColumns}
                  sx={{ mt: 8, height: 350 }} // height: 320
                  searchText={searchText}
                  provisionMonthFilter={provisionMonthFilter}
                  handleProvisionMonthChange={handleProvisionMonthChange}
                  setconfirmDeleteVal={setconfirmDeleteVal}
                  setconfirmDelete={setconfirmDelete}
                  setYearData={setYearData}
                  setContractID={setContractID}
                  setMonthData={setMonthData}
                  yearData={yearData}
                  withCheckbox={withCheckbox && currentMonth}
                  currentYearAndMonth={currentYearAndMonth}
                  currentMonth={currentMonth}
                  setRefreshKey={setRefreshKey}
                  monthData={monthData}
                  onSaveSelectedRows={deleteSelectedProvisionDetailsFromTable} // Pass onSaveSelectedRows prop
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  open={open}
                  setOpen={setOpen}
                  handleClose={handleClose}
                  refreshKey={refreshKey}
                  setRemoveRowData={setRemoveRowData}
                  setInputValue={setInputValue}
                  setSelectedYear={setSelectedYear}
                />
              )
            )}
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.close();
              setRefreshKey((prevKey) => prevKey + 1);
            }}
            variant="contained"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Provisions;
