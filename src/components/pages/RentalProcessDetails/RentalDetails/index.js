import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { columns } from "../../../../constants/masterTable";
import SearchBarComponent from "../../../atoms/SearchBarComponent";
import ButtonComponent from "../../../atoms/ButtonComponent";
import MasterDetails from "../../MasterDetails";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PaymentReport from "./PaymentReport";
import RentActual from "./RentActual";
import RentDue from "./RentDue";
import Provisions from "./Provisions";
import Variance from "./Variance";
// import { getAllRentContractDetails } from "../../../services/RentContractsApi";
import TableComponent from "../../TableComponent";
import TuneIcon from "@mui/icons-material/Tune";
import NavComponent from "../../../organisms/NavComponent";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getAllRentContractDetails,
  getAllRentContractDetailsByBranchID,
  getBranchID,
  getRentContractDetailsOnBranchID,
} from "../../../services/RentContractsApi";
import {
  getDistrictByStateFilter,
  getStatesByFilter,
} from "../../../services/FilterApis";
import { makeStyles } from "@mui/styles";
import { blue, green } from "@mui/material/colors";
import {
  getAllRentDueDetails,
  getRentDueDetails,
} from "../../../services/RentDueApi";
import { EditRentRenewContractDetails } from "../../../services/EditContractApi";

