document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Glitch effect on hover for game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.classList.add('border-glitch');
        });
        
        card.addEventListener('mouseout', function() {
            this.classList.remove('border-glitch');
        });
    });

    // Error handling wrapper
    function handleError(error) {
        console.error('An error occurred:', error);
        // You can add more sophisticated error handling here
    }

    // Wrap all event listeners in try-catch
    try {
        // Add loading state for buttons
        const buttons = document.querySelectorAll('a[href*="games/"]');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                this.style.opacity = '0.7';
                this.textContent = 'Loading...';
            });
        });

    } catch (error) {
        handleError(error);
    }
});

// Preload game pages
window.addEventListener('load', function() {
    try {
        const gamePages = ['games/truefalse.html', 'games/quiz.html'];
        gamePages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
        });
    } catch (error) {
        console.error('Prefetch error:', error);
    }
});