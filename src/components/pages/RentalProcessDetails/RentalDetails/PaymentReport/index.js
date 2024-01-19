import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { getRentPaymentReportDetails } from "../../../../services/PaymentReportApi";
import { paymentColumn } from "../../../../../constants/PaymentReport";
import { deepOrange, orange, red } from "@mui/material/colors";
import PaymentTableComponent from "./../../../../molecules/PaymentTableComponent/index";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ExcelExport from "../../../../../ExcelExport";
import { AllPaymentColumns } from "../../../../../constants/AllPaymentReport";

const PaymentReport = (props) => {
  const [getPaymentReport, setGetPaymentReport] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchText, setSearchText] = useState("");
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
    getAllPaymentReportDetailsOfMonth();
  }, [selectedMonth]);

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    if (value) {
      // Access value.month here
      setSelectedMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
    // getAllPaymentReportDetailsOfMonth(value);
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

  const yearOptions = Array.from({ length: 10 }, (_, index) => ({
    id: currentYear - index, // currentYear
    label: `${currentYear - index}`,
  }));

  const handleChange = (newValue) => {
    let value = newValue?.label;
    setSelectedYear(value);
    // getAllPaymentReportDetailsOfMonth(value);
  };

  const getAllPaymentReportDetailsOfMonth = async () => {
    const { data } = await getRentPaymentReportDetails(
      "all",
      selectedMonth,
      selectedYear
    );
    // console.log(data?.data, "allData");
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetPaymentReport(getData);
      } else {
        setGetPaymentReport([]);
      }
    }
  };

  const getPaymentReportData = Object.values([getPaymentReport])?.map(
    (item) => ({
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
      RentStartDate: item.info?.rentStartDate,
      RentEndDate: item.info?.rentEndDate,
      MonthlyRent: item.info?.monthlyRent,
      Due: item.due,
      Provision: item.provision,
      Gross: item.gross,
      Tds: item.tds,
      net: item.net,
      gst: item.gst,
    })
  );

  //   console.log(getPaymentReport, "getPaymentReport");
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
            style={{ fontWeight: 900, fontFamily: "sans-serif" }}
          >
            Payment Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid item className="d-flex mt-4" sx={{ position: "fixed" }}>
            <DropDownComponent
              label="Year"
              placeholder="Select "
              sx={{ width: 200 }}
              size="small"
              options={yearOptions}
              value={selectedYear}
              onChange={handleChange}
            />
            <DropDownComponent
              label="Month"
              placeholder="Select "
              sx={{ width: 200, ml: 0 }}
              size="small"
              options={months}
              //   name="month"
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
              className="d-flex align-items-end justify-content-end"
              sx={{
                width: 120,
                height: 40,
                flexBasis: "50%",
              }}
            >
              <ExcelExport
                excelData={getPaymentReportData}
                fileName={"Payment Report"}
                sx={{ color: "#ffffff", backgroundColor: deepOrange[900] }}
              />
            </Grid>
            {/* <ExportToCSV
              excelData={getPaymentReportData}
              fileName={"Payment Report"}
            /> */}
          </Grid>

          <Grid sx={{ mt: 10 }}>
            {selectedMonth && (
              <PaymentTableComponent
                data={getPaymentReport}
                columns={AllPaymentColumns}
                searchText={searchText}
                sx={{
                  width: "100%",
                  mt: 5,
                }}
              />
            )}
          </Grid>
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

export default PaymentReport;
