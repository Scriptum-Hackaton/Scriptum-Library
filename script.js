document.addEventListener('DOMContentLoaded', function() {
    // Configuração das partículas de fundo
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6b5b95'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6b5b95',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');

    mobileMenuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Navegação entre seções
    const menuLinks = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('section');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
        item.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite alternate`;
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

    // Efeito de rotação do dado no centro
    const dice = document.querySelector('.dice');
    if (dice) {
        dice.addEventListener('click', function() {
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
                    100% {
                    50% { transform: rotate(180deg) scale(1.2); }
                    100% { transform: rotate(360deg) scale(1); }
                }
            `;
            document.head.appendChild(spinStyle);
            
            // Reorganizar os livros aleatoriamente
            setTimeout(() => {
                bookItems.forEach(item => {
                    // Parar a animação de flutuação
                    item.style.animation = 'none';
                    
                    // Aplicar animação de rotação aleatória
                    const randomRotation = Math.floor(Math.random() * 360);
                    const randomDistance = 150 + Math.floor(Math.random() * 50);
                    item.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    item.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg) translateY(-${randomDistance}px) rotate(-${randomRotation}deg)`;
                });
                
                // Restaurar posições originais e animação de flutuação após 2 segundos
                setTimeout(() => {
                    bookItems.forEach((item, index) => {
                        const i = item.style.getPropertyValue('--i');
                        item.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        item.style.transform = `translate(-50%, -50%) rotate(calc(${i} * 72deg)) translateY(-180px) rotate(calc(${i} * -72deg))`;
                        
                        // Restaurar animação de flutuação com atraso
                        setTimeout(() => {
                            item.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite alternate`;
                        }, 1000);
                    });
                }, 2000);
            }, 500);
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