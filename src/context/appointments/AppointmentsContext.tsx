import React, { createContext, useReducer } from "react";
import { Value } from "react-calendar/dist/cjs/shared/types";
import reducer, { IAppointmentState } from "./reducer";

import useAppointmentService from "../../services/AppointmentService";

import { ActionsTypes } from "./actions";

const initialState: IAppointmentState = {
  allAppointments: [],
  activeAppointments: [],
  appointmentLoadingStatus: "idle",
  calendarDate: [null, null],
};

interface ProviderProps {
  children: React.ReactNode;
}

interface AppointmentContextValue extends IAppointmentState {
  // special type for context
  getAppointments: () => void; // nothing to return so it is void
  getActiveAppointments: () => void;
  setDateAndFilter: (newDate: Value) => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
  // creating the initial state of context which will be overwritten by provider
  allAppointments: initialState.allAppointments, // we take our type from initialState
  activeAppointments: initialState.activeAppointments, // so when it changes it will show us mistake
  appointmentLoadingStatus: initialState.appointmentLoadingStatus,
  calendarDate: initialState.calendarDate,
  getAppointments: () => {},
  getActiveAppointments: () => {},
  setDateAndFilter: (newDate: Value) => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState); // 1-function reducer, 2-initialState
  const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
    useAppointmentService(); // getting our service

  const value: AppointmentContextValue = {
    // it should be the same type as context
    allAppointments: state.allAppointments,
    activeAppointments: state.activeAppointments,
    appointmentLoadingStatus: loadingStatus,
    calendarDate: state.calendarDate,
    getAppointments: () => {
      getAllAppointments()
        .then(
          (
            data // we get our date with service
          ) => {
            const filteredData = data.filter((item) => {
              if (
                Array.isArray(state.calendarDate) &&
                state.calendarDate[0] &&
                state.calendarDate[1]
              ) {
                // checking if it is array and then if it is not null
                if (
                  // if it is inside of our range filter
                  new Date(item.date).getTime() >=
                    new Date(state.calendarDate[0]).getTime() &&
                  new Date(item.date).getTime() <=
                    new Date(state.calendarDate[1]).getTime()
                ) {
                  return item;
                }
              } else {
                return item; // if filters are null we just stop it
              }
            });
            dispatch({
              type: ActionsTypes.SET_ALL_APPOINTMENTS,
              payload: filteredData,
            }); // this will trigger a reducer and it will use the right case for it
          }
        )
        .catch(() => {
          dispatch({
            type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS,
          }); // dispatch takes these data to the state, so as payload it will take data
        });
    },
    getActiveAppointments: () => {
      getAllActiveAppointments()
        .then((data) => {
          const filteredData = data.filter((item) => {
            if (
              Array.isArray(state.calendarDate) &&
              state.calendarDate[0] &&
              state.calendarDate[1]
            ) {
              // checking if it is array and then if it is not null
              if (
                // if it is inside of our range filter
                new Date(item.date).getTime() >=
                  new Date(state.calendarDate[0]).getTime() &&
                new Date(item.date).getTime() <=
                  new Date(state.calendarDate[1]).getTime()
              ) {
                return item;
              }
            } else {
              return item; // if filters are null we just stop it
            }
          });

          dispatch({
            type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
            payload: filteredData,
          });
        })
        .catch(() => {
          dispatch({
            type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS,
          });
        });
    },
    setDateAndFilter: (newDate: Value) => {
      dispatch({ type: ActionsTypes.SET_CALENDAR_DATE, payload: newDate });
    },
  };
  // it will work on the components that are inside of the context and you can use methods that are inside of the value

  return (
    // .Provider - provides for what is inside, everything that is passed inside will go further
    <AppointmentContext.Provider
      value={value} /*all states actions that we created */
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContextProvider;

//useReducer for state, function reducer for changing it
// dispatch takes object in itself
// dispatch => action => reducer that changes state
