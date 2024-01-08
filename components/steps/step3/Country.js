import { useState } from "react";
import Image from "next/image";

import arrowDropDown from "../../../public/images/arrow-drop-down.svg";
import arrowRight from "../../../public/images/arrow-right.svg";
import classes from "./Country.module.css";
import EntityDetails from "./EntityDetails";

const Country = ({ country, structure }) => {
  const [entityDropdownOpen, setEntityDropdownOpen] = useState(false);
  const { entityCountries } = structure;
  return (
    <div>
      <div className={classes.entityDetails}>
        <input type="checkbox"></input>
        <label>
          <Image
            priority
            src={
              entityDropdownOpen[Object.keys(entityCountries)]
                ? arrowDropDown
                : arrowRight
            }
            alt="Arrow drop down"
            onClick={() => setEntityDropdownOpen((prev) => !prev)}
          />
          <p className={classes.entityCountry}>
            {country} Entities ({entityCountries[country].length})
          </p>
        </label>
      </div>
      {entityDropdownOpen &&
        entityCountries[country].map((entity, index) => (
          <EntityDetails
            key={index}
            entity={entity}
            country={country}
            structure={structure}
          />
        ))}
    </div>
  );
};

export default Country;
