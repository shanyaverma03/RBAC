import { createSlice } from "@reduxjs/toolkit";

const initialState = { structures: [] };

export const structuresSlice = createSlice({
  name: "Structures",
  initialState,
  reducers: {
    updateAllStructures(state, action) {
      state.structures = action.payload;
    },
    updateStructure(state, action) {
      state.structures = state.structures.map((structure) => {
        if (structure.name === action.payload.name) {
          return action.payload;
        }
        return structure;
      });
    },
  },
});

export const structuresSliceActions = structuresSlice.actions;
