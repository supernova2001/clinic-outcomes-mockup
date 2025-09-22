import { createAction,props } from "@ngrx/store";
import { TimeRangeData, GmiData, Period} from "./clinic-outcomes.state";

export const setPeriod = createAction (
    '[Clinic Outcomes] Set Period',
    props<{period: Period}>()
);

export const loadTimeInRange = createAction (
    '[Clinic Outcomes] Load Time In Range',
    props<{period: Period}>()
);

export const loadTimeInRangeSuccess = createAction (
    '[Clinic Outcomes] Load Time In Range Success',
    props<{period: Period, data: TimeRangeData}>()
);

export const loadGmi = createAction (
    '[Clinic Outcomes] Load GMI',
    props<{period: Period}>()
);

export const loadGmiSuccess = createAction (
    '[Clinic Outcomes] Load GMI Success',
    props<{period: Period, data: GmiData}>()
);

export const loadFailure = createAction (
    '[Clinic Outcomes] Load Failure',
    props<{error: string}>()
);

