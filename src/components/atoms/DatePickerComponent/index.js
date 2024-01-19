import React from "react";
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, Typography } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  bordercolor: "red",
  height: "0.48rem",
};

const DatePickerComponent = ({
  label = "",
  value = Date.now(),
  // value = new Date(),
  onChange = () => {},
  readOnly = false,
  textLabel = "",
  InputProps = {},
  placeholder = "--select--",
  errorText = "",
  disablePast = false,
  disableFuture = false,
  endAdornmentLine = true,
  required = false,
  // inputFormat = "YYYY-MM-DD ",
  inputFormat = "dd-MM-yyyy",

  shouldDisableDate = () => {},
  disabled = false,
  minDate = null,
  maxDate = null,
  sx = {},
  size = "",
}) => {
  return (
    <>
      <Grid mb="3px" px="6px">
        <Typography
          className="ff-Ro fs-14 fw-500"
          sx={{ color: disabled ? "#ccc" : "#000" }}
        >
          {textLabel}
          {required && <span className="text-danger ms-1">*</span>}
        </Typography>
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disableFuture={disableFuture}
          disablePast={disablePast}
          disabled={disabled}
          label={label}
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          // onChange={onChange}
          onChange={(newData) => onChange(new Date(newData))}
          inputFormat={inputFormat}
          size={size}
          shouldDisableDate={shouldDisableDate}
          renderInput={(params) => (
            <>
              <TextField
                size="small"
                error={Boolean(errorText)}
                sx={{
                  "& input::placeholder": {
                    fontSize: "14px",
                  },
                  "& .MuiInputBase-input": {
                    ...commonStyles,
                    padding: "8px 2px",
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
                      borderRadius: "6px",
                    },
                  },

                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "#A6A6A6",
                      borderRadius: "6px",
                    },
                  },
                  "& .MuiAutocomplete-endAdornment": {
                    borderLeft: endAdornmentLine ? "1px solid #A6A6A6" : "",
                  },
                  "& .MuiInputAdornment-root": {
                    "& >button": {
                      background: "#f8fafb",
                      borderLeft: "1px solid #A6A6A6",
                      borderRadius: "0px",
                      "& >svg": {
                        fill: "#A6A6A6",
                      },
                    },
                  },
                  "& .MuiIconButton-root": {
                    color: "#0F6F9A",
                    padding: "4px 8px",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errorText ? "#d32f2f" : "",
                  },
                  ...sx,
                }}
                fullWidth
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: placeholder,
                }}
              />
            </>
          )}
          readOnly={readOnly}
        />
      </LocalizationProvider>
      {errorText && (
        <FormHelperText error className="fw-700">
          {errorText}
        </FormHelperText>
      )}
    </>
  );
};

export default DatePickerComponent;
