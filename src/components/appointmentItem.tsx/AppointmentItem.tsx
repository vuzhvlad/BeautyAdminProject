import { useEffect, useState, memo } from "react";
import "./appointmentItem.scss";
import dayjs from "dayjs";
import { Optional } from "utility-types";
import { IAppointment } from "../../shared/interfaces/appointment.interface";

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>; // choose one key from I and make it optional and then & with this interface where that key from I is removed

type AppointmentProps = Optional<IAppointment, "canceled"> & {
  openModal?: (id: number) => void;
  getActiveAppointments?: () => void;
};

const AppointmentItem = memo(
  // putting this component into memo so if props dont change it doesnt have ot rerender
  //every item is memorized and doesnt rerender if it is not needed
  ({
    id,
    name,
    date,
    service,
    phone,
    canceled,
    openModal,
    getActiveAppointments,
  }: AppointmentProps) => {
    const [timeLeft, setTimeLeft] = useState<string | null>(null);

    useEffect(() => {
      // instead of undefined there will be current date
      setTimeLeft(
        `${dayjs(date).diff(undefined, "h")}:${
          dayjs(date).diff(undefined, "m") % 60
        }`
      );

      const intervalId = setInterval(() => {
        if (dayjs(date).diff(undefined, "m") <= 0) {
          // if time is less or equals to 0
          if (getActiveAppointments) {
            getActiveAppointments(); // we get active appointments again so time wont go below zero
          }
          clearInterval(intervalId);
        } else {
          setTimeLeft(
            `${dayjs(date).diff(undefined, "h")}:${
              dayjs(date).diff(undefined, "m") % 60
            }`
          );
        }
      }, 60000);
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
        {!canceled && openModal ? (
          <>
            <div className="appointment__time">
              <span>Time left:</span>
              <span className="appointment__timer">{timeLeft}</span>
            </div>
            <button
              className="appointment__cancel"
              onClick={() => {
                if (openModal) {
                  openModal(id);
                }
              }}
            >
              Cancel
            </button>
          </>
        ) : null}
        {canceled ? (
          <div className="appointment__canceled">Canceled</div>
        ) : null}
      </div>
    );
  }
);

export default AppointmentItem;
