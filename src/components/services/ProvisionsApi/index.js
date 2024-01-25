import serviceUtil from "../ServiceUtil";

const AddRentProvisionDetails = (params, payload) => {
  return serviceUtil
    .post(`setprovision?provisionType=${params}`, payload)
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

const getProvisionDetailsOfTheBranch = (params1, params2) => {
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

const deleteProvisionDetailsOfSelectedTheBranch = (
  params1,
  params2,
  params3
) => {
  return serviceUtil
    .deleteById(
      `deleteProvision?contractID=${params1}&year=${params2}&month=${params3}`
    )
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

export {
  AddRentProvisionDetails,
  getProvisionDetailsOfTheBranch,
  deleteProvisionDetailsOfSelectedTheBranch,
};
