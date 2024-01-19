import {
  Alert,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

const ProvisionsDetails = (props) => {
  const {
    rentEndDate,
    rentStartDate,
    branchIDforDue,
    lessorName,
    AddProvisionFortheMonth,
    addProvisions,
    setAddProvisions,
    uniqueID,
    lesseeBranchName,
    typeProvisionsData,
    setTypeProvisionsData,
  } = props;
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
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

  const handleChange = (name, newValue) => {
    setAddProvisions({
      ...addProvisions,
      [name]: newValue,
    });
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
  const [selectedMonth, setSelectedMonth] = useState(null);
  const handleMonthChange = (name, newValue) => {
    setAddProvisions({
      ...addProvisions,
      [name]: newValue,
    });
    if (newValue && newValue.month) {
      // Access newValue.month here
      setSelectedMonth(newValue);
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
    // console.log(value, "value");
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

  // Generate an array of years, including the current MOnth
  const yearOptions = Array.from({ length: 1 }, (_, index) => ({
    value: currentYear, // currentYear
    label: `${currentYear}`,
  }));

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
                      {branchIDforDue}
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
                <Grid className="d-flex align-items-center justify-content-start">
                  <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                    Provision for the month :
                  </Typography>

                  <DropDownComponent
                    label="Provision Type"
                    placeholder="Select "
                    sx={{ width: 200, ml: 3 }}
                    size="small"
                    options={Array.isArray(typeProvision) ? typeProvision : []}
                    name="provisiontype"
                    value={typeProvisionsData}
                    onChange={handleTypeChange}
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
                      value={addProvisions?.year}
                      onChange={(val) => {
                        handleChange("year", val);
                      }}
                    />
                    <DropDownComponent
                      label="Month"
                      placeholder="Select "
                      sx={{ width: 200, ml: 0 }}
                      size="small"
                      options={months}
                      name="month"
                      value={addProvisions?.month}
                      onChange={(val) => {
                        handleMonthChange("month", val);
                      }}
                    />

                    <InputBoxComponent
                      label="Provision Amount"
                      placeholder="Provision Amount"
                      sx={{ width: 200, ml: 0, mt: -1.3 }}
                      name="provisionAmount"
                      value={addProvisions?.provisionAmount}
                      onChange={(e) => updateChange(e)}
                    />
                  </Grid>
                ) : null}
                {typeProvisionsData === "Make" ||
                typeProvisionsData === "Reverse" ? (
                  <Grid className="d-flex flex-row ">
                    <InputBoxComponent
                      textLabel="Remarks :"
                      placeholder="Type here..."
                      sx={{ width: 400 }}
                      rows={4}
                      name="remark"
                      value={addProvisions?.remark}
                      multiline
                      onChange={(e) => updateChange(e)}
                    />
                  </Grid>
                ) : null}
                <Grid className="d-flex flex-row mt-1 ">
                  {typeProvisionsData === "Make" ? (
                    <Grid>
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
                          handleClick({
                            vertical: "bottom",
                            horizontal: "center",
                          });
                        }}
                        variant="contained"
                        sx={{ m: 1, background: "#238520" }}
                      >
                        Reverse
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
                message={
                  typeProvisionsData === "Make"
                    ? "Provision Made Successfully"
                    : "Provision Reversed Successfully"
                }
                action={action}
                key={vertical + horizontal}
                variant="success"
              />
            </Row>
          </Container>
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
