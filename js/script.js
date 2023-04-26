function encontrarAlunosAprovados(alunosData, aprovadosData) {

  //regex para tirar os \r
  const alunosSemFormatacao = alunosData.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const aprovadosSemFormatacao = aprovadosData.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  let alunos = [];
  let aprovados = [];

  // Remover acentos e colocar em maiúsculo com primeira letra de cada palavra em maiúsculo
  alunosSemFormatacao.forEach((aluno) => {
    aluno = aluno.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    aluno = aluno.toUpperCase();
    aluno = aluno.replace(/(\b\w)/gi, function(m) {
      return m.toUpperCase();
    });
    alunos.push(aluno);
  });

  // Remover acentos e colocar em maiúsculo com primeira letra de cada palavra em maiúsculo
  aprovadosSemFormatacao.forEach((aprovado) => {
    aprovado = aprovado.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    aprovado = aprovado.toUpperCase();
    aprovado = aprovado.replace(/(\b\w)/gi, function(m) {
      return m.toUpperCase();
    });
    aprovados.push(aprovado);
  });

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
  .addEventListener('click', (e) => {
    e.preventDefault();
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
        let alunosAprovados = encontrarAlunosAprovados(alunosData, aprovadosData);
        const alunosAprovadosMask = alunosAprovados.map((aluno) => {
          return aluno.toLowerCase().replace(/(^|\s)\S/g, function (letra) {
            return letra.toUpperCase();
          });
        });
        
        // const { jsPDF } = window.jspdf;
        // const doc = new jsPDF({
        //   orientation: "portrait",
        //   unit: "pt",
        //   format: "a4",
        // });
        // doc.newPage(); 
        console.log(alunosAprovadosMask)
        
      };
    };
  });
