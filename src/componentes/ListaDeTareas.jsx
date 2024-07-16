import React, { useState, useEffect } from 'react';
import TareaFormulario from './TareaFormulario';
import '../hojas-de-estilo/ListaDeTareas.css';
import Tarea from './Tarea';
import { v4 as uuidv4 } from 'uuid'; 

function ListaDeTareas({ setHasError }) {
    const [tareas, setTareas] = useState(() => {
        const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
        return tareasGuardadas || [];
    });

    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }, [tareas]);

    const agregarTarea = tarea => {
        if (tarea.texto.trim()) {
            tarea = {
                id: uuidv4(),
                texto: tarea.texto.trim(),
                completada: false
            };
            setTareas([tarea, ...tareas]);
        }
    };

    const eliminarTarea = id => {
        const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
        setTareas(tareasActualizadas);
    };

    const editarTarea = (id, nuevoTexto) => {
        const tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id) {
                return { ...tarea, texto: nuevoTexto };
            }
            return tarea;
        });
        setTareas(tareasActualizadas);
    };

    const completarTarea = id => {
        const tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id) {
                return { ...tarea, completada: !tarea.completada };
            }
            return tarea;
        });
        setTareas(tareasActualizadas);
    };

    return (
        <>
            <TareaFormulario onSubmit={agregarTarea} />
            <div className='tareas-lista-contenedor'>
                {tareas.map(tarea => (
                    <Tarea
                        key={tarea.id}
                        id={tarea.id}
                        texto={tarea.texto}
                        completada={tarea.completada}
                        eliminarTarea={eliminarTarea}
                        editarTarea={editarTarea}
                        completarTarea={completarTarea}
                        setHasError={setHasError}
                    />
                ))}
            </div>
        </>
    );
}

export default ListaDeTareas;
