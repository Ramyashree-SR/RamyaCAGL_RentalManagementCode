import serviceUtil from "../ServiceUtil";

const getAllRentContractDetailsByContractID = (params) => {
  return serviceUtil
    .get(`getcontractsCID?ContractID=${params}`)
    .then((res) => {
      // console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = (err && err.response && err.response.data) || {
        message: "ERROR",
      };
      return { errRes };
    });
};

const getRawRentPaymentReportDetails = (params1, params2, params3) => {
  return serviceUtil
    .get(
      `generateRawPaymentReport?contractID=${params1}&month=${params2}&year=${params3}`
    )
    .then((res) => {
      // console.log(res, "Paymentres");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const AddRentActualDetails = (payload) => {
  return serviceUtil
    .post(`makeactual`, payload)
    .then((res) => {
      console.log(res, "res");
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = (err && err.response && err.response.data) || {
        message: "ERROR",
      };
      return { errRes };
    });
};

const addSDSettlementDetails = (payload) => {
  return serviceUtil
    .post(`setsd`, payload)
    .then((res) => {
      console.log(res, "SDres");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = (err && err.response && err.response.data) || {
        message: "ERROR",
      };
      return { errRes };
    });
};



export {
  getAllRentContractDetailsByContractID,
  AddRentActualDetails,
  addSDSettlementDetails,
  getRawRentPaymentReportDetails
};
