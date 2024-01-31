import serviceUtil from "../ServiceUtil";

const getVarianceDetails = (params) => {
  return serviceUtil
    .get(`getvariance?contractID=${params}`)
    .then((res) => {
      //   console.log(res, "res");
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

export { getVarianceDetails };
