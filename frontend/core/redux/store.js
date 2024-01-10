import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import authReducer from "./reducers/authReducer";

const logger = createLogger({});
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // middleware: () => {
  //   return [logger];
  // },
});

export default store;
