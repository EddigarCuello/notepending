import React, { useState } from 'react';
import { login } from '../../Logica/AuthServices';
import { useNavigate, Link } from 'react-router-dom';
import fondoLogin from '../../assets/fondo-login.jpg';
import Input from '../Componentes/Input';
import ButtonLinklong from '../Componentes/ButtonLinkLong'; // Importa el nuevo componente
import { useUser } from '../UserContext'; // Importa el hook useUser

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para el mensaje de error
    const navigate = useNavigate();
    const { setUser } = useUser(); // Usa el hook useUser para obtener setUser

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar cualquier error anterior

        const userData = await login(email, password);

        if (userData) {
            // Actualiza el contexto con la información del usuario
            setUser(userData);
            navigate('/home'); // Redirige al usuario a la página de inicio después de iniciar sesión
        } else {
            setError('Error en el inicio de sesión. Por favor, verifica tus credenciales.'); // Mostrar mensaje de error
        }
    };

    return (
        <div className='flex h-screen'>
            <div className="flex items-center justify-center w-1/2 bg-gray-900">
                <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-white">Iniciar Sesión</h2>
                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        {error && <p className="text-red-500 text-center">{error}</p>} {/* Mostrar mensaje de error */}
                        <div className="rounded-md shadow-sm">
                            <div className="mb-4">
                                <Input
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <ButtonLinklong type="submit">
                                Iniciar Sesión
                            </ButtonLinklong>
                        </div>
                    </form>
                    <p className="mt-4 text-center text-gray-400">
                        ¿No tienes una cuenta? <Link to="/register" className="text-indigo-400 hover:text-indigo-300">Regístrate aquí</Link>.
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

export default Login;
