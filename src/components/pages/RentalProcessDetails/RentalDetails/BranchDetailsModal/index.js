import React from "react";

import { Box, Grid } from "@mui/material";
import InputBoxComponent from "../../../../atoms/InputBoxComponent";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

const BranchDetailsModal = (props) => {
  return (
    <Modal
      show={props.show}
      close={props.close}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      // className="w-100"
    >
      <Modal.Header>
        <Modal.Title>Branch Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Box>
                <Grid className="d-flex ">
                  <InputBoxComponent
                    label="Branch Type"
                    placeholder=" Branch Type"
                    sx={{ width: 300 }}
                    value={props.selectedItem?.lesseeBranchType}
                  />
                  <InputBoxComponent
                    label="Offical ID"
                    placeholder=" Offical ID"
                    sx={{ width: 300 }}
                    value={props.selectedItem?.branchID}
                  />
                  
                </Grid>
                <Grid className="d-flex ">
                <InputBoxComponent
                    label="Office Name"
                    placeholder=" Office Name"
                    sx={{ width: 300 }}
                    value={props.selectedItem?.lesseeBranchName}
                  />
                  <InputBoxComponent
                    label="Area"
                    placeholder=" Area"
                    sx={{ width: 300 }}
                    value={props.selectedItem?.lesseeAreaName}
                  />
                 
                  </Grid>
                  <Grid className="d-flex mt-1">
                  <InputBoxComponent
                    label="District"
                    placeholder=" District"
                    sx={{ width: 300 }}
                    value={props.selectedItem?.lessorDistrict}
                  />
                  <InputBoxComponent
                    label="RO Name"
                    placeholder=" RO Name"
                    sx={{ width: 300 }}
                    value={props.selectedItem?.lesseeBranchName}
                  />
                  
                </Grid>
                <Grid className="d-flex mt-1">
                <InputBoxComponent
                    label="Zone"
                    placeholder="Zone"
                    sx={{ width: 300 }}
                    value={props.selectedItem?.lesseeZone}
                  />
                  {/* <InputBoxComponent
                    label="Zone"
                    placeholder="Zone"
                    sx={{ width: 300 }}
                    value={props.selectedItem?.lesseeZone}
                  /> */}
                 <InputBoxComponent
                    label="State"
                    placeholder="State"
                    sx={{ width: 300 }}
                    value={props.selectedItem?.lesseeState}
                  />
                </Grid>
                <Grid className="d-flex mt-1">
                
                </Grid>
              </Box>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BranchDetailsModal;
