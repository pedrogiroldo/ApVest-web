const button = document.getElementById('input_client_button');

button.addEventListener('click', () => {
  const universityInput = document.getElementById('nomeVest');
  const alunosInput = document.getElementById('lista-alunos');
  const aprovadosInput = document.getElementById('lista-aprovados');

  if (!universityInput.value || !alunosInput.value || !aprovadosInput.value) {
    // adiciona a classe 'shake' aos inputs vazios
    if (!universityInput.value) {
      universityInput.classList.add('shake');
      //alert('Por favor, preencha o campo "Nome da Universidade".');
    }
    if (!alunosInput.value) {
      alunosInput.classList.add('shake');
      //alert('Por favor, preencha o campo "Lista de Alunos".');
    }
    if (!aprovadosInput.value) {
      aprovadosInput.classList.add('shake');
      //alert('Por favor, preencha o campo "Lista de Aprovados".');
    }

    // remove a classe 'shake' após 500ms
    setTimeout(() => {
      universityInput.classList.remove('shake');
      alunosInput.classList.remove('shake');
      aprovadosInput.classList.remove('shake');
    }, 500);

    return false;
  }
});