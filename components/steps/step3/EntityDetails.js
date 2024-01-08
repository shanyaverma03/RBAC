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
      console.log(err);
    }
  };

  useEffect(() => {
    getEntityRoles();
  }, []);

  const selectEntityHandler = (entityName) => {
    const updatedEntities = entityCountries[country].map((entity) => {
      if (entity.name === entityName) {
        return { ...entity, isSelected: !entity.isSelected };
      }
      return entity;
    });

    const updatedStructure = JSON.parse(JSON.stringify(structure));
    updatedStructure.entityCountries[country] = updatedEntities;
    dispatch(structuresSliceActions.updateStructure(updatedStructure));
  };

  const changeRoleHandler = (entityName, event) => {
    const role = event.target.value;
    const updatedEntities = entityCountries[country].map((entity) => {
      if (entity.name === entityName) {
        return { ...entity, role };
      }
      return entity;
    });

    const updatedStructure = JSON.parse(JSON.stringify(structure));
    updatedStructure.entityCountries[country] = updatedEntities;
    dispatch(structuresSliceActions.updateStructure(updatedStructure));
  };

  return (
    <div>
      <div key={entity.name} className={classes.entityDetails}>
        <div className={classes.entityName}>
          <input
            type="checkbox"
            checked={entity.isSelected}
            onChange={() => selectEntityHandler(entity.name)}
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
    </div>
  );
};

export default EntityDetails;
