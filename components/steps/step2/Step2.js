import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Step2.module.css";
import permissionsGroupsStep2 from "../../../public/images/permissionsGroupsStep2.svg";
import Structure from "./Structure";
import { structuresSliceActions } from "@/store/structuresSlice";

const Step2 = () => {
  const structures = useSelector((state) => state.structures.structures);
  const [roles, setRoles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [checkAll, setCheckAll] = useState(false);

  const filteredStructures = structures.filter((structure) =>
    structure.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const dispatch = useDispatch();

  const checkAllStructuresHandler = () => {
    const modifiedStructures = structures.map((structure) => ({
      ...structure,
      isSelected: !checkAll,
    }));
    dispatch(structuresSliceActions.updateAllStructures(modifiedStructures));
  };

  const getStructures = async () => {
    try {
      const response = await axios.get("/api/structures");
      const modifiedStructures = response.data.structures.map((structure) => ({
        name: structure,
        selectedRole: "No access",
        isSelected: false,
      }));

      dispatch(structuresSliceActions.updateAllStructures(modifiedStructures));
    } catch (error) {
      console.log(error);
    }
  };

  const getStructureRoles = async () => {
    try {
      const response = await axios.get("/api/structure/roles");
      setRoles(response.data.structureRoles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (structures.length === 0) {
      getStructures();
    }

    getStructureRoles();
  }, []);

  useEffect(() => {
    setCheckAll(filteredStructures.every((structure) => structure.isSelected));
  }, [filteredStructures]);

  const searchStructureHandler = (event) => {
    const input = event.target.value;
    setSearchInput(input);
  };

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
              {filteredStructures.length} structures
            </p>
          </div>
          <div className={classes.tableContainer}>
            <div className={classes.tableHeader}>
              <div>
                <input
                  type="checkbox"
                  onChange={checkAllStructuresHandler}
                  checked={checkAll}
                />
                <label>Structure</label>
              </div>
              <p>Role</p>
            </div>
            <div className={classes.tableContent}>
              {filteredStructures.map((structure, index) => (
                <Structure key={index} structure={structure} roles={roles} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
