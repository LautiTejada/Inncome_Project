import React, { useState, useRef, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterPropietarioForm from "./RegisterPropietarioForm";
import RegisterExternoForm from "./RegisterExternoForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [registerType, setRegisterType] = useState<
    null | "propietario" | "externo"
  >(null);
  const [externoStep, setExternoStep] = useState(1);
  const [isForeignDoc, setIsForeignDoc] = useState(false);
  const [propietarioStep, setPropietarioStep] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Estados para formulario propietario
  const [propietarioData, setPropietarioData] = useState({
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

  // Estados para formulario externo
  const [externoData, setExternoData] = useState({
    numDoc: "",
    nombre: "",
    apellido: "",
    razonSocial: "",
    telefono: "",
    email: "",
    clave: "",
  });

  // Estados para feedback y loading
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Funciones de validación
  const isPropietarioStep1Valid = () => {
    return (
      propietarioData.numDoc.trim() !== "" &&
      propietarioData.nombre.trim() !== "" &&
      propietarioData.apellido.trim() !== ""
    );
  };

  const isPropietarioStep2Valid = () => {
    return (
      propietarioData.manzana.trim() !== "" &&
      propietarioData.lote.trim() !== "" &&
      propietarioData.telefono.trim() !== ""
    );
  };

  const isPropietarioStep3Valid = () => {
    return (
      propietarioData.email.trim() !== "" && propietarioData.clave.trim() !== ""
    );
  };

  const isExternoStep2Valid = () => {
    return externoData.email.trim() !== "" && externoData.clave.trim() !== "";
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const formData = new FormData();
      formData.append("correo", email);
      formData.append("clave", password);

      const res = await fetch("https://app.inncome.net/loginApi.php", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        // Redirigimos manualmente desde el frontend
        window.location.href = "https://app.inncome.net/home.php";
      } else {
        const error = data.message?.toLowerCase() || "";
        if (error.includes("correo") && error.includes("registrado")) {
          setErrorMsg("El email ya está registrado. ¿Querés iniciar sesión?");
        } else if (
          error.includes("contraseña incorrecta") ||
          error.includes("contrasena incorrecta")
        ) {
          setErrorMsg("Contraseña incorrecta");
        } else if (error.includes("cuenta debe ser activada")) {
          setErrorMsg("Tu cuenta debe ser activada por el administrador");
        } else {
          setErrorMsg(data.message || "Error desconocido. Intenta de nuevo.");
        }
      }
    } catch (e) {
      console.error("Error en la solicitud de login:", e);
      setErrorMsg("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // REGISTRO PROPIETARIO
  const handleRegisterPropietario = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const formData = new FormData();
      formData.append("nombre", propietarioData.nombre);
      formData.append("apellido", propietarioData.apellido);
      formData.append("correo", propietarioData.email);
      formData.append("clave", propietarioData.clave);
      formData.append(
        "tipo_documento",
        isForeignDoc ? "Pasaporte" : "Documento Nacional Identidad"
      );
      formData.append("documento", propietarioData.numDoc);
      formData.append("manzana", propietarioData.manzana);
      formData.append("lote", propietarioData.lote);
      formData.append("telefono", propietarioData.telefono);
      // Buscar el id_establecimiento por nombre (mock, deberías mapearlo real)
      // Por ahora, mandamos el nombre como si fuera el id
      formData.append("id_establecimiento", propietarioData.establecimiento);
      try {
        const res = await fetch("https://app.inncome.net/registerApi.php", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        let data;
        try {
          data = await res.json(); // intenta parsear JSON
        } catch (jsonErr) {
          console.error("Respuesta no es JSON válida:", jsonErr);
          setErrorMsg("Error inesperado. Respuesta inválida del servidor.");
          return;
        }

        if (res.status === 201) {
          setSuccessMsg("Registro exitoso. Redirigiendo al home...");
          setTimeout(() => {
            window.location.href = "https://app.inncome.net/home.php";
          }, 3000);
          return;
        } else if (res.status === 409) {
          setErrorMsg("El email ya está registrado. ¿Querés iniciar sesión?");
        } else if (res.status === 422) {
          setErrorMsg(data.message || "Faltan datos obligatorios.");
        } else if (res.status === 500) {
          setErrorMsg("Error interno del servidor. Intenta de nuevo.");
        } else {
          setErrorMsg(data.message || "Error desconocido.");
        }
      } catch (e) {
        console.error("Error en la solicitud de registro propietario:", e);
        setErrorMsg("Error de conexión. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    } catch (e) {
      console.error("Error en la solicitud de registro propietario:", e);
      setErrorMsg("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // REGISTRO EXTERNO
  const handleRegisterExterno = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    // Simulación de éxito:
    setTimeout(() => {
      setSuccessMsg("Registro exitoso. Redirigiendo al home...");
      setTimeout(() => {
        window.location.href = "https://www.google.com";
      }, 3000);
      setLoading(false);
    }, 1000);
    return;
    try {
      const formData = new FormData();
      formData.append("correo", externoData.email);
      formData.append("clave", externoData.clave);
      formData.append("nombre", externoData.nombre);
      formData.append("apellido", externoData.apellido);
      formData.append(
        "tipo_documento",
        isForeignDoc ? "Pasaporte" : "Documento Nacional Identidad"
      );
      formData.append("documento", externoData.numDoc);
      formData.append("telefono", externoData.telefono);

      try {
        const res = await fetch(
          "https://app.inncome.net/registerNoPropApi.php",
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.status === 201) {
          setSuccessMsg("Registro exitoso. Redirigiendo al home...");
          setTimeout(() => {
            window.location.href = "https://app.inncome.net/home.php";
          }, 3000);
          return;
        } else if (res.status === 409) {
          // Email duplicado

          setErrorMsg("El email ya está registrado. ¿Querés iniciar sesión?");
        } else if (res.status === 422) {
          // Datos incompletos (si en un futuro agregás esa validación)
          setErrorMsg(data.message || "Faltan datos obligatorios.");
        } else if (res.status === 500) {
          // Error interno del servidor
          setErrorMsg("Ocurrió un error interno. Intenta de nuevo.");
        } else {
          // Otro error desconocido
          setErrorMsg(data.message || "Error desconocido. Intenta de nuevo.");
        }
      } catch (e) {
        console.error("Error en la solicitud de registro externo:", e);
        setErrorMsg("Error de conexión. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    } catch (e) {
      console.error("Error en la solicitud de registro externo:", e);
      setErrorMsg("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Determina si hay datos escritos en cualquier formulario
  const hasUnsavedData = () => {
    if (isSignUp) {
      if (registerType === "propietario") {
        return Object.values(propietarioData).some((v) => v && v !== "");
      } else if (registerType === "externo") {
        return Object.values(externoData).some((v) => v && v !== "");
      }
    } else {
      // **Recomendación:** Si `LoginForm` es un componente controlado por React,
      // no necesitarías `document.querySelector` aquí.
      // Si los inputs del login no están controlados por el estado de AuthModal,
      // la lógica actual es la única forma de acceder a sus valores.
      const emailInput = document.querySelector(
        'input[name="login_email"]'
      ) as HTMLInputElement;
      const passInput = document.querySelector(
        'input[name="login_password"]'
      ) as HTMLInputElement;
      return (
        (emailInput && emailInput.value !== "") ||
        (passInput && passInput.value !== "")
      );
    }
    return false;
  };

  // Confirmación antes de cerrar
  const confirmAndClose = async () => {
    if (hasUnsavedData()) {
      const result = await Swal.fire({
        title: "¿Seguro que quieres salir?",
        text: "Se perderán los datos ingresados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Salir",
        cancelButtonText: "Cancelar",
        background: "#161617",
        color: "#fff",
        iconColor: "#00FFD1",
        customClass: {
          popup: "rounded-2xl",
          confirmButton:
            "bg-gradient-to-r from-cyan-400 to-[#00205B] text-white font-semibold rounded-full py-2 px-6 shadow-md hover:from-cyan-300 hover:to-cyan-500 transition-all border-0 mx-2",
          cancelButton:
            "bg-gray-700 text-white font-semibold rounded-full py-2 px-6 shadow-md hover:bg-gray-600 transition-all border-0 mx-2",
        },
        buttonsStyling: false,
      });
      if (!result.isConfirmed) {
        return;
      }
    }
    resetModal();
    onClose();
  };

  // Cerrar modal al presionar Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        confirmAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isSignUp, registerType, propietarioData, externoData]);

  // Log para detectar cambios en el prop 'open'
  useEffect(() => {
    console.log("[AuthModal] Prop 'open' cambió:", open);
  }, [open]);

  // Resetear modal cuando se abre
  useEffect(() => {
    if (open) {
      resetModal();
    }
  }, [open]);

  // Cerrar al click fuera del modal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      confirmAndClose();
    }
  };

  // Función para resetear el modal al estado inicial
  const resetModal = () => {
    setIsSignUp(false);
    setRegisterType(null);
    setExternoStep(1);
    setPropietarioStep(1);
    setIsForeignDoc(false);
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
    setExternoData({
      numDoc: "",
      nombre: "",
      apellido: "",
      razonSocial: "",
      telefono: "",
      email: "",
      clave: "",
    });
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
    >
      <div className="relative w-[350px] max-w-[95vw] rounded-2xl p-0 overflow-visible shadow-2xl animate-fadeIn">
        {/* Glow azul oscuro */}
        <div
          className="absolute -inset-4 rounded-2xl"
          style={{ background: "#00205B", opacity: 0.7, filter: "blur(24px)" }}
        />
        {/* Modal principal */}
        <div className="relative z-10 bg-black rounded-2xl px-8 py-10 flex flex-col items-center shadow-lg">
          {/* Botón cerrar */}
          <button
            onClick={confirmAndClose}
            className="absolute top-3 right-4 text-cyan-400 text-2xl font-bold hover:text-cyan-200 focus:outline-none"
            aria-label="Cerrar"
          >
            ×
          </button>
          {/* Título */}
          <h2 className="text-2xl font-bold text-white mb-8 text-center tracking-wide">
            {isSignUp
              ? registerType === null
                ? "Registro para Barrios Privados y Edificios:"
                : registerType === "propietario"
                ? "Registro: Propietario / Inquilino"
                : "Registro: Cliente Externo"
              : "Iniciar Sesión"}
          </h2>

          {/* Contenedor de contenido */}
          <div className="w-full flex flex-col gap-6">
            {/* Mensajes de error/success */}
            {errorMsg && (
              <div className="w-full bg-red-500/90 text-white text-center rounded-lg py-2 px-4 mb-2 animate-fadeIn border border-red-700 shadow">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="w-full bg-green-500/90 text-white text-center rounded-lg py-2 px-4 mb-2 animate-fadeIn border border-green-700 shadow">
                {successMsg}
              </div>
            )}

            {/* Contenido según registro o login */}
            {isSignUp ? (
              registerType === null ? (
                <>
                  <button
                    type="button"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 to-[#00205B] text-white font-semibold text-lg shadow-md hover:from-cyan-300 hover:to-cyan-500 transition-all mb-4"
                    onClick={() => {
                      setRegisterType("propietario");
                    }}
                  >
                    Soy Propietario / Inquilino
                  </button>
                  <button
                    type="button"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 to-[#00205B] text-white font-semibold text-lg shadow-md hover:from-cyan-300 hover:to-cyan-500 transition-all"
                    onClick={() => {
                      setRegisterType("externo");
                      setExternoStep(1);
                    }}
                  >
                    Soy cliente externo
                  </button>
                </>
              ) : registerType === "propietario" ? (
                <RegisterPropietarioForm
                  onRegister={handleRegisterPropietario}
                  loading={loading}
                  propietarioData={propietarioData}
                  setPropietarioData={setPropietarioData}
                  propietarioStep={propietarioStep}
                  setPropietarioStep={setPropietarioStep}
                  isPropietarioStep1Valid={isPropietarioStep1Valid}
                  isPropietarioStep2Valid={isPropietarioStep2Valid}
                  isPropietarioStep3Valid={isPropietarioStep3Valid}
                  onBackToTypeSelect={() => {
                    setRegisterType(null);
                    setPropietarioStep(1);
                    setIsForeignDoc(false);
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
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                />
              ) : registerType === "externo" ? (
                <RegisterExternoForm
                  onRegister={handleRegisterExterno}
                  loading={loading}
                  externoData={externoData}
                  setExternoData={setExternoData}
                  externoStep={externoStep}
                  setExternoStep={setExternoStep}
                  isExternoStep2Valid={isExternoStep2Valid}
                  onBackToTypeSelect={() => {
                    setRegisterType(null);
                    setExternoStep(1);
                    setIsForeignDoc(false);
                    setExternoData({
                      numDoc: "",
                      nombre: "",
                      apellido: "",
                      razonSocial: "",
                      telefono: "",
                      email: "",
                      clave: "",
                    });
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                />
              ) : null
            ) : (
              <LoginForm onLogin={handleLogin} loading={loading} />
            )}
          </div>

          {/* Cambio de modo */}
          <div className="mt-8 text-center text-gray-300 text-sm">
            {isSignUp ? (
              <>
                ¿Ya tienes una cuenta?{" "}
                <button
                  type="button"
                  className="text-cyan-400 font-semibold hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Iniciar Sesión
                </button>
              </>
            ) : (
              <>
                ¿No tienes una cuenta?{" "}
                <button
                  type="button"
                  className="text-cyan-400 font-semibold hover:underline"
                  onClick={() => {
                    setIsSignUp(true);
                    setRegisterType(null);
                    setPropietarioStep(1);
                    setExternoStep(1);
                    setIsForeignDoc(false);
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
                    setExternoData({
                      numDoc: "",
                      nombre: "",
                      apellido: "",
                      razonSocial: "",
                      telefono: "",
                      email: "",
                      clave: "",
                    });
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Estilos */}
      <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s cubic-bezier(.23,1,.32,1);
      }
      select#externo-tipo-doc option {
        color: #222 !important;
        background: #fff !important;
      }
    `}</style>
    </div>
  );
};

export default AuthModal;
