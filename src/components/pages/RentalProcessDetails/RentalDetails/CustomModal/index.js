import React from "react";
import { Box, Grid } from "@mui/material";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DatePickerComponent from "../../../../atoms/DatePickerComponent";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalFooter,
  Row,
} from "react-bootstrap";

const CustomModal = (props) => {
  return (
    <Modal
      show={props.show}
      close={props.close}
      // aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      // className="w-100"
    >
      <Modal.Header closeButton>
        <Modal.Title>Agreement Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12}>
              <Grid className="d-flex m-2">
                <InputBoxComponent
                  label="Agreement Sign Date"
                  placeholder=" Agreement Sign Dtae"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.agreementSignDate}
                  readOnly
                />
                <InputBoxComponent
                  label="Tenure Period"
                  placeholder=" Tenure Period"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.agreementTenure}
                  readOnly
                />
                <InputBoxComponent
                  label="Agreement Start Date"
                  placeholder="Agreement Start Date"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.agreementStartDate}
                  readOnly
                />
              </Grid>
            </Col>
            <Col xs={12}>
              <Grid className="d-flex m-2">
                <InputBoxComponent
                  label="Agreement End Date"
                  placeholder="Agreement End Date"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.agreementEndDate}
                  readOnly
                />
                <InputBoxComponent
                  label="Rent Start Date"
                  placeholder=" Rent Start Date "
                  sx={{ width: 200 }}
                  value={props.selectedItem?.rentStartDate}
                  readOnly
                />
                <InputBoxComponent
                  label="Rent End Date"
                  placeholder=" Rent End Date "
                  sx={{ width: 200 }}
                  value={props.selectedItem?.rentEndDate}
                  readOnly
                />
              </Grid>
            </Col>
            <Col xs={12}>
              <Grid className="d-flex m-2">
                <InputBoxComponent
                  label="Security Deposit"
                  placeholder="Security Deposit"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.securityDepositAmount}
                  readOnly
                />
                <InputBoxComponent
                  label="Monthly Rent"
                  placeholder=" Monthly Rent"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.rentAmount}
                  readOnly
                />
                <InputBoxComponent
                  label="First Month Value"
                  placeholder="First Month Value"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.firstMonthvalue}
                  readOnly
                />
              </Grid>
            </Col>

            <Col xs={12}>
              <Grid className="d-flex m-2">
                <InputBoxComponent
                  label="Last Month Value"
                  placeholder="Last Month Value"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.lastMonthvalue}
                  readOnly
                />
                <InputBoxComponent
                  label="Standard Deduction"
                  placeholder=" Standard Deduction"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.standardDeducition}
                  readOnly
                />
                <InputBoxComponent
                  label="TDS (%)"
                  placeholder=" TDS %"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.tds}
                  readOnly
                />
              </Grid>
            </Col>
            <Col xs={12}>
              <Grid className="d-flex m-2">
                <InputBoxComponent
                  label="First Rent Date."
                  placeholder=" First Rent Date"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.rentStartDate}
                  readOnly
                />
                <InputBoxComponent
                  label="Last Rent Date"
                  placeholder="Last Rent Date"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.rentStartDate}
                  readOnly
                />
                <InputBoxComponent
                  label="Renewal (%)"
                  placeholder="Renewal (%)"
                  sx={{ width: 200 }}
                  value={props.selectedItem?.escalation}
                  readOnly
                />
              </Grid>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.close}>Close</Button>
      </Modal.Footer>
      {/* </Fade> */}
    </Modal>
  );
};

export default CustomModal;
