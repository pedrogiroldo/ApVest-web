const aprovadosFilePath = document.getElementById('lista-aprovados');
const alunosFilePath = document.getElementById('lista-alunos');

function encontrarAlunosAprovados(alunosFilePath, aprovadosFilePath) {
    const fs = require('fs');
    const alunos = fs.readFileSync(alunosFilePath, 'utf-8').split('\n');
    const aprovados = fs.readFileSync(aprovadosFilePath, 'utf-8').split('\n');
    
    const alunosSet = new Set(alunos);
    const aprovadosSet = new Set(aprovados);
    
    const alunosAprovados = [];
    
    alunosSet.forEach((aluno) => {
      if (aprovadosSet.has(aluno)) {
        alunosAprovados.push(aluno);
      }
    });
    
    console.log(alunosAprovados)
    return alunosAprovados;
  }

  const client_button = document
  .getElementById("botao")
  .addEventListener("click", encontrarAlunosAprovados);