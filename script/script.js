let quizzes = [];
let quizz;
let contadorrespostascertas = 0;
let contadortotalperguntas = 0;
let quantidadedeperguntasquizz = 0;
let PorcentagemdeAcertosemCadaQuizz = 0;
let imagemLevel = '';
let tituloLevel = '';
let descricaoLevel = '';


axios.defaults.headers.common['Authorization'] = 'D1tow2WsfGdVjgTVFdhmZiAi';

function ReiniciarOProprioQuizz() {
    contadorrespostascertas = 0;
    contadortotalperguntas = 0;
    quantidadedeperguntasquizz = 0;
    PorcentagemdeAcertosemCadaQuizz = 0;
    imagemLevel = '';
    tituloLevel = '';
    descricaoLevel = '';
    renderizarPerguntas()
}

function scrollrecarregar() {
    window.scrollBy(0, -3000)
}

function RecarregarPaginainicial() {
    location.reload();
    scrollrecarregar()
}

function scroll() {
    window.scrollBy(0, 720)
}
function selecionarRespostas(elemento, pai) {

    setTimeout(scroll, 2000);
    console.log(elemento);
    console.log(pai);
    elemento.classList.remove('imagem1');
    elemento.classList.add('imagem2');

    const esbranquicarresposta = elemento.closest('.fotoenome').querySelector('.resposta');
    esbranquicarresposta.classList.add('resposta1');
    esbranquicarresposta.classList.remove('resposta');

    const imagens = pai.querySelectorAll('.imagem1');
    imagens.forEach(elemento => {
        elemento.classList.add('naoselecionada');
    });

    const respostas = pai.querySelectorAll('.resposta');

    for (let i = 0; i < respostas.length; i++) {
        respostas[i].classList.remove('display');
        respostas[i].classList.add('naoselecionada');
    }
    const respostas2 = pai.querySelectorAll('.resposta1');

    for (let i = 0; i < respostas2.length; i++) {
        respostas2[i].classList.remove('display');
    }

    const respostas1 = pai.querySelectorAll('.respostaemcima');
    console.log(respostas1)

    for (let i = 0; i < respostas1.length; i++) {
        respostas1[i].classList.add('display');
    }

    for (let i = 0; i < respostas2.length; i++) {
        if (respostas2[i].classList.contains('true') === true && contadorrespostascertas <= quantidadedeperguntasquizz && respostas2[i].classList.contains('naoselecionada') === false) {
            contadorrespostascertas++
        }
        console.log(contadorrespostascertas)
    }
    quantidadedeperguntasquizz = quizz.questions.length
    PorcentagemdeAcertosemCadaQuizz = (contadorrespostascertas / quantidadedeperguntasquizz * 100);
    console.log(PorcentagemdeAcertosemCadaQuizz)

    if (elemento.classList.contains('naoselecionada') === false) {
        contadortotalperguntas++
    }

    if (contadortotalperguntas === quantidadedeperguntasquizz) {
        const aparecerNível = document.querySelector('.descobrirNivel')
        aparecerNível.classList.remove('escondido')
        const aparecerRecarregar = document.querySelector('.reiniciaroQUIZZ')
        aparecerRecarregar.classList.remove('escondido')

        for (let i = 0; i < quizz.levels.length - 1; i++) {
            if (quizz.levels[i].minValue <= PorcentagemdeAcertosemCadaQuizz &&
                PorcentagemdeAcertosemCadaQuizz < quizz.levels[i + 1].minValue) {
                tituloLevel = quizz.levels[i].title;
                console.log(tituloLevel)
                imagemLevel = quizz.levels[i].image;
                descricaoLevel = quizz.levels[i].text;
                console.log(descricaoLevel)
            } else if (quizz.levels[i].minValue <= PorcentagemdeAcertosemCadaQuizz &&
                PorcentagemdeAcertosemCadaQuizz > quizz.levels[i + 1].minValue && quizz.levels[i + 1].minValue < quizz.levels[i].minValue) {
                tituloLevel = quizz.levels[i].title;
                console.log(tituloLevel)
                imagemLevel = quizz.levels[i].image;
                descricaoLevel = quizz.levels[i].text;
            } else if (PorcentagemdeAcertosemCadaQuizz >= quizz.levels[i + 1].minValue) {
                tituloLevel = quizz.levels[i + 1].title;
                console.log(tituloLevel)
                imagemLevel = quizz.levels[i + 1].image;
                descricaoLevel = quizz.levels[i + 1].text;
                console.log(descricaoLevel)
            }
        }
        aparecerNível.querySelector('p').innerHTML =  Math.round(PorcentagemdeAcertosemCadaQuizz) + "% de acerto: " + tituloLevel;
        aparecerNível.querySelector('img.FotoNível').src = imagemLevel;
        aparecerNível.querySelector('.DescricaoNível').innerHTML = descricaoLevel;

    }
}

