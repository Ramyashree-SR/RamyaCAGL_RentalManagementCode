import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReusableTable from "../../../../molecules/ReusableTable";
import { rentDueData } from "../../../../../constants/RentDueData";
import { getAllRentDueDetails } from "../../../../services/RentDueApi";
import { Typography } from "antd";

import { getBranchID } from "../../../../services/RentContractsApi";
import { deepOrange, green, pink } from "@mui/material/colors";

import ExcelExport from "../../../../../ExcelExport";

import BranchReportTable from "../../../../molecules/BranchReportTable";

import LoopRoundedIcon from "@mui/icons-material/LoopRounded";

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[300]),
  color: pink[900],
  // color:yellow[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));
const RentDue = (props) => {
  const {
    rentDueDataByBranchId,
    setRentDueDataByBranchId,
    activationStatusFilterDue,
    handleActivationStatusFilterChangeDue,
  } = props;
  const [filterDetails, setFilterDetails] = useState(rentDueDataByBranchId);
  const [filterBranch, setFilterBranch] = useState([]);
  const [branchFilter, setBranchFilter] = useState("");
  const [branchIDforDue, setbranchIDforDue] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBranchId();
  }, []);

  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Clear existing data
      setFilterBranch([]);
      setBranchFilter([]);
      setbranchIDforDue("");
      setRentDueDataByBranchId([]);
      // Fetch new data based on the new month and year
      getAllRentDueDetailsByBranchID();
    }
  }, [refreshKey]);

  useEffect(() => {
    getAllRentDueDetailsByBranchID();
  }, [filterBranch?.branchID]);

  const handleBranchID = (value) => {
    setFilterBranch({
      ...filterBranch,
      branchID: value.target.outerText,
    });
    setbranchIDforDue(value.target.outerText);
    getAllRentDueDetailsByBranchID(value.target.outerText);
  };

  const getBranchId = async () => {
    const { data } = await getBranchID();
    if (data) {
      if (data) {
        let branchIDData = [];
        data?.data?.map((val) => {
          branchIDData.push([val]);
        });
        setBranchFilter(branchIDData);
      } else {
        setBranchFilter([]);
      }
    }
  };

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

  const getAllRentDueDetailsByBranchID = async (branchID) => {
    const { data } = await getAllRentDueDetails(branchID);
    if (data)
      if (data) {
        let getData = data?.data;
        setRentDueDataByBranchId(getData || {});
      } else {
        setRentDueDataByBranchId([]);
      }
  };

  useEffect(() => {
    // Filter the data based on Status
    const filtered = rentDueDataByBranchId?.filter((value) => {
      if (activationStatusFilterDue === "All") {
        return value;
      } else if (value?.status?.includes?.(activationStatusFilterDue)) {
        return value;
      }
    });
    setFilterDetails(filtered);
  }, [rentDueDataByBranchId, activationStatusFilterDue]);

  const getRentExcelData = Object.values(filterDetails)?.map((item) => ({
    ContractID: item?.contractID,
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

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await getAllRentDueDetailsByBranchID();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        fullscreen={props.fullscreen}
        centered
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 600, fontFamily: "sans-serif", mt: -4 }}
          >
            Branch-wise Rent Due Information
          </Modal.Title>
          <img
            src="./assets/cagllogo1.png"
            alt="logo"
            width="90px"
            height="45px"
            margnTop="-2px"
          />
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ height: "100%", width: "100%" }}>
            <Grid
              container
              className="d-flex m-3"
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
                  value={filterBranch?.branchID}
                  onChange={handleBranchID}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Branch ID"
                      variant="outlined"
                    />
                  )}
                />

                <ColorIcon>
                  <Grid className="d-flex flex-column align-items-center justify-content-center">
                    <LoopRoundedIcon
                      onClick={handleRefresh}
                      sx={{ color: green[700] }}
                    />
                  </Grid>
                </ColorIcon>
              </Grid>
              <Grid
                item
                className="d-flex align-items-end justify-content-end"
                sx={{
                  width: 120,
                  height: 40,
                  // flexBasis: "50%",
                  flexBasis: "100%",
                  mt: -3,
                  mr: 2,
                }}
              >
                <ExcelExport
                  excelData={getRentExcelData}
                  fileName={"Payment Report"}
                  sx={{ color: "#ffffff", backgroundColor: deepOrange[900] }}
                />
              </Grid>
            </Grid>
            <Box
              sm={12}
              xs={12}
              sx={{
                width: "97%",
                position: "fixed",
                mt: 0,
              }}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center flex-column">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{ width: "2rem", height: "2rem" }}
                  ></div>
                  <span className="visible text-primary">Loading...</span>{" "}
                </div>
              ) : (
                branchIDforDue && (
                  <BranchReportTable
                    data={rentDueDataByBranchId}
                    columns={rentDueData}
                    showTotal={true}
                    sx={{ height: 350 }}
                    activationStatusFilterDue={activationStatusFilterDue}
                    handleActivationStatusFilterChangeDue={
                      handleActivationStatusFilterChangeDue
                    }
                  />
                )
              )}
            </Box>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.close();
              setRefreshKey((prevKey) => prevKey + 1);
            }}
            variant="contained"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentDue;
// useEffect(() => {
//   const fetchData = async () => {
//     const { data } = await getRentDueExcelDetails(branchIDforDue);
//     if (data) {
//       if (data) {
//         let getDueData = data?.data;
//         setDataToExcel(getDueData);
//       } else {
//         setDataToExcel([]);
//       }
//     }
//   };
//   fetchData();
// }, [branchIDforDue]);
