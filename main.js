console.log("JS carregou");

const API_URL =
    "https://6a29e879f59cb8f65f1dc17d.mockapi.io/api/v1/materiais";

// ===== ELEMENTOS =====
const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const inputRetirada = document.getElementById("input-retirada");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais");
const inputBusca = document.getElementById("input-busca");
const totalItens = document.getElementById("total-itens");

// ===== VALIDAÇÃO =====
function validarRetirada(estoqueAtual, quantidadeRetirada) {
    return quantidadeRetirada > 0 &&
        quantidadeRetirada <= estoqueAtual;
}

// ===== TOTAL =====
function atualizarTotal(materiais) {
    totalItens.textContent = materiais.length;
}

// ===== CARREGAR =====
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

            if (material.quantidade < 10) {
                linha.classList.add("estoque-critico");
            }

            linha.innerHTML = `
                <td>${material.nome}</td>
                <td>${material.quantidade}</td>
                <td>
                    <button class="btn-baixar">Baixar</button>
                    <button class="btn-excluir">Excluir</button>
                </td>
            `;

            listaMateriais.appendChild(linha);

            // EXCLUIR
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

            // BAIXAR
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

        atualizarTotal(materiais);

    } catch (erro) {
        console.error("Erro ao carregar materiais:", erro);
        alert("Erro ao carregar materiais.");
    }
}

// ===== CADASTRAR =====
async function cadastrarMaterial() {
    try {
        const nome = inputNome.value.trim();
        const quantidade = Number(inputQuantidade.value);

        if (nome === "" || quantidade <= 0) {
            alert("Preencha os campos corretamente.");
            return;
        }

        const novoMaterial = { nome, quantidade };

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

inputBusca.addEventListener("input", async () => {
    const termo = inputBusca.value.toLowerCase();

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro na busca");
        }

        const materiais = await resposta.json();

        const filtrados = materiais.filter(m =>
            m.nome.toLowerCase().includes(termo)
        );

        listaMateriais.innerHTML = "";

        filtrados.forEach(material => {
            const linha = document.createElement("tr");

            if (material.quantidade < 10) {
                linha.classList.add("estoque-critico");
            }

            linha.innerHTML = `
                <td>${material.nome}</td>
                <td>${material.quantidade}</td>
                <td>
                    <button class="btn-baixar">Baixar</button>
                    <button class="btn-excluir">Excluir</button>
                </td>
            `;

            listaMateriais.appendChild(linha);
        });

        totalItens.textContent = filtrados.length;

    } catch (erro) {
        console.error("Erro na busca:", erro);
        alert("Erro de conexão.");
    }
});

btnCadastrar.addEventListener("click", cadastrarMaterial);
window.addEventListener("load", carregarMateriais);