import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import classes from "./Step3.module.css";
import permissionsGroupsStep3 from "../../../public/images/permissionsGroupsStep3.svg";
import divider from "../../../public/images/divider.svg";
import StructureDetails from "./StructureDetails";
import { structuresSliceActions } from "@/store/structuresSlice";

const Step3 = () => {
  const structures = useSelector((state) => state.structures.structures);
  const selectedStructures = structures.filter(
    (structure) => structure.isSelected === true
  );

  const dispatch = useDispatch();

  const getEntity = async (structure) => {
    const response = await axios.get(`/api/entities/${structure.name}`);
    const { entityCountries } = response.data;
    const updatedEntityCountries = {};
    for (const country in entityCountries) {
      updatedEntityCountries[country] = entityCountries[country].map(
        (entity) => ({
          name: entity,
          isSelected: false,
          role: "No access",
        })
      );
    }

    dispatch(
      structuresSliceActions.updateStructure({
        ...structure,
        entityCountries: updatedEntityCountries,
      })
    );
  };

  // Get all the entities of a structure by making individual api calls
  const getEntities = async () => {
    try {
      await Promise.allSettled(
        selectedStructures.map((structure) => getEntity(structure))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEntities();
  }, []);

  return (
    <div>
      <Image
        priority
        src={permissionsGroupsStep3}
        alt="Permissions groups stepper 3"
      />
      <div className={classes.content}>
        <div className={classes.text}>
          <p className={classes.heading}>
            Which entities would you like to grant access to?
          </p>
          <p className={classes.hintText}>
            Entity roles have been inherited from structure roles
          </p>
        </div>
        <div className={classes.structure}>
          <div className={classes.batchApplyRole}>
            <div className={classes.search}>
              <input type="text" placeholder="Search" />
            </div>
            <p className={classes.totalEntities}>68 entities</p>
          </div>
          <div className={classes.tableContainer}>
            <div className={classes.tableHeader}>
              <div>
                <input type="checkbox" />
                <label>Entity</label>
              </div>
              <p>Role</p>
            </div>
            <div className={classes.tableContent}>
              {selectedStructures.map((structure, index) => (
                <div key={index}>
                  <StructureDetails structure={structure} />
                  {index < selectedStructures.length - 1 && (
                    <Image priority src={divider} alt="Divider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
