import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import classes from "./Step3.module.css";
import permissionsGroupsStep3 from "../../../public/images/permissionsGroupsStep3.svg";
import StructureDetails from "./StructureDetails";
import { structuresSliceActions } from "@/store/structuresSlice";
import Divider from "@/components/Divider";

const Step3 = () => {
  const structures = useSelector((state) => state.structures.structures);
  const selectedStructures = structures.filter(
    (structure) => structure.isSelected === true
  );
  const [checkAll, setCheckAll] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  const dispatch = useDispatch();

  const getEntity = async (structure) => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  // Get all the entities of a structure by making individual api calls
  const getEntities = async () => {
    try {
      await Promise.allSettled(
        selectedStructures.map((structure) => getEntity(structure))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getAllEntitiesCount = () => {
    let count = 0;
    selectedStructures.forEach((structure) => {
      for (const country in structure.entityCountries) {
        count += structure.entityCountries[country].length;
      }
    });
    return count;
  };

  useEffect(() => {
    getEntities();
  }, []);

  // Check the entity checkbox if all the entities of all the countries of all the structures are checked
  useEffect(() => {
    setCheckAll(
      selectedStructures.every((structure) =>
        Object.keys(structure.entityCountries).every((country) =>
          structure.entityCountries[country].every(
            (entity) => entity.isSelected
          )
        )
      )
    );
  }, [selectedStructures]);

  // Toggle all the entities of all the countries of all the structures when the entity checkbox is checked
  const toggleAllEntitiesHandler = () => {
    for (const structure of selectedStructures) {
      const updatedStructure = JSON.parse(JSON.stringify(structure));
      for (const country in structure.entityCountries) {
        const newEntities = updatedStructure.entityCountries[country].map(
          (entity) => ({ ...entity, isSelected: !checkAll })
        );
        updatedStructure.entityCountries[country] = newEntities;
      }
      dispatch(structuresSliceActions.updateStructure(updatedStructure));
    }
  };

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

            <p className={classes.totalEntities}>
              {getAllEntitiesCount()} entities
            </p>
          </div>
          <div className={classes.tableContainer}>
            <Divider />
            <div className={classes.tableHeader}>
              <div className={classes.entityActions}>
                <div>
                  <input
                    type="checkbox"
                    onChange={toggleAllEntitiesHandler}
                    checked={checkAll}
                  />
                  <label>Entity</label>
                </div>
                <div className={classes.expandActions}>
                  <p
                    className={classes.expandAction}
                    onClick={() => setExpandAll(true)}
                  >
                    Expand all
                  </p>
                  <p>|</p>
                  <p
                    className={classes.expandAction}
                    onClick={() => setExpandAll(false)}
                  >
                    Collapse all
                  </p>
                </div>
              </div>

              <p>Role</p>
            </div>
            <div className={classes.tableContent}>
              {selectedStructures.map((structure, index) => (
                <StructureDetails
                  key={index}
                  structure={structure}
                  expandAll={expandAll}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
