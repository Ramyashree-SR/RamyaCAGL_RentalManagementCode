import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { FormHelperText, Grid, Tooltip, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      fontSize: "14px",
    },
  },
  input: {
    color: "#A6A6A6",
  },
});
const InputBoxComponent = ({
  readOnly = false,
  iconName = "",
  id = "",
  label = "",
  variant = "outlined", //filled outlined
  disabled = false,
  errorText = "",
  InputProps = {},
  color = "primary",
  fullWidth = true,
  size = "small", //small
  value = "",
  type = "text", //number password
  placeholder = "",
  sx = {},
  onChange = () => {},
  onBlur = () => {},
  onClick = () => {},
  name = "",
  autoComplete = "ON",
  multiline = false,
  rows = 0,
  textLabel = "",
  required = false,
  currency = false,
}) => {
  const classes = useStyles();
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    // event.preventDefault();
  };

  // console.log("value", value);
  return (
    <>
      <Grid className="d-flex flex-column m-2">
        <Grid mb="3px" px="6px">
          <Typography
            className="ff-Ro fs-14 fw-500"
            sx={{ color: disabled ? "#ccc" : "#000" }}
          >
            {textLabel}
            {required && <span className="text-danger ms-1">*</span>}
          </Typography>
        </Grid>
        <TextField
          name={name}
          id={id}
          label={label}
          variant={variant}
          disabled={disabled}
          placeholder={placeholder}
          error={Boolean(errorText)}
          InputLabelProps={{
            shrink: true,
            classes: { root: classes.input },
          }}
          color={color}
          fullWidth={fullWidth}
          size={size}
          value={value}
          // value={currency ? formatRupee(value) : value}
          type={password.showPassword ? "text" : type}
          sx={{
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: "#1181b2",
                borderRadius: "6px",
              },
            },
            "& .MuiOutlinedInput-root:focus": {
              "& > fieldset": {
                outline: "#A6A6A6",
                borderRadius: "6px",
              },
            },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": {
                borderColor: "#A6A6A6",
                borderRadius: "6px",
              },
            },

            ...sx,
          }}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          classes={{ root: classes.customTextField }}
          multiline={multiline}
          rows={rows}
          InputProps={{
            readOnly,
            autoComplete: autoComplete,
            endAdornment: iconName === "password" && (
              <>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{
                    color: "red",
                    background: "#A6A6A6",
                    width: "1.2px !important",
                  }}
                />
                <Tooltip
                  title={
                    password.showPassword ? "Hide Password" : "Show Password"
                  }
                  placement="top"
                >
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {password.showPassword ? (
                      <Visibility
                        sx={{
                          fill: "#A6A6A6",
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{
                          fill: "#A6A6A6",
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </>
            ),
            ...InputProps,
          }}
        />
        {errorText && (
          <FormHelperText error className="fw-700">
            {errorText}
          </FormHelperText>
        )}
      </Grid>
    </>
  );
};
export default InputBoxComponent;
