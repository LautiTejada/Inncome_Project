import { useState, useEffect } from 'react';
import { fetchWorkers, createWorker, deleteWorker, updateWorker, IWorkerCreate, UpdateWorkerBody, IWorker } from '../services/workerService';

/**
 * @interface IWorkerData
 * Esta interfaz representa la estructura de datos que se utiliza en la UI,
 * a diferencia de la interfaz del API que puede contener más campos.
 */
export interface IWorkerData {
    id: string;
    name: string;
    dni: string;
    role: string;
    department: string;
    location: string;
    status: string;
    insuranceTypes: string[];
    coverageSince: string;
    isEnabled: boolean;
}

/**
 * @hook useWorkers
 * @description Un hook personalizado para la gestión de trabajadores.
 * Maneja el estado de carga, errores y las operaciones CRUD (crear, leer, actualizar, eliminar).
 * @returns {Object} Un objeto con el estado y las funciones para manipular a los trabajadores.
 */
export const useWorkers = () => {
    const [workers, setWorkers] = useState<IWorker[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * @async
     * @function getWorkersList
     * @description Obtiene la lista de trabajadores desde la API y actualiza el estado.
     */
    const getWorkersList = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // El hook debe devolver los datos tal cual los recibe.
            // La transformación de los datos para la UI (`IWorkerData`)
            // debe realizarse en el componente que consume este hook.
            const data = await fetchWorkers();
            setWorkers(data);
        } catch (err: any) {
            setError(err.message || 'Error al obtener los trabajadores');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @useEffect
     * @description Llama a `getWorkersList` en el montaje del componente para
     * obtener la lista inicial de trabajadores.
     */
    useEffect(() => {
        getWorkersList();
    }, []);

    /**
     * @async
     * @function addWorker
     * @description Agrega un nuevo trabajador a través de la API y refresca la lista.
     * @param {IWorkerCreate} workerData - Los datos del nuevo trabajador.
     */
    const addWorker = async (workerData: IWorkerCreate) => {
        setIsLoading(true);
        setError(null);
        try {
            await createWorker(workerData);
            await getWorkersList(); // Refresca la lista después de la creación
        } catch (err: any) {
            setError(err.message || 'Error al agregar el trabajador');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @async
     * @function editWorker
     * @description Actualiza un trabajador existente a través de la API y refresca la lista.
     * @param {number} id - El ID del trabajador a actualizar.
     * @param {UpdateWorkerBody} workerData - Los datos actualizados del trabajador.
     */
    const editWorker = async (id: number, workerData: UpdateWorkerBody) => {
        setIsLoading(true);
        setError(null);
        try {
            await updateWorker(id, workerData);
            await getWorkersList(); // Refresca la lista después de la actualización
        } catch (err: any) {
            setError(err.message || 'Error al actualizar el trabajador');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @async
     * @function removeWorker
     * @description Elimina un trabajador a través de la API y refresca la lista.
     * @param {number} id - El ID del trabajador a eliminar.
     */
    const removeWorker = async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteWorker(id);
            await getWorkersList(); // Refresca la lista después de la eliminación
        } catch (err: any) {
            setError(err.message || 'Error al eliminar el trabajador');
        } finally {
            setIsLoading(false);
        }
    };

    return { workers, isLoading, error, addWorker, editWorker, removeWorker, getWorkersList };
};

