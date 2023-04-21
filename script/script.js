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