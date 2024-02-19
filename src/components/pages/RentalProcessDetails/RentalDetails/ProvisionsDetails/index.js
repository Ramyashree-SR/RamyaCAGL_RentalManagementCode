import {
  Alert,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import {
  blue,
  deepOrange,
  green,
  pink,
  purple,
  red,
  yellow,
} from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import ShowProvisionDetails from "../ShowProvisionDetails";
import { getProvisionDetailsOfTheBranch } from "../../../../services/ProvisionsApi";

const ProvisionsDetails = (props) => {
  const {
    rentEndDate,
    rentStartDate,
    branchIDData,
    lessorName,
    AddProvisionFortheMonth,
    addProvisions,
    setAddProvisions,
    uniqueID,
    lesseeBranchName,
    typeProvisionsData,
    setTypeProvisionsData,
    setRefreshKey,
    monthlyRent,
  } = props;
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const [openShowProvisionModal, setOpenShowProvisionModal] = useState(false);
  const [getProvisionDetails, setGetProvisionDetails] = useState([]);

  const { vertical, horizontal, open } = state;
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleClick = (newState) => {
    setState({ ...newState, open: true });
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
  const [selectedYear, setSelectedYear] = useState(null);

  const handleChange = (name, newValue) => {
    setAddProvisions({
      ...addProvisions,
      [name]: newValue,
    });
    setSelectedYear(newValue);
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

  const handleMonthChange = (name, newValue) => {
    setAddProvisions({
      ...addProvisions,
      [name]: newValue,
    });
    if (newValue && newValue?.label) {
      // Access newValue.month here
      setSelectedMonth(newValue?.label);
    } else {
      console.error("newValue or newValue.month is undefined");
    }
  };

  const updateChange = (e) => {
    setAddProvisions({
      ...addProvisions,
      [e.target.name]: e.target.value,
    });
  };

  const typeProvision = [
    { id: 1, label: "Make" },
    { id: 2, label: "Reverse" },
  ];

  const handleTypeChange = (value) => {
    let val = value?.label;
    setTypeProvisionsData(val);
  };

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
  const yearOptions = Array.from({ length: 1 }, (_, index) => ({
    value: currentYear, // currentYear
    label: `${currentYear}`,
  }));

  // Generate an array of months, including the current month
  const monthOptions = Array.from({ length: 3 }, (_, index) => {
    const date = new Date();
    date.setMonth(index);
    return {
      value: index + 1, // Months are zero-indexed, so add 1
      label: date.toLocaleString("default", { month: "long" }),
    };
  });
  const getProvisionListOftheBranch = async () => {
    try {
      const { data } = await getProvisionDetailsOfTheBranch(uniqueID);
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
            width="90px"
            height="43px"
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
          <Container>
            <Row>
              <Col xs={12}>
                <Grid
                  className="d-flex flex-row m-1"
                  sx={{ fontSize: 15, fontWeight: 700 }}
                >
                  <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Contract ID :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: red[900] }}
                    >
                      {uniqueID}
                    </Typography>
                  </Grid>
                  <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Branch ID :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: red[900] }}
                    >
                      {branchIDData}
                    </Typography>
                  </Grid>
                  <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Branch Name :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: red[900] }}
                    >
                      {lesseeBranchName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  className="d-flex flex-row m-1"
                  sx={{ fontSize: 15, fontWeight: 700 }}
                >
                  <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Rent Start Date :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: red[900] }}
                    >
                      {rentStartDate}
                    </Typography>
                  </Grid>
                  <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Rent End Date :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: red[900] }}
                    >
                      {rentEndDate}
                    </Typography>
                  </Grid>
                  <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Lessor Name :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: red[900] }}
                    >
                      {" "}
                      {lessorName}
                    </Typography>
                  </Grid>
                </Grid>
              </Col>
              <hr />
              <Col xs={12}>
                <Grid className="d-flex flex-row" sx={{ flexBasis: "35%" }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                    Month Rent :&nbsp;&nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: yellow[900],
                    }}
                  >
                    ₹{monthlyRent}
                  </Typography>
                </Grid>
                <br />
                <Grid className="d-flex align-items-between justify-content-between">
                  <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                    Provision for the month :
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpenShowProvisionModal(true);
                      getProvisionListOftheBranch();
                    }}
                    sx={{ backgroundColor: green[800] }}
                  >
                    View Provisions Details
                  </Button>

                  <ShowProvisionDetails
                    show={openShowProvisionModal}
                    close={() => setOpenShowProvisionModal(false)}
                    uniqueID={uniqueID}
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    getProvisionDetails={getProvisionDetails}
                    getProvisionListOftheBranch={getProvisionListOftheBranch}
                  />
                </Grid>

                <Grid className="d-flex align-items-start justify-content-start mt-2">
                  <DropDownComponent
                    label="Provision Type"
                    placeholder="Select "
                    sx={{ width: 200 }}
                    size="small"
                    options={Array.isArray(typeProvision) ? typeProvision : []}
                    getOptionLabel={(option) =>
                      option?.label || typeProvisionsData
                    }
                    name="provisiontype"
                    value={typeProvisionsData}
                    onChange={handleTypeChange}
                    required={true}
                  />
                </Grid>

                {typeProvisionsData === "Make" ||
                typeProvisionsData === "Reverse" ? (
                  <Grid className="d-flex  py-4 ">
                    <DropDownComponent
                      label="Year"
                      placeholder="Select "
                      sx={{ width: 200, ml: 0 }}
                      size="small"
                      options={yearOptions}
                      value={addProvisions?.year || null}
                      onChange={(val) => {
                        handleChange("year", val);
                      }}
                      getOptionLabel={(option) =>
                        option?.label || addProvisions?.year
                      }
                      required={true}
                    />
                    <DropDownComponent
                      label="Month"
                      placeholder="Select "
                      sx={{ width: 200 }}
                      size="small"
                      options={monthOptions}
                      name="month"
                      value={addProvisions?.month || null}
                      onChange={(val) => {
                        handleMonthChange("month", val);
                      }}
                      getOptionLabel={(option) =>
                        option?.label || addProvisions?.month
                      }
                      required={true}
                    />

                    <InputBoxComponent
                      label="Provision Amount"
                      placeholder="Provision Amount"
                      sx={{ width: 200, mt: -4.2, ml: 3 }}
                      name="provisionAmount"
                      value={addProvisions?.provisionAmount}
                      onChange={(e) => updateChange(e)}
                      required={true}
                    />
                  </Grid>
                ) : null}
                {typeProvisionsData === "Make" ||
                typeProvisionsData === "Reverse" ? (
                  <Grid className="d-flex flex-row ">
                    <InputBoxComponent
                      label="&nbsp;&nbsp;&nbsp;Remarks :"
                      placeholder="Type here..."
                      sx={{ width: 400, ml: 2, mt: -3 }}
                      rows={2}
                      name="remark"
                      value={addProvisions?.remark}
                      multiline
                      onChange={(e) => updateChange(e)}
                    />
                  </Grid>
                ) : null}
                <Grid className="d-flex flex-row mt-1 ">
                  {typeProvisionsData === "Make" ? (
                    <Grid className="d-flex " sx={{ ml: 2 }}>
                      <Button
                        onClick={() => {
                          AddProvisionFortheMonth();
                          handleClick({
                            vertical: "bottom",
                            horizontal: "center",
                          });
                        }}
                        variant="contained"
                        sx={{ m: 1, background: "#238520" }}
                      >
                        Provision
                      </Button>
                    </Grid>
                  ) : null}
                  {typeProvisionsData === "Reverse" ? (
                    <Grid className="d-flex " sx={{ ml: 2 }}>
                      <Button
                        onClick={() => {
                          AddProvisionFortheMonth();
                          // handleClick({
                          //   vertical: "bottom",
                          //   horizontal: "center",
                          // });
                        }}
                        variant="contained"
                        sx={{
                          m: 1,
                          background:
                            selectedMonth === `${currentMonth}`
                              ? "#238520"
                              : blue[900],
                        }}
                      >
                        {selectedMonth === `${currentMonth}`
                          ? "Reverse Provision(same Month)"
                          : "Reverse Provision"}
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              </Col>

              <Snackbar
                open={open}
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={1000}
                onClose={handleClose}
                action={action}
                key={vertical + horizontal}
                variant="error"
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  variant="filled"
                  sx={{ width: "30%" }}
                >
                  {currentYear && selectedMonth === `${currentMonth}`
                    ? "Note:Please do the payment for the previous month"
                    : "Provision Done"}
                </Alert>
              </Snackbar>
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

export default ProvisionsDetails;
{
  /* <InputBoxComponent
                    label="Month"
                    placeholder="Month"
                    sx={{ width: 300, ml: 0, mt: -1.3 }}
                    value={addProvisions?.month}
                    onChange={(e) => updateChange(e)}
                  /> */
}

{
  /* <InputBoxComponent
                    label="Year"
                    placeholder="Year"
                    sx={{ width: 300, ml: 0, mt: -1.3 }}
                    value={addProvisions.year}
                    onChange={(e) => updateChange(e)}
                  /> */
}

{
  /* <InputBoxComponent
                    label="Contract ID"
                    placeholder="Contract ID"
                    sx={{ width: 200, mt: -1.3 }}
                    value={uniqueID}
                    onChange={(e) => updateChange(e)}
                  /> */
}
