// Botão de voltar
document.getElementById('voltar').addEventListener('click', () => {
    window.location.href = '/frequencia.html';
});

// Botão de Finalizar
document.getElementById('finalizar').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const selectedExercises = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const exerciseText = checkbox.closest('.checkbox-container').querySelector('p.fs-4').textContent;
            selectedExercises.push(exerciseText);
        }
    });

    if (selectedExercises.length === 0) {
        alert('Por favor, selecione ao menos um exercício!');
        return;
    }

    // Gera a imagem
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600 + selectedExercises.length * 30; 

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Exercícios Selecionados:', 20, 40);

    selectedExercises.forEach((exercise, index) => {
        ctx.fillText(`${index + 1}. ${exercise}`, 20, 80 + index * 30);
    });

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'ficha.png';
    link.click();

    setTimeout(() => {
        window.alert('Frequência criada com sucesso!');
        window.location.href = 'frequencia.html';
    }, 1000);
    
});

// Função para não marcar todas as checkbox
function handleCheckboxLimit(groupId, limit) {
    const checkboxes = document.querySelectorAll(`#${groupId} .form-check-input`);
    let checkedCount = 0;

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            checkedCount = Array.from(checkboxes).filter(chk => chk.checked).length;

            if (checkedCount > limit) {
                checkbox.checked = false;
            }
        });
    });
}

handleCheckboxLimit('perna', 7);
handleCheckboxLimit('peito', 3);
handleCheckboxLimit('ombro', 3);
handleCheckboxLimit('triceps', 3);
handleCheckboxLimit('costas', 3);
handleCheckboxLimit('trapezio', 3);
handleCheckboxLimit('biceps', 3);
