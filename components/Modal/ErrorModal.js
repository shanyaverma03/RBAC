import classes from "./ErrorModal.module.css";

const ErrorModal = ({ onClose, children }) => {
  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal}>
        <button className={classes.closeButton} onClick={onClose}>
          Close
        </button>
        <h1>Error!</h1>
        {children}
      </div>
    </div>
  );
};

export default ErrorModal;
