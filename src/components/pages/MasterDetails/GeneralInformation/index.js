import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import InputBoxComponent from "../../../atoms/InputBoxComponent";

import DropDownComponent from "../../../atoms/DropDownComponent";
import UploadDocumentFile from "../../../atoms/UploadDocumentFile";
import { uploadFileApi } from "../../../services/UploadDoucmentApi";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { deepOrange, green } from "@mui/material/colors";
import { useToasts } from "react-toast-notifications";

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[300]),
  color: green[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));

const GeneralInformation = ({
  activeStep,
  setActiveStep,
  onSave,
  type,
  close,
  setRecipiantsData,
  allNewContractDetails,
  setAllNewContractDetails,
  allNewContractDetailsErr,
  handleAddRentContractInformationError,
  AddAllNewRentContactInformation,
  editAllNewRentContractDetails,
  AddAllRenewRentContractDetails,
  contractStatus,
  EditLessorData,
  EditLessorRenewData,
}) => {
  const [address, setAddress] = useState("");
  const { addToast } = useToasts();
  const joinAddress = () => {
    // Combine the address components into a single string with proper formatting.
    const joinedAddress = `${allNewContractDetails.lessorDoorNumber}, ${allNewContractDetails.lessorFloorNumber}, ${allNewContractDetails.lessorLandMark}, ${allNewContractDetails.lessorStreet},${allNewContractDetails.lessorWardNo},
    ${allNewContractDetails.lessorCity},${allNewContractDetails.lessorPinCode},${allNewContractDetails.lessorTaluka},${allNewContractDetails.lessorDistrict},${allNewContractDetails.lessorState}`;
    setAddress(joinedAddress);
  };

  let PaymentMode = [{ id: "3", label: "NEFT" }];

  const handlePaymentChange = (value) => {
    setAllNewContractDetails((prevDetails) => ({
      ...prevDetails,
      paymentMode: value ? value?.label : null,
    }));
    // setAllNewContractDetails(value);
  };

  const updateChange = (e) => {
    setAllNewContractDetails({
      ...allNewContractDetails,
      [e.target.name]: e.target.value,
    });
  };

  const ElectricityBillInput = useRef();
  const [electricityBillFile, setElectricityBillFile] = useState({
    file: {},
    filename: "",
  });
  const [active, setactive] = useState(null);
  // console.log(active, "active");

  const handleElectricityBillFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", electricityBillFile.file);
    payload.append("appid", "3");
    payload.append("doctype", "ElectricityBillFile");
    const { data, errRes } = await uploadFileApi(payload);
    console.log(data, "data");
    if (data) {
      setactive(data);
      // addToast("File Uploaded", { appearance: "success" });
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  const BankChequeFileInput = useRef();
  const [bankChequeFile, setBankChequeFile] = useState({
    file: {},
    filename: "",
  });
  const [active1, setactive1] = useState(null);

  const handleBankChequeFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", bankChequeFile.file);
    payload.append("appid", "3");
    payload.append("doctype", "BankChequeFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      if (data.error == "FALSE") {
        setactive1(data);
        // addToast("File Uploaded", { appearance: "success" });
      }
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  const TaxReciptInput = useRef();
  const [taxReciptFile, setTaxReciptFile] = useState({
    file: {},
    filename: "",
  });
  const [active2, setactive2] = useState(null);

  const handleTaxReciptFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", taxReciptFile.file);
    payload.append("appid", "3");
    payload.append("doctype", "TaxReciptFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      if (data.error == "FALSE") {
        setactive2(data);
        // addToast("File Uploaded", { appearance: "success" });
      }
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  const pancardInput = useRef();
  const [pancardFile, setPancardFile] = useState({
    file: {},
    filename: "",
  });
  const [active3, setactive3] = useState(null);

  const handlePancardFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", pancardFile.file);
    payload.append("appid", "3");
    payload.append("doctype", "PancardFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      if (data.error == "FALSE") {
        setactive3(data);
        // addToast("File Uploaded", { appearance: "success" });
      }
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  const AnyOtherFileInput = useRef();
  const [anyOtherFile, setAnyOtherFile] = useState({
    file: {},
    filename: "",
  });
  const [active4, setactive4] = useState(null);

  const handleAnyOtherFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", anyOtherFile.file);
    payload.append("appid", "3");
    payload.append("doctype", "AnyOtherFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data) {
      if (data.error == "FALSE") {
        setactive4(data);
        // addToast("File Uploaded", { appearance: "success" });
      }
    } else if (errRes) {
      // addToast(errRes, { appearance: "error" });
    }
  };

  const handleSubmit = () => {
    const ValidateError = handleAddRentContractInformationError();
    const isEmptyField = Object.values(allNewContractDetails).some(
      (value) => value === ""
    );
    if (!ValidateError && !isEmptyField) {
      // console.log("ValidateError", ValidateError);
      setAllNewContractDetails(allNewContractDetails, type);
      AddAllNewRentContactInformation();
      close();
    }
  };
  console.log(contractStatus, "contractStatus");
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      <Box
        className="d-flex justify-content-center w-100"
        sx={{ height: "calc(100% - 55px)", overflowY: "scroll" }}
      >
        <Box>
          <Typography className="fs-20 fw-500 pt-4 px-3">
            Vendor/Owner Details
          </Typography>
          <Grid container spacing={2} className="px-2 py-2 mt-1">
            <Grid item className="d-flex m-2" lg={12}>
              <InputBoxComponent
                label="Lessor Name"
                placeholder="Enter Lessor Name"
                sx={{ width: 300 }}
                name="lessorName"
                value={allNewContractDetails?.lessorName}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.lessorName}
                required
              />

              <InputBoxComponent
                label="Contact Number."
                placeholder="Enter Contact No."
                sx={{ width: 300 }}
                name="lessorContactNumber"
                value={allNewContractDetails?.lessorContactNumber}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.lessorContactNumber}
                required
              />
              <InputBoxComponent
                label="Email Address."
                placeholder="Enter Email Address."
                sx={{ width: 300 }}
                name="lessorEmailAddress"
                value={allNewContractDetails?.lessorEmailAddress}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.lessorEmailAddress}
                required
              />
            </Grid>
            <Grid item className="d-flex m-2" lg={12}>
              <InputBoxComponent
                label="PAN No"
                placeholder="Enter PAN No."
                sx={{ width: 300 }}
                name="lessorPanNumber"
                value={allNewContractDetails?.lessorPanNumber}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.lessorPanNumber}
                required
              />
              <InputBoxComponent
                label="GST No."
                placeholder="Enter GST No."
                sx={{ width: 300 }}
                name="lessorGstNumber"
                value={allNewContractDetails?.lessorGstNumber}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.lessorGstNumber}
                required
              />

              <InputBoxComponent
                label="Nationality"
                placeholder="Enter Nationality"
                sx={{ width: 300 }}
                name="nationality"
                value={allNewContractDetails?.nationality}
                onChange={(e) => updateChange(e)}
                errorText={allNewContractDetailsErr?.nationality}
                required
              />
            </Grid>
            <Grid item className="d-flex m-2" lg={12}>
              <DropDownComponent
                label="Payment Mode"
                placeholder="Enter Mode"
                sx={{ width: 300 }}
                options={PaymentMode}
                getOptionLabel={(option) =>
                  option?.label || allNewContractDetails?.paymentMode
                }
                // name="paymentMode"
                value={
                  type === "edit"
                    ? allNewContractDetails?.paymentMode
                    : allNewContractDetails?.paymentMode || null
                }
                onChange={handlePaymentChange}
                required
                errorText={allNewContractDetailsErr?.paymentMode}
              />
            </Grid>
          </Grid>

          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-3">
              Ownership Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Electricity Bill"
                  // placeholder="Enter Electricity Bill"
                  sx={{ width: 200 }}
                  value={electricityBillFile?.filename}
                />
                <form
                  action="/action_page.php"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => ElectricityBillInput.current.click()}
                  >
                    File
                  </Button>

                  <input
                    ref={ElectricityBillInput}
                    type="file"
                    style={{
                      display: "none",
                      background: electricityBillFile.file ? "green" : "blue",
                    }}
                    onChange={(e) => {
                      setElectricityBillFile({
                        file: e.target.files[0],
                        filename: e.target.files[0].name,
                      });
                    }}
                  />
                  <ColorIcon
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <UploadFileIcon
                      onClick={() => {
                        handleElectricityBillFileUpload();
                        // handleRefresh();
                      }}
                      fontSize="large"
                      // sx={{ background: "#FFFFF", color: "green" }}
                    />
                    <Typography sx={{ fontSize: 9, fontWeight: 800 }}>
                      Upload
                    </Typography>
                  </ColorIcon>
                </form>
                {/* {active && ( */}
                {/* <Button
                  variant="outlined"
                  name="Download"
                  onClick={handleAgreementFileDownload}
                  className="m-2"
                >
                  Download
                </Button> */}
                {/* )} */}

                <InputBoxComponent
                  label="Bank Pass Book/Cheque "
                  // placeholder="Enter BankCheck"
                  sx={{ width: 200 }}
                  value={bankChequeFile?.filename}
                />
                <form
                  action="/action_page.php"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => BankChequeFileInput.current.click()}
                  >
                    File
                  </Button>

                  <input
                    ref={BankChequeFileInput}
                    type="file"
                    style={{
                      display: "none",
                      background: bankChequeFile.file ? "green" : "blue",
                    }}
                    onChange={(e) => {
                      setBankChequeFile({
                        file: e.target.files[0],
                        filename: e.target.files[0].name,
                      });
                    }}
                  />
                  <ColorIcon
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <UploadFileIcon
                      onClick={() => {
                        handleBankChequeFileUpload();
                      }}
                      fontSize="large"
                    />
                    <Typography sx={{ fontSize: 9, fontWeight: 800 }}>
                      Upload
                    </Typography>
                  </ColorIcon>
                </form>
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Tax Paid Recipt "
                  // placeholder="Enter BankCheck"
                  sx={{ width: 200 }}
                  value={taxReciptFile?.filename}
                />
                <form
                  action="/action_page.php"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => TaxReciptInput.current.click()}
                  >
                    File
                  </Button>

                  <input
                    ref={TaxReciptInput}
                    type="file"
                    style={{
                      display: "none",
                      background: taxReciptFile.file ? "green" : "blue",
                    }}
                    onChange={(e) => {
                      setTaxReciptFile({
                        file: e.target.files[0],
                        filename: e.target.files[0].name,
                      });
                    }}
                  />
                  <ColorIcon
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <UploadFileIcon
                      onClick={() => {
                        handleTaxReciptFileUpload();
                        // handleRefresh();
                      }}
                      fontSize="large"
                      // sx={{ background: "#FFFFF", color: "green" }}
                    />
                    <Typography sx={{ fontSize: 9, fontWeight: 800 }}>
                      Upload
                    </Typography>
                  </ColorIcon>
                </form>

                <InputBoxComponent
                  label="Pan Card "
                  // placeholder="Enter BankCheck"
                  sx={{ width: 200 }}
                  value={pancardFile?.filename}
                />
                <form
                  action="/action_page.php"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => pancardInput.current.click()}
                  >
                    File
                  </Button>

                  <input
                    ref={pancardInput}
                    type="file"
                    style={{
                      display: "none",
                      background: pancardFile.file ? "green" : "blue",
                    }}
                    onChange={(e) => {
                      setPancardFile({
                        file: e.target.files[0],
                        filename: e.target.files[0].name,
                      });
                    }}
                  />

                  <ColorIcon
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <UploadFileIcon
                      onClick={() => {
                        handlePancardFileUpload();
                        // handleRefresh();
                      }}
                      fontSize="large"
                    />
                    <Typography sx={{ fontSize: 9, fontWeight: 800 }}>
                      Upload
                    </Typography>
                  </ColorIcon>
                </form>
              </Grid>
              <Grid item className="d-flex m-2" lg={12}>
                <InputBoxComponent
                  label="Any Other"
                  // placeholder="Enter BankCheck"
                  sx={{ width: 200 }}
                  value={anyOtherFile?.filename}
                />

                <form
                  action="/action_page.php"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => AnyOtherFileInput.current.click()}
                  >
                    File
                  </Button>

                  <input
                    ref={AnyOtherFileInput}
                    type="file"
                    multiple
                    style={{
                      display: "none",
                      background: anyOtherFile.file ? "green" : "blue",
                    }}
                    onChange={(e) => {
                      const files = e.target.files;
                      for (const file of files) {
                        console.log(file.name);
                      }
                      setAnyOtherFile({
                        file: e.target.files[0],
                        filename: e.target.files[0].name,
                      });
                    }}
                  />
                  <ColorIcon
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <UploadFileIcon
                      onClick={() => {
                        handleAnyOtherFileUpload();
                        // handleRefresh();
                      }}
                      fontSize="large"
                      // sx={{ background: "#FFFFF", color: "green" }}
                    />
                    <Typography sx={{ fontSize: 9, fontWeight: 800 }}>
                      Upload
                    </Typography>
                  </ColorIcon>
                  <a
                    href={`http://dedupeuat.grameenkoota.in:8080/APIFile/downloadFile/231219124408128`}
                    target="_blank"
                    rel="noreferrer"
                    // onClick={() =>
                    //   handlePanCardFileView(mainDealerId, "PanCardDetails")
                    // }
                  >
                    Download
                  </a>
                </form>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography className="fs-20 fw-500 pt-4 px-3">
              Address Details
            </Typography>
            <Grid container spacing={2} className="px-2 py-2 mt-1">
              <Grid container spacing={2} className="px-2 py-2 mt-1">
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Door No."
                    placeholder="Enter Door No."
                    sx={{ width: 300 }}
                    name="lessorDoorNumber"
                    value={allNewContractDetails?.lessorDoorNumber}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorDoorNumber}
                    required
                  />
                  <InputBoxComponent
                    label="Floor No."
                    sx={{ width: 300 }}
                    placeholder="Enter Floor No."
                    name="lessorFloorNumber"
                    value={allNewContractDetails?.lessorFloorNumber}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorFloorNumber}
                    required
                  />
                  <InputBoxComponent
                    label="Land Mark"
                    placeholder="Enter Land Mark"
                    sx={{ width: 300 }}
                    name="lessorLandMark"
                    value={allNewContractDetails?.lessorLandMark}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorLandMark}
                    required
                  />
                </Grid>
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Road/Street"
                    placeholder="Enter Road"
                    sx={{ width: 300 }}
                    name="lessorStreet"
                    value={allNewContractDetails?.lessorStreet}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorStreet}
                    required
                  />
                  <InputBoxComponent
                    label="Ward Name/No Area Name/Layout Name/Extension"
                    sx={{ width: 300 }}
                    placeholder="Enter Ward No."
                    name="lessorWardNo"
                    value={allNewContractDetails?.lessorWardNo}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorWardNo}
                    required
                  />
                  <InputBoxComponent
                    label="City"
                    sx={{ width: 300 }}
                    placeholder="Enter City"
                    name="lessorCity"
                    value={allNewContractDetails?.lessorCity}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorCity}
                    required
                  />
                </Grid>
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="Pincode"
                    sx={{ width: 300 }}
                    placeholder="Enter Pincode"
                    name="lessorPinCode"
                    value={allNewContractDetails?.lessorPinCode}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorPinCode}
                    required
                  />
                  <InputBoxComponent
                    label="Taluk"
                    sx={{ width: 300 }}
                    placeholder="Enter Taluk"
                    name="lessorTaluka"
                    value={allNewContractDetails?.lessorTaluka}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorTaluka}
                    required
                  />
                  <InputBoxComponent
                    label="District "
                    sx={{ width: 300 }}
                    placeholder="Enter District"
                    name="lessorDistrict"
                    value={allNewContractDetails?.lessorDistrict}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorDistrict}
                    required
                  />
                </Grid>
                <Grid item className="d-flex m-2" md={12}>
                  <InputBoxComponent
                    label="State"
                    sx={{ width: 300 }}
                    placeholder="Enter State"
                    name="lessorState"
                    value={allNewContractDetails?.lessorState}
                    onChange={(e) => updateChange(e)}
                    errorText={allNewContractDetailsErr?.lessorState}
                    required
                  />
                </Grid>

                <Grid
                  item
                  className="d-flex flex-column align-items-start justify-content-start m-3"
                  md={12}
                >
                  <Button onClick={joinAddress}>Join Address</Button>
                  {address && (
                    <InputBoxComponent
                      label="Address"
                      placeholder="Enter Address"
                      multiline
                      sx={{ width: 300 }}
                      size="large"
                      value={address}
                      readOnly
                    />
                  )}
                  {/* </Grid>

                <Grid
                  item
                  className="d-flex flex-column align-items-start justify-content-start m-3"
                  md={12}
                > */}
                  <InputBoxComponent
                    // label="Remarks."
                    textLabel="Remarks"
                    placeholder="Type here...."
                    sx={{ width: 500 }}
                    multiline
                    rows={4}
                    // name="lessorDoorNumber"
                    // value={allNewContractDetails?.lessorDoorNumber}
                    // onChange={(e) => updateChange(e)}
                    // errorText={allNewContractDetailsErr?.lessorDoorNumber}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <hr style={{ border: "2px solid", borderStyle: "dashed" }} />
      </Box>
      <Box className="d-flex  justify-content-end w-100">
        <Button
          disabled={activeStep && activeStep === 0}
          onClick={handleBack}
          variant="contained"
          sx={{ m: 1 }}
        >
          Back
        </Button>
        {type === "edit" || type === "edit" ? (
          <Button
            // disabled={activeStep && activeStep === 0}
            onClick={() => {
              editAllNewRentContractDetails(EditLessorData);
              console.log("Onclick", EditLessorData);
            }}
            variant="contained"
            sx={{ m: 1, background: "#238520" }}
          >
            Edit Finish
          </Button>
        ) : (
          <Button
            disabled={activeStep && activeStep === 0}
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            sx={{ m: 1, background: "#238520" }}
          >
            Add Finish
          </Button>
        )}
      </Box>
    </>
  );
};

export default GeneralInformation;
