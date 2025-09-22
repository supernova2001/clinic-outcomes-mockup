import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-meta-info',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './meta-info.component.html',
  styleUrl: './meta-info.component.scss'
})
export class MetaInfoComponent implements OnChanges {
  @Input() meta: {
    activePatients: number;
    dateRange: { start: string; end: string } | undefined;
    lastUpdated: string | undefined;
  } | null = null;

  @Input() period: number = 30;

  ngOnChanges(changes: SimpleChanges) {
    if (this.meta) {
      const today = new Date();

      // Update "last updated" to current browser time
      this.meta.lastUpdated = today.toISOString();

      // End date = today
      const endDate = new Date(today);

      // Start date = today - (period - 1) days
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - (this.period - 1));

      this.meta.dateRange = {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      };
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  }

  formatLastUpdated(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  onPrint() {
    window.print();
  }
}