import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as pattern from 'patternomaly';
import { TimeRangeData } from '../../state/clinic-outcomes.state';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-time-in-range-chart',
  standalone: true,
  imports: [NgChartsModule, CommonModule, MatTooltipModule],
  templateUrl: './time-in-range-chart.component.html',
  styleUrl: './time-in-range-chart.component.scss'
})
export class TimeInRangeChartComponent implements OnChanges {
  @Input() data: TimeRangeData | null = null;   
  @Input() meta: { 
    activePatients: number; 
    dateRange: { start: string; end: string } | undefined; 
    lastUpdated: string | undefined 
  } | null = null;   

  ticks = [40, 54, 70, 180, 240, 400];

  public barChartData: ChartConfiguration<'bar'>['data'] = { 
    labels: [''], 
    datasets: [] 
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 20, bottom: 30 } },
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#000',
        anchor: 'center',
        align: 'right',
        offset: 40,
        formatter: (value: any) => value + '%'
      } as any
    },
    scales: {
      x: { stacked: true, display: false },
      y: { stacked: true, display: false, grid: { display: false } }
    }
  };

  public barChartType: 'bar' = 'bar';

   private getBackground(range: { label: string; color: string; value: number; pattern: boolean }) {
    if (range.pattern) {
      if (range.label === 'Low' || range.label === 'Very Low') {
        return pattern.draw('diagonal', range.color); // /
      }
      if (range.label === 'High' || range.label === 'Very High') {
        return pattern.draw('diagonal-right-left', range.color); // \
      }
    }
    return range.color;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.ranges) {
      const legendOrder: Record<string, number> = {
        'Very Low': 1,
        'Low': 2,
        'In Range': 3,
        'High': 4,
        'Very High': 5
      };

      // Filter out 0-values and sort according to legend order
      const sortedRanges = this.data.ranges
        .filter(r => r.value > 0)
        .sort((a, b) => (legendOrder[a.label] || 99) - (legendOrder[b.label] || 99));

      this.barChartData = {
        labels: [''],
        datasets: sortedRanges.map(range => ({
          data: [range.value],
          label: range.label,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          backgroundColor: this.getBackground(range)
        }))
      };

      console.log('TimeInRangeChart - Updated chart data:', this.barChartData);
    }
  }
}