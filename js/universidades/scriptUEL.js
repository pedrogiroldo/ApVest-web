// A LISTA DA UEM É UM .TXT COM ANSI. COLOCAR NA DOCUMENTAÇÃO COMO CONVERTER PARA UTF-8 NA DOC

export function verificarUEL(alunosData, aprovadosData) {
  /*
    =======
    REGEX
    =======
    */
  const numeros = /\d+/g;
  const espacosRepetidos = /( )\1+/g;
  const caracteresEspeciais = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g;
  const acentos = /[\u0300-\u036f]/g;

  const alunosSemFormatacao = alunosData
    .replace(/\r\n/g, "\n") //substitui \r por \n (causa erros em algumas listas)
    .replace(/\r/g, "\n") //substitui \r por \n (causa erros em algumas listas)
    .replace(numeros, "")
    .replace(espacosRepetidos, " ")
    .replace(caracteresEspeciais, "")
    .normalize("NFD")
    .replace(acentos, "")
    .split("\n");

  const aprovadosSemFormatacao = aprovadosData
    .replace(/\r\n/g, "\n") //substitui \r por \n (causa erros em algumas listas)
    .replace(/\r/g, "\n") //substitui \r por \n (causa erros em algumas listas)
    .replace(numeros, "")
    .replace(espacosRepetidos, " ")
    .replace(caracteresEspeciais, "")
    .normalize("NFD")
    .replace(acentos, "")
    .split("\n");

  const cursos = [
  'Administração (Matutino)',
  'Administração (Noturno)',
  'Agronomia (Integral)',
  'Arquitetura e Urbanismo (Integral)',
  'Arquivologia (Noturno)',
  'Artes Cênicas (Matutino)',
  'Artes Visuais - Licenciatura (Matutino)',
  'Artes Visuais - Licenciatura (Noturno)',
  'Biblioteconomia (Noturno)',
  'Biomedicina (Integral)',
  'Biotecnologia (Integral)',
  'Ciência da Computação (Integral)',
  'Ciências Biológicas - Bacharelado (Integral)',
  'Ciências Biológicas - Licenciatura (Matutino)',
  'Ciências Contábeis (Matutino)',
  'Ciências Contábeis (Noturno)',
  'Ciências Econômicas (Matutino)',
  'Ciências Econômicas (Noturno)',
  'Ciências Sociais - Bacharelado (Matutino)',
  'Ciências Sociais - Licenciatura (Noturno)',
  'Design de Moda (Matutino)',
  'Design Gráfico (Matutino)',
  'Direito (Matutino)',
  'Direito (Noturno)',
  'Direito (Vespertino)',
  'Educação Física - Bacharelado e Licenciatura (Matutino)',
  'Educação Física - Bacharelado e Licenciatura (Noturno)',
  'Enfermagem (Integral)',
  'Engenharia Civil (Integral)',
  'Engenharia Elétrica (Integral)',
  'Farmácia (Integral)',
  'Filosofia - Licenciatura (Noturno)',
  'Física - Bacharelado (Integral)',
  'Física - Licenciatura (Noturno)',
  'Fisioterapia (Integral)',
  'Geografia (Matutino)',
  'Geografia (Noturno)',
  'História - Licenciatura (Matutino)',
  'História - Licenciatura (Noturno)',
  'Jornalismo (Matutino)',
  'Jornalismo (Noturno)',
  'Letras Espanhol - Licenciatura (Noturno)',
  'Letras Inglês - Licenciatura (Noturno)',
  'Letras Português - Licenciatura (Noturno)',
  'Letras Português - Licenciatura (Vespertino)',
  'Matemática - Bacharelado (Matutino)',
  'Matemática - Licenciatura (Noturno)',
  'Medicina (Integral)',
  'Medicina Veterinária (Integral)',
  'Música - Licenciatura (Vespertino)',
  'Nutrição (Integral)',
  'Odontologia (Integral)',
  'Pedagogia (Matutino)',
  'Pedagogia (Noturno)',
  'Psicologia (Integral)',
  'Química - Bacharelado (Integral)',
  'Química - Licenciatura (Noturno)',
  'Relações Públicas (Matutino)',
  'Relações Públicas (Noturno)',
  'Secretariado Executivo (Noturno)',
  'Serviço Social (Matutino)',
  'Serviço Social (Noturno)',
  'Zootecnia (Integral)'
];


  let cursosSemFormatacao = [];

  for (let i = 0; i < cursos.length; i++) {
    cursosSemFormatacao.push(
      cursos[i]
        .replace(numeros, "")
        .replace(espacosRepetidos, " ")
        .replace(caracteresEspeciais, "")
        .normalize("NFD")
        .replace(acentos, "")
        .toUpperCase()
    );
  }

  let alunos = [];
  let aprovados = [];
  let alunosComCurso = [];

  // Remover acentos e colocar em maiúsculo com primeira letra de cada palavra em maiúsculo
  alunosSemFormatacao.forEach((aluno) => {
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
      aprovado = aprovado.toUpperCase();
      aprovado = aprovado.replace(/(\b\w)/gi, function (m) {
        return m.toUpperCase();
      });
      aprovados.push(aprovado);
    }
  });

  {
    let i = 0;
    while (i < alunos.length) {
      alunosComCurso.push(alunos[i]);
      i++;
    }
  }

  {
    let i = 0;
    while (i < cursosSemFormatacao.length) {
      alunosComCurso.push(cursosSemFormatacao[i]);
      i++;
    }
  }

  let alunosAprovados = [];
  let alunosAprovadosComFormatacao = [];

  const alunosSet = new Set(alunos);
  const cursosSemFormatacaoSet = new Set(cursosSemFormatacao);
  const alunosComCursoSet = new Set(alunosComCurso);
  const aprovadosSet = new Set(aprovados);

  aprovadosSet.forEach((aluno) => {
    if (alunosComCursoSet.has(aluno)) {
      alunosAprovados.push(aluno);
    }
  });

  const alunosAprovadosSet = new Set(alunosAprovados);

  alunosAprovados.forEach((linha) => {
    if (alunosSet.has(linha)) {
      alunosAprovadosComFormatacao.push("       " + linha);
    } else if (cursosSemFormatacaoSet.has(linha)) {
      alunosAprovadosComFormatacao.push(linha);
    }
  });

  console.table(alunosAprovados);

  return alunosAprovadosComFormatacao;
}
