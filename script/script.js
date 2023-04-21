axios.defaults.headers.common['Authorization'] = 'D1tow2WsfGdVjgTVFdhmZiAi';


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
}
