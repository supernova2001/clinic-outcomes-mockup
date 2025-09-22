import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OutcomesApiService} from '../services/outcomes-api.service';
import * as A  from './clinic-outcomes.actions';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';

@Injectable()
export class ClinicOutcomesEffects {
  
    constructor() {
        console.log('EFFECTS - ClinicOutcomesEffects constructor called');
    }

    loadTir$ = createEffect(() => {
      const actions$ = inject(Actions);
      const api = inject(OutcomesApiService);
      
      console.log('EFFECT - loadTir$ effect created');
      return actions$.pipe(
        ofType(A.loadTimeInRange),
        mergeMap(({ period }) => {
          console.log('EFFECT - Loading Time in Range for period:', period);
          return api.getTimeInRange(period).pipe(
            map(data => {
              console.log('EFFECT - Time in Range data loaded:', data);
              console.log('EFFECT - Dispatching loadTimeInRangeSuccess action');
              return A.loadTimeInRangeSuccess({ period, data });
            }),
            catchError(err => {
              console.error('EFFECT - Time in Range load error:', err);
              console.error('EFFECT - Error details:', err);
              console.error('EFFECT - Error status:', err.status);
              console.error('EFFECT - Error message:', err.message);
              return of(A.loadFailure({ error: err.message }));
            })
          );
        })
      );
    });

    loadGmi$ = createEffect(() => {
      const actions$ = inject(Actions);
      const api = inject(OutcomesApiService);
      
      console.log('EFFECT - loadGmi$ effect created');
      return actions$.pipe(
        ofType(A.loadGmi),
        mergeMap(({ period }) => {
          console.log('EFFECT - Loading GMI for period:', period);
          return api.getGmi(period).pipe(
            map(data => {
              console.log('EFFECT - GMI data loaded:', data);
              console.log('EFFECT - Dispatching loadGmiSuccess action');
              return A.loadGmiSuccess({ period, data });
            }),
            catchError(err => {
              console.error('EFFECT - GMI load error:', err);
              console.error('EFFECT - Error details:', err);
              console.error('EFFECT - Error status:', err.status);
              console.error('EFFECT - Error message:', err.message);
              return of(A.loadFailure({ error: err.message }));
            })
          );
        })
      );
    });

    // convenience: when period is set, fetch both charts
    onSetPeriod$ = createEffect(() => {
      const actions$ = inject(Actions);
      
      return actions$.pipe(
        ofType(A.setPeriod),
        mergeMap(({ period }) => {
          console.log('Period changed to:', period);
          return [
            A.loadTimeInRange({ period }),
            A.loadGmi({ period })
          ];
        })
      );
    });
}
    