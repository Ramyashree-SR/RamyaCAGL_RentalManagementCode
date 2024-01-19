import React, { useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

function UploadDocumentFile({
  onFileSelect,
  sx = {},
  textLabel,
  disabled = false,
  required = false,
  label = "",
  size = "",
  ref = {},
  handleClick = () => {},
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <Box sx={{ ...sx }}>
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
        type="file"
        label={label}
        onChange={handleFileChange}
        size={size}
        ref={ref}
      />
    </Box>
  );
}

export default UploadDocumentFile;
