import Image from "next/image";
import { useState } from "react";

import dot from "../../../public/images/dot.svg";
import classes from "./UserDetails.module.css";

const UserDetails = ({
  user,
  email,
  organisation,
  increaseMembers,
  decreaseMembers,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleUserHandler = () => {
    //removing the user
    if (isChecked) {
      decreaseMembers();
    } else {
      increaseMembers();
    }
    setIsChecked((checked) => !checked);
  };

  return (
    <div className={classes.container}>
      <div className={classes.userName}>
        <h3>{user}</h3>
        <div className={classes.orgDetails}>
          <p>{email}</p>
          <Image
            priority
            src={dot}
            alt="A dot separator"
            className={classes.dot}
          />
          <p>{organisation}</p>
        </div>
      </div>
      <div className={classes.selectUser}>
        <label className={classes.switch}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={toggleUserHandler}
          />
          <span className={classes.slider}></span>
        </label>
      </div>
    </div>
  );
};

export default UserDetails;
