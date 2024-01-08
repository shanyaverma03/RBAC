import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import arrowDropDown from "../../../public/images/arrow-drop-down.svg";
import arrowRight from "../../../public/images/arrow-right.svg";
import classes from "./StructureDetails.module.css";
import Entities from "./Entities";
import { structuresSliceActions } from "@/store/structuresSlice";

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

      {structureDropdownOpen && <Entities structure={structure} />}
    </>
  );
};

export default StructureDetails;
