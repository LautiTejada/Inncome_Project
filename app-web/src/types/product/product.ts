

export interface ProductoRequestDto {
    nombre: string;
    muerteInvalidez: number;
    asistMedicoFarmacia: number;
    sepelio: number;
    cobertura: string;
    modalidad: string;
    precio: number;
    categoriaId: number;
    logo?: string; // El campo "format: binary" se tipa como string o File en el contexto de un DTO
}

export interface ProductoResponseDto {
    id: number;
    nombre: string;
    muerteInvalidez: number;
    asistMedicoFarmacia: number;
    sepelio: number;
    cobertura: string;
    modalidad: string;
    precio: number;
    logo?: string;
    descuento?: DescuentoResponseDto;
}
