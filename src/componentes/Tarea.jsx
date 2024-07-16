import React, { useState } from 'react';
import '../hojas-de-estilo/Tarea.css';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import CapiModal from './CapiModal';

function Tarea({ id, texto, completada, completarTarea, eliminarTarea, editarTarea, setHasError }) {
    const [editando, setEditando] = useState(false);
    const [confirmarEliminar, setConfirmarEliminar] = useState(false);
    const [nuevoTexto, setNuevoTexto] = useState(texto);
    const [error, setError] = useState('');

    const manejarCambio = e => {
        setNuevoTexto(e.target.value);
    };

    const manejarAceptarEdicion = () => {
        if (nuevoTexto.trim() === '') {
            setError('El texto no puede estar vacío.');
            setHasError(true);
            return;
        }
        if (nuevoTexto.length < 5 || nuevoTexto.length > 40) {
            setError('El texto debe tener entre 5 y 40 caracteres.');
            setHasError(true);
            return;
        }
        editarTarea(id, nuevoTexto);
        setEditando(false);
        setError('');
        setHasError(false);
    };

    const manejarCancelarEdicion = () => {
        setNuevoTexto(texto); // Restablece el texto original
        setEditando(false);
        setError('');
        setHasError(false);
    };

    const manejarConfirmarEliminacion = () => {
        eliminarTarea(id);
        setConfirmarEliminar(false);
    };

    const manejarCancelarEliminacion = () => {
        setConfirmarEliminar(false);
    };

    return (
        <>
            <div className={completada ? 'tarea-contenedor completada' : 'tarea-contenedor'}>
                {editando ? (
                    <>
                        <input 
                            type="text"
                            className="tarea-texto"
                            value={nuevoTexto}
                            onChange={manejarCambio}
                        />
                    </>
                ) : (
                    <div 
                        className='tarea-texto'
                        onClick={() => completarTarea(id)}>
                        {texto}
                    </div>
                )}
                <div className='tarea-contenedor-iconos'>
                    {editando ? (
                        <>
                            <AiOutlineCheck className='tarea-icono' onClick={manejarAceptarEdicion} />
                            <AiOutlineClose className='tarea-icono' onClick={manejarCancelarEdicion} />
                        </>
                    ) : (
                        confirmarEliminar ? (
                            <>
                                <AiOutlineCheck className='tarea-icono' onClick={manejarConfirmarEliminacion} />
                                <AiOutlineClose className='tarea-icono' onClick={manejarCancelarEliminacion} />
                            </>
                        ) : (
                            <>
                                <AiOutlineEdit className='tarea-icono' onClick={() => setEditando(true)} />
                                <AiOutlineDelete className='tarea-icono' onClick={() => setConfirmarEliminar(true)} />
                            </>
                        )
                    )}
                </div>
            </div>
            {error && <CapiModal mensaje={error} onClose={() => { setError(''); setHasError(false); }} />}
        </>
    );
}

export default Tarea;
