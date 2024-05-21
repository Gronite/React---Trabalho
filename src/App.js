import React, { useState } from 'react';
import './style.css';
import Tarefa from './Tarefa';
import Categoria from './Categoria';
import Usuario from './Usuario';
import Comentarios from './Comentarios';

function App() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasVisiveis, setCategoriasVisiveis] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosVisiveis, setUsuariosVisiveis] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [comentariosVisiveis, setComentariosVisiveis] = useState([]);

  const adicionarComentario = (index, comentario) => {
    const novasTarefas = [...tarefas];
    if (!novasTarefas[index].comentarios) {
      novasTarefas[index].comentarios = [];
    }
    novasTarefas[index].comentarios.push(comentario);
    setTarefas(novasTarefas);
  };

  return (
    <div className="container">
      <div>
        <Categoria
          categorias={categorias}
          setCategorias={setCategorias}
          setCategoriasVisiveis={setCategoriasVisiveis}
          categoriasVisiveis={categoriasVisiveis}
          tarefas={tarefas}
          setTarefas={setTarefas}
        />
      </div>
      <div>
        <Tarefa
          categorias={categorias}
          usuarios={usuarios}
          tarefas={tarefas}
          setTarefas={setTarefas}
          setComentariosVisiveis={setComentariosVisiveis}
          comentariosVisiveis={comentariosVisiveis}
          adicionarComentario={adicionarComentario}
        />
      </div>
      <div>
        <Usuario
          usuarios={usuarios}
          setUsuarios={setUsuarios}
          setUsuariosVisiveis={setUsuariosVisiveis}
          usuariosVisiveis={usuariosVisiveis}
          tarefas={tarefas}
          setTarefas={setTarefas}
        />
        {comentariosVisiveis.map(
          (visivel, index) =>
            visivel && (
              <Comentarios
                key={index}
                tarefaIndex={index}
                adicionarComentario={adicionarComentario}
                usuarios={usuarios}
                comentariosVisiveis={comentariosVisiveis}
                setComentariosVisiveis={setComentariosVisiveis}
                tarefas={tarefas}
              />
            ),
        )}
      </div>
    </div>
  );
}

export default App;
