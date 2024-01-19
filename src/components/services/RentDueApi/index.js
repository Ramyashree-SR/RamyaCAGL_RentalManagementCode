import serviceUtil from "../ServiceUtil";

const getRentDueDetails = (params) => {
  return serviceUtil
    .get(`getduereportUid?value=${params}`)
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

const getAllRentDueDetails = (params) => {
  return serviceUtil
    .get(`getduereportBid?value=${params}`)
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

const getRentDueExcelDetails = (params) => {
  return serviceUtil
    .get(`getduereportBid?value=${params}`)
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

export { getRentDueDetails, getAllRentDueDetails,getRentDueExcelDetails };
