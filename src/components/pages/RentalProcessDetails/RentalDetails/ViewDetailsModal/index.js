import React, { useEffect, useState } from "react";
import { Backdrop, Box, Fade, Grid } from "@mui/material";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { getAllRentContractDetails } from "../../../../services/RentContractsApi";

const ViewDetailsModal = (props) => {
  const [recipientCount, setRecipientCount] = useState(1);
  // console.log(props.selectedItem, "props.selectedItem");
  return (
    <Modal
      show={props.show}
      close={props.close}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="md"
      className="w-100"
    >
      <Modal.Header>
        <Modal.Title>Bank Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Container>
          <Row> */}
        {/* {Object.keys(props.selectedItem).length > 0 &&
              props.selectedItem?.recipiants?.map((recipient, index) => { */}
        {/* <Col xs={12} md={12}>
              <Grid className="d-flex m-2"> */}
        {/* {Array.from({ length: recipientCount }, (_, index) =>( */}

        {props?.selectedItem?.recipiants?.map((recipient, index) => (
          <Grid className="d-flex flex-column m-2" key={index}>
            <InputBoxComponent
              label="Bank Name"
              placeholder=" Bank Name"
              sx={{ width: 400 }}
              value={recipient?.lessorBankName}
              readonly={true}
            />

            <InputBoxComponent
              label="Branch Name"
              placeholder=" Branch Name"
              sx={{ width: 400 }}
              value={recipient?.lessorBranchName}
              readonly
              // onChange={(e) => updatChange(e)}
            />

            <InputBoxComponent
              label="Account Number"
              placeholder=" Account Number"
              sx={{ width: 400 }}
              value={recipient?.lessorAccountNumber}
              readonly
              // onChange={(e) => updatChange(e)}
            />
            <InputBoxComponent
              label="IFSC Code"
              placeholder=" IFSC Code"
              sx={{ width: 400 }}
              value={recipient?.lessorIfscNumber}
              readonly={true}
              // onChange={(e) => updatChange(e)}
            />
          </Grid>
        ))}
        {/* ))} */}
        {/* </Grid>
            </Col>
          </Row> */}

        {/* <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row> */}
        {/* </Container> */}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDetailsModal;
