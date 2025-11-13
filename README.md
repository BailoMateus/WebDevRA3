Biblioteca Online – Aplicação Web com CRUD e Fetch

Este projeto consiste no desenvolvimento de uma aplicação Web simulando o sistema de uma biblioteca online.
O objetivo é integrar HTML, CSS e JavaScript utilizando requisições HTTP por meio de Fetch API, aplicando operações CRUD, validações de formulários e atualização otimista, garantindo uma interface funcional e responsiva.

O sistema foi dividido de forma modular para facilitar manutenção, entendimento do código e clareza arquitetural.

1. Objetivo do Projeto

O projeto foi desenvolvido com os seguintes objetivos:

Criar uma aplicação Web completa, estruturada em múltiplas páginas.

Implementar operações CRUD (Create, Read, Update, Delete) utilizando Fetch API.

Consumir dados de uma API pública (JSONPlaceholder) para simular interações reais.

Garantir atualização otimista dos dados: a interface reflete a ação imediatamente, mesmo sem persistência real no servidor.

Criar formulários com validações de entrada.

Manter organização em pastas para separar HTML, CSS e JavaScript.

Desenvolver uma interface responsiva, simples e clara para o usuário.

2. Estrutura da Aplicação

O projeto possui múltiplas páginas estáticas que compõem o sistema:

Página principal (index.html)

Contém o sistema CRUD.

Mostra a tabela com os livros carregados da API.

Permite cadastrar, editar e excluir livros.

Exibe o formulário dinâmico conforme a ação escolhida.

Atualiza os dados na interface de forma otimista.

Página de catálogo (catalogo.html)

Exibe um catálogo fictício de livros.

Apresentação visual simples de exemplares.

Conteúdo estático, voltado apenas para exibição.

Página de contato (contato.html)

Formulário de contato simples.

Demonstrativo de interface, não conectado à API.

Página sobre (sobre.html)

Traz informações institucionais do projeto.

Explica o propósito e as tecnologias utilizadas.

Página de login (login.html)

Página simulada, voltada apenas para composição do sistema.

Não há autenticação real (opcional no escopo do trabalho).

3. Arquitetura e Organização de Arquivos

A aplicação utiliza separação em camadas para facilitar entendimento:

/Static
   catalogo.html
   contato.html
   index.html
   login.html
   sobre.html

/Scripts
   api.js
   validacoes.js
   main.js

/Style
   style.css

/Anexos
   background.jpg
   books-1842306_1280.jpg


A seguir, a função de cada grupo de arquivos.

4. Arquivos JavaScript e suas responsabilidades
4.1 api.js

Arquivo responsável exclusivamente pela comunicação com a API JSONPlaceholder.
Ele contém apenas as funções CRUD, sem qualquer lógica de interface.

Funções incluídas:

getBooks() – Busca livros utilizando GET.

createBook() – Envia um POST para criar um livro.

updateBook() – Envia um PUT para atualizar um livro.

deleteBook() – Envia um DELETE para remover um livro.

Este arquivo mantém a separação clara entre lógica de rede e lógica da interface.

4.2 validacoes.js

Arquivo contendo todas as funções de validação de campos do formulário.
Cada validação é isolada para garantir legibilidade e reuso.

Validações implementadas:

validarTitulo() – Garante título com no mínimo 3 caracteres.

validarAutor() – Verifica se o autor foi informado.

validarAno() – Garante que o ano seja inteiro válido.

validarGenero() – Verifica se o gênero foi preenchido.

validarId() – Valida o ID nas operações que exigem esse campo.

O arquivo não interage com o DOM e não chama funções da API, respeitando sua função isolada.

4.3 main.js

Arquivo responsável pela lógica geral da aplicação, integrando interface, validações e API.

Principais responsabilidades:

Controlar o estado local de livros (atualização otimista).

Detectar a ação escolhida: cadastrar, editar ou excluir.

Validar os dados antes de enviar à API.

Preencher a tabela com os livros retornados.

Preencher o formulário automaticamente ao clicar em uma linha da tabela.

Exibir erros de validação diretamente no formulário.

Enviar as requisições para a API por meio das funções de api.js.

Controlar exibição e ocultamento do formulário dinâmico.

O main.js atua como o controlador do sistema, centralizando a lógica de operação.

5. Estilos e Interface
style.css

O arquivo de estilos define:

Layout geral das páginas.

Estrutura das tabelas.

Organização visual dos cartões e seções.

Estilos de formulários e botões.

Cores, espaçamentos e responsividade.

Estilos aplicados às mensagens de erro dos inputs.

A interface foi desenvolvida para ser simples, limpa e funcional em desktop e dispositivos móveis.

6. Atualização Otimista

Como a API JSONPlaceholder não persiste alterações, o projeto utiliza atualização otimista, ou seja:

Após cada POST, PUT ou DELETE, o sistema altera o estado local e atualiza a interface imediatamente.

Mesmo que a API não mantenha os dados, o usuário vê o comportamento como se estivesse em um sistema real.

Esse método traz naturalidade ao uso e simula adequadamente um CRUD de verdade.

7. Tecnologias Utilizadas

HTML5

CSS3

JavaScript ES6

Fetch API

API pública JSONPlaceholder

NÃO são utilizados frameworks externos, respeitando a proposta de estudo de JavaScript puro.

8. Como Executar o Projeto

Nenhuma instalação é necessária.
Basta abrir o arquivo index.html em qualquer navegador moderno.

Passos sugeridos:

Baixar ou clonar o repositório.

Abrir o arquivo index.html no navegador.

Utilizar a barra lateral para navegar entre as páginas.

Testar o CRUD diretamente na tela principal.

9. Considerações Finais

O projeto demonstra o uso de técnicas fundamentais de desenvolvimento web:

Separação de responsabilidades

Requisições assíncronas

Uso correto da Fetch API

Manipulação do DOM

Validações personalizadas

Estrutura modular em JavaScript

Interface responsiva e amigável

Essa estrutura facilita futuras expansões, como implementação de um backend real, autenticação ou banco de dados.