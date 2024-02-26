import {
  IAppointment,
  IActiveAppointment,
} from "../../shared/interfaces/appointment.interface";

export enum ActionsTypes {
  // creating actions which we will uuse for our reducer
  SET_ACTIVE_APPOINTEMTNS = "SET_ACTIVE_APPOINTEMTNS",
  SET_ALL_APPOINTEMTNS = "SET_ACTIVE_APPOINTEMTNS",
}

export type IAppointmentAction =
  | {
      // when we will use this this type (active), right payload will be added automatically
      type: ActionsTypes.SET_ACTIVE_APPOINTEMTNS;
      payload: IActiveAppointment[];
    }
  | {
      // when we will use this this type, right payload will be added automatically
      type: ActionsTypes.SET_ALL_APPOINTEMTNS;
      payload: IAppointment[];
    };
// it is for safety
