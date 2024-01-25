import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import ReusableTable from "./../../../../molecules/ReusableTable/index";
import { ProvisionsColumns } from "../../../../../constants/ProvisionList";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import {
  deleteProvisionDetailsOfSelectedTheBranch,
  getProvisionDetailsOfTheBranch,
} from "../../../../services/ProvisionsApi";
import PaymentReportTable from "../../../../molecules/PaymentReportTable";
import ProvisionDetailsTable from "../../../../molecules/ProvisionDetailsTable";

const ShowProvisionDetails = (props) => {
  let { uniqueID, selectedMonth } = props;
  const [inputValue, setInputValue] = useState("");
  const [selectedYear, setSelectedYear] = useState([]);
  const [getProvisionDetails, setGetProvisionDetails] = useState([]);
  const [removeRowData, setRemoveRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [confirmDeleteVal, setconfirmDeleteVal] = useState(null);


  useEffect(() => {
    getProvisionListOftheBranch();
  }, [selectedYear]);

  const handleChange = (newValue) => {
    // console.log(newValue, "newValue");
    setSelectedYear(newValue.label);
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

  // Generate an array of years, including the current MOnth
  const yearOptions = Array?.from({ length: 10 }, (_, index) => ({
    value: currentYear - index, // currentYear
    label: `${currentYear - index}`,
  }));

  const handleContractIDChange = (e) => {
    setInputValue(e.target.value);
  };

  const getProvisionListOftheBranch = async () => {
    const { data } = await getProvisionDetailsOfTheBranch(
      inputValue,
      selectedYear
    );
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetProvisionDetails(getData);
      } else {
        setGetProvisionDetails([]);
      }
    }
  };

  console.log(getProvisionDetails?.year,"getProvisionDetails");
  const handleClose = (event) => {
    // event.preventDefault();
    setOpen(false);
    // window.location.reload();
  };

  const handleConfirmDelete = (row) => {
    setconfirmDelete(true);
    // Extract contractID, year, and month from the row data
    const { contractID, year, month } = row;
    // Perform delete operation
    deleteTheBranchProvisionData(contractID, year, month);
  };

  const deleteTheBranchProvisionData = async (contractID, year, month) => {
    if (confirmDelete) {
      const { data } = await deleteProvisionDetailsOfSelectedTheBranch(
        contractID,
        year,
        month
      );
      if (data?.error === "false") {
        setRemoveRowData([]);
      }
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header className="bg-dark">
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#FFFFFF" }}
          >
            Provisions Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Container>
            <Row>
              <Col>
                <Grid className="d-flex" sx={{ mt: 0.5 }}>
                  <InputBoxComponent
                    // textLabel="ID"
                    placeholder="Enter Contract ID"
                    sx={{
                      width: 200,
                      mt: -1,
                      backgroundColor: "#ffffff",
                      borderRadius: 2,
                    }}
                    name="inputValue"
                    value={inputValue}
                    onChange={(e) => {
                      handleContractIDChange(e);
                    }}
                  />

                  <DropDownComponent
                    // label="Year"
                    placeholder="Select "
                    sx={{
                      width: 200,
                      mt: 0.5,
                      backgroundColor: "#ffffff",
                      borderRadius: 2,
                    }}
                    size="small"
                    options={yearOptions}
                    getOptionLabel={(option) => option?.label || option}
                    value={selectedYear}
                    onChange={handleChange}
                  />
                </Grid>
                {selectedYear && (
                  <ProvisionDetailsTable
                    data={getProvisionDetails}
                    columns={ProvisionsColumns}
                    handleDeleteClick={(val) => {
                      setOpen(true);
                      setconfirmDeleteVal(val);
                    }}
                  />
                )}

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
                    <Button onClick={handleConfirmDelete}>Delete</Button>
                  </DialogActions>
                </Dialog>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer className="bg-dark">
          <Button variant="contained" onClick={props.close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowProvisionDetails;