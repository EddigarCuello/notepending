
import { createTask,deleteTask,updateTask,getTasks,findTasksBy} from "../Datos/TareaData.js";
import {SubirArchivo,BajarArchivos,EliminarArchivos} from '../Datos/filesData.js'

export const CreateTask = async (Tarea) => {//Tarea es un clase  y tien tarea.id
  try {
    //que guarde la imagen 
    const TareaCreate = await createTask(Tarea);
    console.log('Tarea Almacenada:', TareaCreate);

  } catch (error) {
    const errorMessage = error.message || 'Error durante la creacion'; 
    console.error('Error en la creacion:', errorMessage);
  }
};


export const UpdateTask = async (taskid,Tarea) => {
    try {
      const TareaCreate = await updateTask(taskid,Tarea);
      console.log('Tarea Actualizada:', TareaCreate);
  
    } catch (error) {
      const errorMessage = error.message || 'Error durante la actualizacion'; 
      console.error('Error en la actualizacion:', errorMessage);
    }
  };
  
  export const DeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      console.log('Tarea eliminada correctamente');
    } catch (error) {
      const errorMessage = error.message || 'Error durante la eliminación de la tarea'; 
      console.error('Error en la eliminación de la tarea:', errorMessage);
      throw error;
    }
  };


  export const GetTasks = async () => {
    try {
      const tasks = await getTasks();
      console.log('Tareas obtenidas correctamente:', tasks);
      // Aquí puedes hacer lo que necesites con las tareas obtenidas, como mostrarlas en la interfaz de usuario, etc.
      return tasks;
    } catch (error) {
      const errorMessage = error.message || 'Error durante la obtención de las tareas'; 
      console.error('Error en la obtención de las tareas:', errorMessage);
      throw error;
    }
  };
  
  export const GetTasksByField = async (campo, valor) => {
    try {
      const tasks = await findTasksBy(campo, valor);
      if (tasks) {
        console.log(`Tareas obtenidas correctamente para el campo ${campo} con valor ${valor}:`, tasks);
        return tasks;
      } else {
        console.log(`No se encontraron tareas para el campo ${campo} con valor ${valor}`);
        return null;
      }
    } catch (error) {
      const errorMessage = error.message || `Error durante la obtención de las tareas para el campo ${campo}`;
      console.error(`Error en la obtención de las tareas para el campo ${campo}:`, errorMessage);
      throw error;
    }
  };

export const subirArchivo = async (archivo, taskId) => {
  try {
    // Sube el archivo a Firebase Storage
    const url = await SubirArchivo(archivo, taskId);
    console.log('Archivo subido con éxito:', url);
    return url;
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    throw error;
  }
};

export const bajarArchivos = async (taskId) => {
  try {
    // Recupera los archivos asociados a la tarea desde Firebase Storage
    const urls = await BajarArchivos(taskId);
    console.log('Archivos recuperados con éxito:', urls);
    return urls;
  } catch (error) {
    console.error('Error al recuperar los archivos:', error);
    throw error;
  }
};

export async function eliminarArchivo(taskId) {
  try {
      await EliminarArchivos(taskId);
      console.log('Archivos eliminados con éxito dela tarea:', taskId);
      // Aquí puedes agregar cualquier otra lógica necesaria después de eliminar los archivos
  } catch (error) {
      console.error('Error al  eliminar archivos de la tarea:', error);
      // Aquí puedes manejar el error y mostrar mensajes de error en la interfaz de usuario, por ejemplo
      throw error;
  }
}