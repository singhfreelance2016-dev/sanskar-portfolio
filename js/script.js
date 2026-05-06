/* ========== MOBILE MENU TOGGLE ========== */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const body = document.body;

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('show-menu')) {
            icon.classList.replace('fa-bars', 'fa-times');
            body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            body.style.overflow = ''; // Allow scroll
        }
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        const icon = navToggle.querySelector('i');
        if (icon.classList.contains('fa-times')) {
            icon.classList.replace('fa-times', 'fa-bars');
        }
        body.style.overflow = ''; // Allow scroll
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show-menu') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
        const icon = navToggle.querySelector('i');
        if (icon.classList.contains('fa-times')) {
            icon.classList.replace('fa-times', 'fa-bars');
        }
        body.style.overflow = '';
    }
});

/* ========== ACTIVE LINK ON SCROLL ========== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ========== SCROLL REVEAL ANIMATION ========== */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section, .portfolio__card, .services__card');

    reveals.forEach(element => {
        if (!element.classList.contains('reveal')) {
            element.classList.add('reveal');
        }

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 80; // Trigger slightly earlier for mobile

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);

/* ========== SMOOTH MOBILE PERFORMANCE ========== */
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        scrollActive();
        revealOnScroll();
    });
});