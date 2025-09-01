import apiService from './api';
import { CreateDistrictBody } from '../types/districtRequest';

// Obtiene todos los distritos
export const fetchAllDistricts = async (): Promise<any[]> => {
    try {
        // Endpoint: GET /district (Get all)
        const response = await apiService.get<any[]>('/district');
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los distritos:', error);
        throw error;
    }
};

// Obtiene un distrito por su ID
export const fetchDistrictById = async (id: number): Promise<any> => {
    try {
        // Endpoint: GET /district/:id (Get One)
        const response = await apiService.get<any>(`/district/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el distrito con ID ${id}:`, error);
        throw error;
    }
};

// Crea un nuevo distrito
export const createDistrict = async (districtData: CreateDistrictBody): Promise<any> => {
    try {
        // Endpoint: POST /district (Create)
        const response = await apiService.post<any>('/district', districtData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el distrito:', error);
        throw error;
    }
};

// Elimina un distrito por su ID
export const deleteDistrict = async (id: number): Promise<void> => {
    try {
        // Endpoint: DELETE /district/:id (Delete)
        // El ejemplo de Postman usa una URL diferente, asumo que se debe corregir a /district/:id
        await apiService.delete(`/district/${id}`);
    } catch (error) {
        console.error(`Error al eliminar el distrito con ID ${id}:`, error);
        throw error;
    }
};
