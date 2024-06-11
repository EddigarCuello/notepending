// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Logica/AuthServices.js';
import logo from '../../assets/logo.jpg';
import ButtonLink from './ButtonLinkNav.jsx';
import { useUser } from '../UserContext.jsx';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser(); // Obtén el usuario del contexto

    const handleLogout = async () => {
        await logout();
        navigate('/'); // Redirige al usuario al inicio de sesión después de cerrar sesión
    };

    return (
        <div className="flex justify-center mt-4">
            <nav className="bg-gray-900 p-4 shadow-lg rounded-lg w-[80%]">
                <ul className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-12 w-auto" />
                        <li className="text-lg text-white font-bold ml-4">
                            Hola, {user.nombre} {user.apellido}
                        </li>
                    </div>
                    <div className="flex items-center">
                        <ButtonLink to="/home">
                            Inicio
                        </ButtonLink>
                        <ButtonLink onClick={handleLogout}>
                            Cerrar Sesión
                        </ButtonLink>
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