const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      fontSize: "13px",
      color: green[900],
    },
  },
  input: {
    // color: "#B3B3B3",
    backgroundColor: green[900],
  },
  clearIndicator: {
    color: "red",
  },
  optionStyle: {
    width: "100%",

    margin: "0px 5px",
    padding: "6px 6px",
    // borderBottom: "0.5px solid #DDEDF4",
    cursor: "pointer",
    "&:hover": {
      background: "#9FCCE066 !important",
    },
  },
  listBox: {
    border: "1px solid #9FCCE0 !important",
    borderRadius: "20px !important",
    marginTop: "3px",
  },
});
const RentalDetails = (props) => {
  const classes = useStyles();
  const renderOption = (props, option) => {
    return (
      <li {...props} style={{ padding: 0, margin: 0, width: "100%" }}>
        <Box className={classes.optionStyle}>
          <Typography
            sx={{ color: blue[900], fontSize: "13px", fontWeight: "550" }}
          >
            {option}
          </Typography>
        </Box>
      </li>
    );
  };
  // let navigate = useNavigate();
  const [openLessorModal, setOpenLessorModal] = useState(false);
  const [openEditLessorModal, setOpenEditLessorModal] = useState(false);
  const [EditLessorData, setEditLessorData] = useState({});
  // console.log(EditLessorData, "EditLessorData ");
  const [EditLessorRenewData, setEditLessorRenewData] = useState({});
  const [modalType, setModalType] = useState("");
  // console.log("modalType", modalType);
  const [searchText, setSearchText] = useState("");
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openPaymentReportData, setOpenPaymentReportData] = useState(false);
  const [openRentActualModal, setOpenRentActualModal] = useState(false);
  const [openVarianceModal, setOpenVarianceModal] = useState(false);
  const [openProvisionsModal, setOpenProvisionsModal] = useState(false);
  const [openRentDueModal, setOpenRentDueModal] = useState(false);
  const [openRentDueDataModal, setOpenRentDueDataModal] = useState(false);

  const [fullscreen, setFullscreen] = useState(true);
  const [uniqueID, setUniqueID] = useState(null);
  // console.log(uniqueID, "uniqueID");
  const [rentContractDetails, setRentContractDetails] = useState([]);
  // console.log(rentContractDetails, "rentContractDetails");
  // const [stateFilter, setStateFilter] = useState(
  //   ...new Set(rentContractDetails?.map((item) => item.lesseeState))
  // );
  const [stateFilter, setStateFilter] = useState([]);

  // const [districtFilter, setDistrictFilter] = useState([
  //   ...new Set(rentContractDetails?.map((item) => item.premesisDistrict)),
  // ]);
  const [districtFilter, setDistrictFilter] = useState(null);
  const [filterState, setFilterState] = useState({});
  const [filterDistrict, setFilterDistrict] = useState({});
  const [filterBranch, setFilterBranch] = useState([]);
  const [filterBranchName, setFilterBranchName] = useState([]);
  const [branchTypeFilter, setBranchTypeFilter] = useState("All"); // Specify the filter for 'Name'
  const [activationStatusFilter, setActivationStatusFilter] = useState("All");
  const [activationStatusFilterDue, setActivationStatusFilterDue] =
    useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [branchNameFilter, setBranchNameFilter] = useState("");
  const [branchIDforDue, setbranchIDforDue] = useState("");
  // console.log(branchIDforDue, "branchIDforDue");
  const [rentDueDataByBranchId, setRentDueDataByBranchId] = useState([]);
  // console.log(rentDueDataByBranchId, "rentDueDataByBranchId");
  // const [rentDetailsForDue, setrentDetailsForDue] = useState([]);
  // console.log(rentDetailsForDue, "rentDetailsForDue");

  const [rentStartDate, setRentStartDate] = useState(null);
  const [rentEndDate, setRentEndDate] = useState(null);
  const [agreementTenure, setAgreementTenure] = useState(null);
  const [monthlyRent, setMonthlyRent] = useState(null);
  const [lessorName, setLessorName] = useState(null);
  const [lesseeBranchName, setLesseeBranchName] = useState(null);
  const [rentRenewContract, setRentRenewContract] = useState([]);
  const [uniqueIDs, setUniqueIDs] = useState(rentContractDetails.uniqueID);
  console.log(uniqueIDs,"uniqueIDs");
  const handleStateChange = (value) => {
    // console.log(value.target.outerText, "newValue");
    setFilterState({
      ...filterState,
      lesseeState: value.target.outerText,
    });

    getBranchDistrictByState(value.target.outerText);
    getContractDetails(value.target.outerText);
  };

  useEffect(() => {
    getBranchStates();
  }, []);

  const getBranchStates = async () => {
    const { data } = await getStatesByFilter();
    // console.log(data?.data, "RentContractdata");
    if (data) {
      if (data) {
        let stateData = [];
        data?.data.map((val) => {
          stateData.push(val);
        });
        setStateFilter(stateData);
      } else {
        setStateFilter([]);
      }
    }
  };
  const handleDistrictChange = (value) => {
    setFilterDistrict(value);
    getContractDetails(value);
  };

  const getBranchDistrictByState = async (state) => {
    const { data } = await getDistrictByStateFilter(state);
    if (data) {
      let districtData = [];
      data?.data.map((val) => {
        districtData.push([val]);
      });
      setDistrictFilter(districtData);
    } else {
      setDistrictFilter([]);
    }
  };

  useEffect(() => {
    if (filterState?.stateFilter && filterDistrict?.districtFilter) {
      const filteredData = () => {
        let stateFilteredData = rentContractDetails.filter((item) => {
          if (item.lesseeState) {
            return item?.lesseeState
              .toLowerCase()
              .includes(filterState?.stateFilter.toLowerCase());
          }
        });

        let districtFilteredData = stateFilteredData.filter((item) => {
          if (item.premesisDistrict) {
            return item?.premesisDistrict
              .toLowerCase()
              .includes(filterDistrict?.districtFilter.toLowerCase());
          }
        });
        return districtFilteredData;
      };
      if (filteredData) {
        setRentContractDetails(filteredData);
      } else {
        setRentContractDetails([]);
      }
    } else {
      setRentContractDetails([...rentContractDetails]);
    }
  }, [filterState.stateFilter, filterDistrict?.districtFilter]);

  const [showClearIcon, setShowClearIcon] = useState("none");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePaymentModal = () => {
    setOpenPaymentModal(true);
  };

  const getContractDetails = async (district, id) => {
    console.log(id, "id");
    let paramsData = id ? id : "All";
    const { data } = await getAllRentContractDetails(district, paramsData);
    if (data?.data) {
      let getData = data?.data;
      setRentContractDetails(getData);
      setbranchIDforDue(getData);
      setUniqueIDs(getData)
    }
  };


  useEffect(() => {
    getBranchId();
  }, []);

  const handleBranchID = (value) => {
    setFilterBranch({
      ...filterBranch,
      branchID: value.target.outerText,
    });
    setbranchIDforDue(value.target.outerText);
    getAllContractDetails(value.target.outerText);

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

  const getAllContractDetails = async (branchID) => {
    const { data } = await getAllRentContractDetailsByBranchID(branchID);
    if (data?.data) {
      let getData = data?.data;
      setRentContractDetails(getData);
      setUniqueIDs(getData)
    }
  };

  const handleBranchName = (value) => {
    setFilterBranchName({
      ...filterBranchName,
      branchName: value.target.outerText,
    });
  };

  const handleBranchTypeFilterChange = (value) => {
    setBranchTypeFilter(value.target.outerText);
  };

  const handleActivationStatusFilterChange = (e) => {
    setActivationStatusFilter(e.target.value);
  };

  const handleActivationStatusFilterChangeDue = (name, selectedValue) => {
    let value = selectedValue?.label;
    setRentDueDataByBranchId({
      ...rentDueDataByBranchId,
      [name]: value,
    });
    // Check if 'All' is selected
    if (value === "All") {
      // Show all data without filtering
      setRentDueDataByBranchId(rentDueDataByBranchId);
    } else {
      // Filter the data based on the selected activation status
      const filteredData = rentDueDataByBranchId?.filter((item) => {
        return item?.status === value;
      });

      // Update your state or whatever data structure you are using for the table
      setRentDueDataByBranchId(filteredData);
    }
    // Also, update the state for the activation status filter
    setActivationStatusFilterDue(value);
  };

  const getAllRentDueDetailsByBranchID = async (branchID) => {
    const { data } = await getAllRentDueDetails(branchID);
    if (data) {
      if (data) {
        let getData = data?.data;
        setRentDueDataByBranchId(getData);
      } else {
        setRentDueDataByBranchId([]);
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          flexBasis: "20%",
          background: "#fff",
        }}
      >
        <NavComponent />
      </Box>

      <Box
        className="d-flex align-items-center justify-content-start"
        sx={{
          margin: "1% 1% 0% 10%",
          position: "fixed",
          marginTop: "-40px",
          ml: 2,
        }}
      >
        <Box
          className="d-flex align-items-center justify-content-between py-4"
          sx={{ width: 300 }}
        >
          <Typography
            sx={{ fontSize: 17, fontWeight: 900, fontFamily: "sans-serif" }}
          >
            Rent Contract
          </Typography>
        </Box>
        <Box
          className="d-flex align-items-center justify-content-around"
          sx={{ width: 670, ml: 75, mt: -2, position: "fixed" }}
        >
          <Grid className="d-flex flex-row align-items-center justify-content-around">
            <TextField
              id="outlined-size-small"
              placeholder="Search"
              InputProps={{
                "aria-label": "Without label",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                    onClick={(event) => {
                      setShowClearIcon(event.target.value);
                    }}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              value={searchText}
              onChange={(e, value) => {
                setSearchText(e.target.value);
              }}
              sx={{
                // backgroundColor: "#FAFAFA",
                borderRadius: "100px",
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "#A6A6A6",
                  },
                },
                "& .MuiOutlinedInput-root:focus": {
                  "& > fieldset": {
                    outline: "none",
                    borderColor: "#ECECEC",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#c4c4c4",
                    borderRadius: "100px",
                  },
                  width: 350,
                  ml: 3,
                },
              }}
            />
          </Grid>

          <Box
            sx={{ marginTop: "10% auto 10% 10%" }}
            className="d-flex flex-row align-items-center justify-content-center py-1 px-2"
          >
            <ButtonComponent
              label=" + New Contract Details"
              variant="contained"
              onBtnClick={() => {
                setOpenLessorModal(true);
                setModalType("add");
                setOpenEditLessorModal(false);
                setEditLessorRenewData(null);
                setEditLessorData(null);
                setRentRenewContract(null);
              }}
              sx={{ width: 200 }}
            />

            <MasterDetails
              show={openLessorModal}
              close={() => setOpenLessorModal(false)}
              openLessorModal={openLessorModal}
              getContractDetails={getContractDetails}
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              branchIDforDue={branchIDforDue}
              branchFilter={branchFilter}
              handleBranchID={handleBranchID}
              type={openEditLessorModal && modalType ? "edit" : "add"}
              disabled={openEditLessorModal ? "edit" : "add"}
              uniqueID={uniqueID}
              EditLessorData={openEditLessorModal && EditLessorData}
              EditLessorRenewData={openLessorModal && EditLessorRenewData}
            />

            <Box>
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleAnchorClick}
                sx={[
                  () => ({
                    "&:hover": {
                      backgroundColor: "#E2F6FF",
                    },
                    display: "flex",
                    flexDirection: "column",
                    // mr: 9,
                  }),
                ]}
              >
                <WidgetsIcon
                  onClick={handleAnchorClick}
                  sx={{ color: "#238520" }}
                  fontSize="lg"
                />
                <Typography sx={{ color: "#238520", fontSize: 14 }}>
                  Menu
                </Typography>
              </IconButton>
              <PaymentReport
                show={openPaymentModal}
                close={() => setOpenPaymentModal(false)}
                fullscreen={fullscreen}
                uniqueID={uniqueID}
              />

              <RentActual
                show={openRentActualModal}
                close={() => setOpenRentActualModal(false)}
                fullscreen={fullscreen}
                uniqueIDs={uniqueIDs}
                rentStartDate={rentStartDate}
                rentEndDate={rentEndDate}
              />
              <RentDue
                show={openRentDueDataModal}
                close={() => setOpenRentDueDataModal(false)}
                fullscreen={fullscreen}
                branchIDforDue={branchIDforDue}
                rentDueDataByBranchId={rentDueDataByBranchId}
                branchFilter={branchFilter}
                handleBranchID={handleBranchID}
                rentContractDetails={rentContractDetails}
                activationStatusFilterDue={activationStatusFilterDue}
                handleActivationStatusFilterChangeDue={
                  handleActivationStatusFilterChangeDue
                }
                lesseeBranchName={rentContractDetails?.lesseeBranchName}
              />
              <Provisions
                show={openProvisionsModal}
                close={() => setOpenProvisionsModal(false)}
                fullscreen={fullscreen}
              />
              {/* <Variance
                show={openVarianceModal}
                close={() => setOpenVarianceModal(false)}
                fullscreen={fullscreen}
              /> */}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        className="d-flex align-items-center justify-content-between"
        sx={{ width: 670, ml: 1, mt: 1, position: "fixed", borderRadius: 22 }}
      >
        <Grid className="d-flex flex-column m-1">
          <TuneIcon size="large" />
          <Typography sx={{ fontSize: 6, fontWeight: 800 }}>
            Filter By
          </Typography>
        </Grid>

        <Grid className="d-flex flex-row align-items-center justify-content-around m-1">
          <Autocomplete
            size="small"
            sx={{
              // background: "#E4E7EB",
              background: "#C5EBF6 ", //"#4AB212"
              borderRadius: "100px",
              width: 210,

              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: green[900],
                },
              },
              "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                  borderColor: green[900],
                  borderWidth: "10px",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: "#E4E7EB",
                  borderRadius: "100px",
                },
              },
            }}
            classes={{ paper: classes.listBox }}
            options={stateFilter}
            getOptionLabel={(option) =>
              option?.label ? option?.label : option || ""
            }
            isOptionEqualToValue={(option, value) =>
              value === undefined ||
              value === "" ||
              option?.label === value?.label
            }
            renderOption={(props, option) => renderOption(props, option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                variant="outlined"
                classes={{ root: classes.customTextField }}
              />
            )}
            value={filterState?.lesseeState}
            onChange={handleStateChange}
          />
        </Grid>
        <Grid className="d-flex flex-row align-items-center justify-content-between m-1">
          <Autocomplete
            size="small"
            sx={{
              borderRadius: "100px",
              // background: "#E4E7EB",
              background: "#C5EBF6 ",
              color: "#ffffff",
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: green[900],
                },
              },
              "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                  // outline: "none",
                  borderColor: "#ECECEC",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: "#E4E7EB",
                  borderRadius: "100px",
                },
                width: 230,
              },
            }}
            classes={{ paper: classes.listBox }}
            options={Array.isArray(districtFilter) ? districtFilter : []}
            getOptionLabel={(option) =>
              option?.label ? option?.label : option || ""
            }
            isOptionEqualToValue={(option, value) =>
              value === undefined ||
              value === "" ||
              option?.label === value?.label
            }
            onChange={(event, newValue) => {
              handleDistrictChange(newValue);
            }}
            renderOption={(props, option) => renderOption(props, option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="District"
                variant="outlined"
                classes={{ root: classes.customTextField }}
              />
            )}
          />
        </Grid>
        <Grid className="d-flex flex-row align-items-center justify-content-around m-1">
          <Autocomplete
            size="small"
            sx={{
              // backgroundColor: "#FAFAFA",
              background: "#C5EBF6 ", //#C5EBF6
              borderRadius: "100px",
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: green[900],
                },
              },
              "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                  // outline: "none",
                  borderColor: "#E4E7EB",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: "#E4E7EB",
                  borderRadius: "100px",
                },
                width: 200,
              },
            }}
            classes={{ paper: classes.listBox }}
            options={Array.isArray(branchFilter) ? branchFilter : []}
            getOptionLabel={(option) =>
              option?.label ? option?.label : option || ""
            }
            isOptionEqualToValue={(option, value) =>
              value === undefined ||
              value === "" ||
              option?.label === value?.label
            }
            value={filterBranch?.branchID}
            onChange={handleBranchID}
            renderOption={(props, option) => renderOption(props, option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch ID"
                variant="outlined"
                classes={{ root: classes.customTextField }}
              />
            )}
          />
        </Grid>
        <Grid className="d-flex flex-row align-items-center justify-content-around m-1">
          <Autocomplete
            size="small"
            // sx={{ width: 200, background: "#E4E7EB" }}
            sx={{
              // backgroundColor: "#FAFAFA",
              background: "#C5EBF6", //background: "#D5F7DC",
              borderRadius: "100px",
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: green[900],
                },
              },
              "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                  outline: "none",
                  borderColor: green[900],
                },
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: "#E4E7EB",
                  borderRadius: "100px",
                },
                width: 200,
              },
            }}
            classes={{ paper: classes.listBox }}
            options={Array.isArray(branchNameFilter) ? branchNameFilter : []}
            getOptionLabel={(option) =>
              option?.label ? option?.label : option || ""
            }
            isOptionEqualToValue={(option, value) =>
              value === undefined ||
              value === "" ||
              option?.label === value?.label
            }
            value={filterBranchName?.branchName}
            onChange={handleBranchName}
            renderOption={(props, option) => renderOption(props, option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch Name"
                variant="outlined"
                classes={{ root: classes.customTextField }}
              />
            )}
          />
        </Grid>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ background: "" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenRentDueDataModal(true);
            getAllRentDueDetailsByBranchID();
          }}
        >
          Branch Rent Due
        </MenuItem>

        <MenuItem
          onClick={() => {
            handlePaymentModal();
            handleClose();
          }}
        >
          Payment Report
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            setOpenRentActualModal(true);

          }}
        >
          Rent Actual
        </MenuItem>

        <MenuItem
          onClick={() => {
            setOpenProvisionsModal(true);
            handleClose();
          }}
        >
          Provisions
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            setOpenVarianceModal(true);
          }}
        >
          Variance
        </MenuItem>
      </Menu>
      <Box
        sm={12}
        xs={12}
        sx={{
          margin: "4.5% auto auto 0%",
          flexBasis: "80%",
          background: "#fff",
          height: "100%",
          width: "100%",
          position: "fixed",
        }}
      >
        <TableComponent
          data={rentContractDetails}
          // data={branchFilter || rentContractDetails}
          columns={columns}
          getContractDetails={getContractDetails}
          setEditLessorData={setEditLessorData}
          setOpenEditLessorModal={setOpenEditLessorModal}
          setOpenLessorModal={setOpenLessorModal}
          modalType={modalType}
          setUniqueID={setUniqueID}
          uniqueID={uniqueID}
          setModalType={setModalType}
          EditLessorData={EditLessorData}
          searchText={searchText}
          setSearchText={setSearchText}
          branchTypeFilter={branchTypeFilter}
          activationStatusFilter={activationStatusFilter}
          handleBranchTypeFilterChange={handleBranchTypeFilterChange}
          handleActivationStatusFilterChange={
            handleActivationStatusFilterChange
          }
          openRentDueModal={openRentDueModal}
          openProvisionsModal={openProvisionsModal}
          setOpenProvisionsModal={setOpenProvisionsModal}
          setOpenRentDueModal={setOpenRentDueModal}
          branchIDforDue={branchIDforDue}
          // rentContractDetails={rentContractDetails.rentStartDate}
          rentStartDate={rentStartDate}
          setRentStartDate={setRentStartDate}
          rentEndDate={rentEndDate}
          setRentEndDate={setRentEndDate}
          agreementTenure={agreementTenure}
          setAgreementTenure={setAgreementTenure}
          monthlyRent={monthlyRent}
          setMonthlyRent={setMonthlyRent}
          lessorName={lessorName}
          setLessorName={setLessorName}
          setLesseeBranchName={setLesseeBranchName}
          lesseeBranchName={lesseeBranchName}
          setEditLessorRenewData={setEditLessorRenewData}
          openPaymentReportData={openPaymentReportData}
          setOpenPaymentReportData={setOpenPaymentReportData}
        />
      </Box>
    </Box>
  );
};
export default RentalDetails;
// const categories = [
//   ...new Set(rentContractDetails?.map((item) => item?.branchID)),
// ];

