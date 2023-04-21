axios.defaults.headers.common['Authorization'] = 'D1tow2WsfGdVjgTVFdhmZiAi';


// console.log(document.getElementById(title).value)
const criarQuizz = [
    {
        title: "",
        image: "https://http.cat/411.jpg",
        question:[]
    }
]


// verificar se é uma URL 

function checkUrl(string) {
    try {
     let url = new URL(string)
     criarPerguntas()
   } catch(err) {
    alert("insira uma URL correta") 
   }
 
 }

// adicionar clsse e remover... e pegar valores dos inputs

function criarPerguntas() {
    const criarQuizz = document.querySelector('.criarQuizz');
    const criarPerguntas = document.querySelector('.criarPerguntas');



  


    // Valores dos Inputs: comece pelo comeco.. 

    const titulo = document.getElementById('title').value
    const urlImg = document.getElementById('url-img').value
    const qntdPerguntas = document.getElementById('qntd-perguntas').value
    const qntdNiveis = document.getElementById('qntd-nvl').value
    const inputs = [titulo, urlImg, qntdPerguntas, qntdNiveis]

    if(qntdPerguntas > 3 && qntdNiveis > 2 && titulo.length > 20 && titulo.length < 65 ){
        criarQuizz.classList.add('escondido')
        criarPerguntas.classList.remove('escondido')
        getValueImputs(inputs)
    }

    
    
    
    // getValueImputs(inputs)
}

/*

// pegar valores dos imputs

function getValueImputs(put){
criarQuizz.title = put[0]
criarQuizz.image = put[1]

MakeArrayPerguntas(put[2])
console.log(put)
}

// calcular numero de perguntas 


function MakeArrayPerguntas(put){
    const perguntas = {title: "opa"}
    
    for(i=0;i<put;i++){
        criarQuizz.question.push(perguntas)
       //console.log("boa")
    }
    console.log(criarQuizz)
    console.log(put)
}

*/























const perguntasQuizz =[];
const respostasQuizz =[];




function fazerPost(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', criarQuizz)
}
