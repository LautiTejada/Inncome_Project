import apiService from './api';

import {
    IWorker,
    CreateNominaBody,
    CreateOperarioMasivoBody,
    CreateEmpresaBody,
    CreateObraBody,
    UpdateObraStatusBody,
    AssignWorkersBody,
    RemoveWorkersBody,
    AssignForemanBody,
    GetOperarioByDocumentNumberBody
} from '../types/workerRequest';

/**
 * @interface IWorkerCreate
 * Alias para la interfaz de creación de un trabajadr en la nómina.
 * Se utiliza en la función `createWorker`.
 */
export type IWorkerCreate = CreateNominaBody;

/**
 * @async
 * @function fetchWorkers
 * @description Trae todos los trabajadores asociados al usuario actual.
 * @returns {Promise<IWorker[]>} Un array de objetos de tipo IWorker.
 */
export const fetchWorkers = async (): Promise<IWorker[]> => {
    try {
        // Endpoint: GET /nomina (Get all by user)
        const response = await apiService.get<IWorker[]>('/nomina');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los trabajadores:', error);
        throw error;
    }
};

/**
 * @async
 * @function fetchWorkersAdmin
 * @description Trae todos los trabajadores para un rol de administrador.
 * @returns {Promise<IWorker[]>} Un array de objetos de tipo IWorker.
 */
export const fetchWorkersAdmin = async (): Promise<IWorker[]> => {
    try {
        // Endpoint: GET /nomina/all (Get all)
        const response = await apiService.get<IWorker[]>('/nomina/all');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los trabajadores:', error);
        throw error;
    }
};

/**
 * @async
 * @function fetchWorkerAdmin
 * @description Trae un trabajador por ID para un rol de administrador.
 * @param {number} id - El ID del trabajador.
 * @returns {Promise<IWorker>} Un objeto de tipo IWorker.
 */
