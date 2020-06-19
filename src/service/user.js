import api from "./api";
import { LOGIN, SET_USER, LOGOUT } from "../store/reducer";
import store from "../store";

const { dispatch } = store;

export const _login = function (email, password) {
  api
    .post("/user/login", {
      email,
      password,
    })
    .then((response) => {
      console.log("Data", response.data);
      dispatch({
        type: LOGIN,
        payload: response.data,
      });
      _getUser(response.data);
    })
    .catch((err) => console.log(err));
};

export const _create = function (fullName, email, password, foodRestriction) {
  api
    .post("/user/create", {
      fullName,
      email,
      password,
      foodRestriction,
    })
    .then((response) => {
      dispatch({
        type: LOGIN,
        payload: response.data,
      });
      _getUser(response.data);
    })
    .catch((err) => console.log(err));
};

export const _getUser = function (id) {
  console.log(id);
  api
    .get(`/user/${id}`)
    .then((response) => {
      console.log("Data", response.data);
      dispatch({
        type: SET_USER,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const _update = function (
  id,
  fullName,
  email,
  password,
  foodRestriction
) {
  api
    .put(`/user/${id}`, {
      fullName,
      email,
      password,
      foodRestriction,
    })
    .then((response) => {
      console.log("Data", response.data);
    })
    .catch((err) => console.log(err));
};

export const _delete = function (id) {
  api
    .delete(`/user/${id}`)
    .then((response) => {
      console.log("Data", response.data);
    })
    .catch((err) => console.log(err));
};

export const logout = function (id) {
  dispatch({
    type: LOGOUT,
    payload: {},
  });
};
