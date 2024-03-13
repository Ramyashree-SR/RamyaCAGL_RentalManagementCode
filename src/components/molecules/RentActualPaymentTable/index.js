import React, { useEffect, useState } from "react";
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
import { blue, green, red, yellow } from "@mui/material/colors";
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
    // color: theme.palette?.common?.white,
    // backgroundColor: "#CFE8F7", //#CFE8F7, #C5EBF6 ,#D5F7DC
    fontFamily: "sans-serif",
  },
}));

const StyledTableCell1 = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "5px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette?.success?.dark,
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
  searchText,
  filteredData,
  refreshKey,
  setRefreshKey,
}) => {
  // Track the edited data for saving
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page2, setPage2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = useState(5);
  const [selectAll, setSelectAll] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    // This useEffect will run whenever refreshKey changes
    if (refreshKey !== 0) {
      // Clear existing data
      setSelectedRows([]);
      setSelectAll(false);
      handleEdit();
    }
  }, [refreshKey]);

  // Load edited data from localStorage on component mount
  useEffect(() => {
    const storedEditedData = localStorage.getItem("editedData");
    if (storedEditedData) {
      setEditedData(JSON.parse(storedEditedData));
    }
  }, []);

  useEffect(() => {
    const storedSelectedRows = JSON.parse(localStorage.getItem("selectedRows"));
    if (storedSelectedRows) {
      setSelectedRows(storedSelectedRows);
    }
  }, []);

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

    // Save the edited data locally
    saveEditedDataLocally(id, field, value);

    console.log("Edited data saved locally successfully");
  };

  const saveEditedDataLocally = (id, field, value) => {
    const storedEditedData =
      JSON.parse(localStorage.getItem("editedData")) || {};
    localStorage.setItem(
      "editedData",
      JSON.stringify({
        ...storedEditedData,
        [id]: {
          ...storedEditedData[id],
          [field]: value,
        },
      })
    );
  };

  useEffect(() => {
    // Save edited data to the backend when the component unmounts
    return () => {
      saveEditedDataToBackend();
    };
  }, []); // Empty dependency array ensures this effect runs only once, on component mount

  const saveEditedDataToBackend = async () => {
    try {
      const storedEditedData = JSON.parse(localStorage.getItem("editedData"));

      // Check if there is any edited data to save
      if (storedEditedData) {
        console.log("Edited data saved to the backend successfully");

        // Clear the local storage for edited data after saving
        localStorage.removeItem("editedData");
      }
    } catch (error) {
      console.error("Error saving edited data to the backend:", error.message);
    }
  };

  // const handleCheckboxChange = (id) => {
  //   const newSelectedRows = selectedRows?.includes(id)
  //     ? selectedRows?.filter((rowId) => rowId !== id)
  //     : [...selectedRows, id];

  //   setSelectedRows(newSelectedRows);
  // };

  // const handleCheckboxChange = (id) => {
  //   const newSelectedRows = selectedRows.includes(id)
  //     ? selectedRows.filter((rowId) => rowId !== id)
  //     : [...selectedRows, id];

  //   setSelectedRows(newSelectedRows);
  //   setSelectAll(newSelectedRows.length === data?.length);
  //   localStorage.setItem("selectedRows", JSON.stringify(newSelectedRows));
  // };

  // const handleCheckboxChange = (id) => {
  //   const newSelectedRows = selectedRows.includes(id)
  //     ? selectedRows.filter((rowId) => rowId !== id)
  //     : [...selectedRows, id];

  //   setSelectedRows(newSelectedRows);

  //   // Update editedData state with the gross value if actualAmount is not edited
  //   if (!editedData?.[id]?.actualAmount) {
  //     setEditedData((prevEditedData) => ({
  //       ...prevEditedData,
  //       [id]: {
  //         ...prevEditedData[id],
  //         actualAmount:
  //           tableData?.find((row) => row.info.uniqueID === id)?.gross || 0,
  //       },
  //     }));
  //   }

  //   // Save selected rows to localStorage
  //   localStorage.setItem("selectedRows", JSON.stringify(newSelectedRows));
  // };

  // const handleCheckboxChange = (id) => {
  //   const newSelectedRows = selectedRows.includes(id)
  //     ? selectedRows.filter((rowId) => rowId !== id)
  //     : [...selectedRows, id];

  //   setSelectedRows(newSelectedRows);

  //   if (id === "selectAll") {
  //     newSelectedRows.forEach((rowId) => {
  //       const row = data.find((row) => row.info.uniqueID === rowId);
  //       if (
  //         !editedData?.[row?.info?.uniqueID]?.actualAmount ||
  //         editedData?.[row?.info?.uniqueID]?.actualAmount === "--"
  //       ) {
  //         handleEdit(row?.info?.uniqueID, "actualAmount", row?.gross);
  //       }
  //     });
  //     setSelectAll(!selectAll);
  //   } else {
  //     if (!editedData?.[id]?.actualAmount) {
  //       const row = data.find((row) => row.info.uniqueID === id);
  //       setEditedData((prevEditedData) => ({
  //         ...prevEditedData,
  //         [id]: {
  //           ...prevEditedData[id],
  //           actualAmount: row?.gross,
  //         },
  //       }));
  //     }
  //   }

  //   localStorage.setItem("selectedRows", JSON.stringify(newSelectedRows));
  // };

  const handleCheckboxChange = (id) => {
    let newSelectedRows = [];
    let newEditedData = {};

    if (id === "selectAll") {
      newSelectedRows = selectAll
        ? []
        : data?.map((row) => {
            // Set actual amount to gross for all selected rows if actualAmount is not already set
            if (
              !selectedRows.includes(row?.info?.uniqueID) &&
              (!editedData?.[row?.info?.uniqueID]?.actualAmount ||
                editedData?.[row?.info?.uniqueID]?.actualAmount === "--")
            ) {
              newEditedData[row?.info?.uniqueID] = {
                ...editedData?.[row?.info?.uniqueID],
                actualAmount: row?.gross,
              };
            }
            return row?.info?.uniqueID;
          });

      setSelectAll(!selectAll);
    } else {
      newSelectedRows = selectedRows.includes(id)
        ? selectedRows.filter((rowId) => rowId !== id)
        : [...selectedRows, id];

      // Toggle individual row selection
      if (newSelectedRows.includes(id)) {
        if (
          !editedData?.[id]?.actualAmount ||
          editedData?.[id]?.actualAmount === "--"
        ) {
          newEditedData[id] = {
            ...editedData?.[id],
            actualAmount: data.find((row) => row?.info?.uniqueID === id)?.gross,
          };
        }
      } else {
        delete newEditedData[id]; // Unset actual amount when unchecking individual row
      }
    }

    setSelectedRows(newSelectedRows);
    setEditedData({ ...editedData, ...newEditedData });
    localStorage.setItem("selectedRows", JSON.stringify(newSelectedRows));
  };

  // const handleCheckboxChange = (id) => {
  //   let newSelectedRows = [];

  //   if (id === "selectAll") {
  //     newSelectedRows = selectAll
  //       ? []
  //       : data?.map((row) => {
  //           if (!editedData[row?.info?.uniqueID]?.actualAmount) {
  //             // Set actual amount to gross for all selected rows
  //             handleEdit(row?.info?.uniqueID, "actualAmount", row?.gross);
  //           }
  //           return row?.info?.uniqueID;
  //         });
  //     setSelectAll(!selectAll);
  //   } else {
  //     newSelectedRows = selectedRows.includes(id)
  //       ? selectedRows.filter((rowId) => rowId !== id)
  //       : [...selectedRows, id];
  //     handleEdit(id, "actualAmount", newSelectedRows.includes(id) ? data.find((row) => row?.info?.uniqueID === id)?.gross : "");
  //   }

  //   setSelectedRows(newSelectedRows);
  //   localStorage.setItem("selectedRows", JSON.stringify(newSelectedRows));
  // };

  return (
    <Box sx={{ position: "relative" }} className="d-flex flex-column">
      <Box className="d-flex align-items-center justify-content-center">
        {/* {editedData && ( */}
        <TableContainer component={Paper} sx={{ ...sx }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>
                  {/* <Checkbox
                    checked={selectAll}
                    onChange={(e) => {
                      const newSelectedRows = e.target.checked
                        ? data?.map((row) => row.info.uniqueID)
                        : [];
                      setSelectedRows(newSelectedRows);
                      setSelectAll(e.target.checked);
                      // setRefreshKey((prevKey) => prevKey + 1);
                    }}
                    // onChange={handleCheckboxChange}
                    sx={{ color: selectAll ? green[900] : "" }}
                  /> */}
                  {/* <Checkbox
                    checked={selectAll}
                    onChange={(e) => {
                      const newSelectedRows = e.target.checked
                        ? data?.map((row) => {
                            if (!selectedRows.includes(row?.info?.uniqueID)) {
                              handleEdit(
                                row?.info?.uniqueID,
                                "actualAmount",
                                row?.gross
                              );
                            }
                            return row?.info?.uniqueID;
                          })
                        : [];

                      setSelectedRows(newSelectedRows);
                      setSelectAll(e.target.checked);
                    }}
                    sx={{ color: selectAll ? green[900] : "" }}
                  /> */}
                  <Checkbox
                    checked={selectAll}
                    onChange={(e) => {
                      const newSelectedRows = e.target.checked
                        ? data?.map((row) => {
                            // Set actual amount to gross for all selected rows if actualAmount is not already set
                            if (
                              !selectedRows.includes(row?.info?.uniqueID) &&
                              (!editedData?.[row?.info?.uniqueID]
                                ?.actualAmount ||
                                editedData?.[row?.info?.uniqueID]
                                  ?.actualAmount === "--")
                            ) {
                              handleEdit(
                                row?.info?.uniqueID,
                                "actualAmount",
                                row?.gross
                              );
                            }
                            return row?.info?.uniqueID;
                          })
                        : selectedRows.filter((id) => {
                            // Retain the actual amount if it exists and is different from gross
                            if (
                              editedData[id]?.actualAmount !==
                              data.find((row) => row?.info?.uniqueID === id)
                                ?.gross
                            ) {
                              // handleEdit(id, "actualAmount", newSelectedRows.includes(id) ? data.find((row) => row?.info?.uniqueID === id)?.gross : "");
                              handleEdit(
                                id,
                                "actualAmount",
                                editedData[id]?.actualAmount
                              );
                            }else{
                              return "";
                            }
                            // return false;
                          });

                      setSelectedRows(newSelectedRows);
                      setSelectAll(e.target.checked);
                    }}
                    sx={{ color: selectAll ? green[900] : "" }}
                  />
                </StyledTableCell>
                <StyledTableCell>Contract ID</StyledTableCell>
                <StyledTableCell>Year</StyledTableCell>
                <StyledTableCell>Branch ID</StyledTableCell>
                <StyledTableCell>Branch Name</StyledTableCell>
                <StyledTableCell>Monthly Rent</StyledTableCell>
                <StyledTableCell>Due</StyledTableCell>
                <StyledTableCell>Provision</StyledTableCell>
                <StyledTableCell>Gross</StyledTableCell>
                <StyledTableCell>TDS</StyledTableCell>
                <StyledTableCell>Net</StyledTableCell>
                <StyledTableCell>GST Amount</StyledTableCell>
                <StyledTableCell>Actual Amount</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData
                  ?.filter((value) => {
                    if (searchText === "") {
                      return value;
                    } else if (
                      value?.info?.lesseeBranchName
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes?.(searchText) ||
                      value?.info?.uniqueID
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes?.(searchText) ||
                      value?.info?.branchID
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes?.(searchText)
                    ) {
                      return value;
                    }
                  })
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <StyledTableRow
                      key={row?.info?.uniqueID}
                      style={{
                        backgroundColor: row.paymentFlag ? blue[100] : red[300], // true=bluecolor =paymentdone  ,false=redcolor=payment not done
                      }}
                    >
                      <StyledTableCell>
                        <Checkbox
                          checked={selectedRows?.includes(row?.info?.uniqueID)}
                          onChange={() =>
                            handleCheckboxChange(row?.info?.uniqueID)
                          }
                          // disabled={row.paymentFlag ? true : false}
                        />
                      </StyledTableCell>
                      <StyledTableCell>{row?.info?.uniqueID}</StyledTableCell>
                      <StyledTableCell>{row?.monthYear}</StyledTableCell>
                      <StyledTableCell>{row?.info?.branchID}</StyledTableCell>
                      <StyledTableCell>
                        {row?.info?.lesseeBranchName}
                      </StyledTableCell>
                      <StyledTableCell>{row?.monthRent}</StyledTableCell>
                      <StyledTableCell>{row?.due}</StyledTableCell>
                      <StyledTableCell>{row?.provision}</StyledTableCell>
                      <StyledTableCell>{row?.gross}</StyledTableCell>
                      <StyledTableCell
                        contentEditable
                        onBlur={(e) => {
                          handleEdit(
                            row?.info?.uniqueID,
                            "reporttds",
                            e.target.innerText
                          );
                        }}
                      >
                        {editedData?.[row?.info?.uniqueID]?.reporttds ||
                          row?.reporttds}
                      </StyledTableCell>
                      <StyledTableCell>{row?.net}</StyledTableCell>
                      <StyledTableCell>{row?.gstamt}</StyledTableCell>
                      <StyledTableCell
                        contentEditable
                        onBlur={(e) => {
                          handleEdit(
                            row?.info?.uniqueID,
                            "actualAmount",
                            e.target.innerText
                          );
                        }}
                      >
                        {editedData?.[row?.info?.uniqueID]?.actualAmount ||
                          row?.actualAmount}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={filteredData?.length}
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
        {selectedRows?.length > 0 && (
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell1>Contract ID</StyledTableCell1>
                    <StyledTableCell1>Year</StyledTableCell1>
                    <StyledTableCell1>Branch ID</StyledTableCell1>
                    <StyledTableCell1>Branch Name</StyledTableCell1>
                    <StyledTableCell1>Monthly Rent</StyledTableCell1>
                    <StyledTableCell1>Due</StyledTableCell1>
                    <StyledTableCell1>Provision</StyledTableCell1>
                    <StyledTableCell1>Gross</StyledTableCell1>
                    <StyledTableCell1>TDS</StyledTableCell1>
                    <StyledTableCell1>Net</StyledTableCell1>
                    <StyledTableCell1>GST Amount</StyledTableCell1>
                    <StyledTableCell1>Actual Amount</StyledTableCell1>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSelectedRowDetails()
                    ?.slice(
                      page2 * rowsPerPage2,
                      page2 * rowsPerPage2 + rowsPerPage2
                    )
                    .map((row) => (
                      <TableRow
                        key={row?.info?.uniqueID}
                        style={{
                          display: selectedRows?.includes?.(row?.info?.uniqueID)
                            ? "table-row"
                            : "none",
                        }}
                      >
                        <StyledTableCell1>
                          {row?.info?.uniqueID}
                        </StyledTableCell1>
                        <StyledTableCell1>{row?.monthYear}</StyledTableCell1>
                        <StyledTableCell1>
                          {row?.info?.branchID}
                        </StyledTableCell1>
                        <StyledTableCell1>
                          {row?.info?.lesseeBranchName}
                        </StyledTableCell1>
                        <StyledTableCell1>{row?.monthRent}</StyledTableCell1>
                        <StyledTableCell1>{row?.due}</StyledTableCell1>
                        <StyledTableCell1>{row?.provision}</StyledTableCell1>
                        <StyledTableCell1>{row?.gross}</StyledTableCell1>
                        <StyledTableCell1>
                          {editedData?.[row?.info?.uniqueID]?.reporttds ||
                            row?.reporttds}
                        </StyledTableCell1>
                        <StyledTableCell1>{row?.net}</StyledTableCell1>
                        <StyledTableCell1>{row?.gstamt}</StyledTableCell1>
                        <StyledTableCell1>
                          {editedData?.[row?.info?.uniqueID]?.actualAmount ||
                            row?.actualAmount}
                        </StyledTableCell1>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {selectedRows.length > 0 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 100]}
                component="div"
                count={getSelectedRowDetails()?.length}
                rowsPerPage={rowsPerPage2}
                page={page2}
                onPageChange={(e, newPage) => setPage2(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage2(+e.target.value);
                  setPage2(0);
                }}
                className="d-flex align-items-end justify-content-end"
              />
            )}
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
