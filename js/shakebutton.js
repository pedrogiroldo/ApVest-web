const button = document.getElementById('input_client_button');

const listaAlunosRedTick = document.getElementById('redTickInput1');
const listaAprovadosRedTick = document.getElementById('redTickInput2');

const buttonCSS= document.querySelector('.button');

listaAprovadosRedTick.style.display = "none";
listaAlunosRedTick.style.display = "none";

button.addEventListener('click', () => {
  const universityInput = document.getElementById('nomeVest');
  const alunosInput = document.getElementById('lista-alunos');
  const aprovadosInput = document.getElementById('lista-aprovados');
  const alunosInputCSS = document.querySelector('.input1');
  const aprovadosInputCSS = document.querySelector('.input2');

  if (!universityInput.value || !alunosInput.value || !aprovadosInput.value) {
    // adiciona a classe 'shake' aos inputs vazios
    if (!universityInput.value) {
      universityInput.classList.add('shake');
      universityInput.style.borderColor = 'red';
      universityInput.style.boxShadow = '0 0 5px red';
      // universityInput.classList.add.boxShadow(0, 0, 5, rgba(225, 0, 0))
      //alert('Por favor, preencha o campo "Nome da Universidade".');
    }
    console.log(alunosInput)
    if (!alunosInput.value) {
      alunosInputCSS.classList.add('shake');
      listaAlunosRedTick.style.display = '';
      //alert('Por favor, preencha o campo "Lista de Alunos".');
    }
    console.log(aprovadosInput)
    if (!aprovadosInput.value) {
      aprovadosInputCSS.classList.add('shake');
      listaAprovadosRedTick.style.display = '';
      //alert('Por favor, preencha o campo "Lista de Aprovados".');
    }

    // remove a classe 'shake' após 500ms
    setTimeout(() => {
      universityInput.classList.remove('shake');
      alunosInputCSS.classList.remove('shake');
      aprovadosInputCSS.classList.remove('shake');
    }, 500);

    return false;
  }
});


const universityInput = document.getElementById('nomeVest');

universityInput.onchange = ()=>{
  if(universityInput.value){
    universityInput.style.borderColor = '';
    universityInput.style.boxShadow = '';
  }

}