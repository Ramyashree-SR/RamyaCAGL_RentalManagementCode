import React, { useState } from "react";
import ModalComponent from "../../molecules/ModalComponent";
import { Grid } from "@mui/material";
import InputBoxComponent from "../../atoms/InputBoxComponent";
import DropDownComponent from "../../atoms/DropDownComponent";

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
          <InputBoxComponent label="Branch Name" fullWidth={false} />
          <InputBoxComponent label="Branch Name" fullWidth={false} />
          <DropDownComponent
            label="Gender"
            size="small"
            options={gender}
            sx={{
              width: 200,
            }}
          />
        </Grid>
        <Grid item sx={{ display: "flex" }}>
          <InputBoxComponent label="Branch Name" fullWidth={false} />
          <InputBoxComponent label="Branch Name" fullWidth={false} />
          <DropDownComponent
            label="Gender"
            size="small"
            options={gender}
            sx={{
              width: 200,
            }}
          />
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default LessorForm;
