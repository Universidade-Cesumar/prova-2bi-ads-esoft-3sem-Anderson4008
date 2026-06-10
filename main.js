console.log("JS carregou");
const API_URL = "https://6a29e879f59cb8f65f1dc17d.mockapi.io/api/v1/materiais";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais");

async function carregarMateriais() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar materiais");
        }

        const materiais = await resposta.json();

        listaMateriais.innerHTML = "";

        materiais.forEach(material => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${material.nome}</td>
                <td>${material.quantidade}</td>
            `;

            listaMateriais.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro ao carregar materiais:", erro);
        alert("Erro ao carregar materiais.");
    }
}

async function cadastrarMaterial() {

     console.log("Botão clicado");

    try {
        const nome = inputNome.value.trim();
        const quantidade = Number(inputQuantidade.value);

        if (nome === "" || quantidade <= 0) {
            alert("Preencha os campos corretamente.");
            return;
        }

        const novoMaterial = {
            nome: nome,
            quantidade: quantidade
        };

        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoMaterial)
        });

        if (!resposta.ok) {
            throw new Error("Falha ao cadastrar material.");
        }

        inputNome.value = "";
        inputQuantidade.value = "";

        await carregarMateriais();

        alert("Material cadastrado com sucesso!");

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        alert("Erro ao cadastrar material.");
    }
}

btnCadastrar.addEventListener("click", cadastrarMaterial);

window.addEventListener("load", carregarMateriais);