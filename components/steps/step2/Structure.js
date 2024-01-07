import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Structure.module.css";
import { selectedStructuresSliceActions } from "@/store/selectedStructuresSlice";

const Structure = ({ structureName, structureRoles, isChecked, role }) => {
  const [selectedRole, setSelectedRole] = useState(role);

  const dispatch = useDispatch();

  const structureChangeHandler = () => {
    //if it was already checked, the user wants to remove the structure
    if (isChecked) {
      dispatch(
        selectedStructuresSliceActions.removeStructure({ structureName })
      );
    }
    //if not checked, user wants to add the structure
    else {
      dispatch(
        selectedStructuresSliceActions.addStructure({
          structureName,
          selectedRole,
        })
      );
    }
  };

  const selectRoleHandler = (event) => {
    const role = event.target.value;
    setSelectedRole(role);

    //if it was already checked, the user wants to change the role of the added structure
    dispatch(
      selectedStructuresSliceActions.editStructureRole({
        structureName,
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
          checked={isChecked}
        />
        <label>{structureName}</label>
      </div>
      <select
        value={selectedRole}
        className={classes.custom_dropdown}
        onChange={selectRoleHandler}
      >
        {structureRoles &&
          structureRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Structure;
