import { mockEstablecimientos, simulateApiDelay, type Establecimiento } from "../data/mockData";

// Servicio mock para establecimientos - reemplaza las llamadas a la API real
export const getEstablecimientos = async (): Promise<Establecimiento[]> => {
    // Simular delay de API
    await simulateApiDelay(500);
    
    // Retornar datos mock en lugar de hacer llamada real a la API
    return mockEstablecimientos;
};