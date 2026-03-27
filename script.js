// STAT COUNTER
document.querySelectorAll('.stat-number').forEach(stat => {
    const update = () => {
        const target = +stat.dataset.target;
        const count = +stat.innerText.replace(/\D/g,'') || 0;
        const increment = Math.ceil(target/100);
        if(count < target){
            stat.innerText = (count+increment>target ? target : count+increment) + (stat.innerText.includes('%') ? '%' : '+');
            setTimeout(update,20);
        }
    };
    update();
});

// MOBILE MENU
const menu = document.getElementById('mobile-menu');
const nav = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
    nav.classList.toggle('active');
    menu.classList.toggle('is-active');
});

// DARK MODE TOGGLE
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});