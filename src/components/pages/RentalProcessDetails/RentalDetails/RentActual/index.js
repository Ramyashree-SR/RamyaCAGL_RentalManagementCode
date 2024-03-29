import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import {
  blue,
  deepOrange,
  deepPurple,
  green,
  pink,
  purple,
  red,
} from "@mui/material/colors";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import PaymentTableComponent from "../../../../molecules/PaymentTableComponent";
import { getRentPaymentReportDetails } from "../../../../services/PaymentReportApi";
import {
  AddRentActualDetails,
  addSDSettlementDetails,
  getAllRentContractDetailsByContractID,
  getSDSettlementDetails,
} from "../../../../services/RentActualApi";
import { useToasts } from "react-toast-notifications";
import RentActualDetails from "../RentActualDetails";
import CloseIcon from "@mui/icons-material/Close";
import { AllPaymentColumns } from "../../../../../constants/AllPaymentReport";
import { paymentColumn } from "../../../../../constants/PaymentReport";
import PaymentReportTable from "../../../../molecules/PaymentReportTable";
import SwitchComponent from "../../../../atoms/SwitchComponent";
import ShowProvisionDetails from "../ShowProvisionDetails";
import { getProvisionDetailsOfTheBranch } from "../../../../services/ProvisionsApi";
import BranchReportTable from "../../../../molecules/BranchReportTable";
import RentDueDetails from "../RentDueDetails";
import RentDueInActualModal from "../RentDueInActualModal";
import VarianceInActualModal from "../VarianceInActualModal";
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

