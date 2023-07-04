const chave = "3d842360ece5452e9cf42dac04f965f3";
const accessKey = "9C8rWQrIwEuo57-f0WGRXNGgDhlEofQkgyiiHHiTHyY";

function colocarNaTela(dados) {
  console.log(dados);
  document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
  document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
  document.querySelector(".descricao").innerHTML = dados.weather[0].description;
  document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
  document.querySelector(".icone").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;

  const cidade = document.querySelector(".input-cidade").value;
  buscarImagem(cidade);
}

async function buscarClima(cidade) {
  try {
    const urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`;
    const responseClima = await fetch(urlClima);
    const dataClima = await responseClima.json();

    if (responseClima.ok) {
      colocarNaTela(dataClima);
    } else {
      console.log("Erro ao buscar dados do clima:", dataClima);
    }
  } catch (error) {
    console.log("Erro na requisição do clima:", error);
  }
}

async function buscarImagem(cidade) {
  try {
    const urlImagem = `https://api.unsplash.com/photos/random?query=${cidade}&orientation=landscape&client_id=${accessKey}&fit=crop&w=800&h=600`;
    const responseImagem = await fetch(urlImagem);
    const dataImagem = await responseImagem.json();

    if (responseImagem.ok) {
      const imagemUrl = dataImagem.urls.raw;
      const imagem = new Image();
      imagem.src = imagemUrl;
      imagem.onload = function () {
        document.body.style.backgroundImage = `url(${imagemUrl})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
      };
    } else {
      console.log("Erro ao buscar imagem:", dataImagem.errors);
    }
  } catch (error) {
    console.log("Erro na requisição da imagem:", error);
  }
}

document.querySelector(".input-cidade").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    cliqueiNoBotao();
  }
});

function cliqueiNoBotao() {
  let cidade = document.querySelector(".input-cidade").value;
  buscarClima(cidade);
}

// Exemplo de uso
const cidade = "São Paulo";
buscarClima(cidade);
