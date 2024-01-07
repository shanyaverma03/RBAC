import { createSlice } from "@reduxjs/toolkit";

const initialState = { groupName: "" };

export const groupNameSlice = createSlice({
  name: "group name",
  initialState,
  reducers: {
    setGroupName(state, action) {
      state.groupName = action.payload.groupName;
    },
  },
});

export const groupNameSliceActions = groupNameSlice.actions;
