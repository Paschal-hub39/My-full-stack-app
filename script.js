// REGISTER SERVICE WORKER FOR PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('Service Worker registered:', reg.scope))
    .catch(err => console.log('Service Worker registration failed:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    /* =========================
       STAT COUNTER LOGIC
    ========================= */
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const update = () => {
            const target = +stat.getAttribute('data-target');
            const current = +stat.innerText.replace(/\D/g,'') || 0;
            const increment = Math.ceil(target / 100);
            if (current < target) {
                stat.innerText = (current + increment > target ? target : current + increment) + (stat.innerText.includes('%') ? '%' : '+');
                setTimeout(update, 20);
            }
        };
        update();
    });

    /* =========================
       MOBILE MENU TOGGLE
    ========================= */
    const menu = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav-links');
    menu.addEventListener('click', () => {
        nav.classList.toggle('active');
        menu.classList.toggle('is-active');
    });

    /* =========================
       SMOOTH SCROLL FOR ANCHORS
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e){
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if(nav.classList.contains('active')) nav.classList.remove('active');
            if(menu.classList.contains('is-active')) menu.classList.remove('is-active');
        });
    });

    /* =========================
       SKILL BARS ANIMATION ON SCROLL
    ========================= */
    const skills = document.querySelectorAll('.skill-fill');
    const skillSection = document.querySelector('.skills-section');
    const animateSkills = () => {
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        if(sectionPos < screenPos) {
            skills.forEach(skill => {
                skill.style.width = skill.getAttribute('data-width') || skill.style.width;
            });
            window.removeEventListener('scroll', animateSkills); // animate once
        }
    };
    window.addEventListener('scroll', animateSkills);

    /* =========================
       PORTFOLIO HOVER ANIMATION (Optional)
    ========================= */
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hovered'));
        card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
    });
});