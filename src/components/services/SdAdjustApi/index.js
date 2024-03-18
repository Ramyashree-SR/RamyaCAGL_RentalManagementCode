import serviceUtil from "../ServiceUtil";

const AddSDAjustmentAndClosingContract = (payload) => {
    return serviceUtil
      .post(`setsd`, payload)
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
  
  export {AddSDAjustmentAndClosingContract}