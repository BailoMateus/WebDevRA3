// main.js
// Conecta o HTML com a API (api.js) e com as validações (validacoes.js).

// Estado local (atualização otimista)
let livros = [];
let acaoAtual = null; // 'create' | 'edit' | 'delete'

// Chave usada no localStorage para compartilhar livros com o catálogo
const STORAGE_KEY = "livrosBiblioteca";

function salvarLivrosNoStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(livros));
  } catch (e) {
    console.error("Erro ao salvar livros no localStorage:", e);
  }
}

function carregarLivrosDoStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return null;
  } catch (e) {
    console.error("Erro ao carregar livros do localStorage:", e);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const tabelaBody = document.querySelector("#tabela-livros tbody");
  const formSection = document.getElementById("form-section");
  const formLivro = document.getElementById("form-livro");

  const inputId = document.getElementById("id");
  const inputTitulo = document.getElementById("titulo");
  const inputAutor = document.getElementById("autor");
  const inputAno = document.getElementById("ano");
  const inputGenero = document.getElementById("genero");

  const btnCadastrar = document.getElementById("btn-cadastrar");
  const btnEditar = document.getElementById("btn-editar");
  const btnDeletar = document.getElementById("btn-deletar");
  const btnConcluir = document.getElementById("btn-concluir");

  // Se não estiver na página de CRUD, não faz nada
  if (!tabelaBody || !formSection || !formLivro) {
    return;
  }

  // 1) Tenta carregar livros do localStorage; se não tiver, busca na API
  const livrosSalvos = carregarLivrosDoStorage();

  if (livrosSalvos && livrosSalvos.length > 0) {
    livros = livrosSalvos;
    renderizarTabela(tabelaBody);
  } else {
    carregarLivrosIniciais();
  }

  // 2) Botões que escolhem a ação CRUD
  btnCadastrar.addEventListener("click", () => {
    acaoAtual = "create";
    prepararFormularioParaAcao("create");
    mostrarFormulario();
  });

  btnEditar.addEventListener("click", () => {
    acaoAtual = "edit";
    prepararFormularioParaAcao("edit");
    mostrarFormulario();
  });

  btnDeletar.addEventListener("click", () => {
    acaoAtual = "delete";
    prepararFormularioParaAcao("delete");
    mostrarFormulario();
  });

  // 3) Submit do formulário (Concluir)
  formLivro.addEventListener("submit", async (event) => {
    event.preventDefault();
    limparErrosFormulario();

    if (!acaoAtual) {
      alert("Selecione Cadastrar, Editar ou Deletar antes de usar o formulário.");
      return;
    }

    const idValor = inputId.value;
    const tituloValor = inputTitulo.value;
    const autorValor = inputAutor.value;
    const anoValor = inputAno.value;
    const generoValor = inputGenero.value;

    const erros = {};

    // ID é obrigatório para edit/delete
    const resultadoId = validarId(idValor, acaoAtual !== "create");
    if (!resultadoId.valido) {
      erros.id = resultadoId.mensagem;
    }

    // Para delete, só ID é necessário
    if (acaoAtual !== "delete") {
      const resultadoTitulo = validarTitulo(tituloValor);
      if (!resultadoTitulo.valido) erros.titulo = resultadoTitulo.mensagem;

      const resultadoAutor = validarAutor(autorValor);
      if (!resultadoAutor.valido) erros.autor = resultadoAutor.mensagem;

      const resultadoAno = validarAno(anoValor);
      if (!resultadoAno.valido) erros.ano = resultadoAno.mensagem;

      const resultadoGenero = validarGenero(generoValor);
      if (!resultadoGenero.valido) erros.genero = resultadoGenero.mensagem;
    }

    // Se houver erros, mostra e não chama a API
    if (Object.keys(erros).length > 0) {
      exibirErrosFormulario(erros);
      return;
    }

    try {
      if (acaoAtual === "create") {
        const novoLivro = {
          title: tituloValor.trim(),
          author: autorValor.trim(),
          year: Number(anoValor),
          genre: generoValor.trim()
        };

          // Faz o POST apenas para simular a requisição,
          // mas não vamos confiar no id que ela devolve.
      await createBook(novoLivro);

        // Gera um id único baseado no maior id atual
    const maiorIdAtual = livros.length > 0
    ? Math.max(...livros.map((livro) => Number(livro.id) || 0))
    : 0;

  const livroComId = {
    ...novoLivro,
    id: maiorIdAtual + 1
  };

  // Atualização otimista: adiciona no array local
  livros.push(livroComId);
  renderizarTabela(tabelaBody);
  salvarLivrosNoStorage();
  alert("Livro cadastrado com sucesso!");
} else if (acaoAtual === "edit") {
        const idNum = Number(idValor);
        const dadosAtualizados = {
          title: tituloValor.trim(),
          author: autorValor.trim(),
          year: Number(anoValor),
          genre: generoValor.trim()
        };

        // PUT na API
        const atualizado = await updateBook(idNum, dadosAtualizados);

        // Atualização otimista: altera no array local
        livros = livros.map((livro) =>
          livro.id === idNum ? { ...livro, ...atualizado } : livro
        );
        renderizarTabela(tabelaBody);
        salvarLivrosNoStorage();
        alert("Livro atualizado com sucesso!");

      } else if (acaoAtual === "delete") {
        const idNum = Number(idValor);

        // Remoção otimista: tira da lista antes da resposta
        const backup = [...livros];
        livros = livros.filter((livro) => livro.id !== idNum);
        renderizarTabela(tabelaBody);
        salvarLivrosNoStorage();

        try {
          await deleteBook(idNum);
          alert("Livro excluído com sucesso!");
        } catch (erro) {
          // Se der erro no DELETE, volta o estado antigo
          console.error(erro);
          livros = backup;
          renderizarTabela(tabelaBody);
          salvarLivrosNoStorage();
          alert("Não foi possível excluir o livro. Alteração desfeita.");
        }
      }

      formLivro.reset();
      esconderFormulario();
      acaoAtual = null;
    } catch (erro) {
      console.error(erro);
      alert("Ocorreu um erro ao processar a operação. Tente novamente.");
    }
  });

  // =========================
  // FUNÇÕES AUXILIARES
  // =========================

  async function carregarLivrosIniciais() {
    try {
      const dados = await getBooks(5); // pega só alguns livros da API
      livros = dados;
      renderizarTabela(tabelaBody);
      salvarLivrosNoStorage();
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível carregar os livros iniciais da API.");
    }
  }

  function renderizarTabela(tbody) {
    tbody.innerHTML = "";

    if (livros.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 5;
      td.textContent = "Nenhum livro cadastrado.";
      td.style.textAlign = "center";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    livros.forEach((livro) => {
      const tr = document.createElement("tr");

      const tdId = document.createElement("td");
      tdId.textContent = livro.id;

      const tdTitulo = document.createElement("td");
      tdTitulo.textContent = livro.title;

      const tdAutor = document.createElement("td");
      tdAutor.textContent = livro.author;

      const tdAno = document.createElement("td");
      tdAno.textContent = livro.year;

      const tdGenero = document.createElement("td");
      tdGenero.textContent = livro.genre;

      tr.appendChild(tdId);
      tr.appendChild(tdTitulo);
      tr.appendChild(tdAutor);
      tr.appendChild(tdAno);
      tr.appendChild(tdGenero);

      // Clique na linha preenche o formulário (ajuda na edição)
      tr.addEventListener("click", () => {
        inputId.value = livro.id;
        inputTitulo.value = livro.title;
        inputAutor.value = livro.author;
        inputAno.value = livro.year === "—" ? "" : livro.year;
        inputGenero.value = livro.genre;
      });

      tbody.appendChild(tr);
    });
  }

  function mostrarFormulario() {
    formSection.classList.remove("hidden");
  }

  function esconderFormulario() {
    formSection.classList.add("hidden");
  }

  function prepararFormularioParaAcao(acao) {
    formLivro.reset();
    limparErrosFormulario();

    // Por padrão, habilita tudo
    inputId.disabled = false;
    inputTitulo.disabled = false;
    inputAutor.disabled = false;
    inputAno.disabled = false;
    inputGenero.disabled = false;

    if (acao === "create") {
      inputId.disabled = true; // ID não é usado no cadastro
      inputId.placeholder = "Somente para edição ou exclusão";
      btnConcluir.textContent = "Cadastrar livro";
    } else if (acao === "edit") {
      btnConcluir.textContent = "Editar livro";
    } else if (acao === "delete") {
      btnConcluir.textContent = "Deletar livro";
      // Só ID é relevante no delete
      inputTitulo.disabled = true;
      inputAutor.disabled = true;
      inputAno.disabled = true;
      inputGenero.disabled = true;
    }
  }

  function limparErrosFormulario() {
    const inputs = [inputId, inputTitulo, inputAutor, inputAno, inputGenero];
    inputs.forEach((input) => {
      input.style.borderColor = ""; // volta pro padrão
      const span = encontrarOuCriarSpanErro(input, false);
      if (span) span.textContent = "";
    });
  }

  function exibirErrosFormulario(erros) {
    if (erros.id) marcarErro(inputId, erros.id);
    if (erros.titulo) marcarErro(inputTitulo, erros.titulo);
    if (erros.autor) marcarErro(inputAutor, erros.autor);
    if (erros.ano) marcarErro(inputAno, erros.ano);
    if (erros.genero) marcarErro(inputGenero, erros.genero);
  }

  function marcarErro(input, mensagem) {
    input.style.borderColor = "#ff6b6b";
    const span = encontrarOuCriarSpanErro(input, true);
    span.textContent = mensagem;
  }

  function encontrarOuCriarSpanErro(input, criarSeNaoExistir) {
    let proximo = input.nextElementSibling;

    while (proximo && proximo.tagName === "BR") {
      proximo = proximo.nextElementSibling;
    }

    if (proximo && proximo.classList && proximo.classList.contains("erro-campo")) {
      return proximo;
    }

    if (!criarSeNaoExistir) return null;

    const span = document.createElement("small");
    span.classList.add("erro-campo");
    span.style.color = "#ff6b6b";
    span.style.display = "block";
    span.style.marginTop = "4px";
    input.insertAdjacentElement("afterend", span);
    return span;
  }
});
