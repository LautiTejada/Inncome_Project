export interface Establecimiento {
    id: number;
    razon_social: string;
}

export const getEstablecimientos = async (): Promise<Establecimiento[]> => {
    const res = await fetch("https://app.inncome.net/establecimientoApi.php", {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("Error al obtener establecimientos");
    }
    return res.json();
};