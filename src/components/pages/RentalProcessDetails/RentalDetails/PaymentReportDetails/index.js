import {
  Alert,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
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
} from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import ExcelExport from "../../../../../ExcelExport";
import PaymentReportTable from "../../../../molecules/PaymentReportTable";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import { AddRentActualDetails } from "../../../../services/RentActualApi";
import { useToasts } from "react-toast-notifications";
import ShowProvisionDetails from "../ShowProvisionDetails";
import SwitchComponent from "../../../../atoms/SwitchComponent";

const PaymentReportDetails = (props) => {
  const {
    uniqueID,
    branchIDforDue,
    rentStartDate,
    rentEndDate,
    lesseeBranchName,
    lessorName,
    monthlyRent,
    // reload,
  } = props;
  const { addToast } = useToasts();
  const [openShowProvisionModal, setOpenShowProvisionModal] = useState(false);
  const [getPaymentReport, setGetPaymentReport] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [settlementAmt, setSettlementAmt] = useState([]);
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  // const [reload, setReload] = useState(false);
  const [checked, setChecked] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
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
    getAllPaymentReportDetailsOfMonth();
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Clear selected month and year
      setSelectedMonth(null);
      setSelectedYear(null);

      // Clear existing payment report data
      setGetPaymentReport([]);

      // Open modal to select month and year again if needed
      // ... (Open your modal logic here)

      // Fetch new data based on the new month and year
      getAllPaymentReportDetailsOfMonth();
    }
  }, [refreshKey]);

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    if (value) {
      // Access value.month here
      setSelectedMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
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
    { length: endYear - startYear + 1 },
    (_, index) => ({
      id: startYear + index,
      label: `${startYear + index}`,
    })
  );

  const handleChange = (newValue) => {
    let value = newValue?.label;
    setSelectedYear(value);
  };

  const getAllPaymentReportDetailsOfMonth = async () => {
    const { data } = await getRentPaymentReportDetails(
      uniqueID,
      selectedMonth,
      selectedYear
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

  const addRentActualSettelement = async () => {
    let payload = [
      {
        contractID: getPaymentReport?.info?.uniqueID,
        branchID: getPaymentReport?.info?.branchID,
        year: selectedYear,
        month: selectedMonth,
        amount: settlementAmt?.amount,
        startDate: getPaymentReport?.info?.rentStartDate,
        endDate: getPaymentReport?.info?.rentEndDate,
        monthRent: getPaymentReport?.monthRent,
      },
    ];
    const { data, errRes } = await AddRentActualDetails(payload);
    // console.log(data, "data");
    if (data) {
      setSettlementAmt(data);
      getAllPaymentReportDetailsOfMonth();
      addToast("Amount Settled", { appearance: "success" });
      props.close();
      // window.location.reload();
    } else if (!data?.error) {
      // addToast(errRes?.msg, { appearance: "error" });
      addToast(<pre>{JSON.stringify(errRes, null, 4)}</pre>, {
        appearance: "error",
        autoClose: 9000,
      });
      props.close();

      window.location.reload();
    }
  };

  const calculateTDS = () => {
    return getPaymentReport?.gross > 20000
      ? (getPaymentReport?.gross * (10 / 100)).toFixed(2)
      : "";
  };

  const tdsData = calculateTDS(getPaymentReport?.gross);
  console.log(tdsData, "tdsData");

  const handleSwitchTDSChange = (checked) => {
    setChecked(checked);
    // If the switch is turned off, reset the GST value to null
    if (!checked) {
      setSettlementAmt((prevDetails) => ({
        ...prevDetails,
        gst: null,
      }));
    }
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
  // console.log(refreshKey, "refreshKey");
  return (
    <>
      <Modal
        show={props.show}
        close={() => {
          props.close();
          // setReload(true);
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
            style={{ fontWeight: 900, fontFamily: "sans-serif" }}
          >
            Payment Report
          </Modal.Title>
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
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {uniqueID}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch ID :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {branchIDforDue}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Branch Name :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
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
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {rentStartDate}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Rent End Date :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
              >
                {rentEndDate}
              </Typography>
            </Grid>
            <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                Lessor Name :&nbsp;&nbsp;
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: orange[900] }}
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
          <Grid container className="d-flex flex-row px-0 py-1">
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
          </Grid>

          {selectedMonth && (
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
          )}

          <Grid
            container
            className="d-flex flex-column "
            sx={{ flexBasis: "100%", mt: -4 }}
          >
            {selectedMonth && (
              <Grid
                item
                className="d-flex flex-column "
                sx={{ flexBasis: "100%" }}
              >
                <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                  Actual Amount :&nbsp;&nbsp;
                </Typography>
                <Grid
                  item
                  className="d-flex flex-row"
                  sx={{ flexBasis: "100%" }}
                >
                  <Typography>TDS Applicable?</Typography>
                  <SwitchComponent
                    // checked={parseInt(allNewContractDetails?.lessorRentAmount) > 20000}
                    checked={checked}
                    onChange={(isChecked) => handleSwitchTDSChange(isChecked)}
                  />

                  {checked && (
                    <InputBoxComponent
                      label="TDS Amount (10%)  "
                      type="number"
                      placeholder="Enter Amount"
                      value={tdsData}
                      onChange={(e) => updatedChange(e)}
                    />
                  )}
                  <InputBoxComponent
                    label="Amount"
                    type="number"
                    placeholder="Enter Amount"
                    sx={{ width: 200 }}
                    name="amount"
                    value={settlementAmt?.amount}
                    onChange={(e) => {
                      updatedChange(e);
                    }}
                  />

                  {settlementAmt?.amount ? (
                    <Button
                      className="d-flex"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        addRentActualSettelement();
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
                      Make Payment
                    </Button>
                  ) : null}

                  <Snackbar
                    open={open}
                    anchorOrigin={{ vertical, horizontal }}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    action={action}
                    key={vertical + horizontal}
                    variant="success"
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      variant="filled"
                      sx={{ width: "30%" }}
                    >
                      Note :Change the Rent End Date to close the Agreement!
                    </Alert>
                  </Snackbar>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.close();
              // setReload(true);
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

export default PaymentReportDetails;
