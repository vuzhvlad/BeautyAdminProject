import { useContext, useEffect } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
  const {
    allAppointments,
    activeAppointments,
    getAppointments,
    getActiveAppointments,
  } = useContext(AppointmentContext);

  useEffect(() => {
    getActiveAppointments();
  }, []);

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
