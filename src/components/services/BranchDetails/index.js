import serviceUtil from "../ServiceUtil";

const getBranchIDForBranchDetails = (params) => {
  return serviceUtil
    .get(`getbranchids?type=${params}`)
    .then((res) => {
      // console.log(res, "BranchDatares");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getRentContractDetailsOnBranchID = (params1, params2) => {
  return serviceUtil
    .get(`getbranchdetails?BranchID=${params1}`)
    .then((res) => {
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

export { getBranchIDForBranchDetails, getRentContractDetailsOnBranchID };
