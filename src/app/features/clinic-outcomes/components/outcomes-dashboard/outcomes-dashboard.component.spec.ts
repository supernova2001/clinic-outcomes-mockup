import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomesDashboardComponent } from './outcomes-dashboard.component';

describe('OutcomesDashboardComponent', () => {
  let component: OutcomesDashboardComponent;
  let fixture: ComponentFixture<OutcomesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutcomesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutcomesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
