import React, { useState, useEffect } from "react";

interface RegisterExternoFormProps {
  onRegister: () => Promise<void>;
  loading: boolean;
  externoData: any;
  setExternoData: (v: any) => void;
  externoStep: number;
  setExternoStep: (v: number) => void;
  isExternoStep2Valid: () => boolean;
  onBackToTypeSelect: () => void;
}

const RegisterExternoForm: React.FC<RegisterExternoFormProps> = ({
  onRegister,
  loading,
  externoData,
  setExternoData,
  externoStep,
  setExternoStep,
  isExternoStep2Valid,
  onBackToTypeSelect,
}) => {
  // Estados de error
  const [dniError, setDniError] = useState<string | null>(null);
  const [nombreError, setNombreError] = useState<string | null>(null);
  const [apellidoError, setApellidoError] = useState<string | null>(null);
  const [telefonoError, setTelefonoError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [claveError, setClaveError] = useState<string | null>(null);
  const [nombreTouched, setNombreTouched] = useState(false);
  const [apellidoTouched, setApellidoTouched] = useState(false);
  const [razonTouched, setRazonTouched] = useState(false);
  const [telefonoTouched, setTelefonoTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [claveTouched, setClaveTouched] = useState(false);
  const [isEmpresa, setIsEmpresa] = useState(false);
  const [autocompletando, setAutocompletando] = useState(false);
  const [readonlyNombre, setReadonlyNombre] = useState(false);
  const [readonlyApellido, setReadonlyApellido] = useState(false);
  const [readonlyRazon, setReadonlyRazon] = useState(false);

  // Función para limpiar errores
  const clearErrors = () => {
    setDniError(null);
    setNombreError(null);
    setApellidoError(null);
    setTelefonoError(null);
    setEmailError(null);
    setClaveError(null);
  };

  // Función para limpiar errores y touched
  const clearAllStates = () => {
    setDniError(null);
    setNombreError(null);
    setApellidoError(null);
    setTelefonoError(null);
    setEmailError(null);
    setClaveError(null);
    setNombreTouched(false);
    setApellidoTouched(false);
    setRazonTouched(false);
    setTelefonoTouched(false);
    setEmailTouched(false);
    setClaveTouched(false);
  };

  // Funciones puras de validación robustas
  const isNombreValido = (nombre: string) =>
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre.trim()) &&
    /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nombre);
  const isApellidoValido = (apellido: string) =>
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(apellido.trim()) &&
    /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(apellido);

  // Validaciones
  // Elimino la función handleDniBlur si existe (ya no se usa)
  // Autocompletado automático
  const handleDniChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDniError(
      !/^[0-9]*$/.test(value)
        ? "El documento solo debe contener números, sin puntos."
        : !isEmpresa && value.length > 0 && value.length < 8
        ? "El DNI debe tener al menos 8 dígitos."
        : null
    );
    setExternoData((prev: any) => ({
      ...prev,
      numDoc: value,
      nombre: "",
      apellido: "",
      razonSocial: "",
    }));
    setReadonlyNombre(false);
    setReadonlyApellido(false);
    setReadonlyRazon(false);
    // Autocompletado automático
    if (isEmpresa && value.length === 11) {
      setAutocompletando(true);
      try {
        const res = await fetch(
          `https://app.inncome.net/proxycuit.php?nroDoc=${value}`
        );
        const data = await res.json();
        if (data && data.valor && data.valor.length > 0) {
          const razon = data.valor[0].denominacion || "";
          setExternoData((prev: any) => ({ ...prev, razonSocial: razon }));
          setReadonlyRazon(true);
          // Forzar validación y touched si autocompleta
          if (razon) {
            setRazonTouched(true);
          }
        }
      } catch {}
      setAutocompletando(false);
    } else if (!isEmpresa && (value.length === 8 || value.length === 11)) {
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
          setExternoData((prev: any) => ({ ...prev, apellido, nombre }));
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
      } catch {}
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
    setExternoData((prev: any) => ({ ...prev, nombre: value }));
  };
  const handleNombreBlur = () => {
    setNombreTouched(true);
  };
  const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(value)) {
      setApellidoError("El apellido solo debe contener letras.");
    } else {
      setApellidoError(null);
    }
    setExternoData((prev: any) => ({ ...prev, apellido: value }));
  };
  const handleApellidoBlur = () => {
    setApellidoTouched(true);
  };
  // Para razón social
  const handleRazonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRazonTouched(false);
    setExternoData((prev: any) => ({ ...prev, razonSocial: e.target.value }));
  };
  const handleRazonBlur = () => {
    setRazonTouched(true);
  };
  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Eliminar espacios y caracteres invisibles
    const value = e.target.value.replace(/\s+/g, "");
    setExternoData((prev: any) => ({ ...prev, telefono: value }));
    // No validar en tiempo real
    setTelefonoError(null);
  };
  const handleTelefonoBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTelefonoTouched(true);
    const value = e.target.value.replace(/\s+/g, "");
    if (!/^[0-9]*$/.test(value)) {
      setTelefonoError("El teléfono solo debe contener números.");
    } else if (value.length > 0 && value.length < 10) {
      setTelefonoError("El teléfono debe tener al menos 10 dígitos.");
    } else {
      setTelefonoError(null);
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailTouched(false);
    setEmailError(null);
    setExternoData((prev: any) => ({ ...prev, email: value }));
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
    setExternoData((prev: any) => ({ ...prev, clave: value }));
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
  // Elimina la dependencia de isExternoStep1Valid del padre
  // Usa solo la validación local:
  const paso1Valido = isEmpresa
    ? externoData.numDoc.trim() !== "" &&
      externoData.razonSocial.trim() !== "" &&
      externoData.telefono.trim() !== "" &&
      !dniError &&
      !telefonoError
    : externoData.numDoc.trim() !== "" &&
      externoData.nombre.trim() !== "" &&
      externoData.apellido.trim() !== "" &&
      externoData.telefono.trim() !== "" &&
      isNombreValido(externoData.nombre) &&
      isApellidoValido(externoData.apellido) &&
      !dniError &&
      !telefonoError;
  const paso2Valido = isExternoStep2Valid() && !emailError && !claveError;

  // Validar nombre y apellido automáticamente cuando cambian
  useEffect(() => {
    if (externoData.nombre !== undefined) {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(externoData.nombre)) {
        setNombreError("El nombre solo debe contener letras.");
      } else {
        setNombreError(null);
      }
    }
    if (externoData.apellido !== undefined) {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(externoData.apellido)) {
        setApellidoError("El apellido solo debe contener letras.");
      } else {
        setApellidoError(null);
      }
    }
  }, [externoData.nombre, externoData.apellido]);

  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (externoStep === 2) onRegister();
      }}
    >
      {externoStep === 1 && (
        <>
          {/* Tipo de documento / Empresa o Persona */}
          <div className="relative w-full flex flex-col justify-end mb-2">
            <label
              htmlFor="externo-tipo-doc"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              Tipo de registro
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                id="externo-tipo-doc"
                value={isEmpresa ? "Empresa" : "Persona"}
                readOnly
                tabIndex={-1}
                className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all cursor-not-allowed select-none pr-28"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 text-xs rounded-full font-semibold shadow-sm bg-gradient-to-r from-cyan-400 to-[#00205B] text-white hover:from-cyan-300 hover:to-cyan-500 border-none transition-all focus:outline-none"
                onClick={() => {
                  clearAllStates();
                  setExternoData({
                    numDoc: "",
                    nombre: "",
                    apellido: "",
                    razonSocial: "",
                    telefono: "",
                    email: "",
                    clave: "",
                  });
                  setIsEmpresa((v) => !v);
                }}
                disabled={autocompletando}
              >
                {isEmpresa ? "Persona" : "Empresa"}
              </button>
            </div>
          </div>
          {/* Número de Documento */}
          <div className="relative w-full flex flex-col justify-end mb-2">
            <label
              htmlFor="externo-num-doc"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              {isEmpresa ? "CUIT Empresa" : "DNI"}
            </label>
            <input
              type="text"
              id="externo-num-doc"
              inputMode={!isEmpresa ? "numeric" : undefined}
              pattern={!isEmpresa ? "[0-9]*" : undefined}
              value={externoData.numDoc}
              onChange={handleDniChange}
              className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
              disabled={autocompletando}
            />
            {autocompletando && (
              <span className="text-cyan-400 text-xs mt-1">
                Consultando AFIP...
              </span>
            )}
            {dniError && (
              <span className="text-red-400 text-xs mt-1">{dniError}</span>
            )}
          </div>
          {/* Razón Social o Nombre/Apellido */}
          {isEmpresa ? (
            <div className="relative w-full flex flex-col justify-end mb-2">
              <label
                htmlFor="externo-razon"
                className="text-gray-400 text-xs font-semibold mb-1 ml-0"
              >
                Razón Social
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="externo-razon"
                  value={externoData.razonSocial || ""}
                  onChange={handleRazonChange}
                  onBlur={handleRazonBlur}
                  className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
                  readOnly={readonlyRazon || autocompletando}
                  onFocus={() => {
                    if (readonlyRazon && !autocompletando)
                      setReadonlyRazon(false);
                  }}
                />
              </div>
              {razonTouched &&
                isEmpresa &&
                externoData.razonSocial.trim() === "" && (
                  <span className="text-red-400 text-xs mt-1">
                    La razón social es obligatoria.
                  </span>
                )}
            </div>
          ) : (
            <div className="flex gap-3 mb-2">
              <div className="relative w-1/2 flex flex-col justify-end">
                <label
                  htmlFor="externo-nombre"
                  className="text-gray-400 text-xs font-semibold mb-1 ml-0"
                >
                  Nombre
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="externo-nombre"
                    value={externoData.nombre}
                    onChange={handleNombreChange}
                    onBlur={handleNombreBlur}
                    className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
                    readOnly={readonlyNombre || autocompletando}
                    onFocus={() => {
                      if (readonlyNombre && !autocompletando)
                        setReadonlyNombre(false);
                    }}
                  />
                </div>
                {nombreTouched && nombreError && (
                  <span className="text-red-400 text-xs mt-1">
                    {nombreError}
                  </span>
                )}
              </div>
              <div className="relative w-1/2 flex flex-col justify-end">
                <label
                  htmlFor="externo-apellido"
                  className="text-gray-400 text-xs font-semibold mb-1 ml-0"
                >
                  Apellido
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="externo-apellido"
                    value={externoData.apellido}
                    onChange={handleApellidoChange}
                    onBlur={handleApellidoBlur}
                    className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
                    readOnly={readonlyApellido || autocompletando}
                    onFocus={() => {
                      if (readonlyApellido && !autocompletando)
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
          )}
          {/* Teléfono */}
          <div className="relative w-full flex flex-col justify-end mb-2">
            <label
              htmlFor="externo-telefono"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="externo-telefono"
              inputMode="numeric"
              pattern="[0-9]*"
              value={externoData.telefono}
              onChange={handleTelefonoChange}
              onBlur={handleTelefonoBlur}
              className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 h-10 focus:outline-none focus:border-cyan-400 transition-all"
              disabled={autocompletando}
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
                clearErrors();
                onBackToTypeSelect();
              }}
              disabled={autocompletando}
            >
              Volver
            </button>
            <button
              type="button"
              disabled={!paso1Valido || autocompletando}
              className={`flex-1 py-2 rounded-full font-semibold text-lg shadow-md transition-all ${
                paso1Valido && !autocompletando
                  ? "bg-gradient-to-r from-cyan-400 to-[#00205B] text-white hover:from-cyan-300 hover:to-cyan-500"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                setTelefonoTouched(true);
                // Validar teléfono antes de avanzar
                const value = externoData.telefono.replace(/\s+/g, "");
                let error = null;
                if (!/^[0-9]*$/.test(value)) {
                  error = "El teléfono solo debe contener números.";
                } else if (value.length > 0 && value.length < 10) {
                  error = "El teléfono debe tener al menos 10 dígitos.";
                }
                setTelefonoError(error);
                if (error) return;
                // Validar otros campos según tipo
                if (isEmpresa) {
                  if (
                    !externoData.numDoc.trim() ||
                    !externoData.razonSocial.trim()
                  )
                    return;
                } else {
                  if (
                    !externoData.numDoc.trim() ||
                    !externoData.nombre.trim() ||
                    !externoData.apellido.trim()
                  )
                    return;
                }
                clearErrors();
                setExternoStep(2);
              }}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
      {externoStep === 2 && (
        <>
          {/* Correo y Clave */}
          <div className="relative w-full flex flex-col justify-end mb-2">
            <label
              htmlFor="externo-email"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              Correo
            </label>
            <input
              type="email"
              id="externo-email"
              value={externoData.email}
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
              htmlFor="externo-clave"
              className="text-gray-400 text-xs font-semibold mb-1 ml-0"
            >
              Clave
            </label>
            <input
              type="password"
              id="externo-clave"
              value={externoData.clave}
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
                clearErrors();
                setExternoStep(1);
              }}
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={!paso2Valido || loading}
              className={`flex-1 py-2 rounded-full font-semibold text-lg shadow-md transition-all ${
                paso2Valido
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

export default RegisterExternoForm;
