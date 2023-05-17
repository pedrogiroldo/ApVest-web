const espeacosRepetidos = /( )\1+/g;



const teste = "a    aaaaa aaaa           aaaaa    a a"


let novo = teste.replace(espeacosRepetidos, " ")

console.log(novo)