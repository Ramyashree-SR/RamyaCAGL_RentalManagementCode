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
        className="shadow p-0 mb-5  rounded bg-opacity-10"
      >
        <Modal.Header className="bg-secondary b-2 m-0">
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000" }}
          >
            RentDue Information
          </Modal.Title>
          <img
            src="./assets/cagllogo1.png"
            alt="logo"
            width="100px"
            height="40px"
            margnTop="-2px"
            className="bg-light b-5 m-0 p-1"
          />
        </Modal.Header>
        <Modal.Body className="bg-secondary">
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

        <Modal.Footer className="bg-secondary">
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
