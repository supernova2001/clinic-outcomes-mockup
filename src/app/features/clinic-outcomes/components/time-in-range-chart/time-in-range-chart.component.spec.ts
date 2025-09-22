import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeInRangeChartComponent } from './time-in-range-chart.component';
import { TimeRangeData } from '../../state/clinic-outcomes.state';

describe('TimeInRangeChartComponent', () => {
  let component: TimeInRangeChartComponent;
  let fixture: ComponentFixture<TimeInRangeChartComponent>;

  const mockData: TimeRangeData = {
    ranges: [
      { label: 'Very Low', color: '#FF0000', value: 0, pattern: true },
      { label: 'Low', color: '#ffcc00', value: 15, pattern: false },
      { label: 'In Range', color: '#9edd5a', value: 70, pattern: false },
      { label: 'High', color: '#ff6600', value: 15, pattern: true }
    ],
    activePatients: 120,
    dateRange: { start: '2025-08-01', end: '2025-08-30' },
    lastUpdated: '2025-09-22T10:00:00Z'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeInRangeChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeInRangeChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter out ranges with 0 value', () => {
    component.data = mockData;
    component.ngOnChanges({ data: { currentValue: mockData, previousValue: null, firstChange: true, isFirstChange: () => true }});
    expect(component.barChartData.datasets.length).toBe(3); // Very Low excluded
  });

  it('should assign correct labels', () => {
    expect(component.barChartData.datasets.map(d => d.label)).toContain('Low');
  });
});