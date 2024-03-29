import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Step1.module.css";
import permissionsGroupsStep1 from "../../public/images/permissionsGroupsStep1.svg";
import { groupNameSliceActions } from "@/store/groupNameSlice";

const Step1 = () => {
  const dispatch = useDispatch();
  const groupName = useSelector((state) => state.groupName.groupName);

  const groupNameChangeHandler = (event) => {
    dispatch(
      groupNameSliceActions.setGroupName({ groupName: event.target.value })
    );
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
