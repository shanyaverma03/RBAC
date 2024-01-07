import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./Step4.module.css";
import permissionsGroupsStep4 from "../../../public/images/permissionsGroupsStep4.svg";
import UserDetails from "./UserDetails";

const Step4 = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [members, setMembers] = useState(0);

  const getUsers = async () => {
    try {
      const usersRes = await axios.get("/api/users");
      setUsers(usersRes.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const searchUserHandler = (event) => {
    setSearchUser(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.user[0].toLowerCase().includes(searchUser.toLowerCase())
  );

  const decreaseMembers = () => {
    setMembers((members) => members - 1);
  };

  const increaseMembers = () => {
    setMembers((members) => members + 1);
  };

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
            <p className={classes.totalMembers}>{members} members</p>
          </div>

          {filteredUsers.map((user, index) => (
            <UserDetails
              key={index}
              user={user.user}
              email={user.email}
              organisation={user.organisation}
              decreaseMembers={decreaseMembers}
              increaseMembers={increaseMembers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step4;
