const ItemTag = ({ id, tag, onEditar, onDelete }) => {
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
      <p>
        <strong>Tag:</strong> {tag}
      </p>

      <button
        onClick={() =>
          onEditar({
            id,
            tag,
            tipo: 'tag',
          })
        }
      >
        Editar
      </button>
      <button onClick={onDelete}>Excluir</button>
    </div>
  )
}

export default ItemTag
