import React from 'react'

const Formulario = () => {
 return (
  <div className="painel">
    <button onClick={trocarFormulario}>></button>

    {tipo === 'produto' && <FormularioProduto />}
    {tipo === 'tag' && <FormularioTag />}
    {tipo === 'estoque' && <FormularioEstoque />}
  </div>
)
}

export default Formulario
