//Botão fechar
document.getElementById('buttonFechar').addEventListener('click', () => {
    window.location.href = '/frequencia.html';
});

//Função para adicionar a frequencia
document.getElementById('saveButton').addEventListener('click', async function() {
    const data = document.getElementById('date').value;
    const treinoInferior = document.getElementById('inferior').checked;
    const treinoSuperior = document.getElementById('superior').checked;

    if (!data) {
        alert('Por favor, selecione a data do treino.');
        return;
    }

    if (!treinoInferior && !treinoSuperior) {
        alert('Por favor, marque o tipo de treino.');
        return;
    }

    const tipoTreino = treinoInferior ? 'Inferior' : 'Superior';

    try {
        const response = await fetch('/frequencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                aluno_id: 1,
                data_treino: data,
                tipo_treino: tipoTreino,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Frequência adicionada com sucesso!');
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (error) {
        console.error('Erro ao adicionar frequência:', error);
        alert('Erro ao adicionar frequência. Tente novamente.');
    }
});

