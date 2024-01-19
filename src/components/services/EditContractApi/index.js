import serviceUtil from "../ServiceUtil";

const EditRentContractDetails = (params, payload) => {
  return serviceUtil
    .put(`editcontracts?uniqueID=${params}`, payload)
    .then((res) => {
      // console.log(params, "params");
      // console.log(res, "res");
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

const EditRentRenewContractDetails = (params, payload) => {
  return serviceUtil
    .get(`renewalDetails?BranchID=${params}`)
    .then((res) => {
      // console.log(params, "params");
      // console.log(res, "RenewEditres");
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

export { EditRentContractDetails, EditRentRenewContractDetails };
