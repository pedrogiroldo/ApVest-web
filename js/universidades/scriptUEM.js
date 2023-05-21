// A LISTA DA UEM É UM .TXT COM ANSI. COLOCAR NA DOCUMENTAÇÃO COMO CONVERTER PARA UTF-8 NA DOC

export function verificarUEM(alunosData, aprovadosData) {
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
    "Administração (Matutino-Maringá)",
    "Administração (Noturno-Maringá)",
    "Agronomia (Integral-Maringá)",
    "Agronomia (Integral-Umuarama)",
    "Arquitetura e Urbanismo (Integral-Maringá)",
    "Artes Cênicas (Matutino-Maringá)",
    "Artes Visuais (Vespertino-Maringá)",
    "Biomedicina (Integral-Maringá)",
    "Bioquímica (Integral-Maringá)",
    "Biotecnologia (Noturno-Maringá)",
    "Ciência da Computação (Integral-Maringá)",
    "Ciências Biológicas-Bacharelado ou Licenciatura (Integral-Maringá)",
    "Ciências Biológicas-Licenciatura (Noturno-Maringá)",
    "Ciências Contábeis (Matutino-Maringá)",
    "Ciências Contábeis (Noturno-Cianorte)",
    "Ciências Contábeis (Noturno-Maringá)",
    "Ciências Econômicas (Matutino-Maringá)",
    "Ciências Econômicas (Noturno-Maringá)",
    "Ciências Sociais-Bacharelado (Noturno-Maringá)",
    "Ciências Sociais-Licenciatura (Noturno-Maringá)",
    "Comunicação e Multimeios (Noturno-Maringá)",
    "Design (Integral-Cianorte)",
    "Direito (Matutino-Maringá)",
    "Direito (Noturno-Maringá)",
    "Educação Física (Matutino-Maringá)",
    "Educação Física (Noturno-Ivaiporã)",
    "Educação Física (Noturno-Maringá)",
    "Enfermagem (Integral-Maringá)",
    "Engenharia Agrícola (Integral-Cidade Gaúcha)",
    "Engenharia Ambiental (Integral-Umuarama)",
    "Engenharia Civil (Integral-Maringá)",
    "Engenharia Civil (Integral-Umuarama)",
    "Engenharia de Alimentos (Integral-Maringá)",
    "Engenharia de Alimentos (Integral-Umuarama)",
    "Engenharia de Produção (Noturno-Goioerê)",
    "Engenharia de Produção-Agroindústria (Integral-Maringá)",
    "Engenharia de Produção-Confecção Industrial (Integral-Maringá)",
    "Engenharia de Produção-Construção Civil (Integral-Maringá)",
    "Engenharia de Produção-Software (Integral-Maringá)",
    "Engenharia Elétrica (Integral-Maringá)",
    "Engenharia Mecânica (Integral-Maringá)",
    "Engenharia Química (Integral-Maringá)",
    "Engenharia Têxtil (Noturno-Goioerê)",
    "Estatística (Integral-Maringá)",
    "Farmácia (Integral-Maringá)",
    "Filosofia (Noturno-Maringá)",
    "Física - Bacharelado em Física Médica (Vespertino e Noturno-Goioerê)",
    "Física - Licenciatura (Noturno-Goioerê)",
    "Física-Bacharelado (Vespertino e Noturno-Maringá)",
    "Física-Licenciatura (Noturno-Maringá)",
    "Geografia-Bacharelado-M (Matutino-Maringá)",
    "Geografia-Bacharelado-N (Noturno-Maringá)",
    "Geografia-Licenciatura-M (Matutino-Maringá)",
    "Geografia-Licenciatura-N (Noturno-Maringá)",
    "História (Matutino-Maringá)",
    "História (Noturno-Ivaiporã)",
    "História (Noturno-Maringá)",
    "Informática (Noturno-Maringá)",
    "Letras-Inglês-Licenciatura/Bacharelado (Matutino-Maringá)",
    "Letras-Português-Licenciatura (Matutino-Maringá)",
    "Letras-Português/Francês-Licenciatura (Noturno-Maringá)",
    "Letras-Português/Inglês-Licenciatura (Noturno-Maringá)",
    "Matemática-Bacharelado (Vespertino e Noturno-Maringá)",
    "Matemática-Licenciatura (Noturno-Maringá)",
    "Medicina (Integral-Maringá)",
    "Medicina Veterinária (Integral-Umuarama)",
    "Moda (Matutino-Cianorte)",
    "Música-Bacharelado-Canto (Integral-Maringá)",
    "Música-Bacharelado-Composição (Integral-Maringá)",
    "Música-Bacharelado-Piano (Integral-Maringá)",
    "Música-Bacharelado-Regência (Integral-Maringá)",
    "Música-Bacharelado-Viola (Integral-Maringá)",
    "Música-Bacharelado-Violão (Integral-Maringá)",
    "Música-Bacharelado-Violino (Integral-Maringá)",
    "Música-Bacharelado-Violoncelo (Integral-Maringá)",
    "Música-Licenciatura-Educação Musical (Integral-Maringá)",
    "Odontologia (Integral-Maringá)",
    "Pedagogia (Matutino-Maringá)",
    "Pedagogia (Noturno-Cianorte)",
    "Pedagogia (Noturno-Maringá)",
    "Psicologia (Integral-Maringá)",
    "Química-Bacharelado (Integral-Maringá)",
    "Química-Licenciatura (Noturno-Maringá)",
    "Secretariado Executivo Trilíngue (Noturno-Maringá)",
    "Serviço Social (Noturno-Ivaiporã)",
    "Tecnologia em Alimentos (Noturno-Umuarama)",
    "Tecnologia em Construção Civil (Noturno-Umuarama)",
    "Tecnologia em Meio Ambiente (Noturno-Umuarama)",
    "Zootecnia (Integral-Maringá)",
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

  console.table("alunosAprovados:" + " " + alunosAprovados);
  console.table(
    "alunosAprovadosComFormatacao:" + " " + alunosAprovadosComFormatacao
  );
  console.log(alunosSet);
  console.log(cursosSemFormatacaoSet);

  return alunosAprovadosComFormatacao;
}
