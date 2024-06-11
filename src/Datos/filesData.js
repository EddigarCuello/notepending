import { storage } from './firebase.js';
import { uploadBytes,ref,getDownloadURL,listAll,deleteObject} from "firebase/storage";


export async function SubirArchivo(file, taskid) {
    try {
      const timestamp = new Date().toISOString(); // Obtiene la fecha y hora actual en formato ISO
      const fileName = `doc_${timestamp}`; // Crea un nombre de archivo único con el timestamp
      const storageRef = ref(storage, `Task/${taskid}/${fileName}`); // Utiliza el nombre de archivo único
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      console.log('Archivo subido con éxito:', url);
      return url;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }
  
  
  export async function BajarArchivos(taskid) {
    try {
      const folderRef = ref(storage, `Task/${taskid}/`); 
      const result = await listAll(folderRef); 
      const urls = await Promise.all(result.items.map(itemRef => getDownloadURL(itemRef)));
      console.log('Archivos descargados con éxito:', urls);
      return urls;
    } catch (error) {
      console.error('Error al descargar los archivos:', error);
      throw error;
    }
  }

  export async function EliminarArchivos(taskId) {
    try {
        const folderRef = ref(storage, `Task/${taskId}/`);
        const result = await listAll(folderRef);

        const deletePromises = result.items.map(itemRef => deleteObject(itemRef));
        await Promise.all(deletePromises);

        console.log('Archivos eliminados con éxito para la tarea:', taskId);
    } catch (error) {
        console.error('Error al eliminar los archivos:', error);
        throw error;
    }
}
