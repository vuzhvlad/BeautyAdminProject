import Calendar from "../../components/calendar/Calendar";
import HistoryList from "../../components/historyList/HistoryList";
import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import "./historyPage.scss";

function HistoryPage() {
  const { setDateAndFilter } = useContext(AppointmentContext);

  useEffect(() => {
    setDateAndFilter(null);
  }, []);
  return (
    <section className="history">
      <div className="history__controls">
        <Calendar />
      </div>
      <div className="history__list">
        <HistoryList />
      </div>
    </section>
  );
}

export default HistoryPage;
