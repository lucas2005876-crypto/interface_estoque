import  { useState } from "react";
import { inserirTag } from "../../api";

const FormularioTag = () => {
  const [tag, setTag] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await inserirTag({ tag });
      alert("Tag cadastrada!");
      setTag("");
    } catch (error) {
      alert("Erro ao cadastrar tag");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tag</h2>

      <input
        type="text"
        placeholder="Nome da tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        required
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default FormularioTag;
