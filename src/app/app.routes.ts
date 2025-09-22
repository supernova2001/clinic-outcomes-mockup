import { Routes } from '@angular/router';
import { OutcomesDashboardComponent } from './features/clinic-outcomes/components/outcomes-dashboard/outcomes-dashboard.component';
export const routes: Routes = [
    {path: '', redirectTo: 'clinic-outcomes', pathMatch: 'full'},
    {path: 'clinic-outcomes', component: OutcomesDashboardComponent}
];
