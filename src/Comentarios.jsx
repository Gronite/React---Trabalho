import React, { useState } from 'react';

const Comentarios = ({
  tarefaIndex,
  adicionarComentario,
  editarComentario,
  excluirComentario,
  usuarios,
  tarefas,
}) => {
  const [novoComentario, setNovoComentario] = useState('');
  const [novoUsuarioComentario, setNovoUsuarioComentario] = useState('');
  const [edicaoComentario, setEdicaoComentario] = useState({
    index: null,
    texto: '',
  });

  const adicionarNovoComentario = () => {
    if (
      novoComentario.trim() !== '' &&
      usuarios.includes(novoUsuarioComentario)
    ) {
      adicionarComentario(tarefaIndex, {
        usuario: novoUsuarioComentario,
        comentario: novoComentario,
      });
      setNovoComentario('');
      setNovoUsuarioComentario('');
    }
  };

  const iniciarEdicaoComentario = (index, texto) => {
    setEdicaoComentario({ index, texto });
  };

  const salvarEdicaoComentario = () => {
    editarComentario(
      tarefaIndex,
      edicaoComentario.index,
      edicaoComentario.texto,
    );
    setEdicaoComentario({ index: null, texto: '' });
  };

  const excluirNovoComentario = (index) => {
    excluirComentario(tarefaIndex, index);
  };

  return (
    <div className="comentarios">
      <h2>Comentários</h2>
      <div className="div-comentarios">
        <div className="input-comentarios">
          <input
            type="text"
            value={novoUsuarioComentario}
            onChange={(e) => setNovoUsuarioComentario(e.target.value)}
            placeholder="Nome do Usuário"
          />
          <textarea
            className="text-area"
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Adicionar Comentário"
          />
        </div>
        <button onClick={adicionarNovoComentario}>Adicionar Comentário</button>
      </div>
      <ul>
        {tarefas[tarefaIndex]?.comentarios?.map((comentario, index) => (
          <li key={index} className="itemlista">
            <strong>{comentario.usuario}:</strong>
            {edicaoComentario.index === index ? (
              <div className="botao2">
                <textarea
                  className="text-area"
                  value={edicaoComentario.texto}
                  onChange={(e) =>
                    setEdicaoComentario({
                      ...edicaoComentario,
                      texto: e.target.value,
                    })
                  }
                />
                <div className="botoes">
                  <button onClick={salvarEdicaoComentario}>Salvar</button>
                  <button
                    onClick={() =>
                      setEdicaoComentario({ index: null, texto: '' })
                    }
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="botao2">
                {comentario.comentario}
                <div className="botoes">
                  <button
                    onClick={() =>
                      iniciarEdicaoComentario(index, comentario.comentario)
                    }
                  >
                    Editar
                  </button>
                  <button onClick={() => excluirNovoComentario(index)}>
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comentarios;
