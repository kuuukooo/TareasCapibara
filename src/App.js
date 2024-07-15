import logo from './logo.svg';
import './App.css';
import ListaDeTareas from './componentes/ListaDeTareas';
import Capibara from './componentes/Capibara';

function App() {
  return (
      <div className='aplicacion-tareas'>
        <div className='logo-contenedor-tareas'>
          <h1 className='logo-tareas'>Administrador de Tareas</h1>
        </div>
        <div className='tareas-lista-principal'>
          <h1 className='titulo-tarea'>Mis Tareas</h1>
          <ListaDeTareas />
          <Capibara />
        </div>
      </div>
  );
}

export default App;
