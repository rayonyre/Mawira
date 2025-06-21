document.addEventListener('DOMContentLoaded', () => {
    // 1. Modal de Boas-Vindas
    const welcomeModal = document.getElementById('welcomeModal');
    const closeButtons = document.querySelectorAll('.close-button, .btn-modal-close');
    const logoMawira = document.getElementById('logoMawira');

    // Mostra o modal automaticamente na primeira visita
    // Você pode usar localStorage para controlar se o usuário já viu o modal
    if (!localStorage.getItem('mawiraWelcomeShown')) {
        welcomeModal.style.display = 'flex';
        // Marca que o modal foi mostrado
        localStorage.setItem('mawiraWelcomeShown', 'true');
    }

    // Fecha o modal ao clicar nos botões de fechar
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            welcomeModal.style.display = 'none';
        });
    });

    // Fecha o modal ao clicar fora do conteúdo do modal
    window.addEventListener('click', (event) => {
        if (event.target === welcomeModal) {
            welcomeModal.style.display = 'none';
        }
    });

    // Ao clicar na logo Mawira (se o modal já foi fechado), abre novamente
    logoMawira.addEventListener('click', (e) => {
        e.preventDefault(); // Evita o comportamento padrão do link
        welcomeModal.style.display = 'flex';
    });


    // 2. Carrossel de Imagens (Hero Section)
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentItem = 0;

    function showNextItem() {
        carouselItems[currentItem].classList.remove('active');
        currentItem = (currentItem + 1) % carouselItems.length;
        carouselItems[currentItem].classList.add('active');
    }

    // Inicia o carrossel a cada 5 segundos
    setInterval(showNextItem, 5000);


    // 3. Menu Hambúrguer (Responsividade)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    hamburgerMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Fecha o menu hambúrguer ao clicar em um item (em mobile)
    navList.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });
});