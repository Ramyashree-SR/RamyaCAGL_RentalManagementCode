import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { deepOrange, red } from "@mui/material/colors";
import { getBranchWiseProvisionsList } from "../../../../services/ProvisionsListApi";
import ReusableTable from "../../../../molecules/ReusableTable";
import { ProvisionsColumns } from "../../../../../constants/ProvisionList";
import PaymentTableComponent from "../../../../molecules/PaymentTableComponent";
import { ExportToCSV } from "../../../../ExportToCSV";
import ExcelExport from "./../../../../../ExcelExport/index";

const Provisions = (props) => {
  const {
    rentEndDate,
    rentStartDate,
    branchIDforDue,
    lessorName,
    AddProvisionFortheMonth,
    addProvisions,
    setAddProvisions,
    monthlyRent,
    uniqueID,
    lesseeBranchName,
  } = props;

  const [dataSelect, setDataSelect] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [provisionsList, setProvisionsList] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const months = [
    { id: 1, label: "January" },
    { id: 2, label: "February" },
    { id: 3, label: "March" },
    { id: 4, label: "April" },
    { id: 5, label: "May" },
    { id: 6, label: "June" },
    { id: 7, label: "July" },
    { id: 8, label: "August" },
    { id: 9, label: "September" },
    { id: 10, label: "October" },
    { id: 11, label: "November" },
    { id: 12, label: "December" },
  ];

  const handleMonthChange = (newValue) => {
    const value = newValue?.label;
    if (value) {
      // Access value.month here
      setSelectedMonth(value);
    } else {
      console.error("value or value.month is undefined");
    }
  };

  let flag = [{ id: "All", label: "All" }];

  const handleChange = (newValue) => {
    // console.log(newValue, "newValue");
    setSelectedYear(newValue.label);
  };

  const handleSelectChange = (value) => {
    // console.log(value, "value");
    setDataSelect(value.label);
  };

  useEffect(() => {
    getProvisionListDetails();
  }, [selectedYear]);

  // Parse the provided rent end date
  // const endDateObject = new Date(rentEndDate);
  const endDateObject = new Date();

  // Check if the provided rent end date is valid
  if (isNaN(endDateObject.getTime())) {
    // Handle invalid date
    console.error("Invalid date format");
    return null;
  }

  // Extract the year from the rent end date
  const currentYear = endDateObject?.getFullYear();

  // Generate an array of years, including the current MOnth
  const yearOptions = Array?.from({ length: 10 }, (_, index) => ({
    value: currentYear - index, // currentYear
    label: `${currentYear - index}`,
  }));

  const getProvisionListDetails = async () => {
    const { data } = await getBranchWiseProvisionsList(
      inputValue,
      selectedYear
    );
    if (data) {
      if (data) {
        let getData = data?.data;
        setProvisionsList(getData);
        // props.close();
      } else {
        setProvisionsList([]);
      }
    }
  };

  const handleBranchIDChange = (e) => {
    setInputValue(e.target.value);
  };


  const getProvisionReport = Object.values(provisionsList)?.map((item) => ({
    ContractID: item.contractID,
    Month: item.month,
    Year: item.year,
    BranchID: item.info?.branchID,
    BranchName: item.info?.lesseeBranchName,
    AreaName: item.info?.lesseeAreaName,
    Division: item.lesseeDivision,
    Zone: item.info?.lesseeZone,
    State: item.info?.lesseeState,
    BankName: item.info?.lessorBankName,
    IFSCNumber: item.info?.lessorIfscNumber,
    AccountNumber: item.info?.lessorAccountNumber,
    ProvisionAmount: item.provisionAmount,
    Provisiontype: item.provisiontype,
    Remark: item.remark,
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
            Provisions Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Container>
            <Row>
              <Col xs={12}> */}
          <Grid className="d-flex flex-column m-2" sx={{ position: "fixed" }}>
            <Grid className="d-flex " sx={{ mt: -1.5 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                List of Branch with Provisions:
              </Typography>
            </Grid>
            {/* <hr /> */}
            <Grid className="d-flex" sx={{ mt: 0.5 }}>
              <InputBoxComponent
                label="ID"
                placeholder="Enter ID"
                sx={{ width: 200, mt: -1 }}
                name="inputValue"
                value={inputValue}
                onChange={(e) => {
                  handleBranchIDChange(e);
                }}
              />

              <DropDownComponent
                label="Year"
                placeholder="Select "
                sx={{ width: 200, mt: 0.5 }}
                size="small"
                options={yearOptions}
                value={selectedYear}
                onChange={handleChange}
              />
              {/* <DropDownComponent
                label="Month"
                placeholder="Select "
                sx={{ width: 200, mt: 0.5 }}
                size="small"
                options={months}
                //   name="month"
                value={selectedMonth}
                onChange={handleMonthChange}
              /> */}
              <Grid
                item
                className="d-flex flex-row align-items-end justify-content-end"
                sx={{
                  mt: 0.1,
                  ml: 10,
                  width: 120,
                  height: 40,
                }}
              >
                <ExcelExport
                  excelData={getProvisionReport}
                  fileName={"ProvisionsList"}
                  sx={{
                    mr: 1,
                    backgroundColor: deepOrange[600],
                    width: 120,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                {/* <ExportToCSV
                  // excelData={provisionsList}
                  excelData={getProvisionReport}
                  fileName={"ProvisionsList"}
                /> */}
              </Grid>
            </Grid>
          </Grid>
          <Box
            sm={12}
            xs={12}
            sx={{
              marginLeft: "1px auto auto 1px",
            }}
          >
            {selectedYear && ( //selectedYear  ,selectedMonth
              <ReusableTable
                data={provisionsList}
                columns={ProvisionsColumns}
                sx={{ height: 310, mt: 10 }} // height: 320
              />
            )}
          </Box>
          {/* <PaymentTableComponent
                    data={provisionsList}
                    columns={ProvisionsColumns}
                  /> */}
          {/* </Col>
            </Row>
          </Container> */}
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

export default Provisions;
