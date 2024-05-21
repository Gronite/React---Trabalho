import React, { useState } from 'react';

const Usuario = ({
  usuarios,
  setUsuarios,
  setUsuariosVisiveis,
  usuariosVisiveis,
  tarefas,
  setTarefas,
}) => {
  const [novoUsuario, setNovoUsuario] = useState('');
  const [editando, setEditando] = useState({
    ativa: false,
    index: null,
    valor: '',
  });

  const adicionarUsuario = () => {
    if (novoUsuario.trim() !== '' && !usuarios.includes(novoUsuario)) {
      setUsuarios([novoUsuario, ...usuarios]);
      setNovoUsuario('');
    }
  };

  const excluirUsuario = (index) => {
    const novosUsuarios = [...usuarios];
    const usuarioExcluido = novosUsuarios[index];
    novosUsuarios.splice(index, 1);
    setUsuarios(novosUsuarios);

    const novaListaTarefas = tarefas.map((tarefa) => {
      const novaTarefa =
        tarefa.usuario === usuarioExcluido
          ? { ...tarefa, usuario: 'FOI EXCLUÍDO' }
          : tarefa;

      const novosComentarios = tarefa.comentarios.map((comentario) =>
        comentario.usuario === usuarioExcluido
          ? { ...comentario, usuario: 'FOI EXCLUÍDO' }
          : comentario,
      );

      return { ...novaTarefa, comentarios: novosComentarios };
    });

    setTarefas(novaListaTarefas);
  };

  const iniciarEdicao = (index, usuario) => {
    setEditando({ ativa: true, index, valor: usuario });
  };

  const salvarEdicao = () => {
    const novosUsuarios = [...usuarios];
    const usuarioAntigo = usuarios[editando.index];
    const usuarioNovo = editando.valor;

    novosUsuarios[editando.index] = usuarioNovo;
    setUsuarios(novosUsuarios);

    const novaListaTarefas = tarefas.map((tarefa) => {
      const novaTarefa =
        tarefa.usuario === usuarioAntigo
          ? { ...tarefa, usuario: usuarioNovo }
          : tarefa;

      const novosComentarios = tarefa.comentarios.map((comentario) =>
        comentario.usuario === usuarioAntigo
          ? { ...comentario, usuario: usuarioNovo }
          : comentario,
      );

      return { ...novaTarefa, comentarios: novosComentarios };
    });

    setTarefas(novaListaTarefas);

    cancelarEdicao();
  };

  const cancelarEdicao = () => {
    setEditando({ ativa: false, index: null, valor: '' });
  };

  return (
    <div className="usuario">
      <button onClick={() => setUsuariosVisiveis(!usuariosVisiveis)}>
        {usuariosVisiveis
          ? 'Ocultar Usuários Adicionados'
          : 'Mostrar/Adicionar Usuários'}
      </button>
      {usuariosVisiveis && (
        <div className="adiciona">
          <div className="lista">
            <h2>Lista de Usuários</h2>
            <input
              type="text"
              value={novoUsuario}
              onChange={(e) => setNovoUsuario(e.target.value)}
              placeholder="Digite o novo usuário :D"
            />
            <button className="botao" onClick={adicionarUsuario}>
              Adicionar Usuário
            </button>
            <ul>
              {usuarios.map((usuario, index) => (
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
                      {usuario}
                      <div className="botoes">
                        <button onClick={() => iniciarEdicao(index, usuario)}>
                          Editar
                        </button>
                        <button onClick={() => excluirUsuario(index)}>
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

export default Usuario;
