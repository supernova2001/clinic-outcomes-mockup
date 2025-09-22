import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ClinicOutcomesState } from "./clinic-outcomes.state";

export const SelectOutcomes = createFeatureSelector<ClinicOutcomesState>('clinicOutcomes');

export const selectPeriod = createSelector(
    SelectOutcomes,
    (state) => state.selectedPeriod
);

export const selectTirForPeriod = createSelector(
    SelectOutcomes,
    s => {
        console.log('Selector - Full state:', s);
        console.log('Selector - Selected period:', s.selectedPeriod);
        console.log('Selector - TimeInRangeByPeriod:', s.timeInRangeByPeriod);
        const result = s.timeInRangeByPeriod[s.selectedPeriod];
        console.log('Selector - TIR result:', result);
        return result;
    }
);

export const selectGmiForPeriod = createSelector(
    SelectOutcomes,
    s => {
        console.log('Selector - GMI state:', s);
        console.log('Selector - GMI by period:', s.gmiByPeriod);
        const result = s.gmiByPeriod[s.selectedPeriod];
        console.log('Selector - GMI result:', result);
        return result;
    }
);

export const selectMeta = createSelector(selectTirForPeriod, tir => ({
    activePatients: tir?.activePatients ?? 0,
    dateRange: tir?.dateRange,
    lastUpdated: tir?.lastUpdated,
}));
