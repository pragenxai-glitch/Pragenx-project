// ===== PRAGENX AI - LANDING PAGE SCRIPTS =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initWaitlistForm();
    initScrollAnimations();
    initHeroTime();
    initHeroEffects();
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            navbar.style.padding = '0.75rem 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 0';
        }

        lastScroll = currentScroll;
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu?.querySelectorAll('a');

    if (!menuBtn || !mobileMenu) return;

    let isOpen = false;

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        mobileMenu.classList.toggle('active', isOpen);

        // Animate hamburger to X
        const spans = menuBtn.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu on link click
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            mobileMenu.classList.remove('active');
            const spans = menuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== WAITLIST FORM =====
function initWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    const successMessage = document.getElementById('success-message');
    const emailInput = document.getElementById('email-input');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput?.value;
        if (!email) return;

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Joining...</span>';
        submitBtn.disabled = true;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success
        form.style.display = 'none';
        if (successMessage) {
            successMessage.classList.add('show');
        }

        // Store in localStorage (for demo purposes)
        const waitlist = JSON.parse(localStorage.getItem('pragenx_waitlist') || '[]');
        waitlist.push({ email, timestamp: new Date().toISOString() });
        localStorage.setItem('pragenx_waitlist', JSON.stringify(waitlist));

        console.log('Email added to waitlist:', email);
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .animate-delay-1 { transition-delay: 0.1s; }
        .animate-delay-2 { transition-delay: 0.2s; }
        .animate-delay-3 { transition-delay: 0.3s; }
        .animate-delay-4 { transition-delay: 0.4s; }
        .animate-delay-5 { transition-delay: 0.5s; }
        .animate-delay-6 { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);

    // Apply to elements
    const animateElements = [
        '.pain-card',
        '.feature-card',
        '.step-card',
        '.intel-card',
        '.pricing-card',
        '.privacy-point',
        '.proof-card',
        '.section-header'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            if (index < 6) {
                el.classList.add(`animate-delay-${index + 1}`);
            }
            observer.observe(el);
        });
    });
}

// ===== HERO LIVE TIME =====
function initHeroTime() {
    const timeElement = document.getElementById('hero-time');
    if (!timeElement) return;

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// ===== HERO EFFECTS =====
function initHeroEffects() {
    const hero = document.querySelector('.hero');
    const bgText = document.querySelector('.hero-bg-text');
    const orbs = document.querySelectorAll('.orb');

    if (!hero) return;

    // Subtle parallax on mouse move
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        // Move background text slightly
        if (bgText) {
            bgText.style.transform = `translate(calc(-50% + ${xPercent * 20}px), calc(-50% + ${yPercent * 10}px))`;
        }

        // Move orbs in opposite direction for depth
        orbs.forEach((orb, index) => {
            const factor = (index + 1) * 10;
            orb.style.transform = `translate(${-xPercent * factor}px, ${-yPercent * factor}px)`;
        });
    });

    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
        if (bgText) {
            bgText.style.transform = 'translate(-50%, -50%)';
        }
        orbs.forEach(orb => {
            orb.style.transform = '';
        });
    });
}

// ===== PARALLAX EFFECT (Optional) =====
function initParallax() {
    const hero = document.querySelector('.hero');
    const phone = document.querySelector('.hero-phone');

    if (!hero || !phone) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            const parallax = scrolled * 0.3;
            phone.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// ===== TYPING EFFECT (Optional for hero) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== UTILITY: Debounce =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== UTILITY: Throttle =====
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
