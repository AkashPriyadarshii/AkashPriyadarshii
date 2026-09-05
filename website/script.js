document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.huge-link');
    const panel = document.getElementById('desc-panel');
    const descText = document.getElementById('desc-text');

    // Advanced Hover Logic for the Project Monolith
    if (panel && descText) {
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const desc = link.getAttribute('data-desc');
                descText.textContent = desc;
                panel.classList.add('active');
            });

            link.addEventListener('mouseleave', () => {
                panel.classList.remove('active');
            });
        });
    }

    // Pause Marquee on Hover
    const marquee = document.querySelector('.marquee-track');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });
        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });
    }
});

