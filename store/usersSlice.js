import { createSlice } from "@reduxjs/toolkit";

const initialState = { users: [] };

export const usersSlice = createSlice({
  name: "users slice",
  initialState,
  reducers: {
    updateAllUsers(state, action) {
      state.users = action.payload;
    },
    updateUser(state, action) {
      state.users = state.users.map((user) => {
        if (
          user.user === action.payload.user &&
          user.email === action.payload.email
        ) {
          return action.payload;
        }
        return user;
      });
    },
  },
});

export const usersSliceActions = usersSlice.actions;
