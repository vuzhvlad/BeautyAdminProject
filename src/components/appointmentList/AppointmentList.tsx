import { useContext, useEffect } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
  const {
    activeAppointments,
    getActiveAppointments,
    appointmentLoadingStatus,
  } = useContext(AppointmentContext);

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
        return <AppointmentItem {...item} key={item.id} />;
      })}
    </>
  );
}

export default AppointmentList;
