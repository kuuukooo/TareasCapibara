import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import '../hojas-de-estilo/Capibara.css';
import CapibaraDurmiendo from '../imagenes/CapibaraDurmiendo.svg';
import CapibaraParado from '../imagenes/CapibaraParado.svg';
import CapibaraArrastrado from '../imagenes/CapibaraArrastrado.svg';
import CapibaraEnojado from '../imagenes/CapibaraEnojado.svg';

function Capibara({ hasError }) {
  const [isAwake, setIsAwake] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem('capibaraPosition'));
    if (savedPosition) {
      setPosition(savedPosition);
    }
  }, []);

  const handleStop = (e, data) => {
    setIsDragging(false);
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem('capibaraPosition', JSON.stringify(newPosition));
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStart={() => setIsDragging(true)}
      onStop={handleStop}
    >
      <div 
        ref={nodeRef}
        className="capibara-contenedor" 
        onMouseEnter={() => setIsAwake(true)} 
        onMouseLeave={() => setIsAwake(false)}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <img 
          src={isDragging ? CapibaraArrastrado : (hasError ? CapibaraEnojado : (isAwake ? CapibaraParado : CapibaraDurmiendo))} 
          alt="Capibara" 
          className="capibara-imagen" 
        />
        {!isAwake && !isDragging && (
          <div className="nube-de-pensamiento">
            <div className="zzzz">
              {hasError ? ">:(" : (
                <>
                  <span>Z</span>
                  <span>Z</span>
                  <span>Z</span>
                  <span>Z</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default Capibara;
