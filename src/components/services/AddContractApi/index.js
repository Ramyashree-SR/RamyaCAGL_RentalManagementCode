import serviceUtil from "../ServiceUtil";

const AddRentContractDetails = (payload) => {
  return serviceUtil
    .post(`insertcontract`, payload)
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

export { AddRentContractDetails };
