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