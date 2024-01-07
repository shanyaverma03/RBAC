import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import classes from "./Step2.module.css";
import permissionsGroupsStep2 from "../../../public/images/permissionsGroupsStep2.svg";
import Structure from "./Structure";

const Step2 = () => {
  const [structures, setStructures] = useState([]);
  const [roles, setRoles] = useState([]);
  const [allStructuresCheck, setAllStructuresCheck] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const checkAllStructuresHandler = () => {
    setAllStructuresCheck((checkAll) => !checkAll);
  };

  const getStructures = async () => {
    try {
      const structuresRes = await axios.get("/api/structures");
      setStructures(structuresRes.data.structures);
    } catch (error) {
      console.log(error);
    }
  };

  const getStructureRoles = async () => {
    try {
      const rolesRes = await axios.get("/api/structure/roles");
      setRoles(rolesRes.data.structureRoles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStructures();
    getStructureRoles();
  }, []);

  const searchStructureHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredStructures = structures.filter((structure) =>
    structure[0].toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div>
      <Image
        priority
        src={permissionsGroupsStep2}
        alt="Permissions groups stepper 2"
      />
      <div className={classes.content}>
        <div className={classes.text}>
          <p className={classes.heading}>
            Which structures would you like to grant access to?
          </p>
          <p className={classes.hintText}>
            Access is required to at least one structure
          </p>
        </div>
        <div className={classes.structure}>
          <div className={classes.batchApplyRole}>
            <div className={classes.search}>
              <input
                type="text"
                placeholder="Search"
                onChange={searchStructureHandler}
                value={searchInput}
              />
            </div>
            <p className={classes.totalStructures}>
              {filteredStructures.length > 0
                ? filteredStructures.length
                : structures.length}{" "}
              structures
            </p>
          </div>
          <div className={classes.tableContainer}>
            <div className={classes.tableHeader}>
              <div>
                <input type="checkbox" onChange={checkAllStructuresHandler} />
                <label>Structure</label>
              </div>
              <p>Role</p>
            </div>
            <div className={classes.tableContent}>
              {filteredStructures.map((structure, index) => (
                <Structure
                  key={index}
                  structureName={structure}
                  structureRoles={roles}
                  checkAll={allStructuresCheck}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
