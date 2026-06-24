console.log("JS carregou");

const API_URL = "https://6a29e879f59cb8f65f1dc17d.mockapi.io/api/v1/materiais";

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    return quantidadeRetirada > 0 &&
           quantidadeRetirada <= estoqueAtual;
}

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const inputRetirada = document.getElementById("input-retirada");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais");
const inputBusca = document.getElementById("input-busca");
const totalItens = document.getElementById("total-itens");

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
                <td>
                    <button class="btn-baixar">Baixar</button>
                    <button class="btn-excluir">Excluir</button>
                </td>
            `;

            listaMateriais.appendChild(linha);

            const btnExcluir = linha.querySelector(".btn-excluir");

            btnExcluir.addEventListener("click", async () => {
                try {
                    const resposta = await fetch(`${API_URL}/${material.id}`, {
                        method: "DELETE"
                    });

                    if (!resposta.ok) {
                        throw new Error("Erro ao excluir");
                    }

                    await carregarMateriais();

                } catch (erro) {
                    console.error(erro);
                    alert("Erro ao excluir material.");
                }
            });

            const btnBaixar = linha.querySelector(".btn-baixar");

            btnBaixar.addEventListener("click", async () => {

                const quantidadeRetirada = Number(inputRetirada.value);

                if (!validarRetirada(material.quantidade, quantidadeRetirada)) {
                    alert("Quantidade inválida.");
                    return;
                }

                const novaQuantidade =
                    material.quantidade - quantidadeRetirada;

                try {

                    const resposta = await fetch(`${API_URL}/${material.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            nome: material.nome,
                            quantidade: novaQuantidade
                        })
                    });

                    if (!resposta.ok) {
                        throw new Error("Erro ao atualizar");
                    }

                    inputRetirada.value = "";

                    await carregarMateriais();

                    alert("Baixa realizada com sucesso!");

                } catch (erro) {
                    console.error(erro);
                    alert("Erro ao atualizar estoque.");
                }
            });
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

function atualizarTotal(materiais) {
    const total = materiais.length;
    totalItens.textContent = total;
    if (material.quantidade < 10) {
    linha.classList.add("estoque-critico");
}
}

btnCadastrar.addEventListener("click", cadastrarMaterial);

window.addEventListener("load", carregarMateriais);