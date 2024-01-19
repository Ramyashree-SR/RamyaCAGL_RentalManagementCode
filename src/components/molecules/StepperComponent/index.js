import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  styled,
  stepConnectorClasses,
  StepConnector,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#fff",
  zIndex: 1,
  color: "gray",
  width: 30,
  height: 25,
  display: "flex",
  borderRadius: "50%",
  background: "#ccc",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  ...(ownerState.active && {
    border: "0",
    color: "#fff",
    background: "#1181B2",
  }),
  ...(ownerState.completed && {
    border: "0",
    color: "#0DB84C",
    background: "none",
  }),
}));

const CustomStepper = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      border: "0",
      borderLeft: "2px dashed #A6A6A6",
      // marginLeft: "20px",
      paddingY: -10,
      height: 60,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      border: "0",
      borderLeft: "3px dashed #30A02D", // marginLeft: "20px",
      paddingY: -10,
      height: 60,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderLeft: "3px dashed #1181B2",
    border: "0",
    paddingY: -10,
    height: 60,
  },
}));

const StepperComponent = ({
  steps = [{ label: "1" }, { label: "2" }],
  activeStep = 1,
  setActiveStep = () => {},
  orientation = "vertical",
  setStep,
}) => {
  const ColorlibStepIcon = (props) => {
    const { active, completed, className } = props;

    const icons = {};
    steps.map((val, ind) => {
      let indNumber = ind + 1;
      if (indNumber > 0 && indNumber < 10) {
        icons[indNumber] = (
          <p
            className="m-0"
            onClick={() => {
              // onStepperClick(ind);
            }}
          >
            {indNumber}
          </p>
        );
      } else {
        icons[indNumber] = (
          <p
            className="m-0"
            onClick={() => {
              // onStepperClick(ind);
            }}
          >
            {indNumber}
          </p>
        );
      }
    });

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={`${className} d-flex align-items-center jutify-content-center py-0`}
      >
        {completed ? (
          <CheckCircleIcon sx={{ fill: "#30A02D" }} />
        ) : (
          icons[String(props.icon)]
        )}
      </ColorlibStepIconRoot>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        // alternativeLabel
        orientation={orientation}
        connector={
          <CustomStepper
            sx={{
              marginLeft: "25px",
              "& .MuiStepConnector-lineVertical": {
                borderLeft: "3px dashed #A6A6A6",
                marginTop: "12px",
              },
            }}
          />
        }
      >
        {steps &&
          steps?.map((step, ind) => (
            <Step key={step?.ind} last={true}>
              <StepLabel
                onClick={() => {
                  setStep(ind);
                }}
                last="true"
                StepIconComponent={ColorlibStepIcon}
                sx={{
                  "&.MuiStepLabel-vertical": {
                    paddingX: "10px ",
                    paddingY: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "right",
                    marginTop: "12px",
                  },
                }}
              >
                <Typography sx={{ fontSize: 7, paddingRight: "3px" }}>
                  {step?.label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
      </Stepper>
    </Box>
  );
};

export default StepperComponent;

{
  /* <Box>
        <Button disabled={activeStep && activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={activeStep === steps?.length - 1 ? handleSubmit : handleNext}
        >
          {activeStep === steps?.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box> */
}
