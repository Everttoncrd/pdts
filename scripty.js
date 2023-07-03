const chave = "3d842360ece5452e9cf42dac04f965f3";
const accessKey = "9C8rWQrIwEuo57-f0WGRXNGgDhlEofQkgyiiHHiTHyY";

function colocarNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".descricao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".icone").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade) {
    try {
        const dadosResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`);
        const dados = await dadosResponse.json();

        if (dadosResponse.ok) {
            colocarNaTela(dados);
            buscarImagem(cidade);
        } else {
            console.log("Erro ao buscar dados do clima:", dados);
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
    }
}

async function buscarImagem(cidade) {
    const url = `https://api.unsplash.com/photos/random?query=${cidade}&orientation=landscape&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const imagemUrl = data.urls.full;

            const imagem = new Image();
            imagem.src = imagemUrl;

            imagem.addEventListener("load", function () {
                document.body.style.backgroundImage = `url(${imagemUrl})`;
            });

            imagem.addEventListener("error", function () {
                console.log("Erro ao carregar imagem");
            });
        } else {
            console.log("Erro ao buscar imagem:", data.errors);
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
    }
}

document.querySelector(".input-cidade").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        cliqueiNoBotao();
    }
});

function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}
