const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector("#botao-busca");
let dados = [];

// Função para carregar os dados do JSON e renderizar todos os cards inicialmente.
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function iniciarBusca() {
    const termoBusca = searchInput.value.toLowerCase();
    
    const resultadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultadosFiltrados);
}

function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar os novos.
    if (cardsParaRenderizar.length === 0) {
        const mensagemNenhumResultado = document.createElement("p");
        mensagemNenhumResultado.textContent = "Nenhum resultado encontrado. Tente buscar por outro termo.";
        mensagemNenhumResultado.classList.add("mensagem-nenhum-resultado"); // Adiciona uma classe para estilizarmos no CSS
        cardContainer.appendChild(mensagemNenhumResultado);
    } else {
        for (const dado of cardsParaRenderizar) {
            const article = document.createElement("article");
            article.classList.add("card");
            article.innerHTML = `<h2>${dado.nome}</h2><p>${dado.data_criacao}</p><p>${dado.descricao}</p><a href="${dado.link}" target="_blank"> Leia mais</a>`;
            cardContainer.appendChild(article);
        }
    }
}

// Adiciona um listener para o evento 'input', que dispara a busca a cada letra digitada.
searchInput.addEventListener("input", iniciarBusca);

// Adiciona um listener para o clique no botão, mantendo sua funcionalidade.
searchButton.addEventListener("click", iniciarBusca);

// Carrega os dados assim que o script é executado.
carregarDados();