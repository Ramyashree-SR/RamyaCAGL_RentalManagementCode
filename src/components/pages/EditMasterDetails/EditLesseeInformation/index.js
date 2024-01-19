import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";
import DropDownComponent from "../../../atoms/DropDownComponent";

const EditLesseeInformation = ({
  activeStep,
  setActiveStep,
  onSave,
  type,
  editAllContractDetails,
  setEditAllContractDetails,
}) => {
  const handleNext = () => {
    // NewRentContractLesseeDetails();
    onSave(editAllContractDetails);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateChange = (e) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBranchType = (name, value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [name]: value,
    });
  };

  const handleApproverRelocate = (name, value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [name]: value,
    });
  };

  const handleApproverRenew = (name, value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [name]: value,
    });
  };

  const handleEntityDetails = (name, value) => {
    setEditAllContractDetails({
      ...editAllContractDetails,
      [name]: value,
    });
  };

  let BranchType = [
    { id: "GL", label: "GL" },
    { id: "RF", label: "RF" },
    { id: "DO/RPC", label: "DO/RPC" },
    {
      id: "Maintanence",
      label: "Maintanence",
    },
    {
      id: "Residence/Hostel",
      label: "Residence/Hostel",
    },
  ];

  let ApproverRenew = [
    { id: "DM", label: "DM" },
    { id: "ZM", label: "ZM" },
  ];

  let ApproverRelocate = [
    { id: "SH", label: "SH" },
    { id: "CBO", label: "CBO" },
    { id: "MD/CEO", label: "MD/CEO" },
  ];

  let EntityDetails = [
    { id: "Commercial", label: "Commercial" },
    { id: "Residential", label: "Residential" },
    {
      id: "Both Commercial & Residential",
      label: "Both Commercial & Residential",
    },
  ];
  return (
    <>
      <Box
        className="d-flex justify-content-center w-100"
        sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}
      >
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-3">
            Lessee Branch Details
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2" lg={12}>
              <InputBoxComponent
                label="Branch ID"
                placeholder="Enter Branch ID."
                sx={{ width: 300 }}
                name="branchID"
                value={editAllContractDetails?.branchID}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
            <Grid item className="d-flex m-2" lg={12}>
              <InputBoxComponent
                label="Branch Name"
                placeholder="Enter Branch Name."
                sx={{ width: 300 }}
                name="lesseeBranchName"
                value={editAllContractDetails?.lesseeBranchName}
                onChange={(e) => updateChange(e)}
              />
              <InputBoxComponent
                label="Area Name"
                placeholder="Enter Area Name ."
                sx={{ width: 300 }}
                name="lesseeAreaName"
                value={editAllContractDetails?.lesseeAreaName}
                onChange={(e) => updateChange(e)}
              />
              <InputBoxComponent
                label="Division/Region"
                placeholder="Enter Div/Reg No."
                sx={{ width: 300 }}
                name="lesseeDivision"
                value={editAllContractDetails?.lesseeDivision}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
            <Grid item className="d-flex m-2" lg={12}>
              <InputBoxComponent
                label="Zone"
                placeholder="Enter Zone ."
                sx={{ width: 300 }}
                name="lesseeZone"
                value={editAllContractDetails?.lesseeZone}
                onChange={(e) => updateChange(e)}
              />
              <InputBoxComponent
                label="State"
                placeholder="Enter State ."
                sx={{ width: 300 }}
                name="lesseeState"
                value={editAllContractDetails?.lesseeState}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
          </Grid>

          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-3">
              Lessee Branch Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" lg={12}>
                <DropDownComponent
                  label="Branch Type"
                  sx={{ width: 300 }}
                  options={BranchType}
                  value={editAllContractDetails?.lesseeBranchType}
                  // onSelect={handleBranchType}
                  onChange={(value) =>
                    handleBranchType("lesseeBranchType", value)
                  }
                />

                <DropDownComponent
                  label="Approver-Renewals "
                  sx={{ width: 300 }}
                  options={ApproverRenew}
                  value={editAllContractDetails?.lesseeApproverrenewals}
                  // onSelect={handleApproverRenew}
                  onChange={(value) =>
                    handleApproverRenew("lesseeApproverrenewals", value)
                  }
                />
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                <DropDownComponent
                  label="Approver-Relocations/New "
                  sx={{ width: 300 }}
                  options={ApproverRelocate}
                  value={editAllContractDetails?.lesseeApproverRelocation}
                  // onSelect={handleApproverRelocate}
                  onChange={(value) =>
                    handleApproverRelocate("lesseeApproverRelocation", value)
                  }
                />

                <DropDownComponent
                  label="Entity Details "
                  sx={{ width: 300 }}
                  options={EntityDetails}
                  value={editAllContractDetails?.lesseeEntityDetails}
                  // onSelect={handleEntityDetails}
                  onChange={(value) =>
                    handleEntityDetails("lesseeEntityDetails", value)
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Box className="d-flex justify-content-end w-100">
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={handleBack}
          variant="contained"
          sx={{ m: 1 }}
        >
          Back
        </Button>
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={handleNext}
          variant="contained"
          sx={{ m: 1, background: "#238520" }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default EditLesseeInformation;
