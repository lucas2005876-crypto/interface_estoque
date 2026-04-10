const ItemProduto = ({ id, product, description, onEditar, onDelete }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <h3>{product}</h3>

      <p>
        <strong>Descrição:</strong> {description}
      </p>

      <button
        onClick={() =>
          onEditar({
            id,
            product,
            description,
            tipo: 'produto',
          })
        }
      >
        Editar
      </button>
      <button onClick={onDelete}>Excluir</button>
    </div>
  )
}

export default ItemProduto
