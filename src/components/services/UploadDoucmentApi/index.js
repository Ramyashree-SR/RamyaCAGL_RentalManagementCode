import serviceUtil from "../ServiceUtil";

const uploadFileApi = (payload) => {
  return serviceUtil
    .post(`http://dedupeuat.grameenkoota.in:8080/APIFile/uploadFile`, payload)
    .then((res) => {
      console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

export { uploadFileApi };
