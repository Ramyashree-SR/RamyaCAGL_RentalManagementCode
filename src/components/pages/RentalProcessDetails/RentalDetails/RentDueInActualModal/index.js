import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import BranchReportTable from "../../../../molecules/BranchReportTable";
import { rentDueData } from "../../../../../constants/RentDueData";
import { Button } from "@mui/material";
import { getRentDueDetails } from "../../../../services/RentDueApi";
import RentDueDetails from "./../RentDueDetails/index";

const RentDueInActualModal = (props) => {
  let { uniqueID, activationStatusFilterDue } = props;
  const [rentDueDetails, setRentDueDetails] = useState([]);
  useEffect(() => {
    getAllRentDueDetailsByUniqueID();
  }, [uniqueID]);

  const getAllRentDueDetailsByUniqueID = async () => {
    const { data } = await getRentDueDetails(uniqueID);
    if (data) {
      if (data) {
        let getData = data?.data;
        setRentDueDetails(getData);
      }
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        // sx={{ width: "1024px" }}
      >
        <Modal.Header className="bg-dark">
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#FFFFFF" }}
          >
            RentDue Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Container>
            <Row>
              <Col>
                {uniqueID && (
                  <BranchReportTable
                    data={rentDueDetails}
                    columns={rentDueData}
                    sx={{ width: "100%" }}
                    showTotal={true}
                    activationStatusFilterDue={activationStatusFilterDue}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer className="bg-dark">
          <Button
            variant="contained"
            onClick={() => {
              props.close();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentDueInActualModal;
