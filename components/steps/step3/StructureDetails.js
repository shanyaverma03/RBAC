import Image from "next/image";
import { useState } from "react";

import arrowDropDown from "../../../public/images/arrow-drop-down.svg";
import arrowRight from "../../../public/images/arrow-right.svg";
import classes from "./StructureDetails.module.css";
import Country from "./Country";

const StructureDetails = ({ structure }) => {
  const [structureDropdownOpen, setStructureDropdownOpen] = useState(false);

  return (
    <>
      <div className={classes.structureDetails}>
        <input type="checkbox"></input>
        <label>
          <Image
            priority
            src={structureDropdownOpen ? arrowDropDown : arrowRight}
            alt="Arrow drop down"
            onClick={() => setStructureDropdownOpen((open) => !open)}
          />
          <p>{structure.name}</p>
          <div className={classes.structureRole}>{structure.selectedRole}</div>
        </label>
      </div>

      {structureDropdownOpen &&
        Object.keys(structure.entityCountries).map((country) => (
          <Country key={country} country={country} structure={structure} />
        ))}
    </>
  );
};

export default StructureDetails;
