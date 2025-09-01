import React, { useState, useEffect } from "react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading }) => {
  const [email, setEmail] = useState(
    () => localStorage.getItem("inncome_remember_email") || ""
  );
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [remember, setRemember] = useState(
    () => !!localStorage.getItem("inncome_remember_email")
  );

  // Al montar, si el email viene autocompletado, validar y setear touched
  useEffect(() => {
    if (email) {
      setEmailTouched(true);
      if (email.includes("@") && !/^\S+@\S+\.\S+$/.test(email)) {
        setEmailError("El email no es válido.");
      } else if (!email.trim()) {
        setEmailError("El email o usuario es obligatorio.");
      } else {
        setEmailError(null);
      }
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailTouched(false);
    setEmailError(null);
  };
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailTouched(true);
    const value = e.target.value;
    if (value.includes("@") && !/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError("El email no es válido.");
    } else if (!value.trim()) {
      setEmailError("El email o usuario es obligatorio.");
    } else {
      setEmailError(null);
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordTouched(false);
    setPasswordError(null);
  };
  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordTouched(true);
    if (!e.target.value.trim()) {
      setPasswordError("La contraseña es obligatoria.");
    } else {
      setPasswordError(null);
    }
  };

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    !emailError &&
    !passwordError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    let hasError = false;
    if (!email.trim()) {
      setEmailError("El email o usuario es obligatorio.");
      hasError = true;
    } else if (email.includes("@") && !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("El email no es válido.");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("La contraseña es obligatoria.");
      hasError = true;
    }
    if (hasError) return;
    if (remember) {
      localStorage.setItem("inncome_remember_email", email);
    } else {
      localStorage.removeItem("inncome_remember_email");
    }
    await onLogin(email, password);
  };

  return (
    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <input
          type="text"
          name="login_email"
          placeholder="Email"
          className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-cyan-400 placeholder-gray-400 transition-all"
          autoComplete="username"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        {emailTouched && emailError && (
          <span className="text-red-400 text-xs mt-1">{emailError}</span>
        )}
      </div>
      <div className="flex flex-col">
        <input
          type="password"
          name="login_password"
          placeholder="Contraseña"
          className="w-full bg-transparent border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-cyan-400 placeholder-gray-400 transition-all"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />
        {passwordTouched && passwordError && (
          <span className="text-red-400 text-xs mt-1">{passwordError}</span>
        )}
      </div>
      <label className="flex items-center gap-2 text-gray-300 text-sm mt-1 cursor-pointer select-none">
        <input
          type="checkbox"
          className="accent-cyan-400 rounded shadow focus:ring-2 focus:ring-cyan-400 transition-all"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <span className="font-medium text-white">Recordar usuario</span>
      </label>
      <button
        type="submit"
        disabled={loading || !isFormValid}
        className={`w-full mt-2 py-2 rounded-full font-semibold text-lg shadow-md transition-all bg-gradient-to-r from-cyan-400 to-[#00205B] text-white hover:from-cyan-300 hover:to-cyan-500 ${
          loading || !isFormValid ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Cargando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginForm;
