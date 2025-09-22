import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, tap, catchError, of } from 'rxjs';
import { TimeRangeData, GmiData } from '../state/clinic-outcomes.state';

@Injectable({ providedIn: 'root' })
export class OutcomesApiService {
  
  constructor(private http: HttpClient) {
    console.log('OutcomesApiService initialized');
  }

  getTimeInRange(period: 30 | 60 | 90): Observable<TimeRangeData> {
    const url = `assets/mock-data/time-in-range-${period}.json`;
    console.log('API Service - HTTP Call (A) - Loading Time in Range from:', url);
    
    return this.http.get<TimeRangeData>(url).pipe(
      delay(500), 
      tap(data => console.log('API Service - HTTP Call (A) - Time in Range response:', data)),
      catchError(err => {
        console.error('API Service - HTTP Call (A) - Time in Range error:', err);
        // Fallback to inline mock data if HTTP fails
        return this.getTimeInRangeFallback(period);
      })
    );
  }

  getGmi(period: 30 | 60 | 90): Observable<GmiData> {
    const url = `assets/mock-data/gmi-${period}.json`;
    console.log('API Service - HTTP Call (B) - Loading GMI from:', url);
    
    return this.http.get<GmiData>(url).pipe(
      delay(500), 
      tap(data => console.log('API Service - HTTP Call (B) - GMI response:', data)),
      catchError(err => {
        console.error('API Service - HTTP Call (B) - GMI error:', err);
        return this.getGmiFallback(period);
      })
    );
  }

  private getTimeInRangeFallback(period: 30 | 60 | 90): Observable<TimeRangeData> {
    console.log('API Service - Using fallback data for Time in Range');
    const mockData = {
      30: {
        ranges: [
          { label: 'Very Low', color: '#FF0000', value: 2, pattern: true },
          { label: 'Low', color: '#ffcc00', value: 15, pattern: false },
          { label: 'In Range', color: '#9edd5a', value: 82, pattern: false },
          { label: 'High', color: '#ff6600', value: 1, pattern: true }
        ],
        activePatients: 120,
        dateRange: { start: '2025-08-22', end: '2025-09-21' },
        lastUpdated: new Date().toISOString()
      },
      60: {
        ranges: [
          { label: 'Very Low', color: '#FF0000', value: 3, pattern: true },
          { label: 'Low', color: '#ffcc00', value: 18, pattern: false },
          { label: 'In Range', color: '#9edd5a', value: 76, pattern: false },
          { label: 'High', color: '#ff6600', value: 3, pattern: true }
        ],
        activePatients: 145,
        dateRange: { start: '2025-07-23', end: '2025-09-21' },
        lastUpdated: new Date().toISOString()
      },
      90: {
        ranges: [
          { label: 'Very Low', color: '#FF0000', value: 4, pattern: true },
          { label: 'Low', color: '#ffcc00', value: 20, pattern: false },
          { label: 'In Range', color: '#9edd5a', value: 72, pattern: false },
          { label: 'High', color: '#ff6600', value: 4, pattern: true }
        ],
        activePatients: 168,
        dateRange: { start: '2025-06-23', end: '2025-09-21' },
        lastUpdated: new Date().toISOString()
      }
    };
    return of(mockData[period]).pipe(delay(500));
  }

  private getGmiFallback(period: 30 | 60 | 90): Observable<GmiData> {
    console.log('API Service - Using fallback data for GMI');
    const mockData = {
      30: {
        averageGMI: 6.7,
        ranges: [
          { label: '≤7%', value: 72, color: '#9edd5a' },
          { label: '7-8%', value: 23, color: '#ffcc00' },
          { label: '≥8%', value: 5, color: '#ff0000' }
        ]
      },
      60: {
        averageGMI: 6.9,
        ranges: [
          { label: '≤7%', value: 68, color: '#9edd5a' },
          { label: '7-8%', value: 26, color: '#ffcc00' },
          { label: '≥8%', value: 6, color: '#ff0000' }
        ]
      },
      90: {
        averageGMI: 7.1,
        ranges: [
          { label: '≤7%', value: 64, color: '#9edd5a' },
          { label: '7-8%', value: 28, color: '#ffcc00' },
          { label: '≥8%', value: 8, color: '#ff0000' }
        ]
      }
    };
    return of(mockData[period]).pipe(delay(500));
  }
}