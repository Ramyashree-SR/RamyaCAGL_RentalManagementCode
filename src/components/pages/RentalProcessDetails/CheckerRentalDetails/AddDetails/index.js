import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AccordionComponent from "../../../../atoms/AccordionComponent";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import LessorForm from "../../../../forms/LessorForm/index";
import DropDownComponent from "../../../../atoms/DropDownComponent";
import TableReusable from "../../../../molecules/TableReusable";
import { columns } from "../../../../../constants/masterTable";
import EditMasterDetails from "../../../EditMasterDetails";
import { blue, green } from "@mui/material/colors";
import {
  getAllRentContractDetailsByBranchID,
  getBranchID,
  getBranchNameDetails,
  getRentContractDetailsByBranchName,
} from "../../../../services/RentContractsApi";
import { makeStyles } from "@mui/styles";

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
const AddDetails = () => {
  const [checkRentContractDetails, setCheckRentContractDetails] = useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [uniqueID, setUniqueID] = useState(null);
  const [filterBranch, setFilterBranch] = useState([]);
  const [filterBranchName, setFilterBranchName] = useState([]);
  const [branchFilter, setBranchFilter] = useState("");
  const [branchNameFilter, setBranchNameFilter] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const gender = [
    { id: "Male", label: "Male" },
    { id: "Female", label: "Female" },
  ];
  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Clear existing data
      setFilterBranch([]);
      setFilterBranchName([]);
    }
  }, [refreshKey]);
  useEffect(() => {
    getBranchId();
  }, []);

  const handleBranchID = (value) => {
    setFilterBranch({
      ...filterBranch,
      branchID: value.target.outerText,
    });
    getAllContractDetails(value.target.outerText);
    setRefreshKey((prevKey) => prevKey + 1);
    // getAllRentDueDetailsByBranchID(value.target.outerText);
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
  console.log(checkRentContractDetails, "checkRentContractDetails");

  const getAllContractDetails = async (branchID) => {
    const { data } = await getAllRentContractDetailsByBranchID(branchID);
    if (data?.data) {
      let getData = data?.data;
      setCheckRentContractDetails(getData);
    }
  };

  useEffect(() => {
    getBranchName();
  }, []);

  const handleBranchName = (value) => {
    console.log(value, "value");
    setFilterBranchName({
      ...filterBranchName,
      lesseeBranchName: value.target.outerText,
    });
    getAllContractDetailsByBranchName(value.target.outerText);
    setRefreshKey((prevKey) => prevKey + 1);
    setLoading(!loading);
  };

  const getBranchName = async () => {
    const { data } = await getBranchNameDetails();
    if (data) {
      if (data) {
        let branchNameData = [];
        data?.data?.map((val) => {
          branchNameData.push([val]);
        });
        setBranchNameFilter(branchNameData);
      } else {
        setBranchNameFilter([]);
      }
    }
  };

  const getAllContractDetailsByBranchName = async (branchName) => {
    const { data } = await getRentContractDetailsByBranchName(branchName);
    if (data) {
      if (data) {
        let getData = data?.data;
        setCheckRentContractDetails(getData);
        setLoading(false);
      }
    }
  };
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
  return (
    <>
      <Box
        sx={{
          width: "100%",
          flexBasis: "100%",
          height: "100%",
          background: "#fff",
        }}
      >
        <AccordionComponent
          AccordionTitle="Rent Contract"
          sx={{ width: "100%", flexBasis: "100%", height: "100%" }}
        >
          <Grid container spacing={2} sx={{ m: 2 }}>
            <Grid
              item
              className="d-flex flex-row align-items-center justify-content-center "
            >
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
            <Grid
              item
              className="d-flex flex-row align-items-center justify-content-around "
            >
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
                options={
                  Array.isArray(branchNameFilter) ? branchNameFilter : []
                }
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

            <Grid
              item
              sx={{
                background: "#fff",
                height: "100%",
                width: "96%",
              }}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center flex-column ">
                  <div
                    className="spinner-border text-primary "
                    role="status"
                    style={{
                      width: "2rem",
                      height: "2rem",
                      margin: "10px",
                    }}
                  ></div>
                  <span className="visible text-primary">Loading...</span>{" "}
                </div>
              ) : (
                refreshKey && (
                  <TableReusable
                    data={checkRentContractDetails}
                    columns={columns}
                    setUniqueID={setUniqueID}
                    fullscreen={fullscreen}
                    setFullscreen={setFullscreen}
                  />
                )
              )}
            </Grid>
          </Grid>
          {/* <Button onClick={() => setopenLessorModal(true)}>Lessor</Button>
              <LessorForm
                openLessorModal={openLessorModal}
                close={() => setopenLessorModal(false)}
                checkRentContractDetails={checkRentContractDetails}
                setCheckRentContractDetails={setCheckRentContractDetails}
                refreshKey={refreshKey}
                loading={loading}
              /> */}
        </AccordionComponent>

        <AccordionComponent AccordionTitle="Contract Management">
          <Grid container spacing={2}>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
          </Grid>
        </AccordionComponent>
        <AccordionComponent AccordionTitle="Lessor">
          <Grid container spacing={2}>
            <Grid
              item
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
            <Grid
              item
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
          </Grid>
        </AccordionComponent>
      </Box>
    </>
  );
};

export default AddDetails;
{
  /* <AccordionComponent AccordionTitle="Trancations">
          <Grid container spacing={2}>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
          </Grid>
        </AccordionComponent>
        <AccordionComponent AccordionTitle="Taxation Policy">
          <Grid container spacing={2}>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
          </Grid>
        </AccordionComponent>
        <AccordionComponent AccordionTitle="Reports">
          <Grid container spacing={2}>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <DropDownComponent
                label="Gender"
                size="small"
                options={gender}
                sx={{
                  width: 200,
                }}
              />
            </Grid>
          </Grid>
        </AccordionComponent> */
}
