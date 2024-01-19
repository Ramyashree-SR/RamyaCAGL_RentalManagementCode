import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  List,
  ListItem,
  ListItemText,
  styled,
  tableCellClasses,
  TablePagination,
  Box,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "5px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette?.info?.dark,
    color: theme.palette?.common?.white,
    fontSize: 12,
    fontWeight: 650,
    // fontFamily:"san-serif",
    // padding: "3px",
    fontFamily: "sans-serif",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: "#CFE8F7", //#CFE8F7, #C5EBF6 ,#D5F7DC
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
const RentActualPaymentTable = ({
  data,
  sx,
  selectedRows,
  setSelectedRows,
  getSelectedRowDetails,
  tableData,
  setTableData,
  editedData,
  setEditedData,
}) => {
  // Track the edited data for saving
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id, field, value) => {
    const updatedData = data?.map((item) =>
      item.info?.uniqueID === id ? { ...item, [field]: value } : item
    );
    setTableData(updatedData);
    // Update editedData state with edited values
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [id]: {
        ...prevEditedData[id],
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (id) => {
    const newSelectedRows = selectedRows?.includes(id)
      ? selectedRows?.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(newSelectedRows);
  };

  return (
    <Box sx={{ position: "relative" }} className="d-flex flex-column">
      <Box className="d-flex align-items-center justify-content-center">
        {/* {editedData && ( */}
        <TableContainer component={Paper} sx={{ ...sx }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Contract ID</StyledTableCell>
                <StyledTableCell>Year</StyledTableCell>
                <StyledTableCell>Branch ID</StyledTableCell>
                <StyledTableCell>Branch Name</StyledTableCell>
                <StyledTableCell>Monthly Rent</StyledTableCell>
                <StyledTableCell>Due</StyledTableCell>
                <StyledTableCell>Provision</StyledTableCell>
                <StyledTableCell>TDS</StyledTableCell>
                <StyledTableCell>Net</StyledTableCell>
                <StyledTableCell>GST Amount</StyledTableCell>
                <StyledTableCell>Actual Amount</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => (
                  <StyledTableRow key={row?.info?.uniqueID}>
                    <StyledTableCell>
                      <Checkbox
                        checked={selectedRows?.includes(row?.info?.uniqueID)}
                        onChange={() =>
                          handleCheckboxChange(row?.info?.uniqueID)
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>{row?.info?.uniqueID}</StyledTableCell>
                    <StyledTableCell>{row?.monthYear}</StyledTableCell>
                    <StyledTableCell>{row?.info?.branchID}</StyledTableCell>
                    <StyledTableCell>
                      {row?.info?.lesseeBranchName}
                    </StyledTableCell>
                    <StyledTableCell>{row?.monthlyRent}</StyledTableCell>
                    <StyledTableCell>{row?.due}</StyledTableCell>
                    <StyledTableCell>{row?.provision}</StyledTableCell>
                    <StyledTableCell
                      contentEditable
                      onBlur={(e) =>
                        handleEdit(
                          row?.info?.uniqueID,
                          "tds",
                          e.target.innerText
                        )
                      }
                    >
                      {row?.tds}
                    </StyledTableCell>
                    <StyledTableCell>{row?.net}</StyledTableCell>
                    <StyledTableCell>{row?.gstamt}</StyledTableCell>
                    <StyledTableCell
                      contentEditable
                      onBlur={(e) =>
                        handleEdit(
                          row?.info?.uniqueID,
                          "actualAmount",
                          e.target.innerText
                        )
                      }
                    >
                      {row?.actualAmount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="d-flex align-items-end justify-content-end"
          />
        </TableContainer>
        {/* )} */}
      </Box>
      <Box className="d-flex mt-5 align-items-start justify-content-start flex-column">
        {/* {selectedRows.length > 0 && (
          <div>
            <h2>Selected Rows:</h2>
            <Table>
              <List>
                {selectedRows.map((selectedRow) => (
                  <ListItem key={selectedRow}>
                    <ListItemText primary={`Contract ID: ${selectedRow}`} />{" "}
                    &nbsp;&nbsp;
                  </ListItem>
                ))}
              </List>
            </Table>
          </div>
        )} */}
        {selectedRows.length > 0 && (
          <div>
            {/* <h2>Selected Rows Details:</h2> */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Contract ID</StyledTableCell>
                    <StyledTableCell>Year</StyledTableCell>
                    <StyledTableCell>Branch ID</StyledTableCell>
                    <StyledTableCell>Branch Name</StyledTableCell>
                    <StyledTableCell>Monthly Rent</StyledTableCell>
                    <StyledTableCell>Due</StyledTableCell>
                    <StyledTableCell>Provision</StyledTableCell>
                    <StyledTableCell>TDS</StyledTableCell>
                    <StyledTableCell>Net</StyledTableCell>
                    <StyledTableCell>GST Amount</StyledTableCell>
                    <StyledTableCell>Actual Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSelectedRowDetails().map((row) => (
                    <TableRow key={row?.info?.uniqueID}>
                      <StyledTableCell>{row?.info?.uniqueID}</StyledTableCell>
                      <StyledTableCell>{row?.monthYear}</StyledTableCell>
                      <StyledTableCell>{row?.info?.branchID}</StyledTableCell>
                      <StyledTableCell>
                        {row?.info?.lesseeBranchName}
                      </StyledTableCell>
                      <StyledTableCell>{row?.monthlyRent}</StyledTableCell>
                      <StyledTableCell>{row?.due}</StyledTableCell>
                      <StyledTableCell>{row?.provision}</StyledTableCell>
                      <StyledTableCell>
                        {editedData?.[row?.info?.uniqueID]?.tds || row?.tds}
                      </StyledTableCell>
                      <StyledTableCell>{row?.net}</StyledTableCell>
                      <StyledTableCell>{row?.gstamt}</StyledTableCell>
                      <StyledTableCell>
                        {editedData?.[row?.info?.uniqueID]?.actualAmount ||
                          row?.actualAmount}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {/* <Button
          onClick={handleSaveSelectedRows}
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Save Selected Rows
        </Button> */}
      </Box>
    </Box>
  );
};

export default RentActualPaymentTable;
//   const handleSaveSelectedRows = () => {
//     // Make the API call with the selected rows
//     console.log("Selected Rows:", selectedRows);

//   const handleSaveSelectedRows = () => {
//     // Function to get the details of the selected rows
//     const getSelectedRowDetails = () => {
//       return selectedRows.map((rowId) =>
//         data?.find((row) => row.info.uniqueID === rowId)
//       );
//     };

//     // Return the selected row details
//     return getSelectedRowDetails();
//   };

// Function to get the details of the selected rows
// const getSelectedRowDetails = () => {
//     return selectedRows.map((rowId) =>
//       data?.find((row) => row?.info?.uniqueID === rowId)
//     );
//   };
