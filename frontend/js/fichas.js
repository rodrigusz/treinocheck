// Botões
document.getElementById('buttonSair').addEventListener('click', () => {
    alert('Você saiu da sua conta.');
    window.location.href = '/login.html';
});

document.getElementById('buttonVoltar').addEventListener('click', () => {
  window.location.href = '/frequencia.html';
});

// Envia a foto da ficha
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      alert(`Arquivo "${file.name}" anexado com sucesso!`);
  } else {
      alert("Por favor, selecione um arquivo.");
  }
});