function renderizarPerguntas() {

    const elemento = document.querySelector('.container');
    elemento.style.width = '100%';
    elemento.style.marginTop = '69px';

    let template = '';

    template += `
        <div class="quizz">
          <div data-test="banner" class="fotoquizz">
            <img class="capa" src="${quizz.image}" />
          </div>
          <p class="titulocentral">${quizz.title}</p>
          <div class="perguntas-respostas">
      `;

    for (let j = 0; j < quizz.questions.length; j++) {
        // Adicione um atributo de estilo para o elemento do título da pergunta
        template += `
          <div data-test="question" class="perguntaporpergunta">
            <p data-test="question-title" class="enunciado" style="background-color: ${quizz.questions[j].color}">${quizz.questions[j].title}</p>
            <div class="fotosperguntas">
        `;

        // Embaralhe as respostas com suas descrições utilizando o algoritmo de Fisher-Yates
        const respostas = quizz.questions[j].answers.slice(); // crie uma cópia do array de respostas
        for (let k = respostas.length - 1; k > 0; k--) {
            const indiceAleatorio = Math.floor(Math.random() * (k + 1));
            [respostas[k], respostas[indiceAleatorio]] = [respostas[indiceAleatorio], respostas[k]]; // troque os elementos de posição
        }

        for (let k = 0; k < respostas.length && k < 4; k++) {
            template += `
            <div data-test="answer" class="fotoenome">
              <div class="imagem">
              <img class="imagem1" onclick="selecionarRespostas(this, this.closest('.perguntaporpergunta'))" src="${respostas[k].image}" />
              </div>
              <p data-test="answer-text" class="respostaemcima">${respostas[k].text}</p>
              <p data-test="answer-text" class="resposta ${respostas[k].isCorrectAnswer} display">${respostas[k].text}</p>
              <p class="falseoutrue">${respostas[k].isCorrectAnswer}</p>
            </div>
          `;
        }

        template += `
            </div>
          </div>
        `;
    }

    template += `
    <div class="descobrirNivel escondido">
        <p data-test="level-title" class="enunciadoNiveis"></p>
        <div class="containercomNiveis">
            <img data-test="level-img" class="FotoNível" src="${imagemLevel}">
            <div data-test="level-text" class="DescricaoNível"></div>
        </div>
    </div>

    <div class="reiniciaroQUIZZ escondido">
        <div data-test="restart" class="BotaoReiniciarumQuizz" onclick = "ReiniciarOProprioQuizz()">Reiniciar Quizz</div>
        <div data-test="go-home" class="BotaoRetornarAoMenu" onclick = "RecarregarPaginainicial()">Voltar pra home</div>
    </div>
          </div>
        </div>
      `;

    elemento.innerHTML = template;
    window.scrollBy(0, -3000)
}

function erroBuscarUmQuizz(erro) {
    console.log(erro);
}

function sucessoBuscarUmQuizz(resposta) {
    quizz = resposta.data;
    console.log(quizz);
    renderizarPerguntas()
}

