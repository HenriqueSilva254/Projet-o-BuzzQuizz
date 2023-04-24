axios.defaults.headers.common['Authorization'] = 'D1tow2WsfGdVjgTVFdhmZiAi';
let quizzes = [];
let quizz;
let contadorrespostascertas = 0;
let contadortotalperguntas = 0;
let quantidadedeperguntasquizz = 0;
let PorcentagemdeAcertosemCadaQuizz = 0;
let imagemLevel = '';
let tituloLevel = '';
let descricaoLevel = '';
let quiZZZZZCriar = {};
let numQuestions = 0;
let numLevels = 0;

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
    if (elemento.classList.contains('naoselecionada') === false && elemento.classList.contains('resposta1') === false) {
    setTimeout(scroll, 2000);
    console.log(elemento);
    console.log(pai);
    elemento.classList.remove('imagem1');
    elemento.classList.add('imagem2');

    const esbranquicarresposta = elemento.closest('.fotoenome').querySelector('.resposta');
    console.log("A partir daqui");
    console.log(esbranquicarresposta)
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
            console.log(respostas2)
        }
        console.log(contadorrespostascertas)
    }
    quantidadedeperguntasquizz = quizz.questions.length
    console.log(quantidadedeperguntasquizz)
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
console.log(2)
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
function renderizarMeusQuizzes() {
    location.reload();
    const elementoMeusQuizzes = document.querySelector('.inserirQuizz');
    elementoMeusQuizzes.classList.add('display');
    const elementoMeusQuizzes2 = document.querySelector('.content');
    elementoMeusQuizzes2.innerHTML = '';

    let layout = ''; // inicializa a variável layout com uma string vazia
    layout += `
        <p class="titulo">Meus Quizzes</p>
    `;

        layout += `
            <li data-test="others-quiz" class="Quizz" data-id="${quiZZZZZCriar.id}" onclick="pegarId(event)">
                <img class ="Quizz-img" style="background-image: linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0)), url(${quiZZZZZCriar.image})"/>
                <p class = "titulo1">${quiZZZZZCriar.title}</p>
            </li>
        `;

    elementoMeusQuizzes.innerHTML = layout; // move a linha para fora do loop for
}


function erroBuscarQuizzes(erro) {
    console.log(erro);
}

function sucessoBuscarQuizzes(resposta) {
    quizzes = resposta.data;
    console.log(quizzes);
    renderizarQuizzes();
}

function buscarTodosOsQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
    promise.then(sucessoBuscarQuizzes);
    promise.catch(erroBuscarQuizzes);
}

buscarTodosOsQuizzes();


// fim da parte da NAT... INICIO PARTE DO HENRIQUE ... 



// console.log(document.getElementById(title).value)


//const qntdPerguntas = document.querySelector('.qtde-perguntas')
//const qntdNiveis = document.querySelector('.qtde-niveis')

// adicionar clsse e remover... e pegar valores dos inputs

//Variavel Global 

function firstButton() {

    const index = document.querySelector('.pagina1');
    const criarQuizzzz = document.querySelector('.criarQuizz');

    index.classList.add('escondido');
    criarQuizzzz.classList.remove('escondido');
}

