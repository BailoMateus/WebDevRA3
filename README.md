# Biblioteca Online – Aplicação Web com CRUD e Fetch

Projeto desenvolvido como trabalho da disciplina de Desenvolvimento Web, com o objetivo de implementar uma aplicação completa utilizando HTML, CSS e JavaScript, integrando:

- Operações CRUD com Fetch API  
- Consumo da API pública JSONPlaceholder  
- Validações de formulário  
- Atualização otimista na interface  
- Organização modular em múltiplos arquivos JavaScript

---

## Sobre o projeto

A aplicação simula o sistema de uma biblioteca online. Na página principal, o usuário consegue:

- Listar livros vindos da API;
- Cadastrar novos livros;
- Editar livros existentes;
- Excluir livros;
- Visualizar as alterações imediatamente na tabela (atualização otimista).

Além da página principal, o sistema possui outras páginas estáticas para compor o site:

- Catálogo de livros  
- Sobre  
- Contato  
- Login (simulada)

---

## Funcionalidades principais

- CRUD de livros usando Fetch API (GET, POST, PUT, DELETE)
- Integração com a API pública JSONPlaceholder (`/posts`)
- Validação de campos antes do envio:
  - Título com no mínimo 3 caracteres
  - Autor, ano e gênero obrigatórios
  - ID obrigatório para edição e exclusão
- Atualização otimista:
  - A tabela é atualizada imediatamente após a ação
  - Em caso de erro, o estado anterior é restaurado
- Interface responsiva em HTML e CSS, pensada para desktop e uso básico em telas menores

---

## Tecnologias utilizadas

| Camada        | Tecnologias                |
|--------------|----------------------------|
| Estrutura    | HTML5                      |
| Estilo       | CSS3                       |
| Lógica       | JavaScript (ES6)           |
| Requisições  | Fetch API                  |
| Backend fake | JSONPlaceholder (`/posts`) |

Nenhum framework foi utilizado. Todo o código é escrito em JavaScript puro.

---

## Estrutura do projeto

```txt
BibliotecaOnline/
├── Static/
│   ├── index.html        # Página principal (CRUD)
│   ├── catalogo.html     # Catálogo de livros
│   ├── contato.html      # Página de contato
│   ├── login.html        # Página de login (simulada)
│   └── sobre.html        # Página "Sobre"
│
├── Scripts/
│   ├── api.js            # Comunicação com a API (CRUD via Fetch)
│   ├── validacoes.js     # Regras de validação dos formulários
│   └── main.js           # Lógica principal da aplicação (DOM + API + validações)
│
├── Style/
│   └── style.css         # Estilos globais e responsividade
│
└── Anexos/
    ├── background.jpg
    └── books-1842306_1280.jpg


```
Organização dos arquivos JavaScript
api.js – módulo de comunicação com a API
Responsável por todas as requisições HTTP para a API JSONPlaceholder.

Funções principais:

getBooks(limit)

Faz uma requisição GET para buscar uma lista de livros.

createBook(book)

Envia um POST para criar um novo livro.

updateBook(id, updatedData)

Envia um PUT para atualizar um livro existente.

deleteBook(id)

Envia um DELETE para remover um livro.

Este arquivo não conhece a interface. Ele apenas envia e recebe dados.

validacoes.js – módulo de validação
Contém funções puras para validar os campos do formulário, sem acessar o DOM diretamente e sem chamar a API.

Principais funções:

validarTitulo(titulo)

validarAutor(autor)

validarAno(ano)

validarGenero(genero)

validarId(id, obrigatorio)

Cada função retorna um objeto indicando se o campo é válido e, em caso de erro, qual mensagem deve ser exibida.

main.js – lógica principal e integração
É o arquivo que conecta tudo:

Usa api.js para chamar a API;

Usa validacoes.js para validar os dados;

Manipula o DOM (tabela, formulário, botões);

Mantém o estado local dos livros (lista em memória).

Principais responsabilidades:

Carregar livros iniciais da API ao abrir a página;

Controlar a ação atual (cadastrar, editar ou excluir);

Validar os campos antes de cada operação;

Atualizar a tabela de livros dinamicamente;

Preencher o formulário ao clicar em uma linha da tabela;

Realizar atualização otimista:

Adiciona, altera ou remove da lista local antes da resposta definitiva;

Em caso de erro, restaura os dados anteriores.

Requisições Fetch (CRUD)
As chamadas à API seguem o seguinte padrão (resumido):

Listar livros (GET):

js
Copiar código
getBooks(5);
Criar livro (POST):

js
Copiar código
createBook({
  title: "Novo livro",
  author: "Autor X",
  year: 2024,
  genre: "Ficção"
});
Atualizar livro (PUT):

js
Copiar código
updateBook(1, {
  title: "Título atualizado"
});
Deletar livro (DELETE):

js
Copiar código
deleteBook(1);
O JSONPlaceholder não persiste essas alterações, por isso o projeto usa estado local e atualização otimista para simular um backend real.

Como executar o projeto
Clone ou baixe o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/biblioteca-online-crud.git
cd biblioteca-online-crud
Abra o arquivo Static/index.html diretamente no navegador
(ou sirva o projeto com uma extensão como Live Server, se preferir).

Use o menu para navegar entre as páginas:

Início (CRUD)

Catálogo

Contato

Sobre

Login

Na página principal:

Clique em Cadastrar, Editar ou Deletar para definir a ação;

Preencha o formulário conforme a ação selecionada;

Confirme e observe a atualização da tabela.

Nenhuma instalação adicional é necessária.
