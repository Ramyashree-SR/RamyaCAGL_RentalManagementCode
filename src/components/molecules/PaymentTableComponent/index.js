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
    padding: "5px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette?.info.dark,
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
    backgroundColor: " #C5EBF6", //#CFE8F7, #C5EBF6 ,#D5F7DC
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
const PaymentTableComponent = ({
  data,
  columns,
  sx,
  showTotal,
  withCheckbox,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowSelection = (rowId) => {
    const selectedIndex = selectedRows.indexOf(rowId);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, rowId);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelectedRows);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          ...sx,
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {/* {withCheckbox && (
                <StyledTableCell
                  key="checkbox"
                  classes={{ root: classes.tableHeader }}
                >
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 && selectedRows.length < data.length
                    }
                    checked={selectedRows.length === data.length}
                    onChange={() => handleRowSelection("all")}
                  />
                </StyledTableCell>
              )} */}
              {columns &&
                columns?.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    classes={{ root: classes.tableHeader }}
                  >
                    {column?.label}
                  </StyledTableCell>
                ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.length &&
              data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <StyledTableRow key={index}>
                    {/* {withCheckbox && (
                      <StyledTableCell
                        key={`${index}-checkbox`}
                        classes={{ root: classes.tableHeader }}
                      >
                        <Checkbox
                          checked={selectedRows.indexOf(index) !== -1}
                          onChange={() => handleRowSelection(index)}
                        />
                      </StyledTableCell>
                    )} */}
                    {columns &&
                      columns?.map((column) => (
                        <StyledTableCell
                          key={column.id}
                          sx={{ sx }}
                          classes={{ root: classes.tableHeader }}
                        >
                          {row[column.id] ||
                            (row.info?.[column.id] && row.info?.[column.id])}
                        </StyledTableCell>
                      ))}
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 100]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default PaymentTableComponent;
// const PaymentTableComponent = ({
//   data,
//   columns,
//   sx,
//   showTotal,
//   withCheckbox,
// }) => {
//   const classes = useStyles();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <>
//       <TableContainer
//         component={Paper}
//         sx={{
//           ...sx,
//         }}
//       >
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <StyledTableRow>
//               {columns &&
//                 columns?.map((column) => (
//                   <StyledTableCell
//                     key={column.id}
//                     classes={{ root: classes.tableHeader }}
//                   >
//                     {column?.label}
//                   </StyledTableCell>
//                 ))}
//             </StyledTableRow>
//           </TableHead>
//           <TableBody>
//             {data &&
//               data?.length &&
//               data
//                 ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 ?.map((row, index) => (
//                   <StyledTableRow key={index}>
//                     {columns &&
//                       columns?.map((column) => (
//                         <StyledTableCell
//                           key={column.id}
//                           sx={{ sx }}
//                           classes={{ root: classes.tableHeader }}
//                         >
//                           {row[column.id] ||
//                             (row.info?.[column.id] && row.info?.[column.id])}
//                         </StyledTableCell>
//                       ))}
//                   </StyledTableRow>
//                 ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 15, 100]}
//         component="div"
//         count={data?.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// };

// export default PaymentTableComponent;
