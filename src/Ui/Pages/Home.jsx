import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componentes/Navbar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import personalBackground from '../../assets/tablero-personal--fondo.jpg';
import projectBackground from '../../assets/grupo-fondo.jpg';

const Home = () => {
    const navigate = useNavigate();

    const handlePersonalClick = () => {
        navigate('/tablero-personal'); // Navigate to TableroPersonal
    };

    const handleProjectClick2 = () => {
        navigate('/seleccion-proyecto'); // Navigate to TableroProyecto
    };

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center">
            <div className="mt-4 w-full">
                <Navbar />
            </div>
            <div className="flex-grow flex items-center justify-center w-full">
                <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-4/5 max-w-3xl flex justify-around h-[500px]">
                    <button
                        onClick={handlePersonalClick}
                        className="relative bg-cover bg-center border-2 border-gray-700 text-white p-4 rounded-lg w-1/2 mx-2 text-center flex flex-col items-center justify-center hover:border-purple-500 hover:text-purple-500 transition"
                        style={{ backgroundImage: `url(${personalBackground})` }}
                    >
                        <div
                            className="absolute inset-0 rounded-lg"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%)'
                            }}
                        ></div>
                        <FontAwesomeIcon icon={faUser} size="2x" className="z-10 hover:text-purple-500 transition duration-25" />
                        <span className="mt-2 z-10 font-bold">Personal</span>
                    </button>
                    <button
                        onClick={handleProjectClick2}
                        className="relative bg-cover bg-left border-2 border-gray-700 text-white p-4 rounded-lg w-1/2 mx-2 text-center flex flex-col items-center justify-center hover:border-purple-500 hover:text-purple-500 transition"
                        style={{ backgroundImage: `url(${projectBackground})` }}
                    >
                        <div
                            className="absolute inset-0 rounded-lg"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%)'
                            }}
                        ></div>
                        <FontAwesomeIcon icon={faProjectDiagram} size="2x" className="z-10 hover:text-purple-500 transition duration-25" />
                        <span className="mt-2 z-10 font-bold">Proyecto</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
