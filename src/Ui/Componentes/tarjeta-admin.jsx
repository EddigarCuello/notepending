import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { DeleteTask, UpdateTask, bajarArchivos, subirArchivo, eliminarArchivo } from '../../Logica/TareaServices.js';
import Spam from './Spam';

Modal.setAppElement('#root');

const TarjetaAdmin = ({
    id,
    initialTitulo = '',
    initialDescripcion = '',
    initialDificultad = '',
    initialFechaCreacion = '',
    initialFechaEntrega = '',
    initialFechaEnvio = '',
    initialEntregado = false,
    imgSrc,
    idProyecto,
    onDelete,
    onSave
}) => {
    const [editMode, setEditMode] = useState(false);
    const [titulo, setTitulo] = useState(initialTitulo || '');
    const [descripcion, setDescripcion] = useState(initialDescripcion || '');
    const [dificultad, setDificultad] = useState(initialDificultad || '');
    const [fechaCreacion, setFechaCreacion] = useState(initialFechaCreacion || '');
    const [fechaEntrega, setFechaEntrega] = useState(initialFechaEntrega || '');
    const [fechaEnvio, setFechaEnvio] = useState(initialFechaEnvio || '');
    const [entregado, setEntregado] = useState(initialEntregado);
    const [archivo, setArchivo] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetchTaskData();
    }, [id]);

    const fetchTaskData = async () => {
        try {
            const files = await bajarArchivos(id);
            setArchivos(files);

            // Fetch the task details from the server (this function should be defined in your TareaServices)
            const taskDetails = await getTaskDetails(id);
            setTitulo(taskDetails.titulo);
            setDescripcion(taskDetails.descripcion);
            setDificultad(taskDetails.dificultad);
            setFechaCreacion(taskDetails.fechaCreacion);
            setFechaEntrega(taskDetails.fechaEntrega);
            setFechaEnvio(taskDetails.fechaEnvio);
            setEntregado(taskDetails.entregado);
        } catch (error) {
            console.error('Error al bajar los archivos:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await eliminarArchivo(id);
            await DeleteTask(id);
            if (onDelete) {
                onDelete();
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    const handleDeleteAllFilesFromModal = async () => {
        try {
            await eliminarArchivo(id);
            const files = await bajarArchivos(id);
            setArchivos(files);
        } catch (error) {
            console.error('Error al eliminar los archivos:', error);
        }
    };

    const handleSave = async () => {
        const updatedTask = {
            titulo,
            description: descripcion,
            dificultad,
            fechaCreacion,
            fechaEntrega,
            fechaEnvio,
            entregado
        };

        try {
            if (archivo) {
                const url = await subirArchivo(archivo, id);
                console.log('Archivo subido con éxito:', url);
                const files = await bajarArchivos(id);
                setArchivos(files);
            }

            await UpdateTask(id, updatedTask);
            setEditMode(false);
            if (onSave) {
                onSave();
            }
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };

    const handleFileChange = (event) => {
        setArchivo(event.target.files[0]);
    };

    const handleFileDelete = async (fileUrl) => {
        try {
            await eliminarArchivo(fileUrl);
            const files = await bajarArchivos(id);
            setArchivos(files);
        } catch (error) {
            console.error('Error al eliminar el archivo:', error);
        }
    };

    const isImageUrl = (url) => {
        return /\.(jpeg|jpg|gif|png)$/.test(url);
    };

    const openImage = (url) => {
        window.open(url, '_blank');
    };

    const handleEntregadoChange = () => {
        if (!entregado) {
            const today = new Date().toLocaleDateString('en-CA');
            setFechaEnvio(today);
        }
        setEntregado(!entregado);
    };

    const handleCancel = () => {
        fetchTaskData();
        setEditMode(false);
    };

    return (
        <div className="bg-[#111827] rounded-lg shadow-md p-4 w-80">
            <div className="p-4">
                {editMode ? (
                    <>
                        <input
                            type="text"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2 bg-gray-700 `}
                        />
                        <textarea
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2 h-24 bg-gray-700 `}
                        />
                        <div className="flex flex-col mb-2">
                            <label className="text-gray-500 text-sm">Dificultad:</label>
                            <input
                                type="text"
                                value={dificultad}
                                readOnly
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="text-gray-500 text-sm">Fecha de creación:</label>
                            <input
                                type="date"
                                value={fechaCreacion}
                                readOnly
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="text-gray-500 text-sm">Fecha de entrega:</label>
                            <input
                                type="date"
                                value={fechaEntrega}
                                readOnly
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex items-center mb-2">
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>Guardar</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancel}>Cancelar</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-2 text-red-500 break-words whitespace-pre-wrap">{titulo}</h2>
                        <div className="text-white mb-2 font-bold max-h-24 overflow-y-auto break-words whitespace-pre-wrap">{descripcion}</div>
                        <p className="text-gray-500 text-sm mb-2 font-bold break-words whitespace-pre-wrap"><Spam>Dificultad:</Spam> {dificultad}</p>
                        <p className="text-gray-500 text-sm mb-2 font-bold break-words whitespace-pre-wrap"><Spam>Fecha de creación:</Spam> {fechaCreacion}</p>
                        <p className="text-gray-500 text-sm mb-2 font-bold break-words whitespace-pre-wrap"><Spam>Fecha de entrega:</Spam> {fechaEntrega}</p>
                        <p className="text-gray-500 text-sm mb-2 font-bold break-words whitespace-pre-wrap">Entregado: {entregado ? 'Sí' : 'No'}</p>
                        <div className="flex justify-center gap-2 mb-2 break-words whitespace-pre-wrap">
                            <button
                                className={`bg-[#4b43e3] text-white px-9 py-2 rounded break-words whitespace-pre-wrap ${entregado ? 'cursor-not-allowed opacity-50' : ''}`}
                                onClick={() => !entregado && setEditMode(true)}
                                disabled={entregado}
                            >
                                Editar
                            </button>
                            <button className="bg-red-500 text-white px-9 py-2 rounded break-words whitespace-pre-wrap" onClick={handleDelete}>Eliminar</button>
                        </div>
                        <button className="bg-[#4b43e3] text-white px-4 py-2 rounded w-full break-words whitespace-pre-wrap" onClick={() => setModalIsOpen(true)}>Mostrar Archivos</button>
                    </>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Archivos"
                className=" bg-[#111827] p-4 rounded-lg shadow-md w-[300px] mx-auto my-10 break-words whitespace-pre-wrap"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <div className='flex flex-col'>
                    <h2 className="text-2xl font-bold mb-4 text-white break-words whitespace-pre-wrap">Archivos</h2>
                </div>
                <button className="bg-red-500 text-white px-4 py-2 mx-5 rounded mb-4 break-words whitespace-pre-wrap" onClick={() => setModalIsOpen(false)}>Cerrar</button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded mb-4 break-words whitespace-pre-wrap"
                    onClick={handleDeleteAllFilesFromModal}>
                    Eliminar
                </button>

                <ul className="text-white font-bold break-words whitespace-pre-wrap">
                    {archivos.map((file, index) => (
                        <li key={index} className="mb-4 break-words whitespace-pre-wrap">
                            {isImageUrl(file) ? (
                                <img
                                    src={file}
                                    alt={`Archivo ${index + 1}`}
                                    className="w-full h-40 object-cover rounded cursor-pointer break-words whitespace-pre-wrap"
                                    onClick={() => window.open(file, '_blank')}
                                />
                            ) : (
                                <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-words whitespace-pre-wrap">Archivo {index + 1}</a>
                            )}
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

export default TarjetaAdmin;
