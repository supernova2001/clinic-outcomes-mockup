import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {NgChartsModule} from 'ng2-charts';

import { ClinicOutcomesEffects } from './features/clinic-outcomes/state/clinic-outcomes.effects';
import { clinicOutcomesReducer } from './features/clinic-outcomes/state/clinic-outcomes.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideStore({ clinicOutcomes: clinicOutcomesReducer }), 
    provideEffects([ClinicOutcomesEffects]), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(NgChartsModule)
  ]
};
