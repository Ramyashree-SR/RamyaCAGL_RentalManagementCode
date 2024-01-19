import serviceUtil from "../ServiceUtil";

const getBranchWiseProvisionsList = (params1, params2) => {
  return serviceUtil
    .get(`getprovision?flag=${params1}&year=${params2}`)
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

export { getBranchWiseProvisionsList };
