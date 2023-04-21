axios.defaults.headers.common['Authorization'] = 'D1tow2WsfGdVjgTVFdhmZiAi';
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

// console.log(document.getElementById(title).value)
const criarQuizz = []
const qntdPerguntas = document.getElementById('qntd-perguntas').value
const qntdNiveis = document.getElementById('qntd-nvl').value

// verificar se é uma URL 

function checkUrl(string) {
    try {
     let url = new URL(string)
     criarPerguntas()
   } catch(err) {
    alert("insira uma URL correta") 
    criarPerguntas()
   }
 
 }

// adicionar clsse e remover... e pegar valores dos inputs

function criarPerguntas() {
    const criarQuizz = document.querySelector('.criarQuizz');
    const criarPerguntas = document.querySelector('.criarPerguntas');

    // Valores dos Inputs: comece pelo comeco.. 

    const titulo = document.getElementById('title').value
    const urlImg = document.getElementById('url-img').value
    
    const inputs = [titulo, urlImg, qntdPerguntas, qntdNiveis]

    if(qntdPerguntas >= 3 && qntdNiveis >= 2 && titulo.length > 20 && titulo.length < 65 ){
        criarQuizz.classList.add('escondido')
        criarPerguntas.classList.remove('escondido')
        getValueImputs(inputs)
        
    }else{alert("deu certo")}

    
    
    
    // getValueImputs(inputs)
}

// pegar valores dos imputs

function getValueImputs(put){
criarQuizz.title = put[0]
criarQuizz.image = put[1]

MakeArrayPerguntas(Number(put[2]))
}

// calcular numero de perguntas 


function MakeArrayPerguntas(put){

    // construcao da Array "criarQuizz"
    
    const perguntas = {
        title: "",
        color: "",
        answers: []
    }
    const respostaTrue = {
        text: "",
        image: "",
        isCorrectAnswer: true
    }
    const respostaFalse = {
        text: "",
        image: "",
        isCorrectAnswer: false
    }
    
    criarQuizz.questions = []
    criarQuizz.questions.length = put
    
    for(i=0;i<put;i++){
        criarQuizz.questions[i] = perguntas
    }
    
    criarQuizz.questions[2].answers.length = 4 

    let c = 0
    for(i=0;i<put;i++){
        if(c < 4){
            if(c === 0){
     criarQuizz.questions[2].answers[c] = respostaTrue
         }else { criarQuizz.questions[2].answers[c] = respostaFalse}
    }
    c++
    }
}

// pegar valores dos inputs das PERGUNTAS 

function GetValuePerguntas(){

    const txtPergunta = document.getElementById('txtPergunta').value
    const corPergunta = document.getElementById('corPergunta').value
    
    for(i=0;i<Number(qntdPerguntas);i++){
        criarQuizz.questions[i].title = txtPergunta
        criarQuizz.questions[i].color = corPergunta
    }

    console.log(criarQuizz)
}

/*

{
    text: "Texto da resposta 1",
    image: "https://http.cat/411.jpg",
    isCorrectAnswer: true
},
{
    text: "Texto da resposta 2",
    image: "https://http.cat/412.jpg",
    isCorrectAnswer: false
}
]

*/


















const perguntasQuizz =[];
const respostasQuizz =[];




function fazerPost(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', criarQuizz)
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
