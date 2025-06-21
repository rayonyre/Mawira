document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('.categories a');
    const postCards = document.querySelectorAll('.post-card');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function filterPosts(category) {
        postCards.forEach(post => {
            const postCategories = post.dataset.categories.split(' ');
            if (category === 'all' || postCategories.includes(category)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    function searchPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        // Desativa a categoria ativa ao pesquisar
        categoryLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.categories a[data-category="all"]').classList.add('active'); // Ativa "Todas"

        postCards.forEach(post => {
            const postTitle = post.querySelector('h3 a').textContent.toLowerCase();
            const postSummary = post.querySelector('p:not(.post-meta)').textContent.toLowerCase();
            if (postTitle.includes(searchTerm) || postSummary.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = this.dataset.category;

            // Atualiza a classe 'active' nos links de categoria
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            filterPosts(category);
            searchInput.value = ''; // Limpa a pesquisa ao filtrar por categoria
        });
    });

    // Event listeners para a barra de pesquisa
    searchButton.addEventListener('click', searchPosts);
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchPosts();
        }
    });

    // Funcionalidade do menu hamburger
    if (hamburgerMenu && navList) {
        hamburgerMenu.addEventListener('click', function() {
            navList.classList.toggle('open');
        });

        // Fechar o menu ao clicar em um item (opcional)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('open');
            });
        });
    }

    // Exibir todos os posts inicialmente
    filterPosts('all');
});