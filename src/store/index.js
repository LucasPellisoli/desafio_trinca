import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducer from "./reducer";
import { persistStore } from "redux-persist";

export const store =
  process.env.NODE_ENV === "production"
    ? createStore(reducer)
    : createStore(reducer, applyMiddleware(logger));
export const persistor = persistStore(store);

export default store;
