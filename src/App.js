import { isEmpty, size } from "lodash";
import React, { useState } from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const validarFormulario = () => {
    let esValido = true;
    setError(null);

    if (isEmpty(tarea)) {
      setError("Debes ingresar una tarea.");
      return;
    }
    return esValido;
  };

  const agregarTarea = (e) => {
    //Evita que la pagina nos recargue
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const nuevaTarea = {
      id: shortid.generate(),
      nombre: tarea,
    };

    setTareas([...tareas, nuevaTarea]);
    setTarea("");
  };

  const guardarTarea = (e) => {
    //Evita que la pagina nos recargue
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }

    const editarTareas = tareas.map((item) =>
      item.id === id ? { id, name: tarea } : item
    );
    setTareas(editarTareas);
    setEditar(false);
    setTarea("");
    setId("");
  };

  const eliminarTarea = (id) => {
    const filteredTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(filteredTareas);
  };

  const editarTarea = (laTarea) => {
    setTarea(laTarea.nombre);
    setEditar(true);
    setId(laTarea.id);
  };

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {size(tareas) === 0 ? (
            <li className="list-group-item">No hay Tareas</li>
          ) : (
            <ul className="list-group">
              {tareas.map((tarea) => (
                <li className="list-group-item" key={tarea.id}>
                  <span className="lead">{tarea.nombre}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editarTarea(tarea)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editar ? "Modificar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={editar ? guardarTarea : agregarTarea}>
            {error && <span className="text-danger">{error}</span>}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea"
              onChange={(text) => setTarea(text.target.value)}
              value={tarea}
            />
            <button
              className={
                editar ? "btn btn-warning btn-block" : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {editar ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
