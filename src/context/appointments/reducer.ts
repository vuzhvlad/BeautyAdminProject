import { AppointmentAction, ActionsTypes } from "./actions";
import {
  IAppointment,
  IActiveAppointment,
} from "../../shared/interfaces/appointment.interface";
import { LoadingStatusOptions } from "../../hooks/htttp.hook";

// function reducer - gets states and actions inside of itself, depends on actions states change

export interface IAppointmentState {
  allAppointments: IAppointment[] | [];
  activeAppointments: IActiveAppointment[] | [];
  appointmentLoadingStatus: LoadingStatusOptions;
}

export default function reducer(
  state: IAppointmentState,
  action: AppointmentAction
): IAppointmentState {
  switch (action.type) {
    case ActionsTypes.SET_ALL_APPOINTMENTS:
      return {
        ...state,
        allAppointments: action.payload,
        appointmentLoadingStatus: "idle",
      };
    case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
      return {
        ...state,
        activeAppointments: action.payload,
        appointmentLoadingStatus: "idle",
      };
    case ActionsTypes.FETCHING_APPOINTMENTS:
      return { ...state, appointmentLoadingStatus: "loading" };
    case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
      return { ...state, appointmentLoadingStatus: "error" };
    default:
      return state;
  }
}
