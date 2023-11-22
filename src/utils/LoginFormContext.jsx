import { createContext, useState, useContext } from 'react';

export const LoginFormContext = createContext();

export function useLoginForm() {
  return useContext(LoginFormContext);
}

export function LoginFormProvider({ children }) {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };


   const setRegisterMode = () => {
    setIsRegisterMode(true);
  };

  const setLoginMode = () => {
    setIsRegisterMode(false);
    setIsLoginFormOpen(true);
  };

  return (
    <LoginFormContext.Provider value={{
      isLoginFormOpen,
      openLoginForm,
      closeLoginForm,
      isRegisterMode,
      setRegisterMode,
      setLoginMode,
    }}>
      {children}
    </LoginFormContext.Provider>
  );
}