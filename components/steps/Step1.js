import Image from "next/image";
import { useState } from "react";

import classes from "./Step1.module.css";
import permissionsGroupsStep1 from "../../public/images/permissionsGroupsStep1.svg";

const Step1 = () => {
  const [groupName, setGroupName] = useState("");

  const groupNameChangeHandler = (event) => {
    setGroupName(event.target.value);
  };

  return (
    <div>
      <Image
        priority
        src={permissionsGroupsStep1}
        alt="Permissions groups stepper 1"
      />
      <div className={classes.content}>
        <div className={classes.permissionStep}>
          <p className={classes.heading}>Name your permissions group</p>
          <div className={classes.inputFields}>
            <label>
              Permissions group name <sup>*</sup>
            </label>
            <input
              placeholder="Group name"
              type="text"
              onChange={groupNameChangeHandler}
              value={groupName}
            />
            <p className={classes.hintText}>
              A descriptive name will help identify it in the future
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
