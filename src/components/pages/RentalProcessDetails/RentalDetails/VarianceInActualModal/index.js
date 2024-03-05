import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import PaymentReportTable from "../../../../molecules/PaymentReportTable";
import { varianceColumns } from "../../../../../constants/VarianceTable";
import { getVarianceDetails } from "../../../../services/VarianceApi";
import { Button } from "@mui/material";

const VarianceInActualModal = (props) => {
  let { RentContractID } = props;
  const [getVarianceData, setGetVarianceData] = useState([]);
  useEffect(() => {
    getVarianceReport();
  }, [RentContractID]);
  const getVarianceReport = async () => {
    const { data } = await getVarianceDetails(RentContractID);
    // console.log(data, "Alldata");
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetVarianceData(getData);
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
        className="shadow p-0 mb-5 rounded bg-opacity-10"
      >
        <Modal.Header className="bg-secondary m-0 b-2">
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000" }}
          >
            Variance Information
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
        <Modal.Body className="bg-secondary ">
          <Container>
            <Row>
              <Col>
                <PaymentReportTable
                  data={getVarianceData}
                  columns={varianceColumns}
                  sx={{ width: "100%" }}
                  showTotal={true}
                />
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

export default VarianceInActualModal;
