// ProjectContext.js
import React, { createContext, useState, useContext } from 'react';
import Proyecto from '../Entidades/Proyecto';

// Crear el contexto
const ProjectContext = createContext();

// Proveedor de contexto
export const ProjectProvider = ({ children }) => {
  // Estado para almacenar los datos del proyecto
  const [project, setProject] = useState(new Proyecto());

  return (
    // Proporcionar el contexto con el estado del proyecto
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject debe ser utilizado dentro de un ProjectProvider');
  }
  return context;
};
