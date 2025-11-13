// catalogo.js
// Lê os livros salvos no localStorage e monta o catálogo na página catalogo.html

const STORAGE_KEY = "livrosBiblioteca";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("livros-container");

  if (!container) return;

  let dados = localStorage.getItem(STORAGE_KEY);

  if (!dados) {
    // Não há livros salvos ainda, mantém o conteúdo padrão
    return;
  }

  try {
    dados = JSON.parse(dados);
  } catch (e) {
    console.error("Erro ao ler livros do localStorage:", e);
    return;
  }

  if (!Array.isArray(dados) || dados.length === 0) {
    // Lista vazia, mantém placeholder
    return;
  }

  
  container.innerHTML = "";

  dados.forEach((livro) => {
    const div = document.createElement("div");
    div.className = "livroapareceu";

    div.innerHTML = `
      <p><strong>ID:</strong> ${livro.id}</p>
      <p><strong>Título:</strong> ${livro.title}</p>
      <p><strong>Autor:</strong> ${livro.author}</p>
      <p><strong>Ano de Lançamento:</strong> ${livro.year}</p>
      <p><strong>Gênero:</strong> ${livro.genre}</p>
    `;
    container.appendChild(div);
  });
});
