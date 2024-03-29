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
  IconButton,
  Checkbox,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Snackbar,
  Alert,
  Grid,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, deepOrange, green, pink } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon
import CloseIcon from "@mui/icons-material/Close";

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
  },
  tableRow: {
    border: "none !important",
    color: "#373737",
    fontWeight: "500",
    fontSize: "12px",
  },
});

const ReusableTable = ({
  data,
  columns,
  sx,
  showTotal,
  searchText,
  provisionMonthFilter,
  handleProvisionMonthChange,
  setconfirmDeleteVal,
  setYearData,
  setContractID,
  setMonthData,
  withCheckbox,
  currentYearAndMonth,
  setRefreshKey,
  currentMonth,
  selectedRows,
  setSelectedRows,
  onSaveSelectedRows,
  setconfirmDelete,
  open,
  handleClose,
  setOpen,
  monthData,
  refreshKey,
  yearData,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [monthlyTotal, setMonthlyTotal] = useState({});

  const [state, setState] = useState({
    opened: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, opened } = state;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClosed = () => {
    setState({ ...state, opened: false });
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClosed}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Fetch new data based on the new month and year
      saveSelectedRows();
    }
  }, [refreshKey]);

  const handleConfirmDelete = (row) => {
    setconfirmDelete(true);
    saveSelectedRows();
  };

  const handleClick = (newState) => {
    setState({ ...newState, opened: true });
  };

  // Calculate monthly totals
  useEffect(() => {
    const total = {};
    data &&
      data?.lenght?.map((entry) => {
        return Object?.keys(entry).forEach((month) => {
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

  // Apply the filter
  const filteredData =
    data &&
    data?.filter((item) => {
      if (provisionMonthFilter === "All") {
        return item; // Show all rows if 'all' is selected
      }
      return item["month"] === provisionMonthFilter; // Customize the filtering condition based on your data structure
    });

  const filterOptions =
    data &&
    data?.reduce((options, item) => {
      if (options && !options?.includes?.(item["month"])) {
        options?.push(item["month"]);
      }
      return options;
    }, []);

  const handleDeleteClick = (row) => {
    setOpen(true);
    setconfirmDeleteVal(row);
    setContractID(row?.contractID);
    setYearData(row?.year);
    setMonthData(row?.month);

    // Check if the row's month matches the current month before triggering delete action
    if (row?.month === currentMonth) {
      // Debug point 2: Check if this block is executed
      console.log("Deleting row");
    } else {
      // Debug point 3: Log if this block is executed
      console.log("Row's month does not match current month");
    }
  };

  // const handleRowSelection = (id) => {
  //   const newSelectedRows = selectedRows?.includes(id)
  //     ? selectedRows?.filter((rowId) => rowId !== id)
  //     : [...selectedRows, id];

  //   setSelectedRows(newSelectedRows);
  // };

  const handleRowSelection = (index) => {
    const dataIndex = page * rowsPerPage + index; // Calculate the index in the original data array
    const newSelectedRows = selectedRows.includes(dataIndex)
      ? selectedRows.filter((rowId) => rowId !== dataIndex)
      : [...selectedRows, dataIndex];

    setSelectedRows(newSelectedRows);
  };

  const handleRowSelectionAll = () => {
    const filteredIndices = filteredData.map(
      (_, index) => page * rowsPerPage + index
    );
    // console.log(filteredIndices, "filteredIndices");
    const newSelectedRows =
      selectedRows.length === filteredData.length
        ? [] // Deselect all if all are currently selected
        : filteredIndices.filter((index) => !selectedRows.includes(index)); // Select all filtered rows except the ones already selected

    setSelectedRows(newSelectedRows);
  };

  const saveSelectedRows = () => {
    const selectedRowData = selectedRows
      .map((index) => filteredData[index - page * rowsPerPage])
      .filter(Boolean);
    onSaveSelectedRows(selectedRowData);
  };

  return (
    <>
      <Grid className="d-flex align-items-end justify-content-end w-100 py-1">
        {withCheckbox ? (
       
          <Tooltip>
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
              borderBottom="1px"
              color="primary"
              size="lg"
              sx={{ mt: -5, mb: -3 }}
              className="d-flex flex-column"
            >
              <DeleteIcon />
              <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                Bulk Delete
              </Typography>
            </IconButton>
          </Tooltip>
        ) : null}
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          ...sx,
          mt: 3,
          width: "100%",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {/* {!withCheckbox && currentYearAndMonth ? ( 
                 || (withCheckbox && monthData === currentMonth) */}
              {withCheckbox ? (
                <StyledTableCell
                  key="checkbox"
                  classes={{ root: classes.tableHeader }}
                >
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < filteredData.length
                    }
                    checked={selectedRows.length === filteredData.length}
                    onChange={handleRowSelectionAll}
                  />
                </StyledTableCell>
              ) : (
                <StyledTableCell className="d-flex align-items-center  justify-content-center ">
                  ---
                </StyledTableCell>
              )}
              {columns?.map((column) => (
                <StyledTableCell
                  key={column.id}
                  classes={{ root: classes.tableHeader }}
                >
                  {column?.label}
                  {column && column?.label === "Month" && (
                    <select
                      value={provisionMonthFilter || "All"}
                      onChange={handleProvisionMonthChange}
                    >
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
              {/* {currentYearAndMonth && monthData === currentMonth && ( */}
              <StyledTableCell classes={{ root: classes.tableHeader }}>
                Actions
              </StyledTableCell>
              {/* )} */}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredData) &&
              filteredData
                ?.filter((value) => {
                  if (searchText === "") {
                    return value;
                  } else if (
                    value?.month
                      ?.toString()
                      ?.toLowerCase()
                      ?.includes?.(searchText) ||
                    value?.contractID
                      ?.toString()
                      ?.toLowerCase()
                      ?.includes?.(searchText) ||
                    value?.branchID
                      ?.toString()
                      ?.toLowerCase()
                      ?.includes?.(searchText) ||
                    value?.provisiontype
                      ?.toString()
                      ?.toLowerCase()
                      ?.includes?.(searchText)
                  ) {
                    return value;
                  }
                })
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <StyledTableRow key={index}>
                    {row.deleteFlag ? (
                      // && withCheckbox && currentYearAndMonth
                      // && !withCheckbox
                      //  &&
                      // row?.month === currentMonth
                      <StyledTableCell
                        key={`${index}-checkbox`}
                        classes={{ root: classes.tableHeader }}
                      >
                        <Checkbox
                          checked={selectedRows.includes(index)}
                          onChange={() => handleRowSelection(index)}
                        />
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell className="d-flex align-items-center  justify-content-center ">
                        ---
                      </StyledTableCell>
                    )}

                    {columns &&
                      columns?.map((column) => (
                        <StyledTableCell
                          key={column.id}
                          sx={{ sx }}
                          classes={{ root: classes.tableHeader }}
                        >
                          {/* {row[column.id]} */}
                          {(row[column.id] !== undefined &&
                            row[column.id] !== null) ||
                          ((row.info?.[column.id] && row.info?.[column.id]) !==
                            undefined &&
                            (row.info?.[column.id] && row.info?.[column.id]) !==
                              null)
                            ? row[column.id] ||
                              (row.info?.[column.id] && row.info?.[column.id])
                            : 0}
                        </StyledTableCell>
                      ))}

                    {row.deleteFlag ? (
                      // && currentYearAndMonth
                      <StyledTableCell>
                        <IconButton
                          onClick={() => {
                            handleDeleteClick(row);
                          }}
                          borderBottom="1px"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell>----</StyledTableCell>
                    )}
                    {/* ):( <StyledTableCell>----</StyledTableCell>
                      )} */}
                  </StyledTableRow>
                ))}

            {showTotal && (
              <StyledTableRow>
                {columns &&
                  columns?.map((column) => {
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
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* {withCheckbox && currentYearAndMonth && ( */}
      {/* {withCheckbox ? (
        <Button
          onClick={() => {
            setOpen(true);
            // saveSelectedRows();
          }}
          variant="contained"
          sx={{ backgroundColor: blue[900] }}
        >
          Delete Details
        </Button>
      ) : null} */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography>Are you sure you want to delete?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button
            onClick={() => {
              handleConfirmDelete();
              handleClick({
                vertical: "bottom",
                horizontal: "center",
              });
              setRefreshKey((prevKey) => prevKey + 1);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={opened}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={handleClosed}
        action={action}
        message="Bulk Provision Deleted"
        key={vertical + horizontal}
        variant="success"
      />
    </>
  );
};

export default ReusableTable;
