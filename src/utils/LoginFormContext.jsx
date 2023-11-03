import { createContext, useState, useContext } from 'react';

export const LoginFormContext = createContext();

export function useLoginForm() {
  return useContext(LoginFormContext);
}

export function LoginFormProvider({ children }) {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  return (
    <LoginFormContext.Provider value={{ isLoginFormOpen, openLoginForm, closeLoginForm }}>
      {children}
    </LoginFormContext.Provider>
  );
}