import { useHttp } from "../hooks/htttp.hook";
import hasRequiredFields from "../utils/hasRequiredFields";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";

import {
  IAppointment,
  IActiveAppointment,
} from "../shared/interfaces/appointment.interface";

dayjs.extend(CustomParseFormat); // extending plugin for dayjs library for working with format + stirng

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"]; // key fields to check

const useAppointmentService = () => {
  const { loadingStatus, request } = useHttp();

  const _apiBase = "http://localhost:3001/appointments";

  const getAllAppointments = async (): Promise<IAppointment[]> => {
    // returns promise of arrays with data about client
    const res = await request({ url: _apiBase });
    if (
      res.every((item: IAppointment) => hasRequiredFields(item, requiredFields)) // checking every obj we will get in our response array
    ) {
      return res;
    } else {
      throw new Error("Data doesnt have all the fields");
    }
  };

  const getAllActiveAppointments = async () => {
    const base = await getAllAppointments();
    const transformed: IActiveAppointment[] = base
      .filter((item) => {
        return !item.canceled && dayjs(item.date).diff(undefined, "minute") > 0; // filter by if date is already in past
      })
      .map((item) => {
        // removing canceled
        return {
          id: item.id,
          date: item.date,
          name: item.name,
          service: item.service,
          phone: item.phone,
        };
      });

    return transformed;
  };

  const cancelOneAppointment = async (id: number) => {
    return await request({
      url: `${_apiBase}/${id}`, // here getting appointment by id
      method: "PATCH",
      body: JSON.stringify({ canceled: true }), // here we just patch(change) part of our appointment where we put cancel to true
    });
  };

  const createNewAppointment = async (body: IAppointment) => {
    const id = new Date().getTime(); // creating unique id
    body["id"] = id;
    body["date"] = dayjs(body.date, "DD/MM/YYYY HH:mm").format(
      "YYYY-MM-DDTHH:mm"
    ); // formatting data before it is sent

    return await request({
      url: _apiBase,
      method: "POST",
      body: JSON.stringify(body), // here we just post our appointment
    });
  };

  return {
    loadingStatus,
    getAllAppointments,
    getAllActiveAppointments,
    cancelOneAppointment,
    createNewAppointment,
  };
};

export default useAppointmentService;
