import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import ReusableTable from "../../../../molecules/ReusableTable";
import { rentDueData } from "../../../../../constants/RentDueData";
import { getRentDueDetails } from "../../../../services/RentDueApi";

import { blue, blueGrey, pink, red } from "@mui/material/colors";
import { ExportToCSV } from "../../../../ExportToCSV";
import ExcelExport from "../../../../../ExcelExport";

const RentDueDetails = (props) => {
  const {
    branchIDforDue,
    rentDueDetails,
    rentStartDate,
    rentEndDate,
    lesseeBranchName,
    lessorName,
    uniqueID,
  } = props;

  const getRentExcelData = rentDueDetails?.map((item) => ({
    ContractID: item.contractID,
    BranchID: item.info?.branchID,
    BranchName: item.info?.lesseeBranchName,
    AreaName: item.info?.lesseeAreaName,
    Division: item.lesseeDivision,
    Zone: item.info?.lesseeZone,
    State: item.info?.lesseeState,
    BankName: item.info?.lessorBankName,
    IFSCNumber: item.info?.lessorIfscNumber,
    AccountNumber: item.info?.lessorAccountNumber,
    Escalation: item.escalation,
    Year: item.year,
    Status: item.status,
    January: item.january,
    February: item.february,
    March: item.march,
    April: item.april,
    May: item.may,
    June: item.june,
    July: item.july,
    August: item.august,
    September: item.september,
    October: item.october,
    November: item.november,
    December: item.december,
  }));

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
            Rent Due Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <Grid
                  container
                  className="d-flex flex-row "
                  sx={{ fontSize: 15, fontWeight: 700 }}
                >
                  <Grid
                    item
                    className="d-flex flex-row"
                    sx={{ flexBasis: "35%" }}
                  >
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Contract ID :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: pink[500] }}
                    >
                      {uniqueID}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    className="d-flex flex-row"
                    sx={{ flexBasis: "35%" }}
                  >
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Branch ID :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: pink[500] }}
                    >
                      {branchIDforDue}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    className="d-flex flex-row"
                    sx={{ flexBasis: "30%" }}
                  >
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Branch Name :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: pink[500] }}
                    >
                      {lesseeBranchName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  className="d-flex flex-row "
                  sx={{ fontSize: 15, fontWeight: 700 }}
                >
                  <Grid
                    item
                    className="d-flex flex-row"
                    sx={{ flexBasis: "35%" }}
                  >
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Rent Start Date :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: pink[500] }}
                    >
                      {rentStartDate}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    className="d-flex flex-row"
                    sx={{ flexBasis: "35%" }}
                  >
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Rent End Date :&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: pink[500] }}
                    >
                      {rentEndDate}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    className="d-flex flex-row"
                    sx={{ flexBasis: "30%" }}
                  >
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                      Lessor Name :&nbsp;&nbsp;&nbsp;
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, fontWeight: 700, color: pink[500] }}
                    >
                      {lessorName}&nbsp;&nbsp;&nbsp;
                    </Typography>
                  </Grid>
                </Grid>
              </Col>
              <hr />

              <Grid
                item
                className="d-flex align-items-end justify-content-end"
                sx={{
                  flexBasis: "100%",
                  mt: 1,
                  mr: 2,
                  width: 100,
                  height: 40,
                }}
              >
                <ExcelExport
                  excelData={getRentExcelData}
                  fileName={"Rent Due Report"}
                  sx={{ backgrounfCOlor: blue[900] }}
                />
                {/* <ExportToCSV
                  // excelData={dataToExcel}
                  // excelData={rentDueDataByBranchId}
                  excelData={getRentExcelData}
                  fileName={"Rent Due Report"}
                /> */}
              </Grid>
              <Box
                sm={12}
                xs={12}
                sx={{
                  mt: 4,
                }}
              >
                {uniqueID && (
                  <ReusableTable
                    data={rentDueDetails}
                    columns={rentDueData}
                    sx={{ width: "100%" }}
                  />
                )}
              </Box>
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

export default RentDueDetails;
