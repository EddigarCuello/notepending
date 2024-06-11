// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const UserContext = createContext();

// Proveedor de contexto
export const UserProvider = ({ children }) => {
  // Estado para almacenar los datos del usuario
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: ''
  });

  return (
    // Proporcionar el contexto con el estado del usuario
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
};
