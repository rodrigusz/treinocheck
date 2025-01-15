// Botões
document.getElementById('buttonFichas').addEventListener('click', () => {
  window.location.href = '/fichas.html';
});

document.getElementById('buttonSair').addEventListener('click', () => {
  alert('Você saiu da sua conta.');
  window.location.href = '/login.html';
});

// Função carregarFrequencia
async function carregarFrequencias() {
  const frequenciaData = document.getElementById('frequenciaData');
  frequenciaData.innerHTML = 'Carregando...';

  try {
    const response = await fetch('/frequencias?id_alunos=1');
    const frequencias = await response.json();
    
    console.log("Frequências recebidas do servidor:", frequencias); 

    if (response.ok && frequencias.length > 0) {
      frequenciaData.innerHTML = frequencias
        .map(frequencia => {
          console.log("ID da Frequência dentro do map:", frequencia.id_frequencia); 
          return `
            <p>
              <strong>Data:</strong> ${frequencia.data_treino} | 
              <strong>Treino:</strong> ${frequencia.tipo_treino}
              <button class="btn btn-success" onclick="editarFrequencia(${frequencia.id_frequencia}, '${frequencia.data_treino}', '${frequencia.tipo_treino}')">Editar</button>
              <button class="btn btn-danger" onclick="deletarFrequencia(${frequencia.id_frequencia})">Deletar</button>
            </p>
          `;
        })
        .join('');
    } else {
      frequenciaData.innerHTML = 'Nenhuma frequência registrada.';
    }
  } catch (error) {
    console.error('Erro ao carregar frequências:', error);
    frequenciaData.innerHTML = 'Erro ao carregar frequências.';
  }
}
// Função editarFrequencia
async function editarFrequencia(id_frequencia, data_treino, tipo_treino) {
  alert(`Informações atuais:\nData: ${data_treino}\nTipo: ${tipo_treino}`);

  const novaData = prompt("Digite a nova data do treino (formato YYYY-MM-DD):", data_treino);
  const novoTipo = prompt("Digite o novo tipo de treino (Inferior/Superior):", tipo_treino);

  if (!novaData || !novoTipo) {
      alert("Todos os campos são obrigatórios!");
      return;
  }

  const tiposValidos = ["Inferior", "Superior"];
  if (!tiposValidos.includes(novoTipo)) {
      alert("Erro: O tipo de treino deve ser 'Inferior' ou 'Superior'.");
      return;
  }

  try {
      const response = await fetch('/frequencia', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_frequencia, data_treino: novaData, tipo_treino: novoTipo }),
      });

      const result = await response.json();

      if (response.ok) {
          alert(result.message);
          carregarFrequencias(); 
      } else {
          alert(result.message || "Erro ao editar frequência.");
      }
  } catch (error) {
      console.error('Erro ao editar frequência:', error);
      alert("Erro ao editar frequência.");
  }
}

// Função deletarFrequencia
async function deletarFrequencia(id_frequencia) {
  console.log("ID da frequência a ser deletada:", id_frequencia); 

  const confirmDelete = confirm("Tem certeza que deseja deletar essa frequência?");
  if (!confirmDelete) return;

  try {
      const response = await fetch(`/frequencia/${id_frequencia}`, {
          method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
          alert(result.message);
          carregarFrequencias();
      } else {
          alert(result.message || "Erro ao deletar frequência.");
      }
  } catch (error) {
      console.error('Erro ao deletar frequência:', error);
      alert("Erro ao deletar frequência.");
  }
}

document.addEventListener('DOMContentLoaded', carregarFrequencias);
