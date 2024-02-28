import {
  IAppointment,
  IActiveAppointment,
} from "../../shared/interfaces/appointment.interface";

export enum ActionsTypes {
  // creating actions which we will uuse for our reducer, instead of enum it is possible to use just a normal object
  SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
  SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
}

export type IAppointmentAction =
  | {
      // when we will use this this type (active), right payload will be added automatically
      type: ActionsTypes.SET_ACTIVE_APPOINTMENTS;
      payload: IActiveAppointment[];
    }
  | {
      // when we will use this this type, right payload will be added automatically
      type: ActionsTypes.SET_ALL_APPOINTMENTS;
      payload: IAppointment[];
    };
// it is for safety
