import { createReducer, on } from "@ngrx/store";
import * as A from "./clinic-outcomes.actions";
import { ClinicOutcomesState } from "./clinic-outcomes.state";

export type Period = 30 | 60 | 90;

export const initialState: ClinicOutcomesState = {
    selectedPeriod: 30,
    timeInRangeByPeriod: {},
    gmiByPeriod: {},
    loading: false,
};

export const clinicOutcomesReducer = createReducer(
    initialState,
    on(A.setPeriod, (s,{period}) => {
        console.log('Reducer - setPeriod action:', period);
        const newState = {...s, selectedPeriod: period};
        console.log('Reducer - setPeriod new state:', newState);
        return newState;
    }),
    on(A.loadTimeInRange, (s) => {
        console.log('Reducer - loadTimeInRange action');
        return {...s, loading: true};
    }),
    on(A.loadTimeInRangeSuccess, (s,{period,data}) => {
        console.log('Reducer - loadTimeInRangeSuccess action:', {period, data});
        const newState = {
            ...s,
            timeInRangeByPeriod: {...s.timeInRangeByPeriod, [period]: data},
            loading: false,
        };
        console.log('Reducer - loadTimeInRangeSuccess new state:', newState);
        return newState;
    }),
    on(A.loadGmi, (s) => {
        console.log('Reducer - loadGmi action');
        return {...s, loading: true};
    }),
    on(A.loadGmiSuccess, (s,{period,data}) => {
        console.log('Reducer - loadGmiSuccess action:', {period, data});
        const newState = {
            ...s,
            gmiByPeriod: {...s.gmiByPeriod, [period]: data},
            loading: false,
        };
        console.log('Reducer - loadGmiSuccess new state:', newState);
        return newState;
    }),
    on(A.loadFailure, (s,{error}) => {
        console.log('Reducer - loadFailure action:', error);
        return {
            ...s,
            loading: false,
            error,
        };
    }),
);