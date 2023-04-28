const button = document.getElementById('input_client_button');

const listaAlunosRedTick = document.getElementById('redTickInput1')
const listaAprovadosRedTick = document.getElementById('redTickInput2')

listaAprovadosRedTick.style.display = "none";
listaAlunosRedTick.style.display = "none";

button.addEventListener('click', () => {
  const universityInput = document.getElementById('nomeVest');
  // const universityInputCSS = document.querySelector('inputVest');
  // const alunosInput = document.getElementById('lista-alunos');
  const alunosInput = document.querySelector('.input1');
  // const aprovadosInput = document.getElementById('lista-aprovados');
  const aprovadosInput = document.querySelector('.input2');

  if (!universityInput.value || !alunosInput.value || !aprovadosInput.value) {
    // adiciona a classe 'shake' aos inputs vazios
    if (!universityInput.value) {
      universityInput.classList.add('shake');
      universityInput.style.borderColor = 'red';
      universityInput.style.boxShadow = '0 0 5px red';
      // universityInput.classList.add.boxShadow(0, 0, 5, rgba(225, 0, 0))
      //alert('Por favor, preencha o campo "Nome da Universidade".');
    }
    if (!alunosInput.value) {
      alunosInput.classList.add('shake');
      listaAlunosRedTick.style.display = '';
      //alert('Por favor, preencha o campo "Lista de Alunos".');
    }
    if (!aprovadosInput.value) {
      aprovadosInput.classList.add('shake');
      listaAprovadosRedTick.style.display = '';
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