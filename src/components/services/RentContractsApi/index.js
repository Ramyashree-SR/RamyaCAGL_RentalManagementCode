import serviceUtil from "../ServiceUtil";

const getBranchID = () => {
  return serviceUtil
    .get(`filterBranchIDs`)
    .then((res) => {
      // console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getAllRentContractDetailsByBranchID = (params) => {
  return serviceUtil
    .get(`getcontracts?branchID=${params}`)
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

const getAllRentContractDetails = (district) => {
  return serviceUtil
    .get(`getallcontracts?district=${district}`)
    .then((res) => {
      // console.log(res, "getALLres");
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

export { getAllRentContractDetails, getBranchID ,getAllRentContractDetailsByBranchID};
