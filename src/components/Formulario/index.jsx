import React, { useState } from "react";
import FormularioProduto from "./FormularioProduto";
import FormularioTag from "./FormularioTag";
import FormularioEstoque from "./FormularioEstoque";
import "./Formulario.css";

const Formulario = () => {
  const [tipo, setTipo] = useState("produto");

  const trocarFormulario = () => {
    if (tipo === "produto") setTipo("tag");
    else if (tipo === "tag") setTipo("estoque");
    else setTipo("produto");
  };

  return (
    <div className="painel">
      <button onClick={trocarFormulario}>Trocar</button>

      {tipo === "produto" && <FormularioProduto />}
      {tipo === "tag" && <FormularioTag />}
      {tipo === "estoque" && <FormularioEstoque />}
    </div>
  );
};

export default Formulario;
