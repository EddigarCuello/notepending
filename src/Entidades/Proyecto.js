// src/Entidades/Task.js
class Proyecto{
    constructor(id = null,
      cedula,
      titulo,
        description,
        fechaCreacion,
        fechaEntrega = null,
        entregado = false) {
        this.id = id;
        this.cedula = cedula;
        this.titulo = titulo;
        this.description = description;
        this.fechaCreacion=fechaCreacion;
        this.fechaEntrega = fechaEntrega;
        this.entregado = entregado;
    }
  }
  
  export default Proyecto;
  