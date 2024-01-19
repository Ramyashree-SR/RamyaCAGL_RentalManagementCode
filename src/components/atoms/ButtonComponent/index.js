import { Button } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles({
  root: {
    "&:disabled": {
      backgroundColor: "#706c61",
      color: "white",
    },
  },
});
const ButtonComponent = ({
  label = "Button",
  component = "",
  variant = "contained",
  onBtnClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  size = "small",
  borderRadius = "4px",
  textColor = "color-white",
  bgColor = "bg-btn",
  fullWidth = false,
  disabled = false,
  muiProps = "",
  children,
  iconPosition = "start",
  icon = <DeleteIcon />,
  showIcon = false,
  sx = {},
}) => {
  const classes = useStyles();
  let IconProp = showIcon
    ? iconPosition === "start"
      ? {
          startIcon: icon,
        }
      : { endIcon: icon }
    : {};

  return (
    <Button
      component={component}
      {...IconProp}
      variant={variant}
      onClick={onBtnClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      size={size}
      className={`px-3 py-2 ${
        disabled === true
          ? classes.root
          : variant === "contained"
          ? `${bgColor} ${textColor}`
          : variant === "outlined"
          ? `${textColor}`
          : variant === "text"
          ? `${textColor}`
          : ""
      }
    ${muiProps}`}
      sx={{
        textTransform: "capitalize",
        borderRadius: { borderRadius },
        ...sx,
      }}
      fullWidth={fullWidth}
      // disabled={disabled}
      disableFocusRipple
      disableElevation
    >
      {label}
      {children}
      {children}
    </Button>
  );
};
export default ButtonComponent;
