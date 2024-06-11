import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Auth/Register.jsx';
import Login from './Auth/Login.jsx';
import SeleccionProyecto from './Pages/seleccion-proyecto.jsx';
import TableroPersonal from './Pages/tablero-personal.jsx';
import CrearTarea from './Pages/CrearTarea.jsx';
import { UserProvider } from './UserContext.jsx';
import Home from './Pages/Home.jsx'
import CrearProyecto from './Pages/CrearProyecto.jsx';
import Tableroproyecto from './Pages/tablero-proyecto.jsx';
import { ProjectProvider } from './ProyectContext.jsx';
import AsignarTarea from './Pages/AsignarTarea.jsx' // Importa el proveedor del contexto del proyecto

const App = () => {
    return (
        <UserProvider>
            <ProjectProvider> {/* Agrega el proveedor del contexto del proyecto */}
                <Router>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/seleccion-proyecto" element={<SeleccionProyecto />} />
                        <Route path="/tablero-personal" element={<TableroPersonal />} />
                        <Route path="/crear-tarea" element={<CrearTarea />} />
                        <Route path="/crear-proyecto" element={<CrearProyecto />} />
                        <Route path="/tablero-proyecto" element={<Tableroproyecto />} />
                        <Route path="/asignarTarea" element={<AsignarTarea />} />
                    </Routes>
                </Router>
            </ProjectProvider>
        </UserProvider>
    );
};

export default App;
