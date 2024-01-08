import { configureStore } from "@reduxjs/toolkit";

import { groupNameSlice } from "./groupNameSlice";
import { structuresSlice } from "./structuresSlice";

const store = configureStore({
  reducer: {
    groupName: groupNameSlice.reducer,
    structures: structuresSlice.reducer,
  },
});

export default store;
