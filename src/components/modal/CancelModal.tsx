import Portal from "../portal/portal";
import "./modal.scss";

interface IModalProps {
  handleClose: (state: boolean) => void;
  selectedId: number;
}

function CancelModal({ handleClose, selectedId }: IModalProps) {
  return (
    <Portal>
      <div className="modal">
        <div className="modal__body">
          <span className="modal__title">
            Are you sure you want to delete the appointment? {selectedId}
          </span>
          <div className="modal__btns">
            <button className="modal__ok">Ok</button>
            <button className="modal__close" onClick={() => handleClose(false)}>
              Close
            </button>
          </div>
          <div className="modal__status">Success</div>
        </div>
      </div>
    </Portal>
  );
}

export default CancelModal;
