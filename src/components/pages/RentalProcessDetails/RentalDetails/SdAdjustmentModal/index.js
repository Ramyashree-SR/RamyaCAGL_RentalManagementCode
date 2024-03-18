import {
  Alert,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { getRentPaymentReportDetails } from "../../../../services/PaymentReportApi";
import { paymentColumn } from "../../../../../constants/PaymentReport";
import {
  blue,
  deepOrange,
  green,
  orange,
  pink,
  red,
  yellow,
} from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import ExcelExport from "../../../../../ExcelExport";
import PaymentReportTable from "../../../../molecules/PaymentReportTable";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import { useToasts } from "react-toast-notifications";
import { AddSDAjustmentAndClosingContract } from "../../../../services/SdAdjustApi";
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

const SdAdjustmentModal = (props) => {
  const {
    uniqueID,
    branchIDData,
    rentStartDate,
    rentEndDate,
    lesseeBranchName,
    lessorName,
    monthlyRent,
    // reload,
  } = props;
  const { addToast } = useToasts();
  // const [openShowProvisionModal, setOpenShowProvisionModal] = useState(false);
  const [getPaymentReport, setGetPaymentReport] = useState([]);
  const [getPaymentReportClick, setGetPaymentReportClick] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [settlementAmt, setSettlementAmt] = useState({});
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  // const [reload, setReload] = useState(false);
  const [checked, setChecked] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { vertical, horizontal, open } = state;
  const [closeButtonClicked, setCloseButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = (newState) => {
    setState({ ...newState, open: true });
  };

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

  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      if (closeButtonClicked) {
        // Clear selected month and year
        setSelectedMonth(null);
        setSelectedYear(null);

        // Clear existing payment report data
        setGetPaymentReport([]);
      }
      // Open modal to select month and year again if needed
      // ... (Open your modal logic here)
      setCloseButtonClicked(false);
    }
    // Fetch new data based on the new month and year
    // getAllPaymentReportDetailsOfMonth();
  }, [refreshKey, closeButtonClicked]);

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    if (value) {
      // Access value.month here
      setSelectedMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
    setGetPaymentReportClick(true);
  };

  const startDateObject = new Date(rentStartDate);
  const endDateObject = new Date(rentEndDate);

  // Check if the provided rent end date is valid
  if (isNaN(startDateObject.getTime()) || isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }

  // Extract the year from the rent end date
  const startYear = startDateObject?.getFullYear();
  const endYear = endDateObject?.getFullYear();

  // Generate an array of years between the start and end dates
  const yearOptions = Array.from(
    { length: endYear - startYear + 2 },
    (_, index) => ({
      id: startYear + index,
      label: `${startYear + index}`,
    })
  );

  // const endDateObject = new Date(rentStartDate);

  // // Check if the provided rent end date is valid
  // if (isNaN(endDateObject.getTime())) {
  //   // Handle invalid date
  //   console.error("Invalid date format");
  //   return null;
  // }
  // const currentYear = endDateObject?.getFullYear();

  // const yearOptions = Array.from({ length: 10 }, (_, index) => ({
  //   id: currentYear + index, // currentYear
  //   label: `${currentYear + index}`,
  // }));

  const handleChange = (newValue) => {
    let value = newValue?.label;
    setSelectedYear(value);
    setGetPaymentReportClick(true);
  };

  const getAllPaymentReportDetailsOfMonth = async () => {
    const { data } = await getRentPaymentReportDetails(
      uniqueID,
      selectedMonth,
      selectedYear,
      "view"
    );
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetPaymentReport(getData);
      } else {
        setGetPaymentReport([]);
        props.close();
      }
    }
  };
  const updatedChange = (e) => {
    setSettlementAmt({
      ...settlementAmt,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const addSdAdjustmentAndCloseContract = async () => {
    let payload = {
      contractID: getPaymentReport?.info?.uniqueID,
      branchID: getPaymentReport?.info?.branchID,
      year: selectedYear,
      month: selectedMonth,
      sdAmount: settlementAmt?.sdAmount,
      remark: settlementAmt?.remark,
      monthRent: getPaymentReport?.monthRent,
    };
    const { data, errRes } = await AddSDAjustmentAndClosingContract(payload);
    if (data) {
      setSettlementAmt(data);
      //   addToast("Amount Settled", { appearance: "success" });
      setRefreshKey((prevKey) => prevKey + 1);
    } else if (!data?.error) {
      // addToast(errRes?.msg, { appearance: "error" });
      addToast(<pre>{JSON.stringify(errRes, null, 4)}</pre>, {
        appearance: "error",
        autoClose: 9000,
      });
      //   props.close();
    }
  };

  const handleReportClick = () => {
    setGetPaymentReportClick(true);
  };

  const getPaymentReportData = Object.values([getPaymentReport])?.map(
    (item) => ({
      ID: item?.info?.uniqueID,
      MonthYear: item?.monthYear,
      LessorName: item?.info?.lessorName,
      BranchID: item?.info?.branchID,
      BranchName: item?.info?.lesseeBranchName,
      AreaName: item?.info?.lesseeAreaName,
      Division: item?.lesseeDivision,
      Zone: item?.info?.lesseeZone,
      State: item?.info?.lesseeState,
      BankName: item?.info?.lessorBankName,
      IFSCNumber: item?.info?.lessorIfscNumber,
      AccountNumber: item?.info?.lessorAccountNumber,
      RentStartDate: item?.info?.rentStartDate,
      RentEndDate: item?.info?.rentEndDate,
      MonthlyRent: item?.info?.lessorRentAmount,
      Due: item?.due,
      Provision: item?.provision,
      Gross: item?.gross,
      Tds: item?.tds,
      Net: item?.net,
      Gst: item?.gst,
    })
  );

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await setSelectedMonth(null);
      await setSelectedYear(null);
      await getAllPaymentReportDetailsOfMonth();
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        close={() => {
          props.close();
        }}
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
            SD Adjustment Report
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
          <Grid
            className="d-flex flex-row m-2"
            sx={{ fontSize: 15, fontWeight: 700 }}
          >
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Contract ID :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: yellow[900] }}
              >
                {uniqueID}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch ID :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: yellow[900] }}
              >
                {branchIDData}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch Name :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: yellow[900] }}
              >
                {lesseeBranchName}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            className="d-flex flex-row m-2"
            sx={{ fontSize: 15, fontWeight: 700 }}
          >
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Rent Start Date :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: yellow[900] }}
              >
                {rentStartDate}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Rent End Date :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: yellow[900] }}
              >
                {rentEndDate}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Lessor Name :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: yellow[900] }}
              >
                {" "}
                {lessorName}
              </Typography>
            </Grid>
          </Grid>
          <Grid className="d-flex flex-row m-2 align-items-start justify-content-start">
            <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
              Initial Rent :&nbsp;&nbsp;
            </Typography>
            <Typography
              sx={{ fontSize: 15, fontWeight: 700, color: blue[500] }}
            >
              ₹ {monthlyRent}
            </Typography>
          </Grid>
          <hr />

          <Button
            onClick={() => {
              handleReportClick();
            }}
            variant="contained"
            sx={{ backgroundColor: green[900] }}
          >
            Payment Report
          </Button>
          <ColorIcon>
            <Grid className="d-flex flex-column align-items-center justify-content-center">
              <LoopRoundedIcon
                onClick={handleRefresh}
                sx={{ color: blue[700], fontSize: 15 }}
              />
              <Grid className="d-flex flex-column align-items-start justify-content-start">
                <Typography
                  onClick={handleRefresh}
                  sx={{ fontSize: 8, color: blue[700] }}
                >
                  Refresh
                </Typography>
              </Grid>
            </Grid>
          </ColorIcon>

          <Grid container className="d-flex flex-row px-0 py-1">
            {getPaymentReportClick ? (
              <Grid item className="d-flex" sx={{ flexBasis: "50%" }}>
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
              </Grid>
            ) : null}

            {getPaymentReportClick ? (
              <Grid
                item
                className="d-flex align-items-end justify-content-end"
                sx={{
                  width: 120,
                  height: 40,
                  flexBasis: "30%",
                }}
              >
                <ExcelExport
                  excelData={getPaymentReportData}
                  fileName={"Payment Report"}
                  sx={{ color: "#ffffff", backgroundColor: deepOrange[900] }}
                />
              </Grid>
            ) : null}
          </Grid>

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
              <PaymentReportTable
                data={[getPaymentReport]}
                columns={paymentColumn}
                sx={{
                  width: "100%",
                  overFlowX: "scroll",
                  overFlowY: "scroll",
                  mt: 4,
                }}
              />
            )
          )}

          <Grid
            container
            className="d-flex flex-column "
            sx={{ flexBasis: "100%", mt: -4 }}
          >
            {/* {selectedMonth && ( */}
            <Grid
              item
              className="d-flex flex-column "
              sx={{ flexBasis: "100%", mt: 6 }}
            >
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                SD Amount :&nbsp;&nbsp;
              </Typography>

              <Grid item className="d-flex flex-row" sx={{ flexBasis: "100%" }}>
                <InputBoxComponent
                  label="SD Amount"
                  type="number"
                  placeholder="Enter Amount"
                  sx={{ width: 200 }}
                  name="sdAmount"
                  value={settlementAmt?.sdAmount}
                  onChange={(e) => {
                    updatedChange(e);
                  }}
                />

                <InputBoxComponent
                  label="Remarks"
                  type="text"
                  multiline
                  rows={2}
                  placeholder="Enter Amount"
                  sx={{ width: 300 }}
                  name="remark"
                  value={settlementAmt?.remark}
                  onChange={(e) => {
                    updatedChange(e);
                  }}
                />
                {settlementAmt?.sdAmount ? (
                  <Button
                    className="d-flex"
                    variant="contained"
                    size="small"
                    onClick={() => {
                      addSdAdjustmentAndCloseContract();
                      handleClick({
                        vertical: "bottom",
                        horizontal: "center",
                      });
                    }}
                    sx={{
                      width: 150,
                      fontSize: 10,
                      height: 30,
                      mt: 2,
                      backgroundColor: green[900],
                    }}
                  >
                    Make SD Payment
                  </Button>
                ) : null}

                <Snackbar
                  open={open}
                  anchorOrigin={{ vertical, horizontal }}
                  autoHideDuration={9000}
                  onClose={handleClose}
                  action={action}
                  key={vertical + horizontal}
                  // variant="success"
                >
                  <Alert
                    onClose={handleClose}
                    severity="warning"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    Note :Change the Rent End Date and close the Agreement !
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
            {/* )} */}
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.close();
              // setReload(true);
              setRefreshKey((prevKey) => prevKey + 1);
              setCloseButtonClicked(true); // Set closeButtonClicked to true when the button is clicked
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

export default SdAdjustmentModal;
