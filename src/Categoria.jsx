import React, { useState } from 'react';

const Categoria = ({
  categorias,
  setCategorias,
  setCategoriasVisiveis,
  categoriasVisiveis,
  tarefas,
  setTarefas,
}) => {
  const [novaCategoria, setNovaCategoria] = useState('');
  const [editando, setEditando] = useState({
    ativa: false,
    index: null,
    valor: '',
  });

  const adicionarCategoria = () => {
    if (novaCategoria.trim() !== '' && !categorias.includes(novaCategoria)) {
      setCategorias([novaCategoria, ...categorias]);
      setNovaCategoria('');
    }
  };

  const excluirCategoria = (index) => {
    const novasCategorias = [...categorias];
    const categoriaExcluida = novasCategorias[index];
    novasCategorias.splice(index, 1);
    setCategorias(novasCategorias);

    const novaListaTarefas = tarefas.map((tarefa) =>
      tarefa.categoria === categoriaExcluida
        ? { ...tarefa, categoria: 'FOI EXCLUÍDA' }
        : tarefa,
    );
    setTarefas(novaListaTarefas);
  };

  const iniciarEdicao = (index, categoria) => {
    setEditando({ ativa: true, index, valor: categoria });
  };

  const salvarEdicao = () => {
    const novasCategorias = [...categorias];
    const categoriaAntiga = categorias[editando.index];
    novasCategorias[editando.index] = editando.valor;
    setCategorias(novasCategorias);

    const novaListaTarefas = tarefas.map((tarefa) =>
      tarefa.categoria === categoriaAntiga
        ? { ...tarefa, categoria: editando.valor }
        : tarefa,
    );
    setTarefas(novaListaTarefas);

    setEditando({ ativa: false, index: null, valor: '' });
  };

  const cancelarEdicao = () => {
    setEditando({ ativa: false, index: null, valor: '' });
  };

  return (
    <div className="categoria">
      <button onClick={() => setCategoriasVisiveis(!categoriasVisiveis)}>
        {categoriasVisiveis
          ? 'Ocultar Categorias Adicionadas'
          : 'Mostrar/Adicionar Categorias'}
      </button>
      {categoriasVisiveis && (
        <div className="lista-categorias">
          <div className="lista">
            <h2>Lista de Categorias</h2>
            <input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Digite a nova categoria :D"
            />
            <button className="botao" onClick={adicionarCategoria}>
              Adicionar Categoria
            </button>
            <ul>
              {categorias.map((categoria, index) => (
                <li key={index} className="itemlista">
                  {editando.ativa && editando.index === index ? (
                    <div className="botao2">
                      <input
                        type="text"
                        value={editando.valor}
                        onChange={(e) =>
                          setEditando({ ...editando, valor: e.target.value })
                        }
                      />
                      <div className="botoes">
                        <button onClick={salvarEdicao}>Salvar Edição</button>
                        <button onClick={cancelarEdicao}>Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="botao2">
                      {categoria}
                      <div className="botoes">
                        <button onClick={() => iniciarEdicao(index, categoria)}>
                          Editar
                        </button>
                        <button onClick={() => excluirCategoria(index)}>
                          Excluir
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categoria;
