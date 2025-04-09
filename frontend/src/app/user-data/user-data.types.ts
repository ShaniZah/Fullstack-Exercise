export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  heartRate: string;
  bmi?: number;
  avgHeartRate?: number;
  heartRateStatuses?: HeartRateStatus[];
}

export type HeartRateStatus = { minute: number; state: string };
export type HeartRateInfo = { avg: number; states: HeartRateStatus[] };
