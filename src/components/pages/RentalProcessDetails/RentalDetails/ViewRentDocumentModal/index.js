
import { Grid } from "@mui/material";
import React from "react";
import { Button, Modal } from "react-bootstrap";

const ViewRentDocumentModal = (props) => {
  return(
    <Modal
    show={props.show}
    close={props.close}
    // aria-labelledby="contained-modal-title-vcenter"
    centered
    size="lg"
    // className="w-100"
  >
    <Modal.Header closeButton>
      <Modal.Title>Document Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Grid>
        {/* <a
                href={`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"AgreementFile"}`}
                //http://localhost:9666/viewimage?mainDealerID=${mainDealerId}&documentType=${"AgreementFile"}
                //`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"AgreementFile"}`
                target="_blank"
                rel="noreferrer"
                // onClick={() =>
                //   handleAgreementFileView(mainDealerId, "AgreementFile")
                // }
              >
                View
              </a> */}
        </Grid>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
        </Modal>
  )
};

export default ViewRentDocumentModal;
