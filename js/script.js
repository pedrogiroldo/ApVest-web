/*
======================
CONSTANTES GLOBAIS
======================
 */
// Recebe os arquivos dos inputs


const alunosFileInput = document.getElementById('lista-alunos');
const aprovadosFileInput = document.getElementById('lista-aprovados');
const nameVestInput = document.getElementById('nomeVest');



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

// Imagens
const logoUni = new Image()
logoUni.src = '../images/exemploLogo.png'
const logoApVest = new Image()
logoApVest.src = '../images/logoApVest.png'

/*
=======================
FUNCOES
=====================
*/

// IMPORTAR FUNCOES UNIVERSIDADES
import {verificarUEL} from './universidades/scriptUEL.js'


//funções para conversão de valores
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
  if(page == 'firstPage'){
    const addUniLogo = ()=> {doc.addImage(logoUni, 'PNG', A4_WIDTH_SIZE / 2 - (uniW * 1.5) / 2 - (ApVestW/1.5), pxToPt(20), uniW * 1.5, uniH * 1.5, '', 'NONE', 0)};
    const addApVestLogo = () => {doc.addImage(logoApVest, 'PNG', A4_WIDTH_SIZE / 2 + (uniW * 1.5) / 2 - (ApVestW/1.5) + cmToPt(1.8), pxToPt(80), ApVestW / 1.5, ApVestH / 1.5, '', 'NONE', 0)};

  //chama as funções
    addUniLogo();
    addApVestLogo();
  }
  else{
    const addUniLogo = ()=> {doc.addImage(logoUni, 'PNG', A4_WIDTH_SIZE/2 - uniW/2, pxToPt(10), uniW, uniH, '', 'NONE', 0)};
    const addApVestLogo = () => {doc.addImage(logoApVest, 'PNG', A4_WIDTH_SIZE - ApVestW/2 - pxToPt(15), A4_HEIGHT_SIZE - ApVestH/1.75, ApVestW/2, ApVestH/2, '', 'NONE', 0)};

    //chama as funções
    addUniLogo();
    addApVestLogo();
  }
}


// função para achar os alunos aprovados
function encontrarAlunosAprovados(alunosData, aprovadosData) {
  // atualizar valor do nameVestInput
  const nameVestInput = document.getElementById('nomeVest');
  const selectedVest = nameVestInput.value
  switch(selectedVest) {
    case 'UEL':
      const alunosAprovadosUEL = verificarUEL(alunosData, aprovadosData);
      return alunosAprovadosUEL;
  }
}



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
      const alunosAprovados = encontrarAlunosAprovados(alunosData, aprovadosData);

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
      .text('Essa ferramenta está em desenvolvimento, seu nome não estar aqui NÃO significa que você não foi aprovado. Confira a lista de aprovados oficial.', A4_WIDTH_SIZE/2, A4_HEIGHT_SIZE - cmToPt(4), 
      {
        maxWidth: A4_WIDTH_SIZE - 2 * cmToPt(2),
        align: 'center'
      });
      addLogo(doc, "firstPage");        
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

      doc.save("Aprovados"+ " " + nameVestInput.value + ".pdf")
      
    };
  };
}
/*
===============
BOTÃO VERIFICAR
===============
*/
const client_button = document
  .getElementById('input_client_button')
  .addEventListener('click', (e) => {
    e.preventDefault();
    if (alunosFileInput.files.length != 0 && aprovadosFileInput.files.length != 0){
    executar();
    }
  })