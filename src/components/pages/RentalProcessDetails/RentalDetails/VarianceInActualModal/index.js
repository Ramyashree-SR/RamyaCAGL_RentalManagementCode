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

export default VarianceInActualModal;
