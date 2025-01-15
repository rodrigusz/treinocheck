// Variáveis
let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let cpf = document.querySelector('#cpf')
let labelCpf = document.querySelector('#labelCpf')
let validCpf = false

let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

// Validação do Nome
nome.addEventListener('keyup', () => {
  if (nome.value.length < 3) {
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres*'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

// Validação do CPF
cpf.addEventListener('keyup', () => {
  if (cpf.value.length != 11){
    labelCpf.setAttribute('style', 'color: red')
    labelCpf.innerHTML = 'CPF *Insira um CPF válido com 11 números*'
    cpf.setAttribute('style', 'border-color: red')
    validCpf = false
  } else {
    labelCpf.setAttribute('style', 'color: green')
    labelCpf.innerHTML = 'CPF'
    cpf.setAttribute('style', 'border-color: green')
    validCpf = true
  }
})

// Validação do e-mail
email.addEventListener('keyup', () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Somente para enviar emails EX:"seuemail@gmail.com"
  if (!emailPattern.test(email.value)) {
    labelEmail.setAttribute('style', 'color: red')
    labelEmail.innerHTML = 'E-mail *Insira um e-mail válido*'
    email.setAttribute('style', 'border-color: red')
    validEmail = false
  } else {
    labelEmail.setAttribute('style', 'color: green')
    labelEmail.innerHTML = 'E-mail'
    email.setAttribute('style', 'border-color: green')
    validEmail = true
  }
})

// Validação da senha
senha.addEventListener('keyup', () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres*'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

// Função para cadastrar
async function cadastrar() {
  if (validNome && validCpf && validEmail && validSenha) {
    const userData = {
      nome: nome.value,
      cpf: cpf.value,
      email: email.value,
      senha: senha.value,
    };

    try {
      const response = await fetch('/cadastroaluno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        msgSuccess.setAttribute('style', 'display: block');
        msgSuccess.innerHTML = `<strong>${data.message}</strong>`;
        msgError.setAttribute('style', 'display: none');
      } else {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = `<strong>${data.message}</strong>`;
        msgSuccess.setAttribute('style', 'display: none');
      }
    } catch (error) {
      msgError.setAttribute('style', 'display: block');
      msgError.innerHTML = '<strong>Erro ao cadastrar usuário. Tente novamente mais tarde.</strong>';
    }
  } else {
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.setAttribute('style', 'display: none');
  }
}

// Botão de Voltar
document.getElementById('buttonVoltar').addEventListener('click', () => {
  window.location.href = '/login.html';
});
