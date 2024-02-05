import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Snackbar,
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
import CloseIcon from "@mui/icons-material/Close";
import ProvisionDetailsTable from "../../../../molecules/ProvisionDetailsTable";
import { useToasts } from "react-toast-notifications";

const ShowProvisionDetails = (props) => {
  const { addToast } = useToasts();
  const [removeRowData, setRemoveRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [confirmDeleteVal, setconfirmDeleteVal] = useState(null);
  const [yearData, setYearData] = useState(null);
  const [contractID, setContractID] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [state, setState] = useState({
    opened: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const { vertical, horizontal, opened } = state;

  const handleClick = (newState) => {
    setState({ ...newState, opened: true });
  };

  const handleClosed = () => {
    setState({ ...state, opened: false });
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClosed}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Clear existing payment report data
      setRemoveRowData([]);
      // Fetch new data based on the new month and year
      deleteTheBranchProvisionData();
    }
  }, [refreshKey]);

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
  const yearOptions = Array?.from({ length: 3 }, (_, index) => ({
    id: currentYear - index, // currentYear //currentYear - index
    label: `${currentYear - index}`,
  }));

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleConfirmDelete = (row) => {
    setconfirmDelete(true);
    deleteTheBranchProvisionData();
  };

  const deleteTheBranchProvisionData = async () => {
    if (confirmDelete) {
      const { data, errRes } = await deleteProvisionDetailsOfSelectedTheBranch(
        contractID,
        yearData,
        monthData
      );
      if (data) {
        setRemoveRowData([]);
        handleClose();
        props.close();
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
                <ProvisionDetailsTable
                  data={props?.getProvisionDetails}
                  columns={ProvisionsColumns}
                  setOpen={setOpen}
                  setconfirmDeleteVal={setconfirmDeleteVal}
                  setYearData={setYearData}
                  setContractID={setContractID}
                  setMonthData={setMonthData}
                  yearData={yearData}
                />

                <Dialog
                  open={open}
                  onClose={handleClosed}
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

                <Snackbar
                  open={opened}
                  anchorOrigin={{ vertical, horizontal }}
                  autoHideDuration={3000}
                  onClose={handleClosed}
                  action={action}
                  key={vertical + horizontal}
                  variant="error"
                >
                  <Alert
                    onClose={handleClosed}
                    severity="success"
                    variant="filled"
                  >
                    Provision Deleted Succesfully
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={opened}
                  anchorOrigin={{ vertical, horizontal }}
                  autoHideDuration={3000}
                  onClose={handleClosed}
                  action={action}
                  key={vertical + horizontal}
                  variant="error"
                >
                  <Alert
                    onClose={handleClosed}
                    severity="warning"
                    variant="filled"
                  >
                    Provision Deletion Failed[ ALLOWED ONLY FOR CURRENT
                    MONTH&YEAR ]
                  </Alert>
                </Snackbar>
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
