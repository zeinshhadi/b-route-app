import configureStore from "@reduxjs/toolkit";
import logger from "redux-logger";
const store = configureStore({
  reducers: {},
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(logger);
  },
});

export default store;
