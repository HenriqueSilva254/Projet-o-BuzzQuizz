let quizzes = [];
let quizz;

axios.defaults.headers.common['Authorization'] = 'D1tow2WsfGdVjgTVFdhmZiAi';

function selecionarRespostas(elemento) {
      // Verifica se a opção já foi selecionada
  if (elemento.classList.contains('selecionada')) {
    return;
  }

  const opcoesElementos = elemento.parentElement.querySelectorAll('.descricao');

  // Percorre todas as opções e remove a classe 'selecionada'
  opcoesElementos.forEach((opcaoElemento) => {
    opcaoElemento.classList.remove('selecionada');
  });

  // Adiciona a classe 'selecionada' apenas na opção clicada
  elemento.classList.add('selecionada');
}

function renderizarPerguntas() {
    const elemento = document.querySelector('.container');
    elemento.style.width = '100%';
    elemento.style.marginTop = '69px';

    let template = '';

    template += `
        <div class="quizz">
          <div class="fotoquizz">
            <img class="capa" src="${quizz.image}" />
          </div>
          <p class="titulocentral">${quizz.title}</p>
          <div class="perguntas-respostas">
      `;

    for (let j = 0; j < quizz.questions.length; j++) {
        // Adicione um atributo de estilo para o elemento do título da pergunta
        template += `
          <div class="pergunta">
            <p class="enunciado" style="background-color: ${quizz.questions[j].color}">${quizz.questions[j].title}</p>
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
            <div class="fotoenome">
              <div class="imagem">
                <img class="imagem1" onclick="selecionarRespostas(this)" src="${respostas[k].image}" />
              </div>
              <p class="resposta">${respostas[k].text}</p>
            </div>
          `;
        }

        template += `
            </div>
          </div>
        `;
    }

    template += `
          </div>
        </div>
      `;

    elemento.innerHTML = template;   
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
        <li class="Quizz" data-id="${quizzes[i].id}" onclick = "pegarId(event)">
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


function numerodePerguntas () {
    const perguntas = document.querySelector('.criarPerguntas .outrasPerguntas')

    for (let i = 1; i < contador; i++) {

        perguntas.innerHTML += `<div class="perguntamini">
        <span>Pergunta ${i+1}</span>
        <img src="imgs/note.png" onclick="abrirPergunta(this, ${i +1})">
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
