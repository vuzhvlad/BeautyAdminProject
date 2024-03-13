import { Calendar as LibCalendar } from "react-calendar";
import { useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import "./calendar.scss";
import "react-calendar/dist/Calendar.css";
import App from "../app/App";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Calendar() {
  const { calendarDate, setDateAndFilter, getActiveAppointments } =
    useContext(AppointmentContext);

  return (
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
  );
}

export default Calendar;
