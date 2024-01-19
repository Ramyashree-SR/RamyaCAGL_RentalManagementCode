import React from "react";
import Switch from "@mui/material/Switch";

const SwitchComponent = ({ checked, onChange, sx = "" }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      color="primary"
      sx={{ ...sx }}
    />
  );
};

export default SwitchComponent;
