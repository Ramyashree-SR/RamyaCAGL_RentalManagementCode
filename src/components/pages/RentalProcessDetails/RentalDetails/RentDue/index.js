import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReusableTable from "../../../../molecules/ReusableTable";
import { rentDueData } from "../../../../../constants/RentDueData";
import {
  getRentDueDetails,
  getRentDueExcelDetails,
} from "../../../../services/RentDueApi";
import { Typography } from "antd";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import { getBranchID } from "../../../../services/RentContractsApi";
import { deepOrange, green } from "@mui/material/colors";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import ExcelExport from "../../../../../ExcelExport";
import axios from "axios";
import { ExportToCSV } from "../../../../ExportToCSV";

const RentDue = (props) => {
  const {
    branchIDforDue,
    rentDueDataByBranchId,
    branchFilter,
    handleBranchID,
    lesseeBranchName,
    activationStatusFilterDue,
    handleActivationStatusFilterChangeDue,
  } = props;
  const [monthlyTotal, setMonthlyTotal] = useState({});
  const [dataToExcel, setDataToExcel] = useState([]);
  // console.log(dataToExcel, dataToExcel);
  // Calculate monthly totals
  const calculateMonthlyTotal = () => {
    const total = {};
    rentDueDataByBranchId.forEach((entry) => {
      Object.keys(entry).forEach((month) => {
        if (
          month !== "rentDueID" &&
          month !== "startDate" &&
          month !== "endDate" &&
          month !== "year" &&
          month !== "escalation" &&
          month !== "contractID"
        ) {
          total[month] = (total[month] || 0) + entry[month];
        }
      });
    });
    setMonthlyTotal(total);
  };

  // Calculate totals on component mount
  useEffect(() => {
    calculateMonthlyTotal();
  }, [rentDueDataByBranchId]);

  let activationStatus = [
    { id: "1", label: "All" },
    { id: "2", label: "Open" },
    { id: "3", label: "Closed" },
  ];

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

  const fileName = "Rent Due Excel"; // here enter filename for your excel file

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRentDueExcelDetails(branchIDforDue);
      // console.log(data?.data, "duedata");
      if (data) {
        if (data) {
          let getDueData = data?.data;
          setDataToExcel(getDueData);
        } else {
          setDataToExcel([]);
        }
      }
    };
    fetchData();
  }, [branchIDforDue]);

  // const [rentExcelData, setrentExcelData] = useState([])
  const getRentExcelData = rentDueDataByBranchId?.map((item) => ({
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

  // console.log(rentDueDataByBranchId,"rentDueDataByBranchId");
  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        centered
        className="w-100"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Branch-wise Rent Due Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ height: "100%", width: "100%" }}>
            <Grid
              container
              className="d-flex m-3 "
              sx={{ fontSize: 15, fontWeight: 700 }}
            >
              <Grid
                item
                className="d-flex"
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  position: "fixed",
                  mt: -2,
                  flexBasis: "80%",
                }}
              >
                <Autocomplete
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: green[900],
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiOutlinedInput-root:focus": {
                      "& > fieldset": {
                        borderColor: "#E4E7EB",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        borderColor: "#E4E7EB",
                        borderWidth: "1px",
                      },
                      width: 200,
                    },
                  }}
                  options={Array.isArray(branchFilter) ? branchFilter : []}
                  value={branchIDforDue}
                  onChange={handleBranchID}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Branch ID"
                      variant="outlined"
                    />
                  )}
                />

                <DropDownComponent
                  label="ActivationStatus"
                  placeholder="select"
                  sx={{ width: 200 }}
                  size="small"
                  options={
                    Array.isArray(activationStatus) ? activationStatus : []
                  }
                  name="status"
                  value={activationStatusFilterDue || "All"}
                  onChange={(val) =>
                    handleActivationStatusFilterChangeDue("status", val)
                  }
                />

                <DropDownComponent
                  label="Months"
                  placeholder="Months"
                  size="small"
                  options={months}
                  sx={{ width: 200, ml: 1, mt: 0 }}
                  value={lesseeBranchName}
                />
              </Grid>
              <Grid
                item
                className="d-flex align-items-end justify-content-end"
                sx={{
                  flexBasis: "100%",
                  mt: -2,
                  mr: 2,
                  width: 100,
                  height: 40,
                }}
              >
                <ExportToCSV
                  // excelData={dataToExcel}
                  // excelData={rentDueDataByBranchId}
                  excelData={getRentExcelData}
                  fileName={fileName}
                />
              </Grid>
            </Grid>
            <Box
              sm={12}
              xs={12}
              sx={{
                width: "97%",
                position: "fixed",
                mt: -1.4,
              }}
            >
              {branchIDforDue && (
              <ReusableTable
                data={rentDueDataByBranchId}
                columns={rentDueData}
                sx={{
                  height: 360,
                  width: "100%",
                  overFlowX: "scroll",
                  overFlowY: "scroll",
                }}
                showTotal={true}
              />
               )} 
            </Box>
          </Box>
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

export default RentDue;
