import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
//   import MultiSelectDropDown from "../MultiSelectDropDown";

const AccordionComponent = ({
  children,
  AccordionTitle = "Accordion Title",
  headerDropDown = false,
  onDropDownChange = () => {},
  dropDownLabel = "",
  dropDownOptions = [],
  dropDownValue = [],
  AccordionHeadDropDownPlaceholder = "--Select--",
}) => {
  const [isExpand, setIsExpand] = useState(false);
  let handleChangeExpand = () => {
    setIsExpand(!isExpand);
  };
  return (
    <>
      <Box className="m-3">
        <Accordion
          disableGutters
          sx={{
            border: 1,
            borderColor: "#70B3D1",
          }}
          expanded={isExpand}
        >
          <AccordionSummary
            expandIcon={
              isExpand ? (
                <Tooltip title="Collapse">
                  <IconButton onClick={handleChangeExpand}>
                    <RemoveIcon fontSize="large" sx={{ color: "#1181B2" }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Expand">
                  <IconButton onClick={handleChangeExpand}>
                    <AddIcon
                      fontSize="large"
                      sx={{
                        color: "#1181B2",
                        transitionDuration: "ease",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )
            }
            sx={{
              borderBottom: 1,
              borderColor: "#70B3D1",
              paddingY: "5px",
              background: "#ffffff",
              "&.Mui-focusVisible": {
                background: "#ffffff !important",
              },
            }}
          >
            <Grid container>
              <Grid item sm={3} className="align-self-center">
                <Typography className="fs-22 fw-500" sx={{ color: "#1181B2" }}>
                  {AccordionTitle}
                </Typography>
              </Grid>
              {headerDropDown && (
                <Grid item sm={3}>
                  {/* <MultiSelectDropDown
                    onChange={onDropDownChange}
                    textLabel={dropDownLabel}
                    options={dropDownOptions}
                    value={dropDownValue}
                    placeholder={AccordionHeadDropDownPlaceholder}
                  /> */}
                </Grid>
              )}
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              //   borderBottom: 1,
              borderColor: "#70B3D1",
              padding: "0px !important",
            }}
          >
            {children}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
export default AccordionComponent;
