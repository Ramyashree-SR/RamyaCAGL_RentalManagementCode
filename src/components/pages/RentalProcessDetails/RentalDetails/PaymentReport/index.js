import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import {
  getDownloadPaymentReportDetails,
  getRentPaymentReportDetails,
} from "../../../../services/PaymentReportApi";
import { paymentColumn } from "../../../../../constants/PaymentReport";
import { deepOrange, green, orange, red } from "@mui/material/colors";
import PaymentTableComponent from "./../../../../molecules/PaymentTableComponent/index";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ExcelExport from "../../../../../ExcelExport";
import { AllPaymentColumns } from "../../../../../constants/AllPaymentReport";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const PaymentReport = (props) => {
  const { refreshKey, setRefreshKey } = props;
  const [getPaymentReport, setGetPaymentReport] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(getPaymentReport);
  const [loading, setLoading] = useState(false);
  const [getBulkPaymentReportDetails, setGetBulkPaymentReportDetails] =
    useState([]);
  

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
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Clear existing data
      setSelectedYear(null);
      setSelectedMonth(null);
      setGetPaymentReport([]);
      // Fetch new data based on the new month and year
      getAllPaymentReportDetailsOfMonth();
    }
  }, [refreshKey]);

  useEffect(() => {
    getAllPaymentReportDetailsOfMonth();
  }, [selectedMonth]);

  useEffect(() => {
    getAllPaymentReportDownloadDetails();
  }, [selectedMonth]);

  useEffect(() => {
    // Filter the data based on searchText
    const filtered = getPaymentReport?.filter((value) => {
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
  }, [getPaymentReport, searchText]);

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    if (value) {
      // Access value.month here
      setSelectedMonth(value);

      setLoading(!loading);
    } else {
      console.error("value or value.month is undefined");
    }
  };

  const endDateObject = new Date();

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }

  // Extract the year from the rent end date
  const currentYear = endDateObject?.getFullYear();

  // const yearOptions = Array.from({ length: 5 }, (_, index) => ({
  //   id: currentYear - index || currentYear + index, // currentYear
  //   label: `${currentYear - index || currentYear + index}`,
  // }));

  const yearOptions = Array.from({ length: 10 }, (_, index) => ({
    id: currentYear - 3 + index,
    label: `${currentYear - 3 + index}`,
  }));

  // const numYears = 6; // You can adjust this number based on your requirement

  // const yearOptions = Array.from({ length: 2 * numYears + 1 }, (_, index) => ({
  //   id: currentYear - numYears + index,
  //   label: `${currentYear - numYears + index}`,
  // }));

  const handleChange = (newValue) => {
    let value = newValue?.label;
    setSelectedYear(value);
  };

  const getAllPaymentReportDetailsOfMonth = async () => {
    const { data } = await getRentPaymentReportDetails(
      "all",
      selectedMonth,
      selectedYear
    );
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetPaymentReport(getData);
        setLoading(false);
      } else {
        setGetPaymentReport([]);
      }
    }
  };
  const getAllPaymentReportDownloadDetails = async () => {
    const { data } = await getDownloadPaymentReportDetails(
      selectedMonth,
      selectedYear
    );
    // console.log(data, "getData");
    if (data) {
      if (data) {
        let getData = data;
        setGetBulkPaymentReportDetails(getData);
        setLoading(false);
      } else {
        setGetBulkPaymentReportDetails([]);
      }
    }
  };

  const getPaymentReportData = Object.values(filteredData)?.map((item) => ({
    ID: item.info?.uniqueID,
    MonthYear: item.monthYear,
    LessorName: item.info?.lessorName,
    BranchID: item.info?.branchID,
    BranchName: item.info?.lesseeBranchName,
    AreaName: item.info?.lesseeAreaName,
    Division: item.lesseeDivision,
    Zone: item.info?.lesseeZone,
    State: item.info?.lesseeState,
    BankName: item.info?.lessorBankName,
    IFSCNumber: item.info?.lessorIfscNumber,
    AccountNumber: item.info?.lessorAccountNumber,
    MonthlyRent: item.info?.lessorRentAmount,
    RentStartDate: item.info?.rentStartDate,
    RentEndDate: item.info?.rentEndDate,
    EscMonthlyRent: item.monthRent,
    Due: item.due,
    Provision: item.provision,
    Gross: item.gross,
    Tds: item.reporttds,
    net: item.net,
    gst: item.gst,
  }));

  const getPaymentReportDownload = Object.values([
    getBulkPaymentReportDetails,
  ])?.map((item) => ({
    ID: item.info?.uniqueID,
    MonthYear: item.monthYear,
    LessorName: item.info?.lessorName,
    BranchID: item.info?.branchID,
    BranchName: item.info?.lesseeBranchName,
    AreaName: item.info?.lesseeAreaName,
    Division: item.lesseeDivision,
    Zone: item.info?.lesseeZone,
    State: item.info?.lesseeState,
    BankName: item.info?.lessorBankName,
    IFSCNumber: item.info?.lessorIfscNumber,
    AccountNumber: item.info?.lessorAccountNumber,
    MonthlyRent: item.info?.lessorRentAmount,
    RentStartDate: item.info?.rentStartDate,
    RentEndDate: item.info?.rentEndDate,
    EscMonthlyRent: item.monthRent,
    Due: item.due,
    Provision: item.provision,
    Gross: item.gross,
    Tds: item.reporttds,
    net: item.net,
    gst: item.gst,
  }));

  const handlePaymentReportExcel = async () => {
    try {
      const response = await fetch(
        `http://localhost:9888/DownloadPaymentReport?month=${selectedMonth}&year=${selectedYear}`
        // `https://caglcampaignleads.grameenkoota.in/RentManagement/DownloadPaymentReport?month=${selectedMonth}&year=${selectedYear}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blobImage = await response.blob();

      const href = URL.createObjectURL(blobImage);

      const anchorElement = document.createElement("a");
      anchorElement.href = href;
      anchorElement.download = `payment_report.xlsx`;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
      // setError("");
    } catch (error) {
      console.error("Fetch error:", error);
      // setError("Failed to fetch data. Please try again later.");
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="w-100"
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 600, fontFamily: "sans-serif" }}
          >
            Payment Report
          </Modal.Title>
          <img
            src="./assets/cagllogo1.png"
            alt="logo"
            width="90px"
            height="43px"
            margnTop="-2px"
          />
        </Modal.Header>
        <Modal.Body>
          <Grid item className="d-flex mt-0" sx={{ position: "fixed" }}>
            <DropDownComponent
              label="Year"
              placeholder="Select "
              sx={{ width: 200 }}
              size="small"
              options={yearOptions}
              getOptionLabel={(option) => option?.label || option}
              value={selectedYear}
              onChange={handleChange}
            />
            <DropDownComponent
              label="Month"
              placeholder="Select "
              sx={{ width: 200, ml: 0 }}
              size="small"
              options={months}
              getOptionLabel={(option) => option?.label || option}
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
                    mt: -2,
                  },
                }}
              />
            </Grid>
            <Grid
              item
              className="d-flex align-items-end justify-content-end "
              sx={{
                width: 120,
                height: 40,
                ml: 1,
                flexBasis: "50%",
              }}
            >
              <ExcelExport
                excelData={getPaymentReportData}
                fileName={"Payment Report"}
                sx={{ color: "#ffffff", backgroundColor: deepOrange[900] }}
              />
            </Grid>

            <Grid
              item
              className="d-flex align-items-end justify-content-end"
              sx={{
                flexDirection: "column",
                ml: 15,
              }}
            >
              <Button
                variant="contained"
                name="Download"
                onClick={() => handlePaymentReportExcel()}
                sx={{
                  width: 200,

                  background: green[900],
                  color: "#FFFFFF",
                }}
              >
                <DownloadRoundedIcon sx={{ color: "#FFFFFF" }} />
                Payment Report Excel
              </Button>
              {/* <ExportToCSV
                excelData={[getBulkPaymentReportDetails]}
                fileName={"Bulk Payment Repot"}
              /> */}
            </Grid>
          </Grid>

          <Grid sx={{ mt: 8 }}>
            {loading ? (
              <div className="d-flex align-items-center justify-content-center flex-column">
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ width: "2rem", height: "2rem" }}
                ></div>
                <span className="visible text-primary">Loading...</span>{" "}
              </div>
            ) : (
              selectedMonth && (
                <PaymentTableComponent
                  data={getPaymentReport}
                  columns={AllPaymentColumns}
                  searchText={searchText}
                  filteredData={filteredData}
                  sx={{
                    width: "100%",
                    mt: 5,
                  }}
                />
              )
            )}
          </Grid>
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

export default PaymentReport;
