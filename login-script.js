document.addEventListener('DOMContentLoaded', () => {
    // --- Credenciais de Teste ---
    // Use este e-mail e senha para testar o login.
    // Lembre-se: em um site real, a validação seria no servidor (backend) por segurança.
    const TEST_EMAIL = 'teste@mawira.com.br';
    const TEST_PASSWORD = 'senha123';

    // --- Elementos do DOM ---
    const showLoginButton = document.getElementById('showLogin');
    const showRegisterButton = document.getElementById('showRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const registerNameInput = document.getElementById('registerName');
    const registerEmailInput = document.getElementById('registerEmail');
    const registerPasswordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const agreeTermsCheckbox = document.getElementById('agreeTerms'); // Novo checkbox

    // --- Lógica de Alternância entre Formulários (Login / Criar Conta) ---
    function activateForm(formToShow, buttonToActivate) {
        // Remove 'active' de todos os formulários e botões
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
        showLoginButton.classList.remove('active');
        showRegisterButton.classList.remove('active');

        // Adiciona 'active' ao formulário e botão corretos
        formToShow.classList.add('active');
        buttonToActivate.classList.add('active');
    }

    showLoginButton.addEventListener('click', () => activateForm(loginForm, showLoginButton));
    showRegisterButton.addEventListener('click', () => activateForm(registerForm, showRegisterButton));

    // --- Lógica para Mostrar/Esconder Senha ---
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.dataset.target;
            const passwordField = document.getElementById(targetId);
            const iconElement = icon.querySelector('i'); // Pega o <i> dentro do span

            // Alterna o tipo do input entre 'password' e 'text'
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                iconElement.classList.remove('fa-eye');
                iconElement.classList.add('fa-eye-slash'); // Ícone de olho riscado
            } else {
                passwordField.type = 'password';
                iconElement.classList.remove('fa-eye-slash');
                iconElement.classList.add('fa-eye'); // Ícone de olho normal
            }
        });
    });

    // --- Lógica de Submissão do Formulário de LOGIN ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário (recarregar a página)

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value.trim();

        if (email === TEST_EMAIL && password === TEST_PASSWORD) {
            alert('Login bem-sucedido! Bem-vindo(a) de volta à Mawira!');
            // Redireciona o usuário para a página inicial (ou outra página pós-login)
            window.location.href = 'index.html'; 
        } else {
            alert('E-mail ou senha incorretos. Por favor, tente novamente.');
        }
    });

    // --- Lógica de Submissão do Formulário de REGISTRO (Simulado) ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão

        const name = registerNameInput.value.trim();
        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validação básica dos campos
        if (!name || !email || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos para criar sua conta.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem! Por favor, verifique.');
            return;
        }

        if (password.length < 6) { // Exemplo de validação de senha
            alert('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        if (!agreeTermsCheckbox.checked) {
            alert('Você deve concordar com os Termos de Uso e Política de Privacidade para criar sua conta.');
            return;
        }

        // --- SIMULAÇÃO DE CADASTRO ---
        // Em um site real, você enviaria esses dados para um servidor para criar a conta.
        console.log('Dados de registro a serem enviados (simulados):');
        console.log('Nome:', name);
        console.log('E-mail:', email);
        console.log('Senha:', '***(senha oculta por segurança)***');
        
        alert('Conta criada com sucesso! Agora você pode fazer login.');
        // Limpa o formulário de registro e volta para a aba de login para que o usuário possa testar o login
        registerForm.reset();
        agreeTermsCheckbox.checked = false; // Desmarcar checkbox
        activateForm(loginForm, showLoginButton); // Ativa o formulário de login
    });

    // --- Inicialização: Garante que o formulário de login esteja ativo ao carregar a página ---
    activateForm(loginForm, showLoginButton);
});