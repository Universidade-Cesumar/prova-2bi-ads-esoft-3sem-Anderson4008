# Controle de Almoxarifado

## Descrição

Sistema web para controle de estoque de materiais utilizando HTML, CSS, JavaScript e MockAPI.

O sistema permite cadastrar materiais, visualizar a lista de itens cadastrados, realizar baixa de estoque e excluir materiais do sistema.

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* MockAPI
* Git e GitHub

## Funcionalidades

### Cadastro de Materiais (POST)

Permite cadastrar novos materiais informando:

* Nome do material
* Quantidade em estoque

Os dados são enviados para a MockAPI através do método POST.

### Listagem de Materiais (GET)

Ao carregar a página, o sistema consulta a MockAPI e exibe todos os materiais cadastrados em uma tabela.

### Baixa de Estoque (PUT)

Permite retirar uma quantidade do estoque de um material já cadastrado.

Antes da atualização é realizada uma validação através da função:

```javascript
function validarRetirada(estoqueAtual, quantidadeRetirada)
```

A função impede:

* Quantidades negativas
* Quantidade igual a zero
* Quantidades maiores que o estoque disponível

Após a validação, a quantidade é atualizada na MockAPI utilizando o método PUT.

### Exclusão de Materiais (DELETE)

Permite remover materiais do sistema utilizando o método DELETE da MockAPI.

Após a exclusão, a lista é atualizada automaticamente.

## Regras de Negócio

* Não é permitido cadastrar materiais com quantidade menor ou igual a zero.
* Não é permitido retirar quantidade igual ou menor que zero.
* Não é permitido retirar quantidade superior ao estoque disponível.
* A exclusão remove permanentemente o material da base de dados.

## Estrutura do Projeto

* index.html → Estrutura da página.
* style.css → Estilização da interface.
* main.js → Lógica da aplicação e integração com a API.

## Autor

Anderson Caetano
Curso de Análise e Desenvolvimento de Sistemas – UNICESUMAR