function secondButton() {

   validarinput();
    if (mensagem !== '') {
        return alert(mensagem), mensagem = '';
    }

    // Adicionar e remover ESCONDIDO

    const mudarClasse = document.querySelector('.criarQuizz');
    const criarPerguntas = document.querySelector('.criarPerguntas');

    mudarClasse.classList.add('escondido')
    criarPerguntas.classList.remove('escondido')

    // pega os valores dos inputs
    const title = document.querySelector('#title').value;
    const image = document.querySelector('#url-img').value;
    numQuestions = document.querySelector('#qntd-perguntas').value;
    numLevels = document.querySelector('#qntd-nvl').value;
  
    // cria o objeto base
    quiZZZZZCriar = {
      title: title,
      image: image,
      questions: [],
      levels: []
    };
    console.log(quiZZZZZCriar)
}
  
    function terceiroButton () {
    // adiciona as perguntas ao objeto
    for (let i = 1; i <= numQuestions; i++) {
        const questionTitle = document.querySelector(`input.text-pergunta${i}`).value;
        const questionColor = document.querySelector(`input.cor-pergunta${i}`).value;
        const correctAnswer = document.querySelector(`input.correta-pergunta${i}`).value;
        const correctAnswerImage = document.querySelector(`input.url-certa-pergunta${i}`).value;
        const wrongAnswer1 = document.querySelector(`input.incorreta1-pergunta${i}`).value;
        const wrongAnswer1Image = document.querySelector(`input.url-incorreta${i}`).value;
        const wrongAnswer2 = document.querySelector(`input.incorreta2-pergunta${i}`).value;
        const wrongAnswer2Image = document.querySelector(`input.url-incorreta${i}`).value;
        const wrongAnswer3 = document.querySelector(`input.incorreta3-pergunta${i}`).value;
        const wrongAnswer3Image = document.querySelector(`input.url-incorreta${i}`).value;
        const inputsTextos = [questionTitle, correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3]
        const inputsUrl =[correctAnswerImage, wrongAnswer1Image, wrongAnswer2Image, wrongAnswer3Image]
       
      const question = {
        title: questionTitle,
        color: questionColor,
        answers: [
          {
            text: correctAnswer,
            image: correctAnswerImage,
            isCorrectAnswer: true
          },
          {
            text: wrongAnswer1,
            image: wrongAnswer1Image,
            isCorrectAnswer: false
          },
          {
            text: wrongAnswer2,
            image: wrongAnswer2Image,
            isCorrectAnswer: false
          },
          {
            text: wrongAnswer3,
            image: wrongAnswer3Image,
            isCorrectAnswer: false
          }
        ]
        
        
      };
      console.log("ta rodando")
      
   
     
      quiZZZZZCriar.questions.push(question);
      console.log(quiZZZZZCriar)
    }
}

    function Niveis () {
    // adiciona os níveis ao objeto
    for (let i = 1; i <= numLevels; i++) {
      const levelTitle = document.querySelector(`input.titulo-nivel${i}`).value;
      const levelImage = document.querySelector(`input.url-nivel${i}`).value;
      const levelDescription = document.querySelector(`textarea.descricao-nivel${i}`).value;
      const levelMinValue = document.querySelector(`input.acerto-nivel${i}`).value;
  
      const level = {
        title: levelTitle,
        image: levelImage,
        text: levelDescription,
        minValue: Number(levelMinValue)
      };
  
      quiZZZZZCriar.levels.push(level);
    }
  
    console.log(quiZZZZZCriar); // ou envie o objeto por meio de uma requisição Axios
  
    const promise = axios.post("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes", quiZZZZZCriar)
    promise.then(response => {
      console.log(response);
    })
    promise.catch(error => {
      console.error(error);
    });
  
    renderizarMeusQuizzes()
  }

  

// FIM DA PARTE DO HENRIQUE .... INICIO DA PARTE DO LUIGI 




let Pergunta = '';
let Nivel = ''
let mensagem = '';


       
function validarinput() {
    const titulo = document.querySelector('.titulodoquizz').value;
    const capa = document.querySelector(".imagem-capa").value;
    const verificador = capa.slice(0, 8)
    const qntdep = Number(document.querySelector('.qtde-perguntas').value);
    const qtndel = Number(document.querySelector('.qtde-niveis').value);
    
    if(titulo.length < 20) {
        mensagem += "Cheque se seu título possui entre 20 e 65 caracteres \n"
    }
    if(titulo.length > 65) {
        mensagem += "Cheque se seu título possui entre 20 e 65 caracteres \n"
    }
    if (verificador !== 'https://') {
        mensagem += "Cheque se sua imagem é válida \n"
    }
    if (qntdep < 3) {
        mensagem += "Cheque se a quantidade de perguntas é no minimo 3 \n"
    }    
    if (qtndel < 2) {
        mensagem += "Cheque se a quantidade de níveis é no minimo 2 \n"
    }
}

function criarQuizzz() {

    const index = document.querySelector('.pagina1');
    const criarQuizzzz = document.querySelector('.criarQuizz');

    index.classList.add('escondido');   
    criarQuizzzz.classList.remove('escondido');
}

function numerodePerguntas () {

    
    const perguntas = document.querySelector('.criarPerguntas .outrasPerguntas')
    const numero = Number( document.querySelector('.qtde-perguntas').value)
    for (let i = 1; i < numero; i++) {

        perguntas.innerHTML += `<div class="perguntamini" data-test="question-ctn">
        <span>Pergunta ${i+1}</span>
        <img src="imgs/note.png" data-test="toggle" onclick="abrirPergunta(this, ${i + 1})">
    </div>`     
    }
    
    }

function fecharPergunta(){

    const perguntass = document.querySelector('.pergunta');
    
    perguntass.classList.toggle('container_fechadas')
   
    console.log(perguntass)

}



function abrirPergunta(pergunta, i) {
    console.log(pergunta)
    Pergunta = pergunta.parentNode;
    Pergunta.classList.add('pergunta')
    Pergunta.classList.remove('perguntamini')

    Pergunta.innerHTML = `<div class='pergunta' data-test="question-ctn" >
                            <div data-test="question-ctn" class='info'>
                                <div class="container_perguntas"> 
                                    <span>Pergunta ${i}</span> 
                                    <img src="imgs/note.png" data-test="toggle"  onclick="fecharPergunta(this, ${i})">
                                </div>
                                <input data-test="question-input" type='text' class='text-pergunta${i}' placeholder='Texto da pergunta'>
                                <input data-test="question-color-input" type='text' class='cor-pergunta${i}' placeholder='Cor de fundo da pergunta'>
                            </div>
                                <div class='correta'>
                                    <span>Resposta correta</span>
                                    <input data-test="correct-answer-input" type='text' class='correta-pergunta${i}' placeholder='Resposta correta'>
                                    <input data-test="correct-img-input" type='text' class='url-certa-pergunta${i}' placeholder='URL da imagem'>
                                </div>
                                <div class='incorretas1'>
                                    <span class=''>Respostas incorretas</span>
                                    <div class='incorreta1'>
                                        <input data-test="wrong-answer-input" type='text' class='incorreta1-pergunta${i}' placeholder='Resposta incorreta 1'>
                                        <input data-test="wrong-img-input" type='text' class='url-incorreta1${i}' placeholder='URL da imagem 1'>
                                    </div>
                                    <div class='incorreta2'>
                                        <input data-test="wrong-answer-input" type='text' class='incorreta2-pergunta${i}' placeholder='Resposta incorreta 2'>
                                        <input data-test="wrong-img-input" type='text' class='url-incorreta2${i}' placeholder='URL da imagem 2'>
                                    </div>
                                    <div class='incorreta3'>
                                        <input data-test="wrong-answer-input" type='text' class='incorreta3-pergunta${i}' placeholder='Resposta incorreta 3'>
                                        <input data-test="wrong-img-input" type='text' class='url-incorreta3${i}' placeholder='URL da imagem 3'>
                                    </div>
                                </div> 
                            </div>`;
console.log(document.querySelector(`.url-certa${i}`))
}


function decidirNiveis() {

    const criarPerguntas = document.querySelector('.criarPerguntas');
    const decidirNiveis = document.querySelector('.decidirNiveis');

    criarPerguntas.classList.add('escondido');
    decidirNiveis.classList.remove('escondido');
    numerodeNiveis();

}

function numerodeNiveis () {
    const niveis = document.querySelector('.decidirNiveis .outrosNiveis')
    const numero = Number(document.querySelector('.qtde-niveis').value)

    for (let i = 1; i < numero; i++) {

        niveis.innerHTML += `<div class="nivelmini" data-test="toggle">
        <span>nível ${i+1}</span>
        <img src="imgs/note.png" onclick="abrirnivel(this, ${i +1})">
    </div>`     
    }
}

function abrirnivel (nivel, i) {
    Nivel = nivel.parentNode;
    //const numero = Pergu
    Nivel.classList.add('nivel')
    Nivel.classList.remove('nivelmini')

    Nivel.innerHTML = `<div class="informacoes" data-test="level-ctn">
    <p>nível ${i}</p>
    <input type="text" data-test="level-input" class="titulo-nivel${i}" placeholder="Título do nível">
    <input type="text" data-test="level-percent-input" class="acerto-nivel${i}" placeholder="% de acerto mínima">
    <input type="text" data-test="level-img-input" class="url-nivel${i}" placeholder="URL da imagem do nível">
    <textarea type='text' data-test="level-description-input"  class="descricao-nivel${i}" placeholder="Descrição do nível"></textarea>
</div>`

}
