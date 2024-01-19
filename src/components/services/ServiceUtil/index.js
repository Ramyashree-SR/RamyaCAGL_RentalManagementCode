import { axiosInstance } from "../axiosConfig/index"

const get = (url) => {
  return axiosInstance.get(url);
};
const getWithResp = (url, reqObj) => {
  return axiosInstance.get(url, reqObj);
};

const post = (url, reqObj, args) => {
  return axiosInstance.post(url, reqObj, args);
};
const put = (url, reqObj, args) => {
  return axiosInstance.put(url, reqObj, args);
};
const remove = (url, id) => {
  return axiosInstance.delete(`${url}`);
};

const deleteById = (url, reqObj) => {
  return axiosInstance.delete(url, { data: reqObj });
};
const deleteAll = (url, reqObj) => {
  return axiosInstance.delete(url, { data: reqObj });
};

const serviceUtil = {
  get,
  post,
  put,
  remove,
  deleteById,
  deleteAll,
  getWithResp,
  // postWithReqObj
};
export default serviceUtil;
