function verificarUEL (alunosData, aprovadosData) {

  //regex para tirar os \r
  const alunosSemFormatacao = alunosData.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const aprovadosSemFormatacao = aprovadosData.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  let alunos = [];
  let aprovados = [];

  // Remover acentos e colocar em maiúsculo com primeira letra de cada palavra em maiúsculo
  alunosSemFormatacao.forEach((aluno) => {
    const primeiras3Linhas = "^(.*\n){0,2}.*$"

    aluno = aluno.replace(primeiras3Linhas, "")
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


export default (verificarUEL)