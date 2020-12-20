import React, {useState} from 'react';
import Axios from 'axios';
import './CrudProfesor.css';

export const CrudProfesor = () => {

    const URL = 'http://localhost:3070/';
    const [NombreProf, setNombreProf] = useState('')
    const [ApellidosProf, setApellidosProf] = useState('')
    const [Profesores, setProfesores] = useState([])
    const [mostrar, setMostrar] = useState(true);

    const aniadeProfesor = (e) => {
        e.preventDefault();
        Axios.post(URL + 'profesor', { 
          nombreProf: NombreProf,
          apellidoProf: ApellidosProf
        }).then( () => {
            alert("Insertado correctamente")
        });
        setProfesores(listarProfesores())
      };
    
      const editaProfesor = (code, nombre, apellidos) => {
          Axios.put(`${URL}profesor/${code}`, {
            codeProfesor: code,
            nombreProf: nombre,
            apellidoProf: apellidos
          }).then(()=>{alert("Editado correctamente")});
      };

      const eliminaProfesor = (codeProfesor) => {
          Axios.delete(`${URL}profesor/${codeProfesor}`);
          const profesor = Profesores.find((profesor) => profesor.codeProfesor === codeProfesor)
          setProfesores(Profesores.filter((iterador) => {
              return iterador !== profesor;
          }))
      };
    
      const listarProfesores = () => {
    
        if (mostrar && (Profesores.length === 0))
        {
            Axios.get(URL + 'profesor')
            .then((response) => {
                setProfesores(response.data)
            })
        }
        else if (mostrar)
        {
            setProfesores(Profesores);
        }
        else {
            setProfesores([]);
        }

        return Profesores;
      };

    return (
        <>   
            <form className="form-profesor" onSubmit={aniadeProfesor}>
                <label>Nombre</label>
                <input type="text" name="nombreProf" onChange={(e) => {
                    setNombreProf(e.target.value)
                }}/>

                <label>Apellidos</label>
                <input type="text" name="apellidosProf" onChange={(e) => {
                    setApellidosProf(e.target.value)
                }}/>

                <button type="submit" id="aniadir-boton">
                    Añadir nuevo profesor
                    </button>
            </form>

            <div id="listado-profesor">
                <button onClick={() => {
                    setMostrar( !mostrar? true : false);
                    listarProfesores();
                }} id="listar-boton">
                    Listar profesores
                </button>
                <table>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Acciones</th>
                    </tr>
                    {
                            Profesores.map(profesor => 
                            {
                                let nombre;
                                let apellidos;
                                return (
                                <tr>
                                    <th>
                                    <input type="text" placeholder={profesor.nombreProf} name="apellidosProf" onChange={(e) => {
                                        nombre = e.target.value;
                                    }}/>
                                        
                                    </th> 
                                    <th>
                                    <input type="text" placeholder={profesor.apellidoProf} name="apellidoProf" onChange={(e) => {
                                        apellidos = e.target.value;
                                    }}/>
                                    </th> 
                                    <th>
                                        <button id="editar-boton" onClick={() => {
                                            editaProfesor(profesor.codeProfesor,
                                                nombre === undefined? profesor.nombreProf : nombre, 
                                                apellidos === undefined? profesor.apellidoProf : apellidos)
                                        }}>
                                        Editar
                                        </button>
                                        <button id="eliminar-boton" onClick={() => {
                                            eliminaProfesor(profesor.codeProfesor)}}>
                                        Eliminar
                                        </button>
                                    </th>
                                </tr>
                                )
                            }
                            )
                    }
                </table>
            </div>
        </>
    );
};

export default CrudProfesor;