import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import arrowDropDown from "../../../public/images/arrow-drop-down.svg";
import arrowRight from "../../../public/images/arrow-right.svg";
import classes from "./StructureDetails.module.css";
import Country from "./Country";
import { structuresSliceActions } from "@/store/structuresSlice";
import Divider from "@/components/Divider";

const StructureDetails = ({ structure, expandAll, setExpandAll }) => {
  const [structureDropdownOpen, setStructureDropdownOpen] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const dispatch = useDispatch();
  const { entityCountries } = structure;

  // Check the structure checkbox if all the entities of all the countries are checked
  useEffect(() => {
    setCheckAll(
      Object.keys(entityCountries).every((country) =>
        entityCountries[country].every((entity) => entity.isSelected)
      )
    );
  }, [entityCountries]);

  // Expand/collapse the structure dropdown when the top level "expand" / "collapse" is clicked
  useEffect(() => {
    setStructureDropdownOpen(expandAll);
  }, [expandAll]);

  // Toggle all the entities of all the countries in this structure when structure checkbox is checked
  const toggleAllEntitiesHandler = () => {
    const updatedStructure = JSON.parse(JSON.stringify(structure));
    for (const country in entityCountries) {
      const newEntities = updatedStructure.entityCountries[country].map(
        (entity) => ({ ...entity, isSelected: !checkAll })
      );
      updatedStructure.entityCountries[country] = newEntities;
    }

    dispatch(structuresSliceActions.updateStructure(updatedStructure));
  };

  const structureDropDownHandler = () => {
    setStructureDropdownOpen((open) => !open);
    setExpandAll(null);
  };

  return (
    <>
      <Divider />
      <div className={classes.structureDetails}>
        <input
          type="checkbox"
          onChange={toggleAllEntitiesHandler}
          checked={checkAll}
        ></input>
        <label>
          <Image
            priority
            src={structureDropdownOpen ? arrowDropDown : arrowRight}
            alt="Arrow drop down"
            onClick={structureDropDownHandler}
          />
          <p>{structure.name}</p>
          <div className={classes.structureRole}>{structure.selectedRole}</div>
        </label>
      </div>

      {structureDropdownOpen &&
        Object.keys(structure.entityCountries).map((country) => (
          <Country
            key={country}
            country={country}
            structure={structure}
            expandAll={expandAll}
            setExpandAll={setExpandAll}
          />
        ))}
    </>
  );
};

export default StructureDetails;
