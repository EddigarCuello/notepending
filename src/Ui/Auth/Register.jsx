// src/components/Register.jsx
import React, { useState } from 'react';
import { registro } from '../../Logica/AuthServices';
import { useNavigate, Link } from 'react-router-dom';
import fondoLogin from '../../assets/fondo-login.jpg';
import Input from '../Componentes/Input';
import ButtonLinklong from '../Componentes/ButtonLinkLong';
import Label from '../Componentes/Label';
import Persona from '../../Entidades/Persona';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);  // Estado para manejar el error
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const nuevaPersona = new Persona(nombre, apellido, cedula, correo, password);
        try {
            await registro(nuevaPersona);
            navigate('/'); // Redirige al usuario a la página de inicio de sesión después de registrarse
        } catch (error) {
            setError(error.message || 'Error durante el registro');  // Guarda el mensaje de error en el estado
        }
    };

    return (
        <div className='flex h-screen'>
            <div className="flex items-center justify-center w-1/2 bg-gray-900">
                <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-white">Registrarse</h2>
                    {error && (
                        <div className="mb-4 text-center text-red-500">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleRegister} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm">
                            <div className="mb-4">
                                <Label>Nombre</Label>
                                <Input
                                    type="text"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <Label>Apellido</Label>
                                <Input
                                    type="text"
                                    placeholder="Apellido"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <Label>Cédula</Label>
                                <Input
                                    type="text"
                                    placeholder="Cédula"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <Label>Correo Electrónico</Label>
                                <Input
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <Label>Contraseña</Label>
                                <Input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <ButtonLinklong>
                                Registrarse
                            </ButtonLinklong>
                        </div>
                    </form>
                    <p className="mt-4 text-center text-gray-400">
                        ¿Ya tienes una cuenta? <Link to="/" className="text-indigo-400 hover:text-indigo-300">Iniciar Sesión</Link>.
                    </p>
                </div>
            </div>
            <div className="relative w-1/2">
                <img src={fondoLogin} alt="Fondo Login" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
        </div>
    );
};

export default Register;
