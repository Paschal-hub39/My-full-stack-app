// REGISTER SERVICE WORKER FOR PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

document.addEventListener('DOMContentLoaded', () => {
    // STAT COUNTER LOGIC
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const update = () => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText.replace(/\D/g,'');
            const speed = target / 100;
            if (count < target) {
                stat.innerText = Math.ceil(count + speed) + (stat.innerText.includes('%') ? '%' : '+');
                setTimeout(update, 20);
            }
        };
        update();
    });

    // MOBILE TOGGLE
    const menu = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav-links');
    menu.onclick = () => {
        nav.classList.toggle('active');
        menu.classList.toggle('is-active');
    };
});
