import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutcomesDashboardComponent } from './outcomes-dashboard.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as A from '../../state/clinic-outcomes.actions';

describe('OutcomesDashboardComponent', () => {
  let component: OutcomesDashboardComponent;
  let fixture: ComponentFixture<OutcomesDashboardComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutcomesDashboardComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutcomesDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setPeriod on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(A.setPeriod({ period: 30 }));
  });

  it('should dispatch setPeriod when onDaysChange is called', () => {
    component.onDaysChange(60);
    expect(store.dispatch).toHaveBeenCalledWith(A.setPeriod({ period: 60 }));
  });
});