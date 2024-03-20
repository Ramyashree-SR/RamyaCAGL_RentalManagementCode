import React, { useState } from "react";
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
  styled,
  tableCellClasses,
  Button,
  TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, deepOrange, green, pink } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import CheckerEditModal from "../../pages/RentalProcessDetails/CheckerRentalDetails/CheckerEditModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "4px",
    paddingX: "4px",
    width: 8,
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette?.success.dark,
    color: theme.palette?.common?.white,
    fontSize: 12,
    fontWeight: 650,
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

function TableReusable({ data, columns, fullScreen, setFullscreen }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editAllNewContractData, setEditAllNewContractData] = useState({});
  const [openCheckerEditLessorModal, setOpenCheckerEditLessorModal] =
    useState(false);

  const handleEditRow = (event, rowData) => {
    setOpenCheckerEditLessorModal(true);
    setEditAllNewContractData(rowData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              {columns?.map((column, index) => (
                <StyledTableCell key={index}>{column.label}</StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <StyledTableRow key={index}>
                  {columns &&
                    columns?.map((column, columnIndex) => {
                      const value = row[column.id] || "";
                      return (
                        <StyledTableCell
                          key={columnIndex}
                          classes={{ root: classes.tableHeader }}
                        >
                          {column?.format && typeof value === "number"
                            ? column?.format(value)
                            : value}

                          {column?.actions && (
                            <Box>
                              {column?.actions.includes("edit") && (
                                <ColorIcon
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <EditIcon
                                    size="small"
                                    onClick={(e) => {
                                      handleEditRow(e, row);
                                      // setUniqueID(row.uniqueID);
                                    }}
                                  />

                                  <Typography
                                    sx={{ fontSize: 9, fontWeight: 800 }}
                                  >
                                    Edit Details
                                  </Typography>
                                </ColorIcon>
                              )}
                            </Box>
                          )}

                          <CheckerEditModal
                            show={openCheckerEditLessorModal}
                            close={() => setOpenCheckerEditLessorModal(false)}
                            editAllNewContractData={editAllNewContractData}
                            openCheckerEditLessorModal={
                              openCheckerEditLessorModal
                            }
                            setOpenCheckerEditLessorModal={
                              setOpenCheckerEditLessorModal
                            }
                            // fullscreen={fullscreen}
                            setFullscreen={setFullscreen}
                          />
                        </StyledTableCell>
                      );
                    })}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default TableReusable;
