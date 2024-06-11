// src/Entidades/Task.js
class Tarea{
  constructor(id = null,
    cedula,
    titulo,
      description,
      dificultad,
      fechaCreacion,
      fechaEntrega = null,
      fechaEnvio = null,
      entregado = false,
    idProyecto = null,) {
      this.id = id;
      this.cedula = cedula;
      this.titulo = titulo;
      this.description = description;
      this.dificultad = dificultad;
      this.fechaCreacion=fechaCreacion;
      this.fechaEntrega = fechaEntrega;
      this.fechaEnvio =fechaEnvio;
      this.entregado = entregado;
      this.idProyecto = idProyecto;
  }
}

export default Tarea;
