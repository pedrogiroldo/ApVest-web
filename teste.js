const espeacosRepetidos = /( )\1+/g;



const teste = "a    aaaaa aaaa           aaaaa    a a"


let novo = teste.replace(espeacosRepetidos, " ")

console.log(novo)

function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  

var textoComAcentos = "Olá, como você está?";
var textoSemAcentos = removerAcentos(textoComAcentos);

console.log(textoSemAcentos);

{
let i = 0
}

let i = 2