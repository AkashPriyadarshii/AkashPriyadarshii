document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Staggered Fade-Up Reveals
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));

    // 2. Magnetic Micro-Physics for Primary CTA
    // Premium mathematical cursor pull without React re-render overhead
    const magneticBtn = document.querySelector('.magnetic-btn');
    
    if (magneticBtn && window.matchMedia("(pointer: fine)").matches) {
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            
            // Calculate center of the button
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from center (constrained to a max pull radius)
            // Divide by a factor (e.g., 3) to make the pull subtle and premium
            const pullX = (e.clientX - centerX) / 3;
            const pullY = (e.clientY - centerY) / 3;
            
            // Apply transform dynamically
            magneticBtn.style.transform = `translate(${pullX}px, ${pullY}px)`;
        });
        
        magneticBtn.addEventListener('mouseleave', () => {
            // Reset with spring-like snap back (transition handled in CSS)
            magneticBtn.style.transform = `translate(0px, 0px)`;
        });
    }
});
