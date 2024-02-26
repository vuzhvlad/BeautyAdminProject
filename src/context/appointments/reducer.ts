import { IAppointmentAction, ActionsTypes } from "./actions";
import {
  IAppointment,
  IActiveAppointment,
} from "../../shared/interfaces/appointment.interface";
// function reducer - gets states and actions inside of itself, depends on actions states change

export interface IInitialState {
  allAppointments: IAppointment | [];
  activeAppointments: IActiveAppointment | [];
}

export default function reducer(
  state: IInitialState,
  action: IAppointmentAction
) {
  switch (action.type) {
    case ActionsTypes.SET_ALL_APPOINTEMTNS:
      return { ...state, allAppointments: action.payload };
    case ActionsTypes.SET_ACTIVE_APPOINTEMTNS:
      return { ...state, activeAppointments: action.payload };
    default:
      return state;
  }
}
