import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import Proyecto from "../Entidades/Proyecto.js";
import Miembro from "../Entidades/Miembro.js"; // Asegúrate de que el nombre del archivo coincida con el nombre de la clase
import { Timestamp } from "firebase/firestore";

// Crear una nueva tarea
export const createProyecto = async (Proyecto) => {
  try {
    const docRef = await addDoc(collection(db, "Projects"), {
      cedula: Proyecto.cedula,
      titulo: Proyecto.titulo,
      description: Proyecto.description,
      fechaCreacion: Proyecto.fechaCreacion,
      fechaEntrega: Proyecto.fechaEntrega,
      entregado: Proyecto.entregado,
    });
    await updateDoc(docRef, { id: docRef.id });
    console.log("Proyecto añadido con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error añadiendo el Proyecto: ", error);
    throw error;
  }
};

export const createMiembrosTable = async (Miembro) => {
  try {
    const docRef = await addDoc(collection(db, "Miembros"), {
      cedula: Miembro.cedula,
      idProyecto: Miembro.idProyecto,
    });
    await updateDoc(docRef, { id: docRef.id });
    console.log("Miembro añadido con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error añadiendo el miembro: ", error);
    throw error;
  }
};

export const findMiembrosBy = async (campo, valor) => {
  try {
    const q = query(collection(db, "Miembros"), where(campo, "==", valor));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const miembrosData = querySnapshot.docs.map((doc) => doc.data());
      console.log("Miembros encontrados:", miembrosData);
      return miembrosData;
    } else {
      console.log(
        `No se encontraron Miembros para el campo ${campo} con valor ${valor}`
      );
      return [];
    }
  } catch (error) {
    console.error(`Error al obtener los Miembros por ${campo}:`, error.message);s
    return null;
  }
};

export const deleteMiembro = async (cedula) => {
  try {
    const ProjectRef = doc(db, "Miembros", cedula);
    await deleteDoc(ProjectRef);
    console.log("Miembro eliminado con ID: ", projectId);
  } catch (error) {
    console.error("Error eliminando el Miembro: ", error);
    throw error;
  }
};




// Actualizar una tarea por ID
export const updateProyecto = async (projectId, updatedProject) => {
  try {
    const taskRef = doc(db, "Projects", projectId);
    await updateDoc(taskRef, {
      fechaEntrega: updatedProject.fechaEntrega,
      entregado: updatedProject.entregado,
    });
    console.log("Proyecto actualizado con ID: ", projectId);
  } catch (error) {
    console.error("Error actualizando el Proyecto: ", projectId);
    throw error;
  }
};

// Eliminar una tarea por ID
export const deleteProject = async (projectId) => {
  try {
    const ProjectRef = doc(db, "Projects", projectId);
    await deleteDoc(ProjectRef);
    console.log("proyecto eliminado con ID: ", projectId);
  } catch (error) {
    console.error("Error eliminando el proyecto: ", error);
    throw error;
  }
};


export const findProjectBy = async (campo, valor) => {
  try {
    const q = query(collection(db, "Projects"), where(campo, "==", valor));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const projectData = querySnapshot.docs.map((doc) => doc.data());
      console.log("proyectos encontrados:", projectData);
      return projectData;
    } else {
      console.log(
        `No se encontraron proyectos para el campo ${campo} con valor ${valor}`
      );
      return [];
    }
  } catch (error) {
    console.error(`Error al obtener los proyectos por ${campo}:`, error.message);s
    return null;
  }
};
