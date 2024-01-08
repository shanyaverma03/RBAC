import Image from "next/image";
import { useDispatch } from "react-redux";

import dot from "../../../public/images/dot.svg";
import classes from "./UserDetails.module.css";
import { usersSliceActions } from "@/store/usersSlice";

const UserDetails = ({ user }) => {
  const dispatch = useDispatch();

  const toggleUserHandler = () => {
    dispatch(
      usersSliceActions.updateUser({
        ...user,
        isSelected: !user.isSelected,
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.userName}>
        <h3>{user.user}</h3>
        <div className={classes.orgDetails}>
          <p>{user.email}</p>
          <Image
            priority
            src={dot}
            alt="A dot separator"
            className={classes.dot}
          />
          <p>{user.organisation}</p>
        </div>
      </div>
      <div className={classes.selectUser}>
        <label className={classes.switch}>
          <input
            type="checkbox"
            checked={user.isSelected}
            onChange={toggleUserHandler}
          />
          <span className={classes.slider}></span>
        </label>
      </div>
    </div>
  );
};

export default UserDetails;
