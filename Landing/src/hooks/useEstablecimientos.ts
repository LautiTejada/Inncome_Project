import { useEffect, useState } from "react";
import { getEstablecimientos, type Establecimiento } from "../services/establecimientosService.ts"; 

export const useEstablecimientos = () => {
    const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getEstablecimientos()
            .then((data) => {
                setEstablecimientos(data);
                setError(null);
            })
            .catch(() => {
                setError("No se pudieron cargar los establecimientos");
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        establecimientos,
        loading,
        error,
    };
};