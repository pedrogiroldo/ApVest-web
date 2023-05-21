export function verificarUEM(alunosData, aprovadosData) {
  /*
    =======
    REGEX
    =======
    */
  const numeros = /\d+/g;
  const espacosRepetidos = /( )\1+/g;
  const caracteresEspeciais = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g;

  const alunosSemFormatacao = alunosData
    .replace(/\r\n/g, "\n") //substitui \r por \n (causa erros em algumas listas)
    .replace(/\r/g, "\n") //substitui \r por \n (causa erros em algumas listas)
    .replace(numeros, "")
    .replace(espacosRepetidos, " ")
    .replace(caracteresEspeciais, "")
    .split("\n");

  const aprovadosSemFormatacao = aprovadosData
    .replace(/\r\n/g, "\n") //substitui \r por \n (causa erros em algumas listas)
    .replace(/\r/g, "\n") //substitui \r por \n (causa erros em algumas listas)
    .replace(numeros, "")
    .replace(espacosRepetidos, " ")
    .replace(caracteresEspeciais, "")
    .split("\n");

  let alunos = [];
  let aprovados = [];

  // Remover acentos e colocar em maiúsculo com primeira letra de cada palavra em maiúsculo
  alunosSemFormatacao.forEach((aluno) => {
    // aluno = aluno.replace(numeros, "")
    aluno = aluno.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    aluno = aluno.toUpperCase();
    aluno = aluno.replace(/(\b\w)/gi, function (m) {
      return m.toUpperCase();
    });
    alunos.push(aluno);
  });

  // Remover acentos e colocar em maiúsculo com primeira letra de cada palavra em maiúsculo
  aprovadosSemFormatacao.forEach((aprovado) => {
    aprovado = aprovado.trim();
    if (aprovado !== "") {
      aprovado = aprovado.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      aprovado = aprovado.toUpperCase();
      aprovado = aprovado.replace(/(\b\w)/gi, function (m) {
        return m.toUpperCase();
      });
      aprovados.push(aprovado);
    }
  });

  const alunosSet = new Set(alunos);
  const aprovadosSet = new Set(aprovados);

  const alunosAprovados = [];

  alunosSet.forEach((aluno) => {
    if (aprovadosSet.has(aluno)) {
      alunosAprovados.push(aluno);
    }
  });

  console.table(alunosAprovados);
  return alunosAprovados;
}
