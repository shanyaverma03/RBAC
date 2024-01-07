import { configureStore } from "@reduxjs/toolkit";

import { groupNameSlice } from "./groupNameSlice";

const store = configureStore({
  reducer: {
    groupName: groupNameSlice.reducer,
  },
});

export default store;
