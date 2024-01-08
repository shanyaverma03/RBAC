import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Step4.module.css";
import permissionsGroupsStep4 from "../../../public/images/permissionsGroupsStep4.svg";
import UserDetails from "./UserDetails";
import { usersSliceActions } from "@/store/usersSlice";

const Step4 = () => {
  const users = useSelector((state) => state.users.users);
  const [searchUser, setSearchUser] = useState("");
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      const modifiedUsers = response.data.users.map((user) => ({
        user: user.user,
        email: user.email,
        organisation: user.organisation,
        isSelected: false,
      }));

      dispatch(usersSliceActions.updateAllUsers(modifiedUsers));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const searchUserHandler = (event) => {
    setSearchUser(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.user.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div>
      <Image
        priority
        src={permissionsGroupsStep4}
        alt="Permissions groups stepper 4"
      />
      <div className={classes.content}>
        <div className={classes.text}>
          <p className={classes.heading}>
            Would you like to add anyone to the new group now?
          </p>
          <p className={classes.hintText}>
            You can skip this and add members later if you wish
          </p>
        </div>
        <div className={classes.userDetails}>
          <div className={classes.batchApplyRole}>
            <div className={classes.search}>
              <input
                type="text"
                placeholder="Search"
                onChange={searchUserHandler}
                value={searchUser}
              />
            </div>
            <p className={classes.totalMembers}>
              {filteredUsers.length} members
            </p>
          </div>

          {filteredUsers.map((user, index) => (
            <UserDetails key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step4;