// const [selectedFilter, setSelectedFilter] = useState("");
// const [filterTable, setFilterTable] = useState({});

//   // Filter the data based on the selected filter
//   if (filterValue === "") {
//     setRentContractDetails(rentContractDetails); // Show all data
//   } else {
//     const filtered = rentContractDetails?.filter(
//       (item) => item.branchID === filterValue
//     );
//     setRentContractDetails(filtered);
//   }

//   setFilterTable({
//     ...filterTable,
//     branchID: value,
//   });
// };

// let array = [];
// data?.data.map((val) => {
//   array.push({
//     col1: val.uniqueID ?? "",
//     col2: val.lesseeBranchType,
//     col3: val.branchID ?? "",
//     col4: val.lesseeBranchName ?? "",
//     col5: val.lessorArea ?? "",
//     col6: val.lessorDistrict ?? "",
//     col7: val.lessorState ?? "",
//     col8: val.lessorState ?? "",
//     col9: val.lessorName ?? "",
//     col10: val.lessorContactNumber ?? "",
//     col11: val.lessorRecipiantsName ?? "",
//     col12: val.lessorBankName ?? "",
//     col13: val.lessorAccountNumber ?? "",
//     col14: val.agreementSignDate ?? "",
//     col15: val.agreementSignDate ?? "",
//     col16: val.agreementTenure ?? "",
//     col17: val.agreementStartDate ?? "",
//     col18: val.agreementEndDate ?? "",
//     col19: val.rentStartDate ?? "",
//     col20: val.rentEndDate ?? "",
//     col21: val.securityDepositAmount,
//     col22: val.rentAmount ?? "",
//     col23: val.tds ?? "",
//     col24: val.firstMonthvalue ?? "",
//     col25: val.lastMonthvalue ?? "",
//     col26: val.agreementEndDate ?? "",
//     col27: val.agreementEndDate ?? "",
//     col28: val.standardDeducition ?? "",
//     col29: val.agreementEndDate ?? "",
//     col30: val.renewalTenure ?? "",
//     col31: val.agreementEndDate ?? "",
//     col32: "769",
//     col33: val.rentContractStatus ?? "",
//     col34: "",
//     col35: "",
//     col36: "",
//     col37: "",
//   });
// });
// setRentContractDetailsCopy(array);
// const filteredData = rentContractDetails?.filter(
//   (item) =>
//     (branchFilter === "" || item.branchID === branchFilter) &&
//     (stateFilter === "" || item.lesseeState === stateFilter)
// );

// const filteredData =
//   filter === ""
//     ? rentContractDetails
//     : rentContractDetails?.filter((item) => item.branchID === filter);

// console.log(rentContractDetails, "rentcontractDdetails");
