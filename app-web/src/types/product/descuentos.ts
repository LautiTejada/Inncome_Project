export interface DescuentoRequestDto {
    porcentaje: number;
    idProducto: number;
}

export interface DescuentoResponseDto {
    id: number;
    porcentaje: number;
    precioDescuento: number;
}
