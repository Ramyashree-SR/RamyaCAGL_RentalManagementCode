import serviceUtil from "../ServiceUtil";

const IFSCCodeDetails = (params) => {
  return serviceUtil
    .get(`ifscinfo?ifscNumber=${params}`)
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

export { IFSCCodeDetails };
