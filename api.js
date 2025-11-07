
const API_URL = "https://jsonplaceholder.typicode.com/posts";

/**
 * GET – Lista livros 
 * @param {number} limit 
 * @returns {Promise<Array>} 
 */
async function getBooks(limit = 10) {
  const response = await fetch(`${API_URL}?_limit=${limit}`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar livros (GET).");
  }

  const data = await response.json();


  return data.map((post) => ({
    id: post.id,
    title: post.title,
    author: "Autor desconhecido",
    year: "—",
    genre: "—"
  }));
}

/**
 * POST – Cria um novo livro.
 * @param {Object} book 
 * @returns {Promise<Object>} 
 */
async function createBook(book) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(book)
  });

  if (!response.ok) {
    throw new Error("Erro ao criar livro (POST).");
  }

  const created = await response.json();


  return {
    ...book,
    id: created.id
  };
}

/**
 * PUT – Atualiza um livro existente.
 * @param {number} id 
 * @param {Object} updatedData 
 * @returns {Promise<Object>} 
 */
async function updateBook(id, updatedData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(updatedData)
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar livro (PUT).");
  }

  const updated = await response.json();

  return {
    id,
    ...updated
  };
}

/**
 * DELETE – Exclui um livro.
 * @param {number} id 
 * @returns {Promise<void>} 
 */
async function deleteBook(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir livro (DELETE).");
  }


}
