const API_URL = 'http://localhost:3000'

const request = async (endpoint, method, body) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Erro na requisição')
  }

  return response.json()
}

export const inserirProduto = (data) => {
  return request('/produto', 'POST', data)
}

export const inserirTag = (data) => {
  return request('/tag', 'POST', data)
}


export const inserirEstoque = (data) => {
  return request('/estoque', 'POST', data)
}