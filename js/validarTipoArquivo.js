const inputFile = document.getElementById('lista-alunos');
const inputFile1 = document.getElementById('lista-aprovados');
const greenTick = document.getElementById('greenTickInput1');
const redTick = document.getElementById('redTickInput1');

inputFile.addEventListener('change', () => {
  const file = inputFile.files[0];

  const isValid = validarArquivo(file);
  if (isValid) {
    // Se o arquivo é válido, exibe o ícone verde
    greenTick.style.display = '';
    redTick.style.display = 'none';
  } else {
    // Se o arquivo não é válido, exibe o ícone vermelho
    redTick.style.display = '';
  }
});

inputFile.addEventListener('change', () => {
  const file1 = inputFile1.files[0];
  const isValid = validarArquivo(file1);
  if (isValid) {
    // Se o arquivo é válido, exibe o ícone verde
    greenTick.style.display = '';
    console.log(isValid)
  } else {
    // Se o arquivo não é válido, exibe o ícone vermelho
    console.log(isValid)
    redTick.style.display = '';
  }
});

function validarArquivo(file, file1) {
  
  if (!file || file.type !== 'text/plain') {
    // Se a extensão do arquivo não é permitida, retorna false
    return false;
  }
  if (!file1 || file1.type !== 'text/plain') {
    // Se a extensão do arquivo não é permitida, retorna false
    return false;
  }
  const fileBuffer = new FileReaderSync().readAsArrayBuffer(file);
  const fileBuffer1 = new FileReaderSync().readAsArrayBuffer(file1);
  
  if (fileBuffer[0] === 0xEF && fileBuffer[1] === 0xBB && fileBuffer[2] === 0xBF || fileBuffer1[0] === 0xEF && fileBuffer1[1] === 0xBB && fileBuffer1[2] === 0xBF ) {
    // Se o arquivo começa com o BOM para arquivos de texto UTF-8, retorna true
    return true;
  } else {
    // Se o arquivo não começa com o BOM para arquivos de texto UTF-8, retorna false
    return false;
  }
}