# 📦 Controle de Almoxarifado

## 📌 Descrição

Sistema web para controle de estoque de materiais, desenvolvido com HTML, CSS e JavaScript, utilizando MockAPI como backend.

O sistema permite gerenciar materiais com operações de cadastro, listagem, busca, atualização de estoque (baixa), exclusão e alertas visuais de estoque crítico.

---

## 🚀 Deploy

🔗 Acesse o projeto online:  


---

## 🛠 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- MockAPI
- Git e GitHub

---

## ⚙️ Funcionalidades

### 📥 Cadastro de Materiais (POST)
Permite adicionar novos materiais com nome e quantidade.

---

### 📋 Listagem de Materiais (GET)
Exibe todos os materiais cadastrados ao carregar a página.

---

### 🔎 Filtro de Pesquisa
Permite buscar materiais em tempo real pelo nome (`input-busca`).

---

### 📊 Total de Itens
Exibe a quantidade total de materiais no sistema (`#total-itens`).

---

### 📉 Baixa de Estoque (PUT)
Permite reduzir a quantidade de um material após validação:

- Não permite valores ≤ 0
- Não permite retirada maior que o estoque

---

### 🗑 Exclusão de Materiais (DELETE)
Remove materiais do sistema e atualiza a lista automaticamente.

---

### 🚨 Estoque Crítico
Materiais com quantidade menor que 10 unidades recebem destaque visual com a classe:

`.estoque-critico`

---

### ⚠️ Tratamento de Erros
O sistema utiliza `try/catch` em todas as requisições `fetch` para evitar falhas e melhorar a estabilidade.

---

## 📁 Estrutura do Projeto

- index.html → estrutura da página  
- style.css → estilização  
- main.js → lógica da aplicação  
- README.md → documentação  

---

## 👨‍💻 Autor

Anderson Caetano  
Curso de Análise e Desenvolvimento de Sistemas – UNICESUMAR