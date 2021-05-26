
/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

const categorias = {
    frutas : ["abacaxi", "maça", "banana"],
    animal : ["cachorro","gato","gamba"],
    cores : ["branco","preto","azul","roxo","amarelo","cinza","vinho","verde"],
    profissao : ["engenheiro", "programação", "administração","médico"],
    veiculo : ["carro", "moto", "bicileta","avião"]
};
function numAleatorio(size){
    return Math.floor(Math.random()*size);
}
function listCategory(){
    return Object.keys(categorias);
}

function categoryRandom(){
    const arrayCategory = listCategory();
    let indiceCategory = numAleatorio(arrayCategory.length);
    return arrayCategory[indiceCategory];

}
function exibirCategory(){
    categoria.innerHTML = categoryRandom();

}

function definirPalavraChave(){
    const listPalavras = categorias[categoria.innerHTML];
    let indicePalavraChave = numAleatorio(listPalavras.length);
    palavraProposta = listPalavras[indicePalavraChave];
    ocultarPalavra();
}
function ocultarPalavra(){
    let palavraOculta = "";
    for(let i = 0; i<palavraProposta.length; i++){
        palavraOculta += "-";
    }
    exibirPalavraInterface(palavraOculta);
}
function exibirPalavraInterface(palavraEntrada){
    palavraInterface.innerHTML = palavraEntrada;
}
/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}
function tentativa(keyLetra){
    if(palavraProposta.includes(keyLetra)){
        atualizarPalavraInterface(keyLetra);
    }else{
        letrasErradasArray.push(keyLetra);
        letrasErradas.innerHTML = "Letras erradas: "+letrasErradasArray;
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco();
        }
    }
    gameOver();
}
function gameOver(){
    if(!palavraInterface.innerHTML.includes("-")){
        exibirPalavraInterface("Você Venceu!");
        window.removeEventListener("keypress", retornaLetra);
    }else if(letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibirPalavraInterface("Você Perdeu :(");
        window.removeEventListener("keypress", retornaLetra);
    }
}
function atualizarPalavraInterface(letra){
    let aux = "";
    for(let i = 0; i<palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
            aux+=letra;
        }else if(palavraInterface.innerHTML[i] != "-"){
            aux+= palavraInterface.innerHTML[i];
        }else{
            aux+="-";
        }
    }
    exibirPalavraInterface(aux);
}
/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    letrasErradas.innerHTML = "Letras erradas: ";
    ocultaBoneco();
    exibirCategory();
    definirPalavraChave();
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
