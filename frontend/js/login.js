document.addEventListener('DOMContentLoaded', function () {
    const cpf = document.querySelector('#cpf');
    const labelCpf = document.querySelector('#labelCpf');
    let validCpf = false;

    const senha = document.querySelector('#senha');
    const labelSenha = document.querySelector('#labelSenha');
    let validSenha = false;

    const msgError = document.querySelector('#msgError');

    // Validação do CPF
    cpf.addEventListener('keyup', () => {
        console.log(cpf.value.length)
        if (cpf.value.length!=11) {
            labelCpf.setAttribute('style', 'color: red');
            labelCpf.innerHTML = 'CPF *Insira um CPF válido com 11 números*';
            cpf.setAttribute('style', 'border-color: red');
            validCpf = false;
        } else {
            labelCpf.setAttribute('style', 'color: green');
            labelCpf.innerHTML = 'CPF';
            cpf.setAttribute('style', 'border-color: green');
            validCpf = true;
        }
    });

    // Validação da Senha
    senha.addEventListener('keyup', () => {
        if (senha.value.length <= 5) {
            labelSenha.setAttribute('style', 'color: red');
            labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres*';
            senha.setAttribute('style', 'border-color: red');
            validSenha = false;
        } else {
            labelSenha.setAttribute('style', 'color: green');
            labelSenha.innerHTML = 'Senha';
            senha.setAttribute('style', 'border-color: green');
            validSenha = true;
        }
    });

    // Realizar o login
    window.entrar = async function () {
        if (validCpf && validSenha) {
            const loginData = {
                cpf: cpf.value,
                senha: senha.value,
            };

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('authToken', data.token);
                    alert(data.message);
                    window.location.href = '/frequencia.html';
                } else {
                    const errorData = await response.json();
                    msgError.style.display = 'block';
                    msgError.innerHTML = errorData.message;
                }
            } catch (error) {
                console.error('Erro ao realizar login:', error);
                msgError.style.display = 'block';
                msgError.innerHTML = 'Erro no servidor. Tente novamente mais tarde.';
            }
        } else {
            msgError.style.display = 'block';
            msgError.innerHTML = 'Preencha todos os campos corretamente.';
        }
    };
});
