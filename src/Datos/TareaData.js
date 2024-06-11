import { db } from "./firebase";
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
import Task from "../Entidades/tarea.js"; // Asegúrate de que el nombre del archivo coincida con el nombre de la clase
import { Timestamp } from "firebase/firestore";
import Tarea from "../Entidades/tarea.js";

// Crear una nueva tarea
export const createTask = async (task) => {
  try {
    const docRef = await addDoc(collection(db, "Tasks"), {
      cedula: task.cedula,
      titulo: task.titulo,
      description: task.description,
      dificultad: task.dificultad,
      fechaCreacion: task.fechaCreacion,
      fechaEntrega: task.fechaEntrega,
      fechaEnvio: task.fechaEnvio,
      entregado: task.entregado,
      idProyecto: task.idProyecto,
    });
    await updateDoc(docRef, { id: docRef.id });
    console.log("Tarea añadida con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error añadiendo la tarea: ", error);
    throw error;
  }
};

// Obtener todas las tareas
// Obtener todas las tareas

export const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    const tasks = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return new Tarea(
        doc.id,
        data.cedula,
        data.titulo,
        data.description,
        data.dificultad,
        data.fechaCreacion instanceof Timestamp
          ? data.fechaCreacion.toDate()
          : data.fechaCreacion,
        data.fechaEntrega instanceof Timestamp
          ? data.fechaEntrega.toDate()
          : data.fechaEntrega,
        data.fechaEnvio instanceof Timestamp
          ? data.fechaEnvio.toDate()
          : data.fechaEnvio,
        data.entregado
      );
    });
    return tasks;
  } catch (error) {
    console.error("Error obteniendo las tareas: ", error);
    throw error;
  }
};

// Actualizar una tarea por ID
export const updateTask = async (taskId, updatedTask) => {
  try {
    const taskRef = doc(db, "Tasks", taskId);
    await updateDoc(taskRef, {
      titulo: updatedTask.titulo,
      description: updatedTask.description,
      dificultad: updatedTask.dificultad, // Aquí está la corrección
      fechaEntrega: updatedTask.fechaEntrega,
      fechaEnvio: updatedTask.fechaEnvio,
      entregado: updatedTask.entregado,
    });
    console.log("Tarea actualizada con ID: ", taskId);
  } catch (error) {
    console.error("Error actualizando la tarea: ", error);
    throw error;
  }
};

// Eliminar una tarea por ID
export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, "Tasks", taskId);
    await deleteDoc(taskRef);
    console.log("Tarea eliminada con ID: ", taskId);
  } catch (error) {
    console.error("Error eliminando la tarea: ", error);
    throw error;
  }
};


export const findTasksBy = async (campo, valor) => {
  try {
    const q = query(collection(db, "Tasks"), where(campo, "==", valor));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const taskData = querySnapshot.docs.map((doc) => doc.data());
      console.log("Tareas encontradas:", taskData);
      return taskData;
    } else {
      console.log(
        `No se encontraron tareas para el campo ${campo} con valor ${valor}`
      );
      return [];
    }
  } catch (error) {
    console.error(`Error al obtener las tareas por ${campo}:`, error.message);
    return null;
  }
};
