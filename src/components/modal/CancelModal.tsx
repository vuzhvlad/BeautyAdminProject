import Portal from "../portal/portal";
import { useEffect, useRef, useState, useContext } from "react";
import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { CSSTransition } from "react-transition-group";
import "./modal.scss";

interface IModalProps {
  handleClose: (state: boolean) => void;
  selectedId: number;
  isOpen: boolean;
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
  const { getActiveAppointments } = useContext(AppointmentContext);
  const { cancelOneAppointment } = useAppointmentService();

  const nodeRef = useRef<HTMLDivElement>(null); // connecting ref with html element for transtiion
  const cancelStatusRef = useRef<boolean | null>(null);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

  const handleCancelAppointment = (id: number) => {
    setButtonDisabled(true); // disable button so user can press more than once
    cancelOneAppointment(id)
      .then(() => {
        console.log("done");
        setCancelStatus(true);
      })
      .catch(() => {
        console.log("error");
        setCancelStatus(false);
        setButtonDisabled(false);
      });
  };

  const closeModal = () => {
    handleClose(false);
    if (cancelStatus === true || cancelStatusRef.current) {
      getActiveAppointments();
    }
  };

  const closeOnEscKey = (e: KeyboardEvent): void => {
    // function for changing state if pressing key Esc
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    cancelStatusRef.current = cancelStatus;
  }, [cancelStatus]);

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscKey); // adding listener

    return () => {
      document.body.removeEventListener("keydown", closeOnEscKey); // removing
    };
  }, [handleClose]);

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={{ enter: 500, exit: 500 }}
        unmountOnExit
        classNames={"modal"}
        nodeRef={nodeRef}
      >
        <div className="modal" ref={nodeRef}>
          <div className="modal__body">
            <span className="modal__title">
              Are you sure you want to delete the appointment? {selectedId}
            </span>
            <div className="modal__btns">
              <button
                className="modal__ok"
                disabled={buttonDisabled}
                onClick={() => handleCancelAppointment(selectedId)}
              >
                Ok
              </button>
              <button className="modal__close" onClick={() => closeModal()}>
                Close
              </button>
            </div>
            <div className="modal__status">
              {cancelStatus === null
                ? ""
                : cancelStatus
                ? "Success"
                : "Error, please try again..."}
            </div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
}

export default CancelModal;
