import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import AccordionComponent from "../../atoms/AccordionComponent";
import InputBoxComponent from "../../atoms/InputBoxComponent";
import LessorForm from "./../../forms/LessorForm/index";
import DropDownComponent from "../../atoms/DropDownComponent";

const AddDetails = () => {
  const [openLessorModal, setopenLessorModal] = useState(false);
  const gender = [
    { id: "Male", label: "Male" },
    { id: "Female", label: "Female" },
  ];

  return (
    <>
      <Box
        sx={{
          margin: "5% auto auto 15%",
          // width: "70%",
          flexBasis: "70%",
          background: "#fff",
          overflow: "scroll",
          // height: "calc(100% - 80px) !important",
        }}
      >
        <AccordionComponent AccordionTitle="Rental Agreement/Contract">
          <Grid container spacing={2}>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
            </Grid>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <InputBoxComponent label="Branch Name" fullWidth={false} />
              <Button onClick={() => setopenLessorModal(true)}>Lessor</Button>
              <LessorForm
                openLessorModal={openLessorModal}
                close={() => setopenLessorModal(false)}
              />
            </Grid>
          </Grid>
        </AccordionComponent>
        <AccordionComponent AccordionTitle="Contract Management">
          <Grid container spacing={2}>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
        </AccordionComponent>
        <AccordionComponent AccordionTitle="Lessor">
          <Grid container spacing={2}>
            <Grid
              item
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
            <Grid
              item
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
        </AccordionComponent>
        <AccordionComponent AccordionTitle="Trancations">
          <Grid container spacing={2}>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
        </AccordionComponent>
        <AccordionComponent AccordionTitle="Taxation Policy">
          <Grid container spacing={2}>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
        </AccordionComponent>
        <AccordionComponent AccordionTitle="Reports">
          <Grid container spacing={2}>
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
            <Grid
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mt: 4,
              }}
            >
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
        </AccordionComponent>
      </Box>
    </>
  );
};

export default AddDetails;
