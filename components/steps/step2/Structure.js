import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Structure.module.css";
import { structuresSliceActions } from "@/store/structuresSlice";

const Structure = ({ structure, roles }) => {
  const dispatch = useDispatch();

  const structureChangeHandler = () => {
    dispatch(
      structuresSliceActions.updateStructure({
        ...structure,
        isSelected: !structure.isSelected,
      })
    );
  };

  const selectRoleHandler = (event) => {
    const role = event.target.value;
    dispatch(
      structuresSliceActions.updateStructure({
        ...structure,
        selectedRole: role,
      })
    );
  };

  return (
    <div className={classes.structureDetails}>
      <div>
        <input
          type="checkbox"
          onChange={structureChangeHandler}
          checked={structure.isSelected}
        />
        <label>{structure.name}</label>
      </div>
      <select
        value={structure.role}
        className={classes.custom_dropdown}
        onChange={selectRoleHandler}
      >
        {roles &&
          roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Structure;
