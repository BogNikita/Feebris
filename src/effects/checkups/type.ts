export interface Checkups {
  data: Checkup[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

type Checkup = {
  id: number;
  patientId: number;
  createdAt: number;
  pulseOximeterData?: string[];
  averageSPO2?: number[];
};
