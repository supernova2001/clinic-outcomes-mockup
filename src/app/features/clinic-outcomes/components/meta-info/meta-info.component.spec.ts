import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetaInfoComponent } from './meta-info.component';

describe('MetaInfoComponent', () => {
  let component: MetaInfoComponent;
  let fixture: ComponentFixture<MetaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaInfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MetaInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate('2025-09-22T10:00:00Z');
    expect(formatted).toBe('09/22/2025');
  });

  it('should format lastUpdated with time', () => {
    const formatted = component.formatLastUpdated('2025-09-22T10:30:00Z');
    expect(formatted).toContain('09/22/2025');
    expect(formatted).toMatch(/10:30/);
  });

  it('should call window.print on print button click', () => {
    spyOn(window, 'print');
    component.onPrint();
    expect(window.print).toHaveBeenCalled();
  });
});