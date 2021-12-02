export type CareHomesItem = {
  id: number;
  name: string;
};

export interface CareHomes {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  data: CareHomesItem[];
  activeCareHomes: string;
}
