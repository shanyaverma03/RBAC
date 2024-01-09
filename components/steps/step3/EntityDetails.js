import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import classes from "./EntityDetails.module.css";
import { structuresSliceActions } from "@/store/structuresSlice";

const EntityDetails = ({ entity, country, structure }) => {
  const [entityRoles, setEntityRoles] = useState([]);
  const dispatch = useDispatch();
  const { entityCountries } = structure;

  const getEntityRoles = async () => {
    try {
      const response = await axios.get("/api/entity/roles");
      setEntityRoles(response.data.entityRoles);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEntityRoles();
  }, []);

  const updateEntities = (entities) => {
    const updatedStructure = JSON.parse(JSON.stringify(structure));
    updatedStructure.entityCountries[country] = entities;
    dispatch(structuresSliceActions.updateStructure(updatedStructure));
  };

  const toggleEntityHandler = (entityName) => {
    const updatedEntities = entityCountries[country].map((entity) => {
      if (entity.name === entityName) {
        return { ...entity, isSelected: !entity.isSelected };
      }
      return entity;
    });

    updateEntities(updatedEntities);
  };

  const changeRoleHandler = (entityName, event) => {
    const role = event.target.value;
    const updatedEntities = entityCountries[country].map((entity) => {
      if (entity.name === entityName) {
        return { ...entity, role };
      }
      return entity;
    });
    updateEntities(updatedEntities);
  };

  return (
    <div key={entity.name} className={classes.entityDetails}>
      <div className={classes.entityName}>
        <input
          type="checkbox"
          checked={entity.isSelected}
          onChange={() => toggleEntityHandler(entity.name)}
        />
        <label>{entity.name}</label>
      </div>
      <select
        className={classes.custom_dropdown}
        value={entity.entityRole}
        onChange={() => changeRoleHandler(entity.name, event)}
      >
        {entityRoles &&
          entityRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
      </select>
    </div>
  );
};

export default EntityDetails;
