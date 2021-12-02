export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  careHomeId: number;
  assignedPractices: string[];
}

export interface Patients {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  data: Patient[];
  activePatient: string;
}
