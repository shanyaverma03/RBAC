import { useState, useEffect } from "react";

import classes from "./Structure.module.css";

const Structure = ({ structureName, structureRoles, checkAll }) => {
  const [selectedRole, setSelectedRole] = useState("No access");
  const [isChecked, setIsChecked] = useState(checkAll);

  const selectStructureHandler = () => {
    setIsChecked((checked) => !checked);
  };

  useEffect(() => {
    setIsChecked(checkAll);
  }, [checkAll]);

  return (
    <div className={classes.structureDetails}>
      <div>
        <input
          type="checkbox"
          onChange={selectStructureHandler}
          checked={isChecked}
        />
        <label>{structureName}</label>
      </div>
      <select
        value={selectedRole}
        className={classes.custom_dropdown}
        onChange={(e) => setSelectedRole(e.target.value)}
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
