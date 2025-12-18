/**
 * Highly Interactive Portfolio - Advanced JavaScript Features
 * Custom Cursor, Scroll Animations, Dark Mode, and More
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

function initializeAll() {
    initCustomCursor();
    initScrollProgress();
    initDarkMode();
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initNavActiveState();
    initNumberCounter();
    initTechStackEffects();
    initProjectTilt();
    initScrollToTop();
    console.log('%c✨ Interactive Portfolio Loaded! ', 'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: bold;');
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower || window.innerWidth <= 768) {
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function updateFollower() {
        const speed = 0.15;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(updateFollower);
    }
    updateFollower();

    const interactiveElements = document.querySelectorAll('a, button, .tech-item, .project-card-interactive, .cert-card-interactive');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.transform = 'scaleX(' + (scrolled / 100) + ')';
    });
}

// Dark Mode Toggle
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => { themeToggle.style.transform = ''; }, 300);
    });
}

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        const spans = navToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const navbar = document.getElementById('navbar');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// Scroll Reveal Animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
}

// Active Navigation State
function initNavActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    function setActiveLink() {
        const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                if (activeLink) activeLink.classList.add('active');
            }
        });
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
}

// Number Counter Animation
function initNumberCounter() {
    const stats = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-count'));
                animateCounter(target, finalValue);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => counterObserver.observe(stat));
}

function animateCounter(element, finalValue) {
    let currentValue = 0;
    const duration = 2000;
    const increment = finalValue / (duration / 16);
    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// Tech Stack Interactive Effects
function initTechStackEffects() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animationDelay = (index * 0.1) + 's';
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.cssText = 'position:absolute;width:100px;height:100px;background:rgba(99,102,241,0.3);border-radius:50%;transform:scale(0);animation:ripple 0.6s ease-out;pointer-events:none;';
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 50) + 'px';
            ripple.style.top = (e.clientY - rect.top - 50) + 'px';
            this.style.position = 'relative';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = '@keyframes ripple { to { transform: scale(2); opacity: 0; } }';
    document.head.appendChild(style);
}

// Project Cards Tilt Effect
function initProjectTilt() {
    const cards = document.querySelectorAll('.project-card-interactive, .experience-card-interactive, .education-card-interactive');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Scroll-to-Top Button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top-btn';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    const style = document.createElement('style');
    style.textContent = '.scroll-to-top-btn{position:fixed;bottom:2rem;right:2rem;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));color:white;border:none;font-size:1.5rem;cursor:pointer;opacity:0;visibility:hidden;transition:all 0.3s;box-shadow:0 4px 15px var(--glow);z-index:999}.scroll-to-top-btn.visible{opacity:1;visibility:visible}.scroll-to-top-btn:hover{transform:translateY(-5px);box-shadow:0 8px 25px var(--glow)}@media (max-width:768px){.scroll-to-top-btn{bottom:1.5rem;right:1.5rem;width:45px;height:45px}}';
    document.head.appendChild(style);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Console Easter Egg
console.log('%c Hey there! 👋', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%c Looking for something? Feel free to explore the code!', 'font-size: 14px; color: #64748b;');
console.log('%c Built with ❤️ using HTML, CSS & Vanilla JavaScript', 'font-size: 12px; color: #94a3b8; font-style: italic;');

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c✨ All assets loaded!', 'color: #10b981; font-weight: bold;');
});
