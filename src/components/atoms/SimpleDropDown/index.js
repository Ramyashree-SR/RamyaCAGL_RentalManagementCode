// SimpleDropDown.js
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Box, FormHelperText, Grid, Typography } from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      fontSize: "14px",
    },
  },
  input: {
    color: "#B3B3B3",
    // background: "#cccccc",
  },
  clearIndicator: {
    color: "red",
  },
  optionStyle: {
    width: "100%",
    display: "flex",
    margin: "0px 5px",
    padding: "6px 5px",
    borderBottom: "0.5px solid #DDEDF4",
    background: "#cccccc",
    borderRadius: "10px",
    cursor: "pointer",
    "&:hover": {
      background: "#9FCCE066 !important",
    },
  },
  listBox: {
    border: "1px solid #9FCCE0 !important",
    borderRadius: "8px !important",
    marginTop: "3px",
  },
});
const commonStyles = {
  bgcolor: "background.paper",
  m: 0.2,
  borderColor: "grey.500",
  height: "1.2rem",
};

const SimpleDropDown = ({
  textLabel = "",
  options,
  label,
  onChange,
  readOnly = false,
  disabled = false,
  size = "small",
  sx = {},
  multiple = false,
  value = "",
  endAdornmentLine = true,
  required = false,
  disableClearable = false,
  showAddCompanies = false,
  addBtnClick = () => {},
}) => {
  const classes = useStyles();
  const handleInputChange = (_, newInputValue) => {
    // If the input value is cleared, send null to the parent component
    onChange(
      newInputValue === ""
        ? null
        : options.find((option) => option.label === newInputValue) || null
    );
  };
  const renderOption = (props, option) => {
    return (
      <li
        {...props}
        style={{ padding: 0, margin: 0, width: "100%",}}
      >
        <Box className={classes.optionStyle}>
          <Typography
            sx={{
              color: "#4a4a4a",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            {option && option?.label ? option?.label : ""}
          </Typography>
        </Box>
      </li>
    );
  };

  return (
    <>
      <Grid mb="3px" px="6px">
        <Typography
          sx={{ cursor: "pointer", color: disabled ? "#ccc" : "#000" }}
          className="ff-Ro fs-14 fw-500"
        >
          {textLabel}
          {required && <span className="text-danger ms-1">*</span>}
        </Typography>
      </Grid>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        inputValue={value ? value?.label : ""}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            classes={{ root: classes.customTextField }}
          />
        )}
        required={required}
        size={size}
        noOptionsText={
          showAddCompanies ? (
            <Box
              onClick={addBtnClick}
              className="d-flex border rounded p-1  border-primary justify-content-around align-items-center cursor-pointer"
            >
              <AddIcon className="color-blue" />
              <Typography className="fs-14">Add New Company</Typography>
            </Box>
          ) : (
            <Typography>No options available</Typography>
          )
        }
        renderOption={(props, option) => renderOption(props, option)}
        sx={{
          "& .MuiInputBase-input": {
            ...commonStyles,
          },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: "#1181b2",
              borderRadius: "6px",
            },
          },
          "& .MuiOutlinedInput-root:focus": {
            "& > fieldset": {
              outline: "none",
              borderColor: "#A6A6A6",
              borderRadius: "6px",
              background: "#cccccc",
            },
          },
          "& .MuiOutlinedInput-root:active": {
            "& > fieldset": {
              outline: "none",
              borderColor: "#1181b2",
              borderRadius: "6px",
            },
          },

          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              borderColor: "#A6A6A6",
              borderRadius: "6px",
            },
          },
          "& .MuiAutocomplete-popupIndicatorOpen": {
            borderRadius: 0,
            borderRight: endAdornmentLine ? "1px solid #A6A6A6" : "",
          },
          "& .css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":
            {
              borderRadius: 0,
              borderLeft: endAdornmentLine ? "1px solid #A6A6A6" : "",
            },
          ...sx,
        }}
        classes={{ paper: classes.listBox }}
        popupIcon={
          <>
            <IoMdArrowDropdown
              style={{
                color: "#A6A6A6",
              }}
            />
          </>
        }
        disableClearable={disableClearable}
      />
    </>
  );
};

export default SimpleDropDown;
