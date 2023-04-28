const listaAlunosInput = document.getElementById('lista-alunos');
const listaAlunosLabel = document.querySelector('label[for="lista-alunos"]');
const listaAprovadosInput = document.getElementById('lista-aprovados');
const listaAprovadosLabel = document.querySelector('label[for="lista-aprovados"]');
const listaAlunosTick = document.getElementById('greenTickInput1')
const listaAprovadosTick = document.getElementById('greenTickInput2')

// const listaAlunosRedTick = document.getElementById('redTickInput1')
// const listaAprovadosRedTick = document.getElementById('redTickInput2')

listaAprovadosTick.style.display = "none";
listaAlunosTick.style.display = "none";

// listaAprovadosRedTick.style.display = "none";
// listaAlunosRedTick.style.display = "none";

  // Adiciona um evento para quando o arquivo for selecionado
  listaAlunosInput.addEventListener('change', function() {
    // Exibe o nome do arquivo selecionado
    listaAlunosLabel.innerHTML = this.files[0].name;
    listaAlunosTick.style.display = '';
    listaAlunosRedTick.style.display = 'none';
    
  });
  
  listaAprovadosInput.addEventListener('change', function() {
    listaAprovadosLabel.innerHTML = this.files[0].name;
    listaAprovadosTick.style.display = 'none';
  });