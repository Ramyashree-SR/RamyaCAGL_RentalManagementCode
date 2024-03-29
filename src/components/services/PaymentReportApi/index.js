import serviceUtil from "../ServiceUtil";

const getRentPaymentReportDetails = (params1, params2, params3, params4) => {
  return serviceUtil
    .get(
      `generatePaymentReport?contractID=${params1}&month=${params2}&year=${params3}&purpose=${params4}`
    )
    .then((res) => {
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getDownloadPaymentReportDetails = (params1, params2) => {
  return serviceUtil
    .get(`DownloadPaymentReport?month=${params1}&year=${params2}`)
    .then((res) => {
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

export { getRentPaymentReportDetails, getDownloadPaymentReportDetails };
