import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import PaymentReportTable from "../../../../molecules/PaymentReportTable";
import { getVarianceDetails } from "../../../../services/VarianceApi";
import { varianceColumns } from "../../../../../constants/VarianceTable";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";

const Variance = (props) => {
  const { uniqueIDs } = props;
  // console.log(uniqueIDs, "uniqueIDs");
  const [getVarianceData, setGetVarianceData] = useState([]);

  const [RentContractID, setRentContractID] = useState(uniqueIDs);
  // console.log(RentContractID, "RentContractID");

  const handleVarianceIDChange = (e) => {
    setRentContractID(e.target.value);
  };
  useEffect(() => {
    getVarianceReport();
  }, [RentContractID]);

  const getVarianceReport = async () => {
    const { data } = await getVarianceDetails(RentContractID);
    console.log(data, "Alldata");
    if (data) {
      if (data) {
        let getData = data?.data;
        setGetVarianceData(getData);
      }
    }
  };
  // console.log(getVarianceData, "getVarianceData");
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
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Grid className="d-flex" sx={{ mt: 0.5 }}>
                  <InputBoxComponent
                    label="ID"
                    placeholder="Enter ID"
                    sx={{ width: 200, mt: -1 }}
                    name="RentContractID"
                    value={RentContractID}
                    onChange={(e) => {
                      handleVarianceIDChange(e);
                    }}
                  />
                </Grid>
                <PaymentReportTable
                  data={getVarianceData}
                  columns={varianceColumns}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close} variant="contained">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Variance;
