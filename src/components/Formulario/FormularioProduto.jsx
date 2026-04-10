import { useState } from "react";
import { inserirProduto } from "../../api";

const FormularioProduto = () => {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await inserirProduto({ product, description });
      alert("Produto cadastrado!");
      setProduct("");
      setDescription("");
    } catch (error) {
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={product} onChange={(e) => setProduct(e.target.value)} />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default FormularioProduto;
