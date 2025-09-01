export interface CategoriaRequestDto {
    nombre: string;
}

export interface CategoriaResponseDtoNoRelations {
    id: number;
    nombre: string;
    usuarioCreadorId: number;
}

export interface CategoriaResponseDto {
    id: number;
    nombre: string;
    usuarioCreadorId: number;
    productos: ProductoResponseDto[];
}
