import { createSlice } from "@reduxjs/toolkit";

const initialState = { structures: [] };

export const selectedStructuresSlice = createSlice({
  name: "Selected structures",
  initialState,
  reducers: {
    addStructure(state, action) {
      console.log("adding");
      const newStructure = {
        name: action.payload.structureName,
        role: action.payload.selectedRole,
      };
      state.structures.push(newStructure);
    },
    editStructureRole(state, action) {
      console.log("editing");
      state.structures = state.structures.map((structure) => {
        if (structure.name === action.payload.structureName) {
          return { ...structure, role: action.payload.selectedRole };
        }
        return structure;
      });
    },
    removeStructure(state, action) {
      console.log("removing");
      state.structures = state.structures.filter(
        (structure) => structure.name !== action.payload.structureName
      );
    },
  },
});

export const selectedStructuresSliceActions = selectedStructuresSlice.actions;
