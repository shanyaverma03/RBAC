import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import arrowDropDown from "../../../public/images/arrow-drop-down.svg";
import arrowRight from "../../../public/images/arrow-right.svg";
import classes from "./Country.module.css";
import EntityDetails from "./EntityDetails";
import { structuresSliceActions } from "@/store/structuresSlice";
import Divider from "@/components/Divider";

const Country = ({ country, structure, expandAll, setExpandAll }) => {
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const { entityCountries } = structure;
  const [checkAll, setCheckAll] = useState(false);
  const dispatch = useDispatch();

  // Check the country checkbox if all the entities of this country are checked
  useEffect(() => {
    setCheckAll(entityCountries[country].every((entity) => entity.isSelected));
  }, [entityCountries, country]);

  // Expand/collapse the country dropdown when the top level "expand" / "collapse" is clicked
  useEffect(() => {
    setCountryDropdownOpen(expandAll);
  }, [expandAll]);

  // Toggle all the entities of this country when country checkbox is checked
  const toggleAllEntitiesHandler = () => {
    const updatedStructure = JSON.parse(JSON.stringify(structure));
    const newEntities = updatedStructure.entityCountries[country].map(
      (entity) => ({ ...entity, isSelected: !checkAll })
    );
    updatedStructure.entityCountries[country] = newEntities;
    dispatch(structuresSliceActions.updateStructure(updatedStructure));
  };

  const countryDropDownHandler = () => {
    setCountryDropdownOpen((open) => !open);
    setExpandAll(null);
  };

  return (
    <>
      <Divider />
      <div className={classes.entityDetails}>
        <input
          type="checkbox"
          onChange={toggleAllEntitiesHandler}
          checked={checkAll}
        />
        <label>
          <Image
            priority
            src={countryDropdownOpen ? arrowDropDown : arrowRight}
            alt="Arrow drop down"
            onClick={countryDropDownHandler}
          />
          <p className={classes.entityCountry}>
            {country} Entities ({entityCountries[country].length})
          </p>
        </label>
      </div>
      {countryDropdownOpen &&
        entityCountries[country].map((entity, index) => (
          <EntityDetails
            key={index}
            entity={entity}
            country={country}
            structure={structure}
          />
        ))}
    </>
  );
};

export default Country;
