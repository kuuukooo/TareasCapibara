import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../hojas-de-estilo/Capibara.css';
import CapibaraDurmiendo from '../imagenes/CapibaraDurmiendo.svg';
import CapibaraParado from '../imagenes/CapibaraParado.svg';
import CapibaraArrastrado from '../imagenes/CapibaraArrastrado.svg';

function Capibara() {
  const [isAwake, setIsAwake] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Draggable
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
    >
      <div 
        className="capibara-contenedor" 
        onMouseEnter={() => setIsAwake(true)} 
        onMouseLeave={() => setIsAwake(false)}
      >
        <img 
          src={isDragging ? CapibaraArrastrado : (isAwake ? CapibaraParado : CapibaraDurmiendo)} 
          alt="Capibara" 
          className="capibara-imagen" 
        />
        {!isAwake && !isDragging && (
          <div className="nube-de-pensamiento">
            <div className="zzzz">
              <span>Z</span>
              <span>Z</span>
              <span>Z</span>
              <span>Z</span>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default Capibara;
