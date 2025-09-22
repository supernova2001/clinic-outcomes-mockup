export interface TirRange {label: string, color: string, value: number, pattern: boolean;}
export type Period = 30 | 60 | 90;

export interface TimeRangeData {
    ranges: TirRange[];
    activePatients: number;
    dateRange: {start: string, end: string};
    lastUpdated: string;
}

export interface GmiSlice {label: string, value: number, color: string;}

export interface GmiData {
    averageGMI: number,
    ranges: GmiSlice[];
}

export interface ClinicOutcomesState {
    selectedPeriod: Period;
    timeInRangeByPeriod: Record<number, TimeRangeData | undefined>;
    gmiByPeriod: Record<number, GmiData | undefined>;
    loading: boolean;
    error?: string;     
}