import { useEffect, useState } from 'react'
import {
  getEstoque,
  getProdutos,
  getTags,
  updateEstoque,
  updateProduto,
  updateTag,
  deleteEstoque,
  deleteProduto,
  deleteTag,
  getEstoqueFiltrado,
} from '../../api'

import ItemEstoque from './ItemEstoque'
import ItemProduto from './ItemProduto'
import ItemTag from './ItemTag'

const ListaEstoque = () => {
  const [estoque, setEstoque] = useState([])
  const [produtos, setProdutos] = useState([])
  const [tags, setTags] = useState([])

  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [precoMin, setPrecoMin] = useState('')
  const [precoMax, setPrecoMax] = useState('')

  const [itemEditando, setItemEditando] = useState(null)

  const carregarDados = async () => {
    try {
      const estoqueData = await getEstoque()
      const produtosData = await getProdutos()
      const tagsData = await getTags()

      setEstoque(estoqueData)
      setProdutos(produtosData)
      setTags(tagsData)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  // ✅ UPDATE
  const salvarEdicao = async () => {
    try {
      if (itemEditando.tipo === 'estoque') {
        await updateEstoque(itemEditando.id, {
          idProduct: itemEditando.idProduct,
          idTag: itemEditando.idTag,
          categoria: itemEditando.categoria,
          preco: itemEditando.preco,
          quantidade: itemEditando.quantidade,
        })
      }

      if (itemEditando.tipo === 'produto') {
        await updateProduto(itemEditando.id, {
          product: itemEditando.product,
          description: itemEditando.description,
        })
      }

      if (itemEditando.tipo === 'tag') {
        await updateTag(itemEditando.id, {
          tag: itemEditando.tag,
        })
      }

      setItemEditando(null)
      await carregarDados()
    } catch (error) {
      console.error('Erro ao editar:', error)
    }
  }

  // ✅ DELETE
  const deletarItem = async (tipo, id) => {
    if (!window.confirm('Tem certeza que deseja excluir?')) return

    try {
      if (tipo === 'estoque') await deleteEstoque(id)
      if (tipo === 'produto') await deleteProduto(id)
      if (tipo === 'tag') await deleteTag(id)

      await carregarDados()
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  // ✅ FILTRO
  const aplicarFiltro = async () => {
    try {
      if (!categoriaFiltro && !precoMin && !precoMax) {
        return carregarDados()
      }

      const data = await getEstoqueFiltrado({
        categoria: categoriaFiltro,
        precoMin,
        precoMax,
      })

      setEstoque(data)
    } catch (error) {
      console.error('Erro ao filtrar:', error)
    }
  }

  return (
    <div>
      <h1>Estoque</h1>

      {/* FILTRO */}
      <h2>Filtrar</h2>

      <input
        placeholder='Categoria'
        value={categoriaFiltro}
        onChange={(e) => setCategoriaFiltro(e.target.value)}
      />

      <input
        type='number'
        placeholder='Preço mínimo'
        value={precoMin}
        onChange={(e) => setPrecoMin(e.target.value)}
      />

      <input
        type='number'
        placeholder='Preço máximo'
        value={precoMax}
        onChange={(e) => setPrecoMax(e.target.value)}
      />

      <button onClick={aplicarFiltro}>Filtrar</button>
      <button onClick={carregarDados}>Limpar</button>

      {/* EDIÇÃO */}
      {itemEditando && (
        <div>
          <h2>Editando ID: {itemEditando.id}</h2>

          {itemEditando.tipo === 'estoque' && (
            <>
              <input
                placeholder='Categoria'
                value={itemEditando.categoria}
                onChange={(e) =>
                  setItemEditando({
                    ...itemEditando,
                    categoria: e.target.value,
                  })
                }
              />

              <input
                type='number'
                placeholder='Preço'
                value={itemEditando.preco}
                onChange={(e) =>
                  setItemEditando({
                    ...itemEditando,
                    preco: Number(e.target.value),
                  })
                }
              />

              <input
                type='number'
                placeholder='Quantidade'
                value={itemEditando.quantidade}
                onChange={(e) =>
                  setItemEditando({
                    ...itemEditando,
                    quantidade: Number(e.target.value),
                  })
                }
              />
            </>
          )}

          {itemEditando.tipo === 'produto' && (
            <>
              <input
                placeholder='Produto'
                value={itemEditando.product}
                onChange={(e) =>
                  setItemEditando({
                    ...itemEditando,
                    product: e.target.value,
                  })
                }
              />

              <input
                placeholder='Descrição'
                value={itemEditando.description}
                onChange={(e) =>
                  setItemEditando({
                    ...itemEditando,
                    description: e.target.value,
                  })
                }
              />
            </>
          )}

          {itemEditando.tipo === 'tag' && (
            <input
              placeholder='Tag'
              value={itemEditando.tag}
              onChange={(e) =>
                setItemEditando({
                  ...itemEditando,
                  tag: e.target.value,
                })
              }
            />
          )}

          <button onClick={salvarEdicao}>Salvar</button>
          <button onClick={() => setItemEditando(null)}>Cancelar</button>
        </div>
      )}

      {/* ESTOQUE */}
      {estoque.map((item) => (
        <ItemEstoque
          key={item.id}
          id={item.id}
          idProduct={item.idProduct}
          idTag={item.idTag}
          categoria={item.categoria}
          preco={item.preco}
          quantidade={item.quantidade}
          onEditar={setItemEditando}
          onDelete={() => deletarItem('estoque', item.id)}
        />
      ))}

      <hr />

      {/* PRODUTOS */}
      <h1>Produtos</h1>

      {produtos.map((produto) => (
        <ItemProduto
          key={produto.id}
          id={produto.id}
          product={produto.product}
          description={produto.description}
          onEditar={setItemEditando}
          onDelete={() => deletarItem('produto', produto.id)}
        />
      ))}

      <hr />

      {/* TAGS */}
      <h1>Tags</h1>

      {tags.map((tag) => (
        <ItemTag
          key={tag.id}
          id={tag.id}
          tag={tag.tag}
          onEditar={setItemEditando}
          onDelete={() => deletarItem('tag', tag.id)}
        />
      ))}
    </div>
  )
}

export default ListaEstoque
