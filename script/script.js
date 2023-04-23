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
          <div class="fotoquizz" data-test="banner">
            <img class="capa" src="${quizz.image}" />
          </div>
          <p class="titulocentral">${quizz.title}</p>
          <div class="perguntas-respostas">
      `;

    for (let j = 0; j < quizz.questions.length; j++) {
        // Adicione um atributo de estilo para o elemento do título da pergunta
        template += `
          <div class="pergunta" data-test="question" >
            <p class="enunciado" data-test="question-title" style="background-color: ${quizz.questions[j].color}">${quizz.questions[j].title}</p>
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
            <div class="fotoenome" data-test="answer">
              <div class="imagem">
                <img class="imagem1" onclick="selecionarRespostas(this)" src="${respostas[k].image}" />
              </div>
              <p class="resposta" data-test="answer-text">${respostas[k].text}</p>
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
        
        template = `
        <li class="Quizz" data-test="others-quiz" data-id="${quizzes[i].id}" onclick = "pegarId(event)">
        <img class="Quizz-img" data-test="others-quiz" style="background-image: linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0)), url(${quizzes[i].image})"/>
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
















// fim da parte da NAT... INICIO PARTE DO HENRIQUE ... 










// console.log(document.getElementById(title).value)

const criarQuizz = {}
const qntdPerguntas = document.getElementById('qntd-perguntas').value
const qntdNiveis = document.getElementById('qntd-nvl').value

// verificar se é uma URL 

// function checkUrl(string) {
//     try {
//      let url = new URL(string)
//      criarPerguntas()
//    } catch(err) {
//     alert("insira uma URL correta") 
//     criarPerguntas()
//    }
 
//  }

// adicionar clsse e remover... e pegar valores dos inputs

function criarPerguntas() {

    validarinput();
    if (mensagem !== '') {
        return alert(mensagem), mensagem = '';
    }

    const criarQuizz = document.querySelector('.criarQuizz');
    const criarPerguntas = document.querySelector('.criarPerguntas');

    // Valores dos Inputs: comece pelo comeco.. 

    const titulo = document.getElementById('title').value
    const urlImg = document.getElementById('url-img').value
    
    const inputs = [titulo, urlImg, qntdPerguntas, qntdNiveis]

    //if(qntdPerguntas >= 3 && qntdNiveis >= 2 && titulo.length > 20 && titulo.length < 65 ){
        criarQuizz.classList.add('escondido')
        criarPerguntas.classList.remove('escondido')
        getValueImputs(inputs)
        
    //}else{alert("deu certo")}

    
    
    
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
    console.log(criarQuizz)
    let c = 0
    for(i=0;i<put;i++){
        if(c < 4){
            if(c === 0){
     criarQuizz.questions[2].answers[c] = respostaTrue
         }else { criarQuizz.questions[2].answers[c] = respostaFalse}
    }
    c++
    }
    console.log(criarQuizz)
}

// pegar valores dos inputs das PERGUNTAS 

function GetValuePerguntas(){
   
    //const txtPergunta = []
    //const corPergunta = []
    let c = 0
    for(i=0; i <Number(qntdPerguntas);i++){
        
        let texto = document.querySelector(`.text-pergunta${c+1}`).value
        let cor = document.querySelector(`.cor-pergunta${c+1}`).value
        
        criarQuizz.questions[c].title = texto
        criarQuizz.questions[c].color = cor
        c++
        console.log(criarQuizz.questions[c])
        //txtPergunta.push(texto)
        //corPergunta.push(cor)
        // inputPerguntas(i, txtPergunta, corPergunta)
    }




     /*

    function inputPerguntas(i, txtPergunta, corPergunta){
        criarQuizz.questions[i].title = txtPergunta[i]
        criarQuizz.questions[i].color = corPergunta[i]
        console.log( criarQuizz.questions[i].color[i][i])
    }

    let i = 0
    let txtPergunta = document.querySelector(`.text-pergunta${i+1}`).value
    let corPergunta = document.querySelector(`.cor-pergunta${i+1}`).value
   
    for(i=0;i<Number(qntdPerguntas);i++){
        criarQuizz.questions[i].title = txtPergunta
        criarQuizz.questions[i].color = corPergunta
    }

      
        if( c <Number(qntdPerguntas)){
            criarQuizz.questions[i].title = txtPergunta
            criarQuizz.questions[i].color = corPergunta
        }
        c++
   */ 

    console.log(criarQuizz)
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
    
    if(titulo.length < 20 || titulo.length > 65) {
        mensagem += "cheque se seu título possui entre 20 e 65 caracteres \n"
    }
    if (verificador !== 'https://') {
        mensagem += "cheque se sua imagem é válida \n"
    }
    if (qntdep < 3) {
        mensagem += "Cheque se a quantidade de perguntas é no minimo 3 \n"
    }    
    if (qtndel < 2) {
        mensagem += "Cheque se a quantidade de níveis é no minimo 2 \n"
    }
    
    
    // if (mensagem !== '') {
    //     alert(mensagem)
    // }

}

function criarQuizzz() {

    const index = document.querySelector('.pagina1');
    const criarQuizz = document.querySelector('.criarQuizz');

    index.classList.add('escondido');
    criarQuizz.classList.remove('escondido');
}

function numerodePerguntas () {

    
    const perguntas = document.querySelector('.criarPerguntas .outrasPerguntas')
    const numero = Number(document.querySelector('.qtde-perguntas').value)
    for (let i = 1; i < numero; i++) {

        perguntas.innerHTML += `<div class="perguntamini" data-test="question-ctn">
        <span>Pergunta ${i+1}</span>
        <img src="imgs/note.png" data-test="toggle" onclick="abrirPergunta(this, ${i +1})">
    </div>`     
    }
    }



function fazerPost(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', criarQuizz)
    criarQuizz.classList.add('escondido');
    criarPerguntas.classList.remove('escondido');

    // numerodePerguntas();
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

    Pergunta.innerHTML = `<div class='pergunta' data-test="question-ctn" >
<div data-test="question-ctn" class='info'>
    <span>Pergunta ${i}</span> 
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
        <input data-test="wrong-img-input" type='text' class='incorreta2-pergunta${i}' placeholder='URL da imagem 1'>
    </div>
    <div class='incorreta2'>
        <input data-test="wrong-answer-input" type='text' class='incorreta2-pergunta${i}' placeholder='Resposta incorreta 2'>
        <input data-test="wrong-img-input" type='text' class='incorreta2-pergunta${i}' placeholder='URL da imagem 2'>
    </div>
    <div class='incorreta3'>
        <input data-test="wrong-answer-input" type='text' class='incorreta3-pergunta${i}' placeholder='Resposta incorreta 3'>
        <input data-test="wrong-img-input" type='text' class='incorreta3-pergunta${i}' placeholder='URL da imagem 3'>
    </div>
</div> 
</div>`;
console.log(Pergunta)
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
    <input type="text" data-test="level-percent-input" class="%acerto-nivel${i}" placeholder="% de acerto mínima">
    <input type="text" data-test="level-img-input" class="url-nivel${i}" placeholder="URL da imagem do nível">
    <textarea type='text' data-test="level-description-input"  class="descricao-nivel${i}" placeholder="Descrição do nível"></textarea>
</div>`

}
