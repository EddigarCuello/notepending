import {findAllUsers} from '../Datos/PersonaData.js'

export const GetPersonas = async () => {
    try {
      const Personas = await findAllUsers();
      console.log('Personas obtenidas correctamente:', Personas);
      // Aquí puedes hacer lo que necesites con las tareas obtenidas, como mostrarlas en la interfaz de usuario, etc.
      return Personas;
    } catch (error) {
      const errorMessage = error.message || 'Error durante la obtención de las Personas'; 
      console.error('Error en la obtención de las Personas:', errorMessage);
      throw error;
    }
  };
  