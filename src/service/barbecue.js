import api from "./api";
import { SET_BARBECUE, SET_CURRENT_BARBECUE } from "../store/reducer";
import store from "../store";
const { dispatch } = store;

export const getAllBarbecue = function () {
  api
    .get("/barbecue/barbecues")
    .then((response) => {
      dispatch({
        type: SET_BARBECUE,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getById = function (_id) {
  api
    .get(`/barbecue/${_id}`)
    .then((response) => {
      dispatch({
        type: SET_CURRENT_BARBECUE,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const create = function (requestBody) {
  api
    .post(`/barbecue/create`, requestBody)
    .then((response) => {
      getAllBarbecue();
    })
    .catch((err) => console.log(err));
};

export const addUserToBarbecue = function (_id, requestBody) {
  api
    .post(`/barbecue/${_id}/barbecue`, requestBody)
    .then((response) => {
      dispatch({
        type: SET_CURRENT_BARBECUE,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateUserToBarbecue = function (_id, requestBody) {
  api
    .put(`/barbecue/${_id}/barbecue`, requestBody)
    .then((response) => {
      dispatch({
        type: SET_CURRENT_BARBECUE,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const removeUserToBarbecue = function (_id, requestBody) {
  api
    .post(`/barbecue/${_id}/barbecue/delete`, requestBody)
    .then((response) => {
      dispatch({
        type: SET_CURRENT_BARBECUE,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};
