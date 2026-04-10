import { useEffect, useState } from 'react'
import { getProdutoById, getTagById } from '../../api'

const ItemEstoque = ({
  id,
  idProduct,
  idTag,
  Categoria,
  Preco,
  Quantidade,
  onEditar,
  onDelete,
}) => {
  const [produto, setProduto] = useState(null)
  const [tag, setTag] = useState(null)

  useEffect(() => {
    if (!idProduct || !idTag) return

    const carregarDados = async () => {
      try {
        const produtoData = await getProdutoById(idProduct)
        const tagData = await getTagById(idTag)

        setProduto(produtoData)
        setTag(tagData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }

    carregarDados()
  }, [idProduct, idTag])

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
      <h3>{produto ? produto.product : 'Carregando produto...'}</h3>

      <p>
        <strong>Descrição:</strong> {produto ? produto.description : '...'}
      </p>

      <p>
        <strong>Tag:</strong> {tag ? tag.tag : 'Carregando tag...'}
      </p>

      <p>
        <strong>Categoria:</strong> {Categoria}
      </p>
      <p>
        <strong>Preço:</strong> R$ {Preco}
      </p>
      <p>
        <strong>Quantidade:</strong> {Quantidade}
      </p>

      <button
        onClick={() =>
          onEditar({
            id,
            idProduto: idProduct,
            idTag,
            categoria: Categoria,
            preco: Preco,
            quantidade: Quantidade,
            tipo: 'estoque',
          })
        }
      >
        Editar
      </button>
      <button onClick={onDelete}>Excluir</button>
    </div>
  )
}

export default ItemEstoque
