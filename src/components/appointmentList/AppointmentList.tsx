import { useContext, useEffect, useState } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
  const {
    activeAppointments,
    getActiveAppointments,
    appointmentLoadingStatus,
  } = useContext(AppointmentContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    getActiveAppointments();
  }, []);
  console.log(appointmentLoadingStatus);

  if (appointmentLoadingStatus === "loading") {
    return <Spinner />;
  } else if (appointmentLoadingStatus === "error") {
    return (
      <>
        <Error />
        <button className="schedule__reload" onClick={getActiveAppointments}>
          Reload data
        </button>
      </>
    );
  }

  return (
    <>
      {activeAppointments.map((item) => {
        // {...item} the way of sending props
        return (
          <AppointmentItem
            {...item}
            key={item.id}
            openModal={setIsOpen}
            selectId={() => setSelectedId(item.id)}
          />
        );
      })}
      {isOpen ? (
        <CancelModal handleClose={setIsOpen} selectedId={selectedId} />
      ) : null}
    </>
  );
}

export default AppointmentList;
