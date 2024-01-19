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

export { AddRentProvisionDetails };
