import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartConfiguration } from 'chart.js';
import { GmiData } from '../../state/clinic-outcomes.state';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-gmi-chart',
  imports: [NgChartsModule, CommonModule],
  templateUrl: './gmi-chart.component.html',
  styleUrl: './gmi-chart.component.scss'
})
export class GmiChartComponent implements OnChanges {
  @Input() data: GmiData | null = null;   

  defaultLegendData = [
    { label: '≤7%', color: '#9edd5a' },
    { label: '7-8%', color: '#ffcc00' },
    { label: '≥8%', color: '#ff0000' }
  ];

  public PieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };

  public PieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, 
      tooltip: { enabled: true }, 
      datalabels: {
        color: "#000",
        formatter: (value: number) => value > 0 ? value + '%' : '',
        anchor: 'end',
        align: 'end',
        clamp: true,
        clip: false,
        offset: -20
      }
    } as any,
    rotation: -180,
    circumference: 360
  };

  public PieChartType: 'pie' = 'pie';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      const filteredRanges = this.data.ranges.filter(r => r.value > 0);

      this.PieChartData = {
        labels: filteredRanges.map(range => range.label),
        datasets: [{
          data: filteredRanges.map(range => range.value),
          backgroundColor: filteredRanges.map(range => range.color),
          hoverBackgroundColor: filteredRanges.map(range => range.color),
          borderColor: 'transparent',
          borderWidth: 1
        }]
      };

      console.log('GmiChart - Updated chart data:', this.PieChartData);
    }
  }
}