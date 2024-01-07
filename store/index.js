import { configureStore } from "@reduxjs/toolkit";

import { groupNameSlice } from "./groupNameSlice";
import { selectedStructuresSlice } from "./selectedStructuresSlice";

const store = configureStore({
  reducer: {
    groupName: groupNameSlice.reducer,
    selectedStructures: selectedStructuresSlice.reducer,
  },
});

export default store;