const RentActual = (props) => {
  const { setRefreshKey, refreshKey } = props;
  const { addToast } = useToasts();
  const [RentActualIDs, setRentActualIDs] = useState("");
  const [fullscreen, setFullscreen] = useState(true);
  const [rentActualData, setRentActualData] = useState([]);
  const [getPaymentReport, setGetPaymentReport] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [openActualDetailsModal, setOpenActualDetailsModal] = useState(false);
  const [settlementAmt, setSettlementAmt] = useState([]);
  const [checked, setChecked] = useState(false);
  const [openShowProvisionModal, setOpenShowProvisionModal] = useState(false);
  const [openShowRentDueModal, setOpenShowRentDueModal] = useState(false);
  const [openShowVarianceModal, setOpenShowVarianceModal] = useState(false);
  const [getProvisionDetails, setGetProvisionDetails] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const action = (
    <React.Fragment>
      {/* <Button color="warning" size="small" onClick={handleClose}>
        UNDO
      </Button> */}

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

  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Clear existing data
      setRentActualIDs("");
      setSelectedYear(null);
      setSelectedMonth(null);
      setGetPaymentReport([]);
      setRentActualData([]);
      // Fetch new data based on the new month and year
      getAllPaymentReportDetailsOfMonth();
      // getAllRentActualDetailsByUniqueID();
    }
  }, [refreshKey]);

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    // console.log(value, "value");

    if (value) {
      // Access value.month here
      setSelectedMonth(value);
      getAllPaymentReportDetailsOfMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
  };
  const updateChange = (e) => {
    // console.log(e, "e");
    setRentActualIDs(e.target.value);
    // getAllRentActualDetailsByUniqueID(e.target.value);
  };

  const handleChange = (newValue) => {
    let value = newValue?.label;
    setSelectedYear(value);
  };

  useEffect(() => {
    getAllRentActualDetailsByUniqueID();
  }, [RentActualIDs]);

  useEffect(() => {
    getAllPaymentReportDetailsOfMonth();
  }, [selectedMonth]);

  const updatedChange = (e) => {
    setSettlementAmt({
      ...settlementAmt,
      [e.target.name]: e.target.value,
    });
  };
  const endDateObject = new Date();

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }
  const currentYear = endDateObject?.getFullYear();

  const yearOptions = Array.from({ length: 10 }, (_, index) => ({
    id: currentYear - index, // currentYear
    label: `${currentYear - index}`,
  }));

  const getAllPaymentReportDetailsOfMonth = async () => {
    const { data } = await getRentPaymentReportDetails(
      rentActualData?.uniqueID,
      selectedMonth,
      selectedYear,
      "view"
    );
    // console.log(data, "ReportData");
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetPaymentReport(getData);
      } else {
        setGetPaymentReport([]);
      }
    }
  };

  const getAllRentActualDetailsByUniqueID = async () => {
    const { data } = await getAllRentContractDetailsByContractID(RentActualIDs);
    if (data) {
      if (data) {
        let getData = data?.data;
        setRentActualData(getData);
      }
    }
  };

  const addRentActualSettelement = async () => {
    let payload = [
      {
        contractID: getPaymentReport?.info?.uniqueID,
        branchID: getPaymentReport?.info?.branchID,
        year: selectedYear,
        month: selectedMonth,
        amount: settlementAmt?.amount,
        tdsAmount: checked ? tdsData : 0,
        startDate: getPaymentReport?.info?.rentStartDate,
        endDate: getPaymentReport?.info?.rentEndDate,
        monthRent: getPaymentReport?.monthRent,
      },
    ];

    const { data, errRes } = await AddRentActualDetails("NotConfirm", payload);
    if (data) {
      setSettlementAmt(data);
      getAllPaymentReportDetailsOfMonth();
      addToast("Amount Settled", { appearance: "success" });
      props.close();
    } else if (!data?.error) {
      // addToast(errRes?.msg, { appearance: "error" });
      addToast(<pre>{JSON.stringify(errRes, null, 4)}</pre>, {
        appearance: "error",
        autoClose: 9000,
      });
      props.close();
    }
  };

  const calculateTDS = () => {
    return (getPaymentReport?.gross * (10 / 100)).toFixed(0);
  };

  const tdsData = calculateTDS(getPaymentReport?.gross);

  const handleSwitchTDSChange = () => {
    setChecked(!checked);
    // If the switch is turned off, reset the TDS value to null
    if (!checked) {
      setSettlementAmt((prevDetails) => ({
        ...prevDetails,
        tdsAmount: null,
      }));
    }
  };

  const getProvisionListOftheBranch = async () => {
    try {
      const { data } = await getProvisionDetailsOfTheBranch(RentActualIDs);
      if (data) {
        if (data) {
          let getData = data?.data;
          setGetProvisionDetails(getData);
        } else {
          setGetProvisionDetails([]);
        }
      }
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching provision details:", error);
    }
  };
  const handleActualClick = () => {
    setOpenActualDetailsModal(true);
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await getAllPaymentReportDetailsOfMonth();
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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="w-100"
      >
        <Modal.Header>
          <ColorIcon>
            <Grid className="d-flex flex-column align-items-center justify-content-center">
              <LoopRoundedIcon
                onClick={handleRefresh}
                sx={{ color: green[700] }}
              />
              <Grid className="d-flex flex-column align-items-start justify-content-start">
                <Typography
                  onClick={handleRefresh}
                  sx={{ fontSize: 12, color: green[700] }}
                >
                  Refresh
                </Typography>
              </Grid>
            </Grid>
          </ColorIcon>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 600, fontFamily: "sans-serif" }}
          >
            Rent Actual Information
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
          <Container>
            <Row>
              <Col xs={12}>
                <Grid
                  container
                  className="d-flex"
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    mt: -2,
                    ml: -6,
                    flexBasis: "80%",
                  }}
                >
                  <Grid
                    item
                    className="d-flex"
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      position: "fixed",
                      mt: -2,
                      m: 0,
                      flexBasis: "80%",
                    }}
                  >
                    <InputBoxComponent
                      label="Contract ID"
                      type="number"
                      placeholder="Enter Contact ID"
                      sx={{ width: 200, mr: 2, mt: 1 }}
                      name="RentActualIDs"
                      value={RentActualIDs}
                      onChange={(e) => updateChange(e)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  className="d-flex align-item-end justify-content-end"
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    flexBasis: "20%",
                    mt: 1.5,
                    position: "fixed",
                    ml: 100,
                    // top: 3,
                    // left: 10,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleActualClick()}
                    sx={{ backgroundColor: red[900] }}
                  >
                    Rent Actual Details
                  </Button>
                </Grid>
                <RentActualDetails
                  show={openActualDetailsModal}
                  close={() => setOpenActualDetailsModal(false)}
                  fullscreen={fullscreen}
                  refreshKey={refreshKey}
                  setRefreshKey={setRefreshKey}
                />

                {RentActualIDs && (
                  <Grid
                    container
                    className="d-flex flex-row"
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      mt: 10,
                      position: "fixed",
                      // top: 3,
                      marginLeft: -5,
                    }}
                  >
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "35%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Contract ID :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, fontWeight: 700, color: pink[700] }}
                      >
                        {/* {rentActualData?.uniqueID} */}
                        {RentActualIDs}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "35%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Branch ID :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, fontWeight: 700, color: pink[700] }}
                      >
                        {rentActualData.branchID}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "30%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Branch Name :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, fontWeight: 700, color: pink[700] }}
                      >
                        {rentActualData?.lesseeBranchName}
                      </Typography>
                    </Grid>
                  </Grid>
                )}

                {RentActualIDs && (
                  <Grid
                    container
                    className="d-flex flex-row "
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      mt: 13,
                      position: "fixed",
                      marginLeft: -5,
                    }}
                  >
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "35%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Rent Start Date :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: pink[700],
                        }}
                      >
                        {rentActualData?.rentStartDate}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "35%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Rent End Date :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: pink[700],
                        }}
                      >
                        {rentActualData?.rentEndDate}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "30%" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Lessor Name :&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: pink[700],
                        }}
                      >
                        {rentActualData?.lessorName}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {RentActualIDs && (
                  <hr
                    style={{
                      marginTop: 140,
                      marginLeft: -50,
                      // position: "fixed",
                    }}
                  />
                )}

                {/* <Grid
                container
                  className="d-flex flex-column "
                  sx={{
                    position: "relative",
                    top: 4,
                    left: 0,
                   
                  }}
                > */}
                {RentActualIDs && (
                  <Grid item className="d-flex flex-row" sx={{ mt: 0 }}>
                    <Grid
                      className="d-flex align-items-start justify-content-start"
                      sx={{
                        flexBasis: "30%",
                        ml: -4,
                        position: "fixed",
                      }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Payment Report of the Branch-&nbsp;&nbsp;
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: red[900],
                        }}
                      >
                        {rentActualData?.lesseeBranchName}
                      </Typography>
                    </Grid>
                    <Grid
                      className="d-flex align-items-end justify-content-end"
                      sx={{ flexBasis: "70%", position: "fixed", ml: 70 }} //position: "relative", ml: 40
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenShowRentDueModal(true);
                        }}
                        sx={{ backgroundColor: green[800] }}
                      >
                        Rent Due Details
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenShowProvisionModal(true);
                          getProvisionListOftheBranch();
                        }}
                        sx={{ backgroundColor: blue[900], ml: 1 }}
                      >
                        Provisions Details
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenShowVarianceModal(true);
                        }}
                        sx={{ backgroundColor: pink[800], ml: 1 }}
                      >
                        Variance Details
                      </Button>
                    </Grid>
                    <ShowProvisionDetails
                      show={openShowProvisionModal}
                      close={() => setOpenShowProvisionModal(false)}
                      uniqueID={RentActualIDs}
                      selectedYear={selectedYear}
                      selectedMonth={selectedMonth}
                      getProvisionDetails={getProvisionDetails}
                      getProvisionListOftheBranch={getProvisionListOftheBranch}
                    />

                    <RentDueInActualModal
                      show={openShowRentDueModal}
                      close={() => setOpenShowRentDueModal(false)}
                      uniqueID={RentActualIDs}
                      activationStatusFilterDue={
                        props.activationStatusFilterDue
                      }
                    />

                    <VarianceInActualModal
                      show={openShowVarianceModal}
                      close={() => setOpenShowVarianceModal(false)}
                      RentContractID={RentActualIDs}
                    />
                  </Grid>
                )}

                {RentActualIDs && (
                  <Grid
                    container
                    className="d-flex"
                    sx={{ flexBasis: "100%", mt: 7 }}
                  >
                    <Grid
                      item
                      className="d-flex flex-row"
                      sx={{ flexBasis: "50%" }}
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
                    </Grid>

                    <Grid
                      className="d-flex flex-row"
                      sx={{ ml: 80, position: "fixed" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Actual Amount:
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: pink[500],
                        }}
                      >
                        {getPaymentReport?.actualAmount}
                      </Typography>

                      <Grid className="d-flex" sx={{ ml: 10 }}>
                        <Typography
                          sx={{ fontSize: 15, fontWeight: 700, ml: 10 }}
                        >
                          SD Amount :
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: pink[900],
                          }}
                        >
                          {getPaymentReport?.sdAmount}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid
                  className="d-flex"
                  sx={{ position: "fixed", width: "90%", ml: -4 }}
                >
                  {loading ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                        style={{ width: "1rem", height: "1rem" }}
                      ></div>
                      <span className="visible text-primary">Loading...</span>
                    </div>
                  ) : (
                    selectedMonth && (
                      <PaymentReportTable
                        data={[getPaymentReport]}
                        columns={paymentColumn}
                        sx={{
                          mt: 3,
                          // width: "100%",
                        }}
                      />
                    )
                  )}
                </Grid>

                <Grid
                  container
                  className="d-flex align-items-start justify-content-start"
                  sx={{ flexBasis: "100%" }}
                >
                  {selectedMonth && (
                    <Grid
                      item
                      className="d-flex flex-column align-items-center justify-content-center w-90"
                      sx={{ mt: 13, position: "fixed" }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                        Actual Amount :&nbsp;&nbsp;
                      </Typography>
                      <Grid className="d-flex ">
                        <Typography>TDS Applicable?</Typography>
                        <SwitchComponent
                          // checked={parseInt(allNewContractDetails?.lessorRentAmount) > 20000}
                          checked={checked}
                          onChange={(isChecked) =>
                            handleSwitchTDSChange(isChecked)
                          }
                        />

                        {checked && (
                          <InputBoxComponent
                            label="TDS Amount (10%)  "
                            type="number"
                            placeholder="Enter Amount"
                            sx={{ width: 150 }}
                            name="tdsData"
                            value={checked ? tdsData : 0}
                            onChange={(e) => updatedChange(e)}
                            disabled
                          />
                        )}
                        <InputBoxComponent
                          label="Amount"
                          type="text"
                          placeholder="Enter Amount"
                          sx={{ width: 150 }}
                          name="amount"
                          value={settlementAmt?.amount}
                          onChange={(e) => {
                            updatedChange(e);
                          }}
                          // disabled
                        />

                        {settlementAmt?.amount ? (
                          <Button
                            className="d-flex "
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
                            Actual Amount
                          </Button>
                        ) : null}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
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
              </Col>
            </Row>
          </Container>
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

export default RentActual;
