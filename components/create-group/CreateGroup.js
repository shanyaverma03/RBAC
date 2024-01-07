import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./CreateGroup.module.css";
import featuredIcon from "../../public/images/featured-icon.svg";
import divider from "../../public/images/divider.svg";
import Step1 from "../steps/Step1";
import Step2 from "../steps/step2/Step2";
import Step4 from "../steps/step4/Step4";
import Step3 from "../steps/Step3";
import ErrorModal from "../Modal/ErrorModal";

const CreateGroup = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const groupName = useSelector((state) => state.groupName.groupName);

  const nextStepHandler = () => {
    if (groupName.trim().length === 0) {
      setError(true);
      setErrorMessage("Please enter group name");
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const prevStepHandler = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const createGroupHandler = () => {
    console.log("create");
  };

  return (
    <div className={classes.card}>
      <header className={classes.header}>
        <div className={classes.content}>
          <Image priority src={featuredIcon} alt="Featured icon" />
          <p className={classes.heading}>Create a new permissions group</p>
        </div>
        <Image priority src={divider} alt="Divider" />
      </header>
      {activeStep === 1 && <Step1 />}
      {activeStep === 2 && <Step2 />}
      {activeStep === 3 && <Step3 />}
      {activeStep === 4 && <Step4 />}
      <div className={classes.actions}>
        <div className={classes.dividerWrap}>
          <Image priority src={divider} alt="Divider" />
        </div>
        <div className={classes.actionContent}>
          {activeStep > 1 && (
            <button className={classes.prevBtn} onClick={prevStepHandler}>
              Previous
            </button>
          )}

          {activeStep === 4 ? (
            <button className={classes.nextBtn} onClick={createGroupHandler}>
              Create Group
            </button>
          ) : (
            <button className={classes.nextBtn} onClick={nextStepHandler}>
              Next
            </button>
          )}
        </div>
      </div>
      {error && (
        <ErrorModal onClose={() => setError(false)}>{errorMessage}</ErrorModal>
      )}
    </div>
  );
};

export default CreateGroup;
