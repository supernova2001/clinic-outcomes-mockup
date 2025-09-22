import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as A from '../../state/clinic-outcomes.actions';
import { selectPeriod, selectTirForPeriod, selectGmiForPeriod, selectMeta } from '../../state/clinic-outcomes.selectors';
import {Period, TimeRangeData, GmiData} from "../../state/clinic-outcomes.state";

import { TimeInRangeChartComponent } from '../time-in-range-chart/time-in-range-chart.component';
import { GmiChartComponent } from '../gmi-chart/gmi-chart.component';
import { MetaInfoComponent } from '../meta-info/meta-info.component';
@Component({
  selector: 'app-outcomes-dashboard',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    TimeInRangeChartComponent,
    GmiChartComponent,
    MetaInfoComponent,
    MatButtonToggleModule,
    FormsModule,
    NgChartsModule
  ],
  templateUrl: './outcomes-dashboard.component.html',
  styleUrl: './outcomes-dashboard.component.scss'
})
export class OutcomesDashboardComponent implements OnInit {
  selectedDays: Period = 30;
  period$!: Observable<Period>;
  tir$!: Observable<TimeRangeData | undefined>; 
  gmi$!: Observable<GmiData | undefined>;
  meta$!: Observable<{ activePatients: number; dateRange: { start: string; end: string } | undefined; lastUpdated: string | undefined } | null>; 

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.period$ = this.store.select(selectPeriod);
    this.tir$ = this.store.select(selectTirForPeriod);
    this.gmi$ = this.store.select(selectGmiForPeriod);
    this.meta$ = this.store.select(selectMeta);
    
    this.period$.subscribe(period => console.log('Selected period from store:', period));
    this.tir$.subscribe(tir => {
      console.log('TIR data from store:', tir);
      console.log('TIR data type:', typeof tir);
      console.log('TIR data is null?', tir === null);
      console.log('TIR data is undefined?', tir === undefined);
    });
    this.gmi$.subscribe(gmi => {
      console.log('GMI data from store:', gmi);
      console.log('GMI data type:', typeof gmi);
      console.log('GMI data is null?', gmi === null);
      console.log('GMI data is undefined?', gmi === undefined);
    });
    this.meta$.subscribe(meta => console.log('Meta data from store:', meta));
    
    console.log('Dispatching initial actions with:', this.selectedDays);
    this.store.dispatch(A.setPeriod({ period: this.selectedDays }));
    this.store.dispatch(A.loadTimeInRange({ period: this.selectedDays }));
    this.store.dispatch(A.loadGmi({ period: this.selectedDays }));
  }

  onDaysChange(value: Period) {
    console.log('Filter changed to:', value);
    this.selectedDays = value;
    this.store.dispatch(A.setPeriod({ period: value }));
    this.store.dispatch(A.loadTimeInRange({ period: value }));
    this.store.dispatch(A.loadGmi({ period: value }));
  }
}
