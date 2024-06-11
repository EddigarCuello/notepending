class Persona {
    constructor(nombre, apellido, cedula, correo, password = null) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.correo = correo;
        this.password = password;
    }
}

export default Persona;

