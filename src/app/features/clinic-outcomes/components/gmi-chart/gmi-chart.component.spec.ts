import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GmiChartComponent } from './gmi-chart.component';
import { GmiData } from '../../state/clinic-outcomes.state';

describe('GmiChartComponent', () => {
  let component: GmiChartComponent;
  let fixture: ComponentFixture<GmiChartComponent>;

  const mockData: GmiData = {
    averageGMI: 6.7,
    ranges: [
      { label: '≤7%', value: 72, color: '#9edd5a' },
      { label: '7-8%', value: 28, color: '#ffcc00' },
      { label: '≥8%', value: 0, color: '#ff0000' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmiChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GmiChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data on input change', () => {
    component.data = mockData;
    component.ngOnChanges({ data: { currentValue: mockData, previousValue: null, firstChange: true, isFirstChange: () => true }});
    expect(component.PieChartData.datasets[0].data.length).toBe(2); // Excludes value 0
  });
});