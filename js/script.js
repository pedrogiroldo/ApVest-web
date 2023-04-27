// Medidas das páginas
const pageHeight = 842; // altura da página em pontos (A4)
const topMargin = 30; // margem superior em pontos
const bottomMargin = 30; // margem inferior em pontos
const lineHeight = 20; // altura de linha em pontos

const A4_HEIGHT_SIZE = 842;
const A4_WIDTH_SIZE = 595;


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
function addPage (doc) {
  doc.addPage();
  logoUni(doc);
}

function logoUni(doc){
  doc.addImage('../images/logoUni.png', 'PNG', A4_WIDTH_SIZE - pxToPt(200) - cmToPt(1), A4_HEIGHT_SIZE - pxToPt(150), pxToPt(200), pxToPt(150), '', 'NONE', 0);
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
      .text('Aprovados [VESTIBULAR]', A4_WIDTH_SIZE/2, A4_HEIGHT_SIZE/2, {
        align: 'center'
      })
      logoUni(doc);        
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
      console.log(alunosAprovadosMask)
      
    };
  };
}

 
// Coisas executadas ao apertar o botão
const client_button = document
  .getElementById('input_client_button')
  .addEventListener('click', (e) => {
    e.preventDefault();
    executar();
  })