import React from "react";
import { CSVLink } from "react-csv";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Button, Typography } from "@mui/material";
import { deepOrange, green } from "@mui/material/colors";

export const ExportToCSV = ({ excelData, fileName }) => {
  return (
    <Button variant="contained" sx={{backgroundColor: green[900]}}>
      <CSVLink data={excelData} filename={fileName} className="d-flex" >
        <DownloadRoundedIcon sx={{ color: "#FFFFFF" }} />
        <Typography sx={{ color: "#FFFFFF"}}>Export</Typography>
      </CSVLink>
    </Button>
  );
};