export const fetchWorkerAdmin = async (id: number): Promise<IWorker> => {
    try {
        // Endpoint: GET /nomina/all/:id (Get one)
        const response = await apiService.get<IWorker>(`/nomina/all/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el trabajador:', error);
        throw error;
    }
};

/**
 * @async
 * @function fetchWorkersByDistrict
 * @description Trae todos los trabajadores de un distrito para un administrador de barrio.
 * @returns {Promise<IWorker[]>} Un array de objetos de tipo IWorker.
 */
export const fetchWorkersByDistrict = async (): Promise<IWorker[]> => {
    try {
        // Endpoint: GET /nomina/district (Get all by district)
        const response = await apiService.get<IWorker[]>('/nomina/district');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los trabajadores del distrito:', error);
        throw error;
    }
};

/**
 * @async
 * @function fetchWorker
 * @description Trae un trabajador por ID para el usuario actual.
 * @param {number} id - El ID del trabajador.
 * @returns {Promise<IWorker>} Un objeto de tipo IWorker.
 */
export const fetchWorker = async (id: number): Promise<IWorker> => {
    try {
        // Endpoint: GET /nomina/operario/:id (Get one by user)
        const response = await apiService.get<IWorker>(`/nomina/operario/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el trabajador:', error);
        throw error;
    }
};

/**
 * @async
 * @function createWorker
 * @description Crea un nuevo trabajador en la nómina.
 * @param {IWorkerCreate} workerData - Los datos del trabajador a crear.
 * @returns {Promise<IWorker>} El objeto del trabajador creado.
 */
export const createWorker = async (workerData: IWorkerCreate): Promise<IWorker> => {
    try {
        // Endpoint: POST /nomina (Create)
        const response = await apiService.post<IWorker>('/nomina', workerData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el trabajador:', error);
        throw error;
    }
};

/**
 * @async
 * @function activateWorker
 * @description Activa un trabajador por su ID.
 * @param {number} id - El ID del trabajador a activar.
 * @returns {Promise<IWorker>} El objeto del trabajador actualizado.
 */
export const activateWorker = async (id: number): Promise<IWorker> => {
    try {
        // Endpoint: PATCH /nomina/activate/:id (Activate)
        const response = await apiService.patch<IWorker>(`/nomina/activate/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al activar el trabajador:', error);
        throw error;
    }
};

/**
 * @async
 * @function deactivateWorker
 * @description Desactiva un trabajador por su ID.
 * @param {number} id - El ID del trabajador a desactivar.
 * @returns {Promise<IWorker>} El objeto del trabajador actualizado.
 */
export const deactivateWorker = async (id: number): Promise<IWorker> => {
    try {
        // Endpoint: PATCH /nomina/deactivate/:id (Deactivate)
        const response = await apiService.patch<IWorker>(`/nomina/deactivate/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al desactivar el trabajador:', error);
        throw error;
    }
};

/**
 * @async
 * @function deleteWorker
 * @description Elimina un trabajador por su ID.
 * @param {number} id - El ID del trabajador a eliminar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando la operación es exitosa.
 */
export const deleteWorker = async (id: number): Promise<void> => {
    try {
        // Endpoint: DELETE /nomina/:id (Delete)
        await apiService.delete(`/nomina/${id}`);
    } catch (error) {
        console.error('Error al eliminar el trabajador:', error);
        throw error;
    }
};

// --- Nuevas funciones que se infieren de las interfaces proporcionadas ---

/**
 * @async
 * @function getOperarioByDocumentNumber
 * @description Obtiene un operario por su número de documento.
 * @param {GetOperarioByDocumentNumberBody} body - El objeto con el número de documento.
 * @returns {Promise<IWorker>} El objeto del operario encontrado.
 */
export const getOperarioByDocumentNumber = async (body: GetOperarioByDocumentNumberBody): Promise<IWorker> => {
    try {
        const response = await apiService.post<IWorker>('/nomina/documentNumber', body);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el operario por número de documento:', error);
        throw error;
    }
};

/**
 * @async
 * @function createMasiveWorkers
 * @description Crea múltiples operarios a la vez.
 * @param {CreateOperarioMasivoBody} workersData - Un array de objetos con los datos de los operarios.
 * @returns {Promise<IWorker[]>} Un array de los objetos de los operarios creados.
 */
export const createMasiveWorkers = async (workersData: CreateOperarioMasivoBody): Promise<IWorker[]> => {
    try {
        const response = await apiService.post<IWorker[]>('/nomina/mass', workersData);
        return response.data;
    } catch (error) {
        console.error('Error al crear operarios de forma masiva:', error);
        throw error;
    }
};

/**
 * @async
 * @function createEmpresa
 * @description Crea una nueva empresa.
 * @param {CreateEmpresaBody} empresaData - El objeto con los datos de la empresa.
 * @returns {Promise<any>} El objeto de la empresa creada.
 */
export const createEmpresa = async (empresaData: CreateEmpresaBody): Promise<any> => {
    try {
        const response = await apiService.post('/empresas', empresaData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la empresa:', error);
        throw error;
    }
};

/**
 * @async
 * @function createObra
 * @description Crea una nueva obra.
 * @param {CreateObraBody} obraData - El objeto con los datos de la obra.
 * @returns {Promise<any>} El objeto de la obra creada.
 */
export const createObra = async (obraData: CreateObraBody): Promise<any> => {
    try {
        const response = await apiService.post('/obras', obraData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la obra:', error);
        throw error;
    }
};

/**
 * @async
 * @function updateObraStatus
 * @description Actualiza el estado de una obra.
 * @param {number} obraId - El ID de la obra a actualizar.
 * @param {UpdateObraStatusBody} statusData - El objeto con el nuevo estado.
 * @returns {Promise<any>} El objeto de la obra actualizada.
 */
export const updateObraStatus = async (obraId: number, statusData: UpdateObraStatusBody): Promise<any> => {
    try {
        const response = await apiService.patch(`/obras/${obraId}/status`, statusData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el estado de la obra:', error);
        throw error;
    }
};

/**
 * @async
 * @function assignWorkersToObra
 * @description Asigna múltiples trabajadores a una obra.
 * @param {number} obraId - El ID de la obra.
 * @param {AssignWorkersBody} workersData - El array de IDs de los trabajadores a asignar.
 * @returns {Promise<any>} La respuesta de la asignación.
 */
export const assignWorkersToObra = async (obraId: number, workersData: AssignWorkersBody): Promise<any> => {
    try {
        const response = await apiService.post(`/obras/${obraId}/assign-workers`, workersData);
        return response.data;
    } catch (error) {
        console.error('Error al asignar trabajadores a la obra:', error);
        throw error;
    }
};

/**
 * @async
 * @function removeWorkersFromObra
 * @description Remueve múltiples trabajadores de una obra.
 * @param {number} obraId - El ID de la obra.
 * @param {RemoveWorkersBody} workersData - El array de IDs de los trabajadores a remover.
 * @returns {Promise<any>} La respuesta de la remoción.
 */
export const removeWorkersFromObra = async (obraId: number, workersData: RemoveWorkersBody): Promise<any> => {
    try {
        const response = await apiService.post(`/obras/${obraId}/remove-workers`, workersData);
        return response.data;
    } catch (error) {
        console.error('Error al remover trabajadores de la obra:', error);
        throw error;
    }
};

/**
 * @async
 * @function assignForemanToObra
 * @description Asigna un capataz a una obra.
 * @param {number} obraId - El ID de la obra.
 * @param {AssignForemanBody} foremanData - El objeto con el ID del capataz.
 * @returns {Promise<any>} La respuesta de la asignación.
 */
export const assignForemanToObra = async (obraId: number, foremanData: AssignForemanBody): Promise<any> => {
    try {
        const response = await apiService.patch(`/obras/${obraId}/assign-foreman`, foremanData);
        return response.data;
    } catch (error) {
        console.error('Error al asignar capataz a la obra:', error);
        throw error;
    }
};
