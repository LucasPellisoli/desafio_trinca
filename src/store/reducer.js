import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

export const LOGIN = "LOGIN";
export const SET_USER = "SET_USER";
export const SET_BARBECUE = "SET_BARBECUE";
export const SET_CURRENT_BARBECUE = "SET_CURRENT_BARBECUE";
export const LOGOUT = "LOGOUT";
export const ISLODDING = "ISLODDING";

const initialState = {
  userId: "",
  user: {},
  barbecue: [],
  currentBarbecue: {},
  lodding: false,
};

function _reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_CURRENT_BARBECUE:
      return {
        ...state,
        currentBarbecue: action.payload,
      };
    case SET_BARBECUE:
      return {
        ...state,
        barbecue: action.payload,
      };
    case ISLODDING:
      return {
        ...state,
        lodding: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

const rootPersistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};
export default persistReducer(rootPersistConfig, _reducer);
