const API_URL = 'http://localhost:3000'

const request = async (endpoint, method, body) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_URL}${endpoint}`, options)

  if (!response.ok) {
    throw new Error('Erro na requisição')
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export const inserirProduto = (data) => {
  return request('/produtos', 'POST', data)
}

export const inserirTag = (data) => {
  return request('/tags', 'POST', data)
}

export const inserirEstoque = (data) => {
  return request('/estoque', 'POST', data)
}

export const getProdutos = () => {
  return request('/produtos', 'GET')
}

export const getTags = () => {
  return request('/tags', 'GET')
}

export const getEstoque = () => {
  return request('/estoque', 'GET')
}

export const getProdutoById = (id) => {
  return request(`/produtos/${id}`, 'GET')
}

export const getTagById = (id) => {
  return request(`/tags/${id}`, 'GET')
}

export const updateProduto = (id, data) => {
  return request(`/produtos/${id}`, 'PUT', data)
}

export const updateTag = (id, data) => {
  return request(`/tags/${id}`, 'PUT', data)
}

export const updateEstoque = (id, data) => {
  return request(`/estoque/${id}`, 'PUT', data)
}

export const deleteProduto = (id) => {
  return request(`/produtos/${id}`, 'DELETE')
}

export const deleteTag = (id) => {
  return request(`/tags/${id}`, 'DELETE')
}

export const deleteEstoque = (id) => {
  return request(`/estoque/${id}`, 'DELETE')
}

export const getEstoqueFiltrado = ({ categoria, precoMin, precoMax }) => {
  let query = []

  if (categoria) query.push(`categoria=${categoria}`)
  if (precoMin) query.push(`precoMin=${precoMin}`)
  if (precoMax) query.push(`precoMax=${precoMax}`)

  const queryString = query.length ? `?${query.join('&')}` : ''

  return request(`/estoque/filtro${queryString}`, 'GET')
}
