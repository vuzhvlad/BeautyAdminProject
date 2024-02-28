import { useEffect, useState } from "react";

import "./appointmentItem.scss";

import dayjs from "dayjs";

import { IActiveAppointment } from "../../shared/interfaces/appointment.interface";

function AppointmentItem({
  id,
  name,
  date,
  service,
  phone,
}: IActiveAppointment) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    // instead of undefined there will be current date
    setTimeLeft(
      `${dayjs(date).diff(undefined, "h")}:${
        dayjs(date).diff(undefined, "h") % 60
      }`
    );

    const intervalId = setInterval(() => {
      setTimeLeft(
        `${dayjs(date).diff(undefined, "h")}:${
          dayjs(date).diff(undefined, "h") % 60
        }`
      );
    }, 60000);

    return () => {
      clearInterval(intervalId);
    }; // to remove this interval every time useEffect is called
  }, [date]);

  const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm"); // formating date by using dayjs
  return (
    <div className="appointment">
      <div className="appointment__info">
        <span className="appointment__date">Date: {formattedDate}</span>
        <span className="appointment__name">Name: {name}</span>
        <span className="appointment__service">Service: {service}</span>
        <span className="appointment__phone">Phone: {phone}</span>
      </div>
      <div className="appointment__time">
        <span>Time left:</span>
        <span className="appointment__timer">{timeLeft}</span>
      </div>
      <button className="appointment__cancel">Cancel</button>
      {/* <div className="appointment__canceled">Canceled</div> */}
    </div>
  );
}

export default AppointmentItem;
