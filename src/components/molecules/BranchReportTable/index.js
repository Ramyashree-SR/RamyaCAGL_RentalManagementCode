import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Button,
  tableCellClasses,
  TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { deepOrange, green, pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "7px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette?.success.dark,
    color: theme.palette?.common?.white,
    fontSize: 12,
    fontWeight: 650,
    padding: "5px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: "#D5F7DC", //#CFE8F7, #C5EBF6 ,#D5F7DC
    fontFamily: "sans-serif",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette?.action?.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: deepOrange[500],
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: deepOrange[700],
  },
}));

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[300]),
  color: pink[900],
  // color:yellow[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));

const useStyles = makeStyles({
  tableHeader: {
    fontWeight: "600 !important",
    fontSize: "12px !important",
    borderBottom: "1px solid #70B3D1 !important",
    borderRight: "1px solid #70B3D1  !!!important",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  tableRow: {
    border: "none !important",
    color: "#373737",
    fontWeight: "500",
    fontSize: "12px",
  },
});

const BranchReportTable = ({
  data,
  columns,
  sx,
  showTotal,
  activationStatusFilterDue,
  handleActivationStatusFilterChangeDue,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [monthlyTotal, setMonthlyTotal] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Calculate monthly totals
  useEffect(() => {
    const total = {};
    data &&
      data?.map((entry) => {
        return Object.keys(entry).forEach((month) => {
          if (
            month !== "rentDueID" &&
            month !== "contractID" &&
            month !== "year" &&
            month !== "escalation" &&
            month !== "status"
          ) {
            total[month] = (total[month] || 0) + entry[month];
          }
        });
      });
    setMonthlyTotal(total);
  }, [data]);

  const calculateTotal = (row) => {
    return Object.values(row).reduce((acc, value) => acc + value, 0);
  };

  const filteredData =
    data &&
    data?.filter((item) => {
      if (activationStatusFilterDue === "All") {
        return item; // Show all rows if 'all' is selected
      }
      return item["status"] === activationStatusFilterDue; // Customize the filtering condition based on your data structure
    });

  const filterOptions =
    data &&
    data?.reduce((options, item) => {
      if (!options?.includes?.(item["status"])) {
        options?.push(item["status"]);
      }
      return options;
    }, []);

  return (
    <>
      <TableContainer component={Paper} sx={{ ...sx }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns &&
                columns?.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    classes={{ root: classes.tableHeader }}
                  >
                    {column?.label}
                    {column && column?.label === "Status" && (
                      <select
                        value={activationStatusFilterDue || "All"}
                        onChange={handleActivationStatusFilterChangeDue}
                      >
                        {/* <option value=""></option> */}
                        <option value="All">All</option>
                        {filterOptions?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </StyledTableCell>
                ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredData) &&
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    {columns &&
                      columns.map((column) => (
                        <StyledTableCell
                          key={column.id}
                          sx={{ sx }}
                          classes={{ root: classes.tableHeader }}
                        >
                          {row[column.id] !== undefined &&
                          row[column.id] !== null
                            ? row[column.id]
                            : 0}
                        </StyledTableCell>
                      ))}
                  </StyledTableRow>
                ))}
            {showTotal && (
              <StyledTableRow>
                {columns &&
                  columns.map((column) => {
                    if (
                      ["contractID", "escalation", "year", "status"].includes(
                        column.id
                      )
                    ) {
                      return (
                        <StyledTableCell key={column.id}>-</StyledTableCell>
                      );
                    } else if (column.id in monthlyTotal) {
                      return (
                        <StyledTableCell key={column.id}>
                          ₹{monthlyTotal[column.id]}
                        </StyledTableCell>
                      );
                    }
                    return null;
                  })}
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 9, 50]}
        component="div"
        count={filteredData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default BranchReportTable;
