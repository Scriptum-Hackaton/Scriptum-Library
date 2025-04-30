document.addEventListener('DOMContentLoaded', function () {

    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');

    mobileMenuBtn.addEventListener('click', function () {
        menu.classList.toggle('active');
    });

    // Navegação entre seções
    const menuLinks = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('section');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove classe active de todos os links
            menuLinks.forEach(item => item.classList.remove('active'));

            // Adiciona classe active ao link clicado
            this.classList.add('active');

            // Mostra a seção correspondente
            const targetId = this.getAttribute('href').substring(1);

            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });

            // Fecha o menu mobile se estiver aberto
            menu.classList.remove('active');
        });
    });

    // Carrossel de livros
    const bookSlider = document.querySelector('.book-slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            bookSlider.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            bookSlider.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        });
    }

    // Animação do círculo de livros
    const bookItems = document.querySelectorAll('.book-item');

    // Animação de flutuação para os livros
    bookItems.forEach((item, index) => {
        item.style.animation = `float 3s ease ${index * .5}s infinite alternate`;
    });

    // Adicionar keyframes de flutuação dinamicamente
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes float {
            0% { transform: translate(-50%, -50%) rotate(calc(var(--i) * 72deg)) translateY(-180px) rotate(calc(var(--i) * -72deg)) translateZ(0); }
            100% { transform: translate(-50%, -50%) rotate(calc(var(--i) * 72deg)) translateY(-190px) rotate(calc(var(--i) * -72deg)) translateZ(0); }
        }
    `;
    document.head.appendChild(styleSheet);

    const dice = document.querySelector('.dice');
    if (dice) {
        dice.addEventListener('click', function () {
            // Animação do dado
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'spin 1s ease-out';
            }, 10);

            // Adicionar keyframes de rotação dinamicamente
            const spinStyle = document.createElement('style');
            spinStyle.type = 'text/css';
            spinStyle.innerText = `
            @keyframes spin {
                0% { transform: rotate(0) scale(1); }
                50% { transform: rotate(180deg) scale(1.2); }
                100% { transform: rotate(360deg) scale(1); }
            }
        `;
            document.head.appendChild(spinStyle);

            // Gerar um número aleatório de 1 a 5
            setTimeout(() => {
                const randomNumber = Math.floor(Math.random() * 5) + 1; // Gera um número entre 1 e 5
                let targetPage = '';

                // Redirecionar para a página correspondente
                switch (randomNumber) {
                    case 1:
                        targetPage = './pages/Livro-Drama.html';
                        break;
                    case 2:
                        targetPage = './pages/Livro-Investigação.html';
                        break;
                    case 3:
                        targetPage = './pages/Livro-Infantil.html';
                        break;
                    case 4:
                        targetPage = './pages/Livro-Romance.html';
                        break;
                    case 5:
                        targetPage = './pages/Livro-Psicológico.html';
                        break;
                }

                // Exibe o número gerado e redireciona
                alert(`Número gerado: ${randomNumber}. Redirecionando para a página...`);
                window.location.href = targetPage; // Redireciona o usuário
            }, 1000); // Aguarda a animação do dado antes de redirecionar
        });
    }

    // Inicializar a página home como ativa
    document.getElementById('home').classList.add('active');
    document.querySelector('.menu a[href="#home"]').classList.add('active');

    // Animação para os cards de categoria
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });

    // Animação para os cards de livros na seção de lançamentos
    const newBooks = document.querySelectorAll('.new-book');

    newBooks.forEach((book, index) => {
        book.style.opacity = '0';
        book.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            book.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            book.style.opacity = '1';
            book.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });

    // Animação para estatísticas na seção sobre
    const statItems = document.querySelectorAll('.stat-item');

    // Função para verificar se um elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Função para animar os números das estatísticas
    function animateStats() {
        statItems.forEach(item => {
            if (isElementInViewport(item) && !item.classList.contains('animated')) {
                item.classList.add('animated');

                const statNumber = item.querySelector('.stat-number');
                const targetNumber = parseInt(statNumber.textContent.replace(/\D/g, ''), 10);
                let currentNumber = 0;
                const duration = 2000; // 2 segundos
                const interval = 50; // 50ms entre cada atualização
                const steps = duration / interval;
                const increment = targetNumber / steps;

                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        currentNumber = targetNumber;
                        clearInterval(counter);
                    }

                    // Formatar o número com o símbolo + se necessário
                    statNumber.textContent = Math.floor(currentNumber).toLocaleString() + (statNumber.textContent.includes('+') ? '+' : '');
                }, interval);
            }
        });
    }

    // Verificar animações ao rolar a página
    window.addEventListener('scroll', () => {
        animateStats();
    });

    // Verificar animações ao carregar a página
    animateStats();
});