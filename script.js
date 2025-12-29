/**
 * Derech Hasidim - Taxi Service Website
 * Interactive JavaScript Features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    initLoader();

    // Initialize all features
    initHeader();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimations();
    initSmoothScroll();
    initParallax();
});

/**
 * Loading screen animation
 */
function initLoader() {
    const loader = document.getElementById('loader');

    // Hide loader after page fully loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 1500); // Show loader for at least 1.5 seconds
    });

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
}

/**
 * Header scroll effects
 */
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    let isOpen = false;

    // Toggle menu
    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        toggleMenu();
    });

    // Close menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            toggleMenu();
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (isOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            isOpen = false;
            toggleMenu();
        }
    });

    function toggleMenu() {
        mobileMenu.classList.toggle('active', isOpen);
        menuBtn.classList.toggle('active', isOpen);

        // Animate hamburger icon
        const spans = menuBtn.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            document.body.style.overflow = 'hidden';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    }
}

/**
 * Scroll-triggered animations (AOS-like)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get delay from data attribute
                const delay = entry.target.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);

                // Optionally unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Counter animations for statistics
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepDuration);
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax effects
 */
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Parallax for background
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Parallax for hero content
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    });
}

/**
 * Add click ripple effect to buttons
 */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Lazy load images (if any are added later)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Phone number click tracking (for analytics)
 */
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('Phone call initiated');
    });
});

/**
 * WhatsApp link tracking
 */
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('WhatsApp message initiated');
    });
});

/**
 * Testimonials slider (auto-scroll on mobile)
 */
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider || window.innerWidth > 768) return;

    let scrollAmount = 0;
    const cardWidth = slider.querySelector('.testimonial-card').offsetWidth + 32;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    setInterval(() => {
        scrollAmount += cardWidth;
        if (scrollAmount > maxScroll) {
            scrollAmount = 0;
        }
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }, 5000);
}

// Initialize slider on load and resize
window.addEventListener('load', initTestimonialsSlider);
window.addEventListener('resize', initTestimonialsSlider);

/**
 * Form validation helper (if forms are added later)
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

/**
 * Toast notification helper
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#00d4aa' : type === 'error' ? '#ff4444' : '#1a5f7a'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(toastStyle);

/**
 * Service Worker registration (for PWA features)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment below if you add a service worker file
        // navigator.serviceWorker.register('/sw.js');
    });
}

/**
 * Accessibility: Respect reduced motion preference
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

/**
 * Debug mode (only in development)
 */
const DEBUG = false;
if (DEBUG) {
    console.log('Derech Hasidim website loaded successfully');
    console.log('All interactive features initialized');
}
