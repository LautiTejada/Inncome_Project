
export interface Worker {
  id: string;
  name: string;
  dni: string;
  role: string;
  department: string;
  location: string;
  status: 'active' | 'inactive';
  insuranceTypes: string[];
  coverageSince: string;
  isEnabled: boolean;
}

export interface Visit {
  id: string;
  name: string;
  dni: string;
  type: 'visit' | 'delivery';
  status: 'active' | 'finished';
  host: string;
  entryTime: string;
  date: string;
  description: string;
  contact?: string;
  exitTime?: string;
  company?: string;
}

export interface InncomeRecord {
  id: string;
  worker: string;
  dni: string;
  department: string;
  entryTime: string;
  exitTime?: string;
  status: 'present' | 'absent';
  date: string;
}
