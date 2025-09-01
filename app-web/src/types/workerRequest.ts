


// --- Interfaces inferidas basadas en los endpoints y el flujo de trabajo ---

/**
 * @interface IWorker
 * Representa la estructura completa de un trabajador tal como es devuelto por la API.
 * Se infiere a partir de los datos de creación más un ID y otros campos de estado.
 */
export interface IWorker {
    id: number;
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    email: string | null;
    phone: string | null;
    dateOfBirth: string | null;
    incomeType: string;
    activityId: number;
    status: string; // Ejemplo de un campo de estado.
}


export interface GetOperarioByDocumentNumberBody {
    documentNumber: string;
}

export interface CreateNominaBody {
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    email: string | null;
    phone: string | null;
    dateOfBirth: string | null;
    incomeType: string;
    activityId: number;
}

export interface CreateAccessBody {
    nominaId: number;
}

export interface CreateEmpresaBody {
    name: string;
    cuit: string;
    razonSocial: string;
}

export interface CreateOperarioEmpresaBody {
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    email: string | null;
    phone: string | null;
    dateOfBirth: string | null;
    activityId: number;
}

export type CreateOperarioMasivoBody = {
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    email: string | null;
    phone: string | null;
    dateOfBirth: string | null;
    activityId?: number; // El campo es opcional en uno de los ejemplos
}[];


export interface CreateObraOperario {
    workerId: number;
}


export interface CreateObraBody {
    projectName: string;
    location: string;
    districtId: number;
    startDate: string;
    endDate: string;
    description: string;
    foremanId: number;
    status: string;
    obraOperarios: CreateObraOperario[];
}


export interface UpdateObraStatusBody {
    status: string;
}


export type AssignWorkersBody = {
    workerId: number;
}[];


export type RemoveWorkersBody = {
    workerId: number;
}[];


export interface AssignForemanBody {
    workerId: number;
}

