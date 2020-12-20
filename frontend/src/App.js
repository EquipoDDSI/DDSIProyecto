import './App.css';
import React from 'react';
import CrudProfesor from './components/CrudProfesor/CrudProfesor'

const App = () => {
  
  return (
    <div className="App">
      <header>
        <h1>Sistema departamentos</h1>
        <hr/>
      </header>

      <div className="application">
        <div id="crud-profesor">
          <CrudProfesor />
        </div>
      </div>
      
      <footer>
        Creado por el grupo C2_2
      </footer>
    </div>
  );
}

export default App;
