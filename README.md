# Clinic Outcomes Dashboard

An Angular 19 application that displays **Clinic Outcomes** for patients using two key metrics:

1. **Time in Range (TIR):** A stacked bar chart showing % of time spent in each glucose range.
2. **Glucose Management Indicator (GMI):** A pie chart showing estimated average GMI%.

Built with **Angular 19, NgRx, ng2-charts (Chart.js), Angular Material**, and **RxJS**.


##  Features

- **Interactive Filters**: Toggle between **30, 60, 90 days**.
- **Time in Range Chart**: Custom stacked bar chart with patterned segments.
- **GMI Chart**: Custom pie chart with external labels.
- **Meta Info Section**: Active patients, date range, last updated timestamp.
- **Print Button**: Print/export-ready layout.
- **NgRx State Management**: Centralized store for data and UI state.
- **Mock API**: JSON files simulate backend API responses.


## Data Flow

1. **User selects a period (30/60/90 days)** → Dispatches `setPeriod` action.  
2. **NgRx Effects** trigger API calls via `OutcomesApiService`.  
3. **Service fetches mock JSON data** (or fallback inline mock).  
4. **Reducer updates store** with `TimeRangeData` and `GmiData`.  
5. **Selectors** pull state into chart components.  
6. **Charts update automatically** when data changes. 


## Designed by Janakiram Sharma (janakiramsharmak@gmail.com)

