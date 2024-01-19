import { Button } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";

const Variance = (props) => {
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
            Variance Calculation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Variance;
