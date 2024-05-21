import React, { useState, useEffect } from 'react';
import Comentarios from './Comentarios';

const Tarefa = ({ categorias, usuarios, tarefas, setTarefas }) => {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novoUsuario, setNovoUsuario] = useState('');
  const [comentariosVisiveis, setComentariosVisiveis] = useState(
    new Array(tarefas.length).fill(false),
  );
  const [tarefasVisiveis, setTarefasVisiveis] = useState(false);
  const [edicaoAtiva, setEdicaoAtiva] = useState({
    ativa: false,
    index: null,
    valor: '',
  });

  React.useEffect(() => {
    setComentariosVisiveis((prev) => {
      const updated = [...prev];
      while (updated.length < tarefas.length) {
        updated.push(false);
      }
      return updated;
    });
  }, [tarefas.length]);

  const editarComentario = (tarefaIndex, comentarioIndex, novoTexto) => {
    const novasTarefas = [...tarefas];
    novasTarefas[tarefaIndex].comentarios[comentarioIndex].comentario =
      novoTexto;
    setTarefas(novasTarefas);
  };

  const excluirComentario = (tarefaIndex, comentarioIndex) => {
    const novasTarefas = [...tarefas];
    novasTarefas[tarefaIndex].comentarios.splice(comentarioIndex, 1);
    setTarefas(novasTarefas);
  };

  const adicionarTarefa = () => {
    if (
      novaTarefa.trim() !== '' &&
      categorias.includes(novaCategoria) &&
      usuarios.includes(novoUsuario)
    ) {
      setTarefas([
        {
          descricao: novaTarefa,
          categoria: novaCategoria,
          usuario: novoUsuario,
          comentarios: [],
        },
        ...tarefas,
      ]);
      setNovaTarefa('');
      setNovaCategoria('');
      setNovoUsuario('');
    } else {
      alert('Categoria ou usuário inexistente [Verifique a caixa-alta]');
    }
  };

  const adicionarComentario = (tarefaIndex, novoComentario) => {
    const novasTarefas = [...tarefas];
    novasTarefas[tarefaIndex].comentarios.push(novoComentario);
    setTarefas(novasTarefas);
  };

  const editarTarefa = (index) => {
    setEdicaoAtiva({ ativa: true, index, valor: tarefas[index].descricao });
  };

  const salvarEdicaoTarefa = () => {
    const novasTarefas = [...tarefas];
    novasTarefas[edicaoAtiva.index].descricao = edicaoAtiva.valor;
    setTarefas(novasTarefas);
    cancelarEdicaoTarefa();
  };

  const cancelarEdicaoTarefa = () => {
    setEdicaoAtiva({ ativa: false, index: null, valor: '' });
  };

  const excluirTarefa = (index) => {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
  };

  return (
    <div className="adiciona">
      <h1>📋 Adicionar Tarefa</h1>
      <div className="div-tarefa">
        <div className="input-das-tarefas">
          <textarea
            className="text-area"
            value={novaTarefa}
            onInput={(e) => setNovaTarefa(e.target.value)}
            placeholder="Digite a tarefa :D"
          />
          <input
            className="tarefa-input"
            type="text"
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
            placeholder="Digite a categoria :D"
          />
          <input
            className="tarefa-input"
            type="text"
            value={novoUsuario}
            onChange={(e) => setNovoUsuario(e.target.value)}
            placeholder="Digite o usuário :D"
          />
        </div>
        <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
      </div>

      <button onClick={() => setTarefasVisiveis(!tarefasVisiveis)}>
        {tarefasVisiveis
          ? 'Ocultar Tarefas Adicionadas'
          : 'Mostrar Tarefas Adicionadas'}
      </button>

      {tarefasVisiveis && (
        <div id="mostrarTarefas">
          {tarefas.map((tarefa, index) => (
            <div key={index} className="itemlista">
              {edicaoAtiva.ativa && edicaoAtiva.index === index ? (
                <div className="editando-tarefa">
                  <textarea
                    className="text-area"
                    value={edicaoAtiva.valor}
                    onInput={(e) =>
                      setEdicaoAtiva({ ...edicaoAtiva, valor: e.target.value })
                    }
                    defaultValue={edicaoAtiva.valor}
                  />
                  <div className="button-editando-tarefa">
                    <button onClick={salvarEdicaoTarefa}>Salvar Edição</button>
                    <button onClick={cancelarEdicaoTarefa}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>{tarefa.descricao}</h3>
                  <p>
                    <strong>Categoria:</strong> {tarefa.categoria}
                  </p>
                  <p>
                    <strong>Usuário:</strong> {tarefa.usuario}
                  </p>
                  <div className="botao">
                    <button onClick={() => editarTarefa(index)}>Editar</button>
                    <button onClick={() => excluirTarefa(index)}>
                      Excluir
                    </button>
                    <button
                      onClick={() =>
                        setComentariosVisiveis((prevState) =>
                          prevState.map((visivel, i) =>
                            i === index ? !visivel : visivel,
                          ),
                        )
                      }
                    >
                      Mostrar/Esconder Comentários
                    </button>
                  </div>
                  {comentariosVisiveis[index] && (
                    <Comentarios
                      tarefaIndex={index}
                      comentarios={tarefa.comentarios}
                      adicionarComentario={adicionarComentario}
                      usuarios={usuarios}
                      editarComentario={editarComentario}
                      excluirComentario={excluirComentario}
                      comentariosVisiveis={comentariosVisiveis}
                      setComentariosVisiveis={setComentariosVisiveis}
                      tarefas={tarefas}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tarefa;
