document.addEventListener('DOMContentLoaded', () => {
    // Elegant Fade-up observer (Apple style ease-out)
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on order
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    fadeElements.forEach(el => observer.observe(el));
});
