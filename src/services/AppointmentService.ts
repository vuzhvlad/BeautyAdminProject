import { useHttp } from "../hooks/htttp.hook";
import hasRequiredFields from "../utils/hasRequiredFields";

import {
  IAppointment,
  IActiveAppointment,
} from "../shared/interfaces/appointment.interface";

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"]; // key fields to check
console.log(requiredFields.splice(0, -1));

const useAppointmentService = () => {
  const { loadingStatus, request } = useHttp();

  const _apiBase = "http://localhost:3001/appointment";

  const getAllAppointments = async (): Promise<IAppointment[]> => {
    // returns promise of arrays with data about client
    const res = await request({ url: _apiBase });
    if (
      res.every((item: IAppointment) => {
        // checking every obj we will get in our response array
        hasRequiredFields(item, requiredFields);
      })
    ) {
      return res;
    } else {
      throw new Error("Data does not have all the fields");
    }
  };

  const getAllActiveAppointments = async (): Promise<IActiveAppointment[]> => {
    const base: IAppointment[] = await getAllAppointments();

    const transformed: IActiveAppointment[] = base.map((item) => {
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

  return {
    loadingStatus,
    getAllAppointments,
    getAllActiveAppointments,
  };
};
