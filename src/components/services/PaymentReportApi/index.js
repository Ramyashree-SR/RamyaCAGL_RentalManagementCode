import serviceUtil from "../ServiceUtil";

const getRentPaymentReportDetails = (params1, params2, params3) => {
  return serviceUtil
    .get(
      `generatePaymentReport?contractID=${params1}&month=${params2}&year=${params3}`
    )
    .then((res) => {
        // console.log(res, "Paymentres"); 
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};


export { getRentPaymentReportDetails };
