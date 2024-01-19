import serviceUtil from "../ServiceUtil";

const getStatesByFilter = () => {
  return serviceUtil
    .get(`getstate`)
    .then((res) => {
    //   console.log(res, "stateres");
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

const getDistrictByStateFilter = (params) => {
  return serviceUtil
    .get(`getdistrict?state=${params}`)
    .then((res) => {
    //   console.log(res, "res");
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
export { getStatesByFilter, getDistrictByStateFilter };
