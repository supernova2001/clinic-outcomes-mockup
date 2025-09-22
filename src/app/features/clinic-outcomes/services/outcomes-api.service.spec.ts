import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OutcomesApiService } from './outcomes-api.service';
import { TimeRangeData } from '../state/clinic-outcomes.state';

describe('OutcomesApiService', () => {
  let service: OutcomesApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OutcomesApiService]
    });
    service = TestBed.inject(OutcomesApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch time in range data (30 days)', () => {
    const mockResponse: TimeRangeData = {
      ranges: [{ label: 'In Range', color: '#9edd5a', value: 80, pattern: false }],
      activePatients: 100,
      dateRange: { start: '2025-09-01', end: '2025-09-21' },
      lastUpdated: new Date().toISOString()
    };

    service.getTimeInRange(30).subscribe(data => {
      expect(data.activePatients).toBe(100);
      expect(data.ranges[0].label).toBe('In Range');
    });

    const req = httpMock.expectOne('assets/mock-data/time-in-range-30.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
