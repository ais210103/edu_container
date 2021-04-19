import { configureStore } from "@reduxjs/toolkit";
import deviceReducers from "./reducers/device";
import exampleReducers from "./reducers/count";
import exReducers from "./reducers/example";
export default configureStore({
  reducer: {
    device: deviceReducers,
    count: exampleReducers,
    example: exReducers,
  },
  // devTools: false,
});
