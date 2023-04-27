const listaAlunosInput = document.getElementById('lista-alunos');
  const listaAlunosLabel = document.querySelector('label[for="lista-alunos"]');
  const listaAprovadosInput = document.getElementById('lista-aprovados');
  const listaAprovadosLabel = document.querySelector('label[for="lista-aprovados"]');

  // Adiciona um evento para quando o arquivo for selecionado
  listaAlunosInput.addEventListener('change', function() {
    // Exibe o nome do arquivo selecionado
    listaAlunosLabel.innerHTML = this.files[0].name;
  });

  listaAprovadosInput.addEventListener('change', function() {
    listaAprovadosLabel.innerHTML = this.files[0].name;
  });