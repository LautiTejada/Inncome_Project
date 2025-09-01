import React, { useState, useEffect } from "react";
import { useEstablecimientos } from "../../../hooks/useEstablecimientos";

interface RegisterPropietarioFormProps {
  onRegister: () => Promise<void>;
  loading: boolean;
  propietarioData: any; // Considerar definir una interfaz más específica para propietarioData
  setPropietarioData: (v: any) => void;
  propietarioStep: number;
  setPropietarioStep: (v: number) => void;
  isPropietarioStep1Valid: () => boolean;
  isPropietarioStep2Valid: () => boolean;
  isPropietarioStep3Valid: () => boolean;
  onBackToTypeSelect: () => void;
}

const RegisterPropietarioForm: React.FC<RegisterPropietarioFormProps> = ({
  onRegister,
  loading,
  propietarioData,
  setPropietarioData,
  propietarioStep,
  setPropietarioStep,
  isPropietarioStep1Valid,
  isPropietarioStep2Valid,
  isPropietarioStep3Valid,
  onBackToTypeSelect,
}) => {
  // Estados de error
  const [dniError, setDniError] = useState<string | null>(null);
  const [nombreError, setNombreError] = useState<string | null>(null);
  const [apellidoError, setApellidoError] = useState<string | null>(null);
  const [establecimientoError, setEstablecimientoError] = useState<
    string | null
  >(null);
  const [manzanaError, setManzanaError] = useState<string | null>(null);
  const [loteError, setLoteError] = useState<string | null>(null);
  const [telefonoError, setTelefonoError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [claveError, setClaveError] = useState<string | null>(null);
  const [nombreTouched, setNombreTouched] = useState(false);
  const [apellidoTouched, setApellidoTouched] = useState(false);
  const [manzanaTouched, setManzanaTouched] = useState(false);
  const [loteTouched, setLoteTouched] = useState(false);
  const [telefonoTouched, setTelefonoTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [claveTouched, setClaveTouched] = useState(false);
  const [autocompletando, setAutocompletando] = useState(false);
  const [readonlyNombre, setReadonlyNombre] = useState(false);
  const [readonlyApellido, setReadonlyApellido] = useState(false);
  const [isExtranjero, setIsExtranjero] = useState(false);
  const {
    establecimientos,
    loading: loadingEstabs,
    error: errorEstabs,
  } = useEstablecimientos();

  // Validar nombre y apellido automáticamente cuando cambian
  useEffect(() => {
    if (propietarioData.nombre !== undefined) {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(propietarioData.nombre)) {
        setNombreError("El nombre solo debe contener letras.");
      } else {
        setNombreError(null);
      }
    }
    if (propietarioData.apellido !== undefined) {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(propietarioData.apellido)) {
        setApellidoError("El apellido solo debe contener letras.");
      } else {
        setApellidoError(null);
      }
    }
  }, [propietarioData.nombre, propietarioData.apellido]);

  // Función para limpiar errores y touched
  const clearAllStates = () => {
    setDniError(null);
    setNombreError(null);
    setApellidoError(null);
    setEstablecimientoError(null);
    setManzanaError(null);
    setLoteError(null);
    setTelefonoError(null);
    setEmailError(null);
    setClaveError(null);
    setNombreTouched(false);
    setApellidoTouched(false);
    setManzanaTouched(false);
    setLoteTouched(false);
    setTelefonoTouched(false);
    setEmailTouched(false);
    setClaveTouched(false);
  };

  // Validaciones
  // Si cambia el documento, limpiar y desbloquear
  const handleDniChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Modificación aquí: Si es extranjero, permite letras y números. Si es DNI, solo números.
    if (isExtranjero && !/^[a-zA-Z0-9]*$/.test(value)) {
      setDniError("El pasaporte solo debe contener números y letras.");
    } else if (!isExtranjero && !/^[0-9]*$/.test(value)) {
      setDniError("El DNI solo debe contener números, sin puntos.");
    } else if (!isExtranjero && value.length > 0 && value.length < 8) {
      setDniError("El DNI debe tener al menos 8 dígitos.");
    } else {
      setDniError(null);
    }
    setPropietarioData((prev: any) => ({
      ...prev,
      numDoc: value,
      nombre: "",
      apellido: "",
    }));
    setReadonlyNombre(false);
    setReadonlyApellido(false);
    // Autocompletado automático solo si es DNI
    if (!isExtranjero && (value.length === 8 || value.length === 11)) {
      setAutocompletando(true);
      try {
        const res = await fetch(
          `https://app.inncome.net/proxy.php?nroDoc=${value}`
        );
        const data = await res.json();
        if (data && data.valor && data.valor.length > 0) {
          const denominacion = data.valor[0].denominacion || "";
          const palabras = denominacion.trim().split(/\s+/);
          const apellido = palabras[0] || "";
          const nombre = palabras[palabras.length - 1] || "";
          setPropietarioData((prev: any) => ({ ...prev, apellido, nombre }));
          setReadonlyNombre(true);
          setReadonlyApellido(true);
          // Forzar validación y touched si autocompleta
          if (nombre) {
            setNombreTouched(true);
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(nombre)) {
              setNombreError("El nombre solo debe contener letras.");
            } else {
              setNombreError(null);
            }
          }
          if (apellido) {
            setApellidoTouched(true);
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(apellido)) {
              setApellidoError("El apellido solo debe contener letras.");
            } else {
              setApellidoError(null);
            }
          }
        }
      } catch (err) {
        console.error("Error al consultar AFIP:", err);
      }
      setAutocompletando(false);
    }
  };
  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(value)) {
      setNombreError("El nombre solo debe contener letras.");
    } else {
      setNombreError(null);
    }
    setPropietarioData((prev: any) => ({ ...prev, nombre: value }));
  };
  const handleNombreBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setNombreTouched(true);
    const value = e.target.value;
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError("El email no es válido.");
    } else {
      setEmailError(null);
    }
  };
  const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(value)) {
      setApellidoError("El apellido solo debe contener letras.");
    } else {
      setApellidoError(null);
    }
    setPropietarioData((prev: any) => ({ ...prev, apellido: value }));
  };
  const handleApellidoBlur = () => {
    setApellidoTouched(true);
  };

  // Modificación aquí: Cambiar el tipo de evento a HTMLSelectElement y parsear a número
  const handleEstablecimientoChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(e.target.value, 10); // Convertir a número entero
    setPropietarioData((prev: any) => ({ ...prev, establecimiento: value }));
    setEstablecimientoError(null);
  };

  const handleEstablecimientoBlur = () => {
    // Asegurarse de que propietarioData.establecimiento no sea 0 o null si se espera un ID válido
    if (
      !propietarioData.establecimiento ||
      propietarioData.establecimiento === 0
    ) {
      setEstablecimientoError("El establecimiento no puede estar vacío.");
    } else {
      setEstablecimientoError(null);
    }
  };
  const handleManzanaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite letras y números para la manzana
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]*$/.test(value)) {
      setManzanaError("La manzana solo debe contener letras y números.");
    } else {
      setManzanaError(null);
    }
    setPropietarioData((prev: any) => ({ ...prev, manzana: value }));
  };
  const handleManzanaBlur = () => {
    setManzanaTouched(true);
  };
  const handleLoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) {
      setLoteError("El lote solo debe contener números.");
    } else {
      setLoteError(null);
    }
    setPropietarioData((prev: any) => ({ ...prev, lote: value }));
  };
  const handleLoteBlur = () => {
    setLoteTouched(true);
  };
  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) {
      setTelefonoError("El teléfono solo debe contener números.");
    } else if (value.length > 0 && value.length < 10) {
      setTelefonoError("El teléfono debe tener al menos 10 dígitos.");
    } else {
      setTelefonoError(null);
    }
    setPropietarioData((prev: any) => ({ ...prev, telefono: value }));
  };
  const handleTelefonoBlur = () => {
    setTelefonoTouched(true);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailTouched(false);
    setEmailError(null);
    setPropietarioData((prev: any) => ({ ...prev, email: value }));
  };
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailTouched(true);
    const value = e.target.value;
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError("El email no es válido.");
    } else {
      setEmailError(null);
    }
  };
  const handleClaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClaveTouched(false);
    setClaveError(null);
    setPropietarioData((prev: any) => ({ ...prev, clave: value }));
  };
  const handleClaveBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setClaveTouched(true);
    const value = e.target.value;
    if (value.length < 6) {
      setClaveError("La contraseña debe tener al menos 6 caracteres.");
    } else {
      setClaveError(null);
    }
  };

  // Validación de paso
  const paso1Valido =
    isPropietarioStep1Valid() && !dniError && !nombreError && !apellidoError;
  const paso2Valido =
    isPropietarioStep2Valid() &&
    !establecimientoError &&
    !manzanaError &&
    !loteError &&
    !telefonoError &&
    // Asegurarse de que el establecimiento seleccionado sea un número válido (no 0 o null)
    propietarioData.establecimiento &&
    propietarioData.establecimiento !== 0;
  const paso3Valido = isPropietarioStep3Valid() && !emailError && !claveError;

  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (propietarioStep === 3) onRegister();
      }}
    >
      {propietarioStep === 1 && (
        <>
          {/* Tipo de documento */}
          <div className="relative w-full flex flex-col justify-end mb-2">
            <label
              htmlFor="propietario-tipo-doc"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              Tipo de documento
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                id="propietario-tipo-doc"
                value={isExtranjero ? "Extranjero" : "DNI"}
                readOnly
                tabIndex={-1}
                className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all cursor-not-allowed select-none pr-28"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 text-xs rounded-full font-semibold shadow-sm bg-gradient-to-r from-cyan-400 to-[#00205B] text-white hover:from-cyan-300 hover:to-cyan-500 border-none transition-all focus:outline-none"
                onClick={() => {
                  clearAllStates();
                  setPropietarioData({
                    numDoc: "",
                    nombre: "",
                    apellido: "",
                    establecimiento: "",
                    manzana: "",
                    lote: "",
                    telefono: "",
                    email: "",
                    clave: "",
                  });
                  setIsExtranjero((v) => !v);
                }}
                disabled={autocompletando}
              >
                {isExtranjero ? "DNI" : "Extranjero"}
              </button>
            </div>
          </div>
          {/* Número de Documento */}
          <div className="relative w-full flex flex-col justify-end mb-2">
            <label
              htmlFor="propietario-num-doc"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              {isExtranjero ? "Pasaporte" : "Número de Documento"}
            </label>
            <input
              type="text"
              id="propietario-num-doc"
              inputMode={!isExtranjero ? "numeric" : undefined}
              pattern={!isExtranjero ? "[0-9]*" : undefined}
              value={propietarioData.numDoc}
              onChange={handleDniChange}
              className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
              disabled={autocompletando}
            />
            {autocompletando && !isExtranjero && (
              <span className="text-cyan-400 text-xs mt-1">
                Consultando AFIP...
              </span>
            )}
            {dniError && (
              <span className="text-red-400 text-xs mt-1">{dniError}</span>
            )}
          </div>
          {/* Nombre y Apellido */}
          <div className="flex gap-3 mb-2">
            <div className="relative w-1/2 flex flex-col justify-end">
              <label
                htmlFor="propietario-nombre"
                className="text-gray-400 text-xs font-semibold mb-1 ml-0"
              >
                Nombre
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="propietario-nombre"
                  value={propietarioData.nombre}
                  onChange={handleNombreChange}
                  onBlur={handleNombreBlur}
                  className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
                  readOnly={
                    !isExtranjero && (readonlyNombre || autocompletando)
                  }
                  onFocus={() => {
                    if (!isExtranjero && readonlyNombre && !autocompletando)
                      setReadonlyNombre(false);
                  }}
                />
              </div>
              {nombreTouched && nombreError && (
                <span className="text-red-400 text-xs mt-1">{nombreError}</span>
              )}
            </div>
            <div className="relative w-1/2 flex flex-col justify-end">
              <label
                htmlFor="propietario-apellido"
                className="text-gray-400 text-xs font-semibold mb-1 ml-0"
              >
                Apellido
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="propietario-apellido"
                  value={propietarioData.apellido}
                  onChange={handleApellidoChange}
                  onBlur={handleApellidoBlur}
                  className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
                  readOnly={
                    !isExtranjero && (readonlyApellido || autocompletando)
                  }
                  onFocus={() => {
                    if (!isExtranjero && readonlyApellido && !autocompletando)
                      setReadonlyApellido(false);
                  }}
                />
              </div>
              {apellidoTouched && apellidoError && (
                <span className="text-red-400 text-xs mt-1">
                  {apellidoError}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 w-full mt-2">
            <button
              type="button"
              className="flex-1 py-2 rounded-full bg-gray-700 text-white font-semibold text-lg shadow-md hover:bg-gray-600 transition-all"
              onClick={() => {
                clearAllStates();
                onBackToTypeSelect();
              }}
            >
              Volver
            </button>
            <button
              type="button"
              disabled={!paso1Valido}
              className={`flex-1 py-2 rounded-full font-semibold text-lg shadow-md transition-all ${
                paso1Valido
                  ? "bg-gradient-to-r from-cyan-400 to-[#00205B] text-white hover:from-cyan-300 hover:to-cyan-500"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                clearAllStates();
                setPropietarioStep(2);
              }}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
      {propietarioStep === 2 && (
        <>
          {/* Establecimiento simple */}
          <div className="relative w-full flex flex-col justify-end mb-6">
            <label
              htmlFor="propietario-establecimiento"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              Establecimiento
            </label>
            {errorEstabs && (
              <span className="text-red-400 text-xs mt-1">{errorEstabs}</span>
            )}

            <select
              id="propietario-establecimiento"
              // El valor del select debe ser un string, así que convertimos el ID a string
              value={
                propietarioData.establecimiento
                  ? propietarioData.establecimiento.toString()
                  : ""
              }
              onChange={handleEstablecimientoChange} // Usar el handler modificado
              onBlur={handleEstablecimientoBlur}
              className="w-full bg-[#161617] text-white py-2 px-0 h-10 border-b-2 border-transparent focus:border-cyan-400 focus:outline-none transition-all"
              disabled={loadingEstabs} // Deshabilitar mientras carga
            >
              <option value="" disabled>
                {loadingEstabs
                  ? "Cargando..."
                  : "Selecciona un establecimiento"}
              </option>
              {establecimientos.map((e) => (
                // Convertir e.id a string para el value de la opción
                <option key={e.id} value={e.id.toString()}>
                  {e.razon_social}
                </option>
              ))}
            </select>

            {establecimientoError && (
              <span className="text-red-400 text-xs mt-1">
                {establecimientoError}
              </span>
            )}
          </div>
          {/* Manzana y Lote */}
          <div className="flex gap-3 mb-2">
            <div className="relative w-1/2 flex flex-col justify-end">
              <label
                htmlFor="propietario-manzana"
                className="text-gray-400 text-xs font-semibold mb-1 ml-0"
              >
                Manzana
              </label>
              <input
                type="text"
                id="propietario-manzana"
                value={propietarioData.manzana}
                onChange={handleManzanaChange}
                onBlur={handleManzanaBlur}
                className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
              />
              {manzanaTouched && manzanaError && (
                <span className="text-red-400 text-xs mt-1">
                  {manzanaError}
                </span>
              )}
            </div>
            <div className="relative w-1/2 flex flex-col justify-end">
              <label
                htmlFor="propietario-lote"
                className="text-gray-400 text-xs font-semibold mb-1 ml-0"
              >
                Lote
              </label>
              <input
                type="text"
                id="propietario-lote"
                value={propietarioData.lote}
                onChange={handleLoteChange}
                onBlur={handleLoteBlur}
                className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
              />
              {loteTouched && loteError && (
                <span className="text-red-400 text-xs mt-1">{loteError}</span>
              )}
            </div>
          </div>
          {/* Teléfono */}
          <div className="relative w-full flex flex-col justify-end mb-2">
            <label
              htmlFor="propietario-telefono"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="propietario-telefono"
              inputMode="numeric"
              pattern="[0-9]*"
              value={propietarioData.telefono}
              onChange={handleTelefonoChange}
              onBlur={handleTelefonoBlur}
              className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
            />
            {telefonoTouched && telefonoError && (
              <span className="text-red-400 text-xs mt-1">{telefonoError}</span>
            )}
          </div>
          <div className="flex gap-2 w-full mt-2">
            <button
              type="button"
              className="flex-1 py-2 rounded-full bg-gray-700 text-white font-semibold text-lg shadow-md hover:bg-gray-600 transition-all"
              onClick={() => {
                clearAllStates();
                setPropietarioStep(1);
              }}
            >
              Atrás
            </button>
            <button
              type="button"
              disabled={!paso2Valido}
              className={`flex-1 py-2 rounded-full font-semibold text-lg shadow-md transition-all ${
                paso2Valido
                  ? "bg-gradient-to-r from-cyan-400 to-[#00205B] text-white hover:from-cyan-300 hover:to-cyan-500"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                clearAllStates();
                setPropietarioStep(3);
              }}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
      {propietarioStep === 3 && (
        <>
          {/* Correo y Clave */}
          <div className="relative w-full flex flex-col justify-end mb-2">
            <label
              htmlFor="propietario-email"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="propietario-email"
              value={propietarioData.email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
            />
            {emailTouched && emailError && (
              <span className="text-red-400 text-xs mt-1">{emailError}</span>
            )}
          </div>
          <div className="relative w-full flex flex-col justify-end mb-2">
            <label
              htmlFor="propietario-clave"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="propietario-clave"
              value={propietarioData.clave}
              onChange={handleClaveChange}
              onBlur={handleClaveBlur}
              className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
            />
            {claveTouched && claveError && (
              <span className="text-red-400 text-xs mt-1">{claveError}</span>
            )}
          </div>
          <div className="flex gap-2 w-full mt-2">
            <button
              type="button"
              className="flex-1 py-2 rounded-full bg-gray-700 text-white font-semibold text-lg shadow-md hover:bg-gray-600 transition-all"
              onClick={() => {
                clearAllStates();
                setPropietarioStep(2);
              }}
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={!paso3Valido || loading}
              className={`flex-1 py-2 rounded-full font-semibold text-lg shadow-md transition-all ${
                paso3Valido
                  ? "bg-gradient-to-r from-cyan-400 to-[#00205B] text-white hover:from-cyan-300 hover:to-cyan-500"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? "Cargando..." : "Registrarse"}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterPropietarioForm;
