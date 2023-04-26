function encontrarAlunosAprovados(alunosData, aprovadosData) {

  //regex para tirar os \r
  const alunos = alunosData.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const aprovados = aprovadosData.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');


  const alunosSet = new Set(alunos);
  const aprovadosSet = new Set(aprovados);

  const alunosAprovados = [];

  alunosSet.forEach((aluno) => {
    if (aprovadosSet.has(aluno)) {
      alunosAprovados.push(aluno);
    }
  });

  return alunosAprovados;
}

const alunosFileInput = document.getElementById('lista-alunos');
const aprovadosFileInput = document.getElementById('lista-aprovados');

const client_button = document
  .getElementById('input_client_button')
  .addEventListener('click', () => {
    const alunosFile = alunosFileInput.files[0];
    const aprovadosFile = aprovadosFileInput.files[0];

    const reader = new FileReader();
    reader.readAsText(alunosFile);
    reader.onload = () => {
      const alunosData = reader.result;
      const reader2 = new FileReader();
      reader2.readAsText(aprovadosFile);
      reader2.onload = () => {
        const aprovadosData = reader2.result;
        const alunosAprovados = encontrarAlunosAprovados(alunosData, aprovadosData);
        console.log(alunosAprovados);
      };
    };
  });

