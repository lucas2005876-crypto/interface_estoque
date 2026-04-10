import { useState } from "react";
import { inserirEstoque } from "../../api";

const FormularioEstoque = () => {
  const [idProduct, setIdProduct] = useState("");
  const [idTag, setIdTag] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await inserirEstoque({
        idProduct: Number(idProduct),
        idTag: Number(idTag),
        categoria,
        preco: Number(preco),
        quantidade: Number(quantidade),
      });

      alert("Item cadastrado!");

      setIdProduct("");
      setIdTag("");
      setCategoria("");
      setPreco("");
      setQuantidade("");
    } catch (error) {
      alert("Erro ao cadastrar item no estoque");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Estoque</h2>

      <input
        type="number"
        placeholder="ID do Produto"
        value={idProduct}
        onChange={(e) => setIdProduct(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="ID da Tag"
        value={idTag}
        onChange={(e) => setIdTag(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default FormularioEstoque;
