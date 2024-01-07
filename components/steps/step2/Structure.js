import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import classes from "./Structure.module.css";
import { selectedStructuresSliceActions } from "@/store/selectedStructuresSlice";

const Structure = ({ structureName, structureRoles, checkAll }) => {
  const [selectedRole, setSelectedRole] = useState("No access");
  const [isChecked, setIsChecked] = useState(checkAll);

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
    setIsChecked((checked) => !checked);
  };

  const selectRoleHandler = (event) => {
    setSelectedRole(event.target.value);
    //if it was already checked, the user wants to change the role of the added structure
    dispatch(
      selectedStructuresSliceActions.editStructureRole({
        structureName,
        selectedRole,
      })
    );
  };

  useEffect(() => {
    setIsChecked(checkAll);
  }, [checkAll]);

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
