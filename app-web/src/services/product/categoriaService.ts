import apiService from '../api';
import { CategoriaRequestDto, CategoriaResponseDto, CategoriaResponseDtoNoRelations } from '../../types/product/ProductCat';
import { ProductoResponseDto } from '../../types/product/product';

export const fetchAllCategories = async (): Promise<CategoriaResponseDtoNoRelations[]> => {
    try {
        const response = await apiService.get<CategoriaResponseDtoNoRelations[]>('/categorias');
        return response.data;
    } catch (error) {
        console.error('Error al obtener todas las categorías:', error);
        throw error;
    }
};

export const fetchCategoryById = async (id: number): Promise<CategoriaResponseDto> => {
    try {
        const response = await apiService.get<CategoriaResponseDto>(`/categorias/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la categoría con ID ${id}:`, error);
        throw error;
    }
};

export const createCategory = async (categoryData: CategoriaRequestDto): Promise<CategoriaResponseDtoNoRelations> => {
    try {
        // Asumo que el X-User-Id se maneja en el apiService o se pasa como parte de la petición.
        const response = await apiService.post<CategoriaResponseDtoNoRelations>('/categorias', categoryData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        throw error;
    }
};

export const updateCategory = async (id: number, categoryData: CategoriaRequestDto): Promise<CategoriaResponseDtoNoRelations> => {
    try {
        const response = await apiService.put<CategoriaResponseDtoNoRelations>(`/categorias/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la categoría con ID ${id}:`, error);
        throw error;
    }
};

export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await apiService.put(`/categorias/${id}/delete`);
    } catch (error) {
        console.error(`Error al eliminar la categoría con ID ${id}:`, error);
        throw error;
    }
};

export const getProductsByCategory = async (categoriaId: number): Promise<ProductoResponseDto[]> => {
    try {
        const response = await apiService.get<ProductoResponseDto[]>(`/categorias/${categoriaId}/productos`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener productos de la categoría con ID ${categoriaId}:`, error);
        throw error;
    }
};
