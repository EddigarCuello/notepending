
import {createProyecto,updateProyecto,deleteProject,findProjectBy,createMiembrosTable,deleteMiembro,findMiembrosBy } from "../Datos/ProyectoData.js";
import { findUserBy } from "../Datos/PersonaData.js";

export const CreateProject = async (Proyecto) => {//Tarea es un clase  y tien tarea.id
  try {
    //que guarde la imagen 
    const ProjectCreate = await createProyecto(Proyecto);
    console.log('proyecto Almacenado:', ProjectCreate);

  } catch (error) {
    const errorMessage = error.message || 'Error durante la creacion'; 
    console.error('Error en la creacion:', errorMessage);
  }
};

export const CreateMiembros = async (Miembro) => {//Tarea es un clase  y tien tarea.id
  try {
    //que guarde la imagen 
    const MiembroCreate = await createMiembrosTable(Miembro);
    console.log('Miembro Almacenado:', MiembroCreate);

  } catch (error) {
    const errorMessage = error.message || 'Error durante la creacion'; 
    console.error('Error en la creacion:', errorMessage);
  }
};



export const UpdateProject = async (projectid,Proyecto) => {
    try {
      const ProjectUpdate = await updateProyecto(projectid,Proyecto);
      console.log('Proyecto Actualizad0:', ProjectUpdate);
  
    } catch (error) {
      const errorMessage = error.message || 'Error durante la actualizacion'; 
      console.error('Error en la actualizacion:', errorMessage);
    }
  };
  
  export const DeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      console.log('Proyecto eliminado correctamente');
    } catch (error) {
      const errorMessage = error.message || 'Error durante la eliminación del proyecto'; 
      console.error('Error en la eliminación del proyecto:', errorMessage);
      throw error;
    }
  };

  export const DeleteMiembro = async (cedula) => {
    try {
      await deleteMiembro(cedula);
      console.log('miembro eliminado correctamente');
    } catch (error) {
      const errorMessage = error.message || 'Error durante la eliminación del proyecto'; 
      console.error('Error en la eliminación del proyecto:', errorMessage);
      throw error;
    }
  };

  
  export const GetProjectByField = async (campo, valor) => {
    try {
      const projects = await findProjectBy(campo, valor);
      if (projects) {
        console.log(`Proyectos obtenidos correctamente para el campo ${campo} con valor ${valor}:`, projects);
        return projects;
      } else {
        console.log(`No se encontraron proyectos para el campo ${campo} con valor ${valor}`);
        return null;
      }
    } catch (error) {
      const errorMessage = error.message || `Error durante la obtención de los proyectos para el campo ${campo}`;
      console.error(`Error en la obtención de los proyectos para el campo ${campo}:`, errorMessage);
      throw error;
    }
  };

  export const GetMiembroByField = async (campo, valor) => {
    try {
      const projects = await findMiembrosBy(campo, valor);
      if (projects) {
        console.log(`Miemmbros obtenidos correctamente para el campo ${campo} con valor ${valor}:`, projects);
        return projects;
      } else {
        console.log(`No se encontraron miemmbros para el campo ${campo} con valor ${valor}`);
        return null;
      }
    } catch (error) {
      const errorMessage = error.message || `Error durante la obtención de los miemmbros para el campo ${campo}`;
      console.error(`Error en la obtención de los miemmbros para el campo ${campo}:`, errorMessage);
      throw error;
    }
  };

  export const GetMiembrosByField = async (campo, valor) => {
    try {
      const miembros = await findMiembrosBy(campo, valor);
      if (miembros && miembros.length > 0) {
        const miembrosConDatos = await Promise.all(miembros.map(async (miembro) => {
          const datosPersona = await findUserBy('cedula', miembro.cedula);
          return {
            ...miembro,
            ...datosPersona
          };
        }));
        console.log(`Miembros obtenidos correctamente para el campo ${campo} con valor ${valor}:`, miembrosConDatos);
        return miembrosConDatos;
      } else {
        console.log(`No se encontraron miembros para el campo ${campo} con valor ${valor}`);
        return null;
      }
    } catch (error) {
      const errorMessage = error.message || `Error durante la obtención de los miembros para el campo ${campo}`;
      console.error(`Error en la obtención de los miembros para el campo ${campo}:`, errorMessage);
      throw error;
    }
  };

