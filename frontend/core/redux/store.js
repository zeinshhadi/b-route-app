import configureStore from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./reducers/authReducer";
const store = configureStore({
  reducers: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(logger);
  },
});

export default store;
