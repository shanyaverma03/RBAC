import { configureStore } from "@reduxjs/toolkit";

import { groupNameSlice } from "./groupNameSlice";
import { structuresSlice } from "./structuresSlice";
import { usersSlice } from "./usersSlice";

const store = configureStore({
  reducer: {
    groupName: groupNameSlice.reducer,
    structures: structuresSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;
