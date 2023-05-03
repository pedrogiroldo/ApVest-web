/*
======================
CONSTANTES GLOBAIS
======================
 */



// Medidas das páginas
const pageHeight = 842; // altura da página em pontos (A4)
const topMargin = pxToPt(10) + pxToPt(150); // margem superior em pontos
const bottomMargin = 30; // margem inferior em pontos
const lineHeight = 25; // altura de linha em pontos

const A4_HEIGHT_SIZE = 842;
const A4_WIDTH_SIZE = 595;

const ApVestW = pxToPt(157);
const ApVestH = pxToPt(144);
const uniW = pxToPt(200);
const uniH = pxToPt(150);

/*
=======================
FUNCOES
=====================
*/

//funções para conversão de valores
function cmToPx(valorEmCm) {
  const larguraDoMonitorEmCm = 34; // exemplo de largura do monitor em centímetros
  const larguraDoMonitorEmPixels = window.screen.width; // largura do monitor em pixels
  const proporcao = larguraDoMonitorEmPixels / larguraDoMonitorEmCm; // proporção entre largura em pixels e largura em centímetros
  const valorEmPx = valorEmCm * proporcao; // converte para pixels
  return valorEmPx;
}

function ptToPx(pt) {
  const px = pt * (96 / 72);
  return px;
}

function cmToPt(cm) {
  const pt = cm * 28.3465;
  return pt;
}

function pxToPt(px) {
  const pt = px * 0.75;
  return pt;
}


// funções para adicionar pagina e logo
function addPage (doc, page) {
  doc.addPage();
  addLogo(doc, page);
}

function addLogo(doc, page){

//verificar modelo de página (1 ou >1)
if(page == 1){
  const addUniLogo = ()=> {doc.addImage('../images/logoUni.png', 'PNG', A4_WIDTH_SIZE/2 - (uniW * 1.5) /2, pxToPt(20), uniW * 1.5, uniH * 1.5, '', 'NONE', 0)};
  const addApVestLogo = () => {doc.addImage('../images/logoApVest.png', 'PNG', A4_WIDTH_SIZE - ApVestW/2 - pxToPt(15), A4_HEIGHT_SIZE - ApVestH/1.75, ApVestW/2, ApVestH/2, '', 'NONE', 0)};

//chama as funções
  addUniLogo();
  addApVestLogo();
}
else{
  const addUniLogo = ()=> {doc.addImage('../images/logoUni.png', 'PNG', A4_WIDTH_SIZE/2 - uniW/2, pxToPt(10), uniW, uniH, '', 'NONE', 0)};
  const addApVestLogo = () => {doc.addImage('../images/logoApVest.png', 'PNG', A4_WIDTH_SIZE - ApVestW/2 - pxToPt(15), A4_HEIGHT_SIZE - ApVestH/1.75, ApVestW/2, ApVestH/2, '', 'NONE', 0)};

  //chama as funções
  addUniLogo();
  addApVestLogo();
}


}

// função para achar os alunos aprovados
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

// Recebe os arquivos dos inputs
const alunosFileInput = document.getElementById('lista-alunos');
const aprovadosFileInput = document.getElementById('lista-aprovados');
const nameVestInput = document.getElementById('nomeVest');


// Função executada ao apertar o botão
function executar () {
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
      
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [A4_WIDTH_SIZE, A4_HEIGHT_SIZE],
      });

      doc.setFont('helvetica', 'normal')
      .setFontSize(40)
      .text('Aprovados ' + nameVestInput.value, A4_WIDTH_SIZE/2, A4_HEIGHT_SIZE/2, 
      {
        align: 'center',
        maxWidth: A4_WIDTH_SIZE - 2 * cmToPt(2)
      })
      .setFontSize(15)
      .text('Essa é uma ferramenta em desenvolvimento, seu nome não estar aqui NÃO significa que você não foi aprovado. Confira a lista de aprovados oficial.', A4_WIDTH_SIZE/2, A4_HEIGHT_SIZE - cmToPt(4), 
      {
        maxWidth: A4_WIDTH_SIZE - 2 * cmToPt(2),
        align: 'center'
      });
      addLogo(doc, 1);        
      addPage(doc);
      doc.setFontSize(18);
      let y = topMargin;
      for (let i = 0; i < alunosAprovadosMask.length; i++) {
        if (y + lineHeight > pageHeight - bottomMargin) {
          addPage(doc);
          y = topMargin;
        }
        doc.text(alunosAprovadosMask[i], 20, y);
         y += lineHeight;
      }

      doc.save("teste.pdf")
      
    };
  };
}
/*
===============
BOTAO VERIFICAR
===============
*/
const client_button = document
  .getElementById('input_client_button')
  .addEventListener('click', (e) => {
    e.preventDefault();
    executar();
  })