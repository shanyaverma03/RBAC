import { useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";

import arrowDropDown from "../../../public/images/arrow-drop-down.svg";
import arrowRight from "../../../public/images/arrow-right.svg";
import classes from "./Entities.module.css";
import EntityDetails from "./EntityDetails";

const Entities = ({ structure }) => {
  const selectedStructures = useSelector(
    (state) => state.structures.structures
  );

  const [entityDropdownOpen, setEntityDropdownOpen] = useState({});

  const entities = selectedStructures.find(
    (struct) => struct.name === structure.name
  ).entities;

  console.log(structure.name, entities);

  const toggleEntityDropdown = (key) => {
    setEntityDropdownOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      {Object.keys(entities).map((key) => (
        <div key={key}>
          <div className={classes.entityDetails}>
            <input type="checkbox"></input>
            <label>
              <Image
                priority
                src={entityDropdownOpen[key] ? arrowDropDown : arrowRight}
                alt="Arrow drop down"
                onClick={() => toggleEntityDropdown(key)}
              />
              <p>
                {key} Entities ({entities[key].length})
              </p>
            </label>
          </div>
          {entityDropdownOpen[key] && <EntityDetails />}
        </div>
      ))}
    </div>
  );
};

export default Entities;
