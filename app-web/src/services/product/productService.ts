import apiService from '../api';
import { ProductoRequestDto, ProductoResponseDto } from '../../types/product/product';

export const fetchAllProducts = async (): Promise<ProductoResponseDto[]> => {
    try {
        const response = await apiService.get<ProductoResponseDto[]>('/productos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
        throw error;
    }
};

export const fetchProductById = async (id: number): Promise<ProductoResponseDto> => {
    try {
        const response = await apiService.get<ProductoResponseDto>(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
        throw error;
    }
};

export const createProduct = async (productData: ProductoRequestDto): Promise<ProductoResponseDto> => {
    try {
        const response = await apiService.post<ProductoResponseDto>('/', productData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
};

export const updateProduct = async (id: number, productData: ProductoRequestDto): Promise<ProductoResponseDto> => {
    try {
        const response = await apiService.put<ProductoResponseDto>(`/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el producto con ID ${id}:`, error);
        throw error;
    }
};

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await apiService.put(`/${id}/delete`);
    } catch (error) {
        console.error(`Error al eliminar el producto con ID ${id}:`, error);
        throw error;
    }
};

export const activateProduct = async (id: number): Promise<void> => {
    try {
        await apiService.put(`/${id}/activate`);
    } catch (error) {
        console.error(`Error al activar el producto con ID ${id}:`, error);
        throw error;
    }
};

export const getProductsByMinDeathDisability = async (minMuerteInvalidez: number): Promise<ProductoResponseDto[]> => {
    try {
        const response = await apiService.get<ProductoResponseDto[]>(`/productos/${minMuerteInvalidez}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos por cobertura de muerte e invalidez:', error);
        throw error;
    }
};
