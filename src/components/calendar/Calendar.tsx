import { Calendar as LibCalendar } from "react-calendar";
import { useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import "./calendar.scss";
import "react-calendar/dist/Calendar.css";

function Calendar() {
  const { calendarDate, setDateAndFilter, getActiveAppointments } =
    useContext(AppointmentContext);

  const handleResetCalendar = () => {
    setDateAndFilter(null);
  };

  return (
    <>
      <div className="calendar">
        <LibCalendar
          value={calendarDate}
          onChange={(value) => {
            setDateAndFilter(value);
            getActiveAppointments();
          }}
          selectRange
        />
      </div>
      <button className="resetButton" onClick={handleResetCalendar}>
        Reset calendar
      </button>
    </>
  );
}

export default Calendar;
