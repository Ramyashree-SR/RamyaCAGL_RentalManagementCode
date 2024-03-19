import React, { useState } from "react";
import ModalComponent from "../../molecules/ModalComponent";
import { Grid } from "@mui/material";
import InputBoxComponent from "../../atoms/InputBoxComponent";
import DropDownComponent from "../../atoms/DropDownComponent";
import TableReusable from "../../molecules/TableReusable";
import { columns } from "../../../constants/masterTable";

const LessorForm = (props) => {
  const gender = [
    { id: "Male", label: "Male" },
    { id: "Female", label: "Female" },
  ];
  

  return (
    <ModalComponent
      open={props.openLessorModal}
      onCancelBtnClick={props.close}
      onClearBtnClick={props.close}
    >
      <Grid container spacing={2}>
        <Grid item sx={{ display: "flex", m: 1 }}>
          {props.loading ? (
          <div className="d-flex align-items-center justify-content-center flex-column ">
            <div
              className="spinner-border text-primary "
              role="status"
              style={{ width: "2rem", height: "2rem", margin: "10px" }}
            ></div>
            <span className="visible text-primary">Loading...</span>{" "}
          </div>
        ) : (
          props.refreshKey && (
              <TableReusable data={props.checkRentContractDetails} column={columns} />))}
        </Grid>
        {/* <Grid item sx={{ display: "flex" }}>
          
        </Grid> */}
      </Grid>
    </ModalComponent>
  );
};

export default LessorForm;
