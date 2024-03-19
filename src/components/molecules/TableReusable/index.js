import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue } from "@mui/material/colors";

const useStyles = makeStyles({
  tableHeader: {
    fontWeight: "600 !important",
    fontSize: "12px !important",
    borderBottom: "1px solid #70B3D1 !important",
    borderRight: "1px solid #70B3D1  !!!important",
    // minWidth: "10px",
    padding: "4px -1px",
  },
  tableRow: {
    border: "none !important",
    color: "#373737",
    // color:red[900],
    fontWeight: "500",
    fontSize: "12px",
    // minWidth: "10px",
  },
});

function TableReusable({ data, columns }) {
  const classes = useStyles();
  const renderOption = (props, option) => {
    return (
      <li {...props} style={{ padding: 0, margin: 0, width: "100%" }}>
        <Box className={classes.optionStyle}>
          <Typography
            sx={{ color: blue[900], fontSize: "13px", fontWeight: "550" }}
          >
            {option}
          </Typography>
        </Box>
      </li>
    );
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              {columns &&
                      columns?.map((column, columnIndex) => {
                        const value = row[column.id] || "";
                        return (
                          <TableCell
                            key={columnIndex}
                            classes={{ root: classes.tableHeader }}
                          >
                            {column?.format && typeof value === "number"
                              ? column?.format(value)
                              : value}
                              </TableCell>
                        )})}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableReusable;
