
"use client";

import { useState, useEffect, useRef } from "react";
import { FiCreditCard, FiCheck } from "react-icons/fi";
import ButtonGradient from "./ButtonGradient";

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  recomendado?: boolean;
  image?: string;
}

interface Producto {
  nombre: string;
  precio: number;
  descripcion: string;
  features: string[];
  logo: string;
  popular?: boolean;
}

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (credits: number) => void;

}

export default function CreditsModal({
  isOpen,
  onClose,
  onPurchase,
}: CreditsModalProps) {
  const [step, setStep] = useState<"credits" | "plans" | "confirmation">("credits");
  const [selectedCredits, setSelectedCredits] = useState(25);
  const [customCredits, setCustomCredits] = useState("");
  const [customCreditsError, setCustomCreditsError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [creditosDisponibles, setCreditosDisponibles] = useState(0);
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);

  const modalContentRef = useRef<HTMLDivElement>(null);

  const creditOptions = [
    { amount: 10, discount: 0 },
    { amount: 25, discount: 0, popular: true },
    { amount: 50, discount: 0 },
    { amount: 100, discount: 10 },
  ];

  // Productos hardcodeados con info rica y features
  const productosHardcodeados = [
    {
      nombre: "ESSENCIAL",
      precio: 675,
      descripcion: "Seguro esencial para trabajadores con cobertura básica.",
      features: [
        "Muerte e Invalidez: $15.000.000",
        "Asist. médico farmacia: $3.000.000",
        "Sepelio: $858.000",
        "Cobertura riesgo In-itinere",
        "<b>Cobertura prestacional</b>",
      ],
      logo: "/sancor-logo.png", // Placeholder
    },
    {
      nombre: "BASIC",
      precio: 499,
      descripcion: "Seguro básico para trabajadores con cobertura básica.",
      features: [
        "Muerte e Invalidez: $10.000.000",
        "Asist. médico farmacia: $3.000.000",
        "Sepelio: $858.000",
        "Cobertura riesgo In-itinere",
        "<b>Cobertura prestacional</b>",
      ],
      logo: "/experta-logo.png", // Placeholder
      popular: true,
    },
    {
      nombre: "OPTIMO",
      precio: 947,
      descripcion: "Seguro óptimo para trabajadores con cobertura extendida.",
      features: [
        "Muerte e Invalidez: $20.000.000",
        "Asist. médico farmacia: $4.000.000",
        "Sepelio: $858.000",
        "Cobertura riesgo In-itinere",
        "<b>Cobertura prestacional</b>",
      ],
      logo: "/experta-logo.png", // Placeholder
    },
    {
      nombre: "ELITE",
      precio: 999,
      descripcion: "Seguro premium para trabajadores con cobertura completa.",
      features: [
        "Muerte e Invalidez: $25.000.000",
        "Asist. médico farmacia: $5.000.000",
        "Sepelio: $858.000",
        "Cobertura riesgo In-itinere",
        "<b>Cobertura prestacional</b>",
      ],
      logo: "/sancor-logo.png", // Placeholder
    },
  ];

  // Cargar créditos disponibles y productos al abrir el modal
  useEffect(() => {
    if (isOpen) {
      consultarCreditos();
      cargarProductos();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Validar créditos personalizados
  useEffect(() => {
    if (customCredits) {
      const value = parseInt(customCredits);
      if (isNaN(value) || value < 1) {
        setCustomCreditsError("El mínimo es 1 crédito.");
      } else if (value > 10000) {
        setCustomCreditsError("El máximo es 10,000 créditos.");
      } else {
        setCustomCreditsError(null);
      }
    } else {
      setCustomCreditsError(null);
    }
  }, [customCredits]);

  // Scroll al tope del contenido interno al cambiar de paso
  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
  }, [step]);

  // Función para consultar créditos disponibles
  const consultarCreditos = async () => {
    try {
      // Simular consulta de créditos
      setCreditosDisponibles(15); // Valor hardcodeado para demo
    } catch (error) {
      console.error("Error al consultar créditos:", error);
      setCreditosDisponibles(0);
    }
  };

  // Función para cargar productos
  const cargarProductos = async () => {
    try {
      // Simular carga de productos
      setProductos(productosHardcodeados);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setProductos(productosHardcodeados);
    }
  };

  // Función para comprar créditos con MercadoPago
  const comprarCreditosMercadoPago = async (
    tipo: string,
    cantidad: number,
    precio: number
  ) => {
    try {
      setLoading(true);
      
      // Simular proceso de compra
      console.log("Procesando compra:", { tipo, cantidad, precio });
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Llamar a onPurchase con los créditos comprados
      const creditsToAdd = customCredits ? parseInt(customCredits) : selectedCredits;
      onPurchase(creditsToAdd);

      // Simular redirección a MercadoPago
      console.log("Redirigiendo a MercadoPago...");
      
      // Mostrar mensaje de éxito
      alert("¡Compra procesada correctamente! Redirigiendo a MercadoPago...");
      
    } catch (error) {
      console.error("Error en comprarCreditosMercadoPago:", error);
      alert("Error al procesar la compra. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular el descuento basado en la cantidad de créditos
  const calcularDescuento = (credits: number): number => {
    if (credits >= 100) return 10; // 10% de descuento para 100 créditos
    return 0;
  };

  const handleNext = () => {
    if (step === "credits") {
      if (customCredits && parseInt(customCredits) > 0) {
        setSelectedCredits(parseInt(customCredits));
      }
      setStep("plans");
    } else if (step === "plans") {
      if (!selectedPlan && productos.length > 0) {
        setSelectedPlan({
          name: productos[0].nombre,
          price: productos[0].precio,
          description: productos[0].descripcion,
          features: [],
          popular: productos[0].popular,
        });
      }
      setStep("confirmation");
    } else {
      const creditsToAdd = customCredits ? parseInt(customCredits) : selectedCredits;

      if (selectedPlan) {
        const selectedProductObj = productos.find(
          (p) => p.nombre === selectedPlan.name
        );
        if (selectedProductObj) {
          let totalPrice = creditsToAdd * selectedProductObj.precio;
          const discount = calcularDescuento(creditsToAdd);
          if (discount > 0) {
            totalPrice *= 1 - discount / 100;
          }

          comprarCreditosMercadoPago(
            selectedPlan.name,
            creditsToAdd,
            totalPrice
          );
        }
      }
    }
  };

  const handleBack = () => {
    if (step === "plans") setStep("credits");
    else if (step === "confirmation") setStep("plans");
    else onClose();
  };

  const canContinue = () => {
    if (step === "credits") {
      if (customCredits) {
        return parseInt(customCredits) > 0 && !customCreditsError;
      }
      return selectedCredits > 0;
    }
    if (step === "plans") {
      return selectedPlan !== null;
    }
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-[95vw] sm:max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] shadow-2xl border-2 border-[#0047bb] overflow-hidden flex flex-col">
        {/* Header con logo */}
        <div className="p-3 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-[#0047bb]/10 to-[#0047bb]/5">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-[#0047bb] rounded-lg flex items-center justify-center">
                  <FiCreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#041e42] truncate">
                  Comprar Créditos
                </h2>
              </div>
              <p className="text-gray-600 font-medium text-sm sm:text-base">
                Tienes{" "}
                <span className="font-bold text-[#0047bb]">
                  {creditosDisponibles} créditos disponibles
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-[#0047bb] text-2xl sm:text-3xl font-bold focus:outline-none transition-colors duration-200 ml-2 flex-shrink-0"
            >
              ×
            </button>
          </div>
        </div>

        <div
          ref={modalContentRef}
          className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-200px)]"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Stepper */}
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-full">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-lg font-semibold border-2 transition-all duration-200 ${
                    step === "credits"
                      ? "bg-[#0047bb] text-white border-[#0047bb] shadow-lg"
                      : "bg-white text-[#0047bb] border-[#0047bb]"
                  }`}
                >
                  1
                </div>
                <span
                  className={`ml-1 sm:ml-2 text-xs sm:text-sm font-semibold ${
                    step === "credits" ? "text-[#0047bb]" : "text-gray-500"
                  }`}
                >
                  Cantidad
                </span>
              </div>
              <div className="w-6 sm:w-12 h-1 bg-[#0047bb]"></div>
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-lg font-semibold border-2 transition-all duration-200 ${
                    step === "plans"
                      ? "bg-[#0047bb] text-white border-[#0047bb] shadow-lg"
                      : "bg-white text-[#0047bb] border-[#0047bb]"
                  }`}
                >
                  2
                </div>
                <span
                  className={`ml-1 sm:ml-2 text-xs sm:text-sm font-semibold ${
                    step === "plans" ? "text-[#0047bb]" : "text-gray-500"
                  }`}
                >
                  Plan
                </span>
              </div>
              <div className="w-6 sm:w-12 h-1 bg-[#0047bb]"></div>
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-lg font-semibold border-2 transition-all duration-200 ${
                    step === "confirmation"
                      ? "bg-[#0047bb] text-white border-[#0047bb] shadow-lg"
                      : "bg-white text-[#0047bb] border-[#0047bb]"
                  }`}
                >
                  3
                </div>
                <span
                  className={`ml-1 sm:ml-2 text-xs sm:text-sm font-semibold ${
                    step === "confirmation" ? "text-[#0047bb]" : "text-gray-500"
                  }`}
                >
                  Confirmar
                </span>
              </div>
            </div>
          </div>

          {/* Credits Step */}
          {step === "credits" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#041e42] mb-2 sm:mb-3 flex items-center justify-center gap-2">
                  <span className="text-[#0047bb] text-xl sm:text-2xl">⚡</span>
                  ¿Cuántos créditos necesitas?
                </h3>
                <p className="text-gray-600 bg-gray-50 rounded-lg px-3 sm:px-4 py-2 mx-auto w-fit text-xs sm:text-sm">
                  Los créditos te permiten acceder a todas las funciones de la plataforma
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {creditOptions.map((option) => (
                  <div
                    key={option.amount}
                    className={`relative p-4 sm:p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      selectedCredits === option.amount && !customCredits
                        ? "border-[#0047bb] bg-gradient-to-br from-[#0047bb]/10 to-[#0047bb]/5 shadow-xl scale-105"
                        : "border-gray-200 hover:border-[#0047bb]/50 bg-white hover:shadow-lg hover:scale-102"
                    }`}
                    onClick={() => {
                      if (selectedCredits === option.amount && !customCredits) {
                        setSelectedCredits(0);
                      } else {
                        setSelectedCredits(option.amount);
                        setCustomCredits("");
                      }
                    }}
                  >
                    {option.popular && (
                      <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-[#0047bb] to-[#0047bb] text-white text-[8px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
                          ★ El más elegido
                        </span>
                      </div>
                    )}
                    {option.discount > 0 && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        -{option.discount}%
                      </div>
                    )}
                    <div className="text-center space-y-2">
                      <div className="text-2xl sm:text-3xl font-bold text-[#0047bb]">
                        {option.amount}
                      </div>
                      <div className="text-gray-600 font-semibold text-sm sm:text-base">
                        créditos
                      </div>
                      {option.discount > 0 && (
                        <div className="text-green-600 font-bold mt-2 text-sm sm:text-base">
                          ¡Ahorra {option.discount}%!
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <label className="block text-sm font-semibold text-[#041e42] mb-2">
                  ¿Necesitas una cantidad específica?
                </label>
                <input
                  type="number"
                  placeholder="Ej: 75 créditos"
                  value={customCredits}
                  onChange={(e) => setCustomCredits(e.target.value)}
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm sm:text-base ${
                    customCreditsError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 1 crédito, máximo 10,000 créditos
                </p>
                {customCreditsError && (
                  <div className="text-xs text-red-600 mt-1">
                    {customCreditsError}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Plans Step */}
          {step === "plans" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#041e42] mb-2 sm:mb-3 flex items-center justify-center gap-2">
                  <span className="text-[#0047bb] text-xl sm:text-2xl">👤</span>
                  Elige tu plan ideal
                </h3>
                <p className="text-gray-600 font-medium text-xs sm:text-sm">
                  ({customCredits || selectedCredits} créditos seleccionados)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {productosHardcodeados.map((producto) => (
                  <div
                    key={producto.nombre}
                    className={`relative flex flex-col h-full border-2 rounded-2xl cursor-pointer transition-all duration-200 shadow-md bg-white p-5 sm:p-6 group hover:shadow-xl hover:border-[#0047bb]/60
                      ${
                        selectedPlan?.name === producto.nombre
                          ? "border-[#0047bb] bg-[#0047bb]/10 scale-105"
                          : "border-gray-200"
                      }
                    `}
                    onClick={() =>
                      selectedPlan?.name === producto.nombre
                        ? setSelectedPlan(null)
                        : setSelectedPlan({
                            name: producto.nombre,
                            price: producto.precio,
                            description: producto.descripcion,
                            features: producto.features,
                            popular: producto.popular,
                          })
                    }
                  >
                    {/* Cartel arriba de la imagen */}
                    <div className="flex justify-center mb-4 relative">
                      {producto.popular && (
                        <span className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#0047bb] to-[#0047bb] text-white text-[8px] sm:text-[10px] md:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full shadow border border-white whitespace-nowrap z-10">
                          ★ El más elegido
                        </span>
                      )}
                      <div className="bg-white rounded-xl shadow h-16 w-20 sm:h-20 sm:w-24 flex items-center justify-center p-2 border border-gray-100 relative">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0047bb] rounded-lg flex items-center justify-center">
                          <FiCreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="text-center space-y-2 sm:space-y-3 mb-2">
                        <h4 className="font-bold text-lg sm:text-xl text-[#041e42] mb-1">
                          {producto.nombre}
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2 mb-2">
                          {producto.descripcion}
                        </p>
                        <ul className="text-left space-y-1 px-2">
                          {producto.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-[#041e42]"
                            >
                              <span className="text-green-500 mt-0.5 flex-shrink-0">
                                <FiCheck className="w-3 h-3" />
                              </span>
                              {feature.includes("<b>") ? (
                                <span
                                  dangerouslySetInnerHTML={{ __html: feature }}
                                />
                              ) : (
                                <span>{feature}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#0047bb] mb-1">
                          ${producto.precio}
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">
                          por día
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirmation Step */}
          {step === "confirmation" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#041e42] mb-2 sm:mb-3 flex items-center justify-center gap-2">
                  <span className="text-green-500 text-xl sm:text-2xl">✔️</span>
                  ¡Casi listo! Confirma tu compra
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#0047bb]/10 border border-[#0047bb]/20 rounded-xl p-3 sm:p-4">
                  <h4 className="font-bold text-sm sm:text-base text-[#041e42] mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="text-[#0047bb] text-base sm:text-lg">💲</span>
                    Detalles de tu pedido
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Plan:</span>
                      <span className="font-semibold text-[#041e42] text-xs sm:text-sm">
                        {selectedPlan?.name || "ÓPTIMO"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Créditos:</span>
                      <span className="text-[#0047bb] font-bold text-sm sm:text-base">
                        {customCredits || selectedCredits}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Precio unitario:</span>
                      <span className="font-semibold text-[#041e42] text-xs sm:text-sm">
                        ${selectedPlan?.price || 947}.00
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0047bb]/10 border border-[#0047bb]/20 rounded-xl p-3 sm:p-4">
                  <h4 className="font-bold text-sm sm:text-base text-[#041e42] mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="text-[#0047bb] text-base sm:text-lg">📅</span>
                    Resumen de pago
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Subtotal:</span>
                      <span className="text-xs sm:text-sm">
                        ${((selectedPlan?.price || 947) * (customCredits ? parseInt(customCredits) : selectedCredits)).toFixed(2)}
                      </span>
                    </div>
                    {(() => {
                      const credits = customCredits ? parseInt(customCredits) : selectedCredits;
                      const discount = calcularDescuento(credits);
                      const subtotal = (selectedPlan?.price || 947) * credits;
                      const discountAmount = subtotal * (discount / 100);

                      return discount > 0 ? (
                        <div className="flex justify-between items-center text-green-600">
                          <span className="text-xs sm:text-sm">Descuento ({discount}%):</span>
                          <span className="text-xs sm:text-sm">-${discountAmount.toFixed(2)}</span>
                        </div>
                      ) : null;
                    })()}
                    <hr className="border-gray-300" />
                    <div className="flex justify-between items-center text-sm sm:text-base font-bold">
                      <span>Total a pagar:</span>
                      <span className="text-green-600 text-base sm:text-lg">
                        ${(() => {
                          const credits = customCredits ? parseInt(customCredits) : selectedCredits;
                          const discount = calcularDescuento(credits);
                          const subtotal = (selectedPlan?.price || 947) * credits;
                          const total = subtotal * (1 - discount / 100);
                          return total.toFixed(2);
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-200">
            <ButtonGradient
              onClick={handleBack}
              disabled={loading}
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white"
            >
              {step === "credits" ? "Cancelar" : "← Volver"}
            </ButtonGradient>

            <ButtonGradient
              onClick={handleNext}
              disabled={!canContinue() || loading}
              className={
                canContinue() && !loading
                  ? "w-full sm:w-auto"
                  : "w-full sm:w-auto bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            >
              {loading
                ? "Procesando..."
                : step === "confirmation"
                ? "💳 Confirmar compra"
                : "Continuar →"}
            </ButtonGradient>
          </div>
        </div>
      </div>
    </div>
  );
} 