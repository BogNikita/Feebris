export interface Checkups {
  id: number;
  patientId: number;
  createdAt: number;
  pulseOximeterData?: string[];
  averageSPO2?: number[];
}

export interface Practices {
  id: number;
  name: string;
}

export interface PracitesPatients {
  patientId: number;
  gpPracticeId: number;
}

export interface Patients {
  id: number;
  firstName: string;
  lastName: string;
  careHomeId?: number;
  assignedPractices?: string[];
}