function pegarId(event) {
    const quizzElement = event.currentTarget;
    const quizzId = quizzElement.dataset.id;
    console.log(quizzId)

    // fazer requisição para obter o quiz com o ID desejado
    const promise = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${quizzId}`);
    promise.then(sucessoBuscarUmQuizz);
    promise.catch(erroBuscarUmQuizz);

    // renderizar perguntas na tela
}

function renderizarQuizzes() {
    const elementoul = document.querySelector('.todosQuizzes')
    elementoul.innerHTML = '';

    let template;

    for (let i = 0; i < quizzes.length; i++) {
        let

            template = `
        <li data-test="others-quiz" class="Quizz" data-id="${quizzes[i].id}" onclick = "pegarId(event)">
            <img class ="Quizz-img" style="background-image: linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0)), url(${quizzes[i].image})"/>
            <p class = "titulo1">${quizzes[i].title}</p>
        </li>
            `;

        elementoul.innerHTML += template;
    }


}

function erroBuscarQuizzes(erro) {
    console.log(erro);
}

function sucessoBuscarQuizzes(resposta) {
    quizzes = resposta.data;
    console.log(quizzes);
    renderizarQuizzes()
}

function buscarTodosOsQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
    promise.then(sucessoBuscarQuizzes);
    promise.catch(erroBuscarQuizzes);
}

buscarTodosOsQuizzes();
let contador = 8;
let Pergunta = '';


function numerodePerguntas() {
    const perguntas = document.querySelector('.criarPerguntas .outrasPerguntas')

    for (let i = 1; i < contador; i++) {

        perguntas.innerHTML += `<div class="perguntamini">
        <span>Pergunta ${i + 1}</span>
        <img src="imgs/note.png" onclick="abrirPergunta(this, ${i + 1})">
    </div>`
    }
}

function criarPerguntas() {
    const criarQuizz = document.querySelector('.criarQuizz');
    const criarPerguntas = document.querySelector('.criarPerguntas');

    criarQuizz.classList.add('escondido');
    criarPerguntas.classList.remove('escondido');

    numerodePerguntas();
}


function abrirPergunta(pergunta, i) {
    // const abrirPergunta2 = document.querySelector('.pergunta2mini')
    console.log(i);
    console.log(pergunta);
    Pergunta = pergunta.parentNode;
    console.log(pergunta.parentNode.innerHTML);
    //const numero = Pergu
    Pergunta.classList.add('pergunta')
    Pergunta.classList.remove('perguntamini')

    Pergunta.innerHTML = `<div class='pergunta'>
<div class='info'>
    <span>Pergunta ${i}</span> 
    <input type='text' class='text-pergunta${i}' placeholder='Texto da pergunta'>
    <input type='text' class='cor-pergunta${i}' placeholder='Cor de fundo da pergunta'>
</div>
<div class='correta'>
    <span>Resposta correta</span>
    <input type='text' class='correta-pergunta${i}' placeholder='Resposta correta'>
    <input type='text' class='url-certa-pergunta${i}' placeholder='URL da imagem'>
</div>
<div class='incorretas1'>
    <span class=''>Respostas incorretas</span>
    <div class='incorreta1'>
        <input type='text' class='incorreta1-pergunta${i}' placeholder='Resposta incorreta 1'>
        <input type='text' class='incorreta2-pergunta${i}' placeholder='URL da imagem 1'>
    </div>
    <div class='incorreta2'>
        <input type='text' class='incorreta2-pergunta${i}' placeholder='Resposta incorreta 2'>
        <input type='text' class='incorreta2-pergunta${i}' placeholder='URL da imagem 2'>
    </div>
    <div class='incorreta3'>
        <input type='text' class='incorreta3-pergunta${i}' placeholder='Resposta incorreta 3'>
        <input type='text' class='incorreta3-pergunta${i}' placeholder='URL da imagem 3'>
    </div>
</div> 
</div>`;
}


function decidirNiveis() {
    const criarPerguntas = document.querySelector('.criarPerguntas');
    const decidirNiveis = document.querySelector('.decidirNiveis');

    criarPerguntas.classList.add('escondido');
    decidirNiveis.classList.remove('escondido');
}
