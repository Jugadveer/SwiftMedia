// SwiftMedia Website JavaScript
// Advanced animations and interactive features

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website features
function initializeWebsite() {
    // Add loading screen
    addLoadingScreen();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize magnetic effects
    initializeMagneticEffects();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize form interactions
    initializeFormInteractions();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll progress
    initializeScrollProgress();
    
    // Initialize 3D tilt effects
    initializeTiltEffects();
    
    // Initialize ripple effects
    initializeRippleEffects();
    
    // Initialize floating elements
    initializeFloatingElements();

    // Initialize video autoplay on scroll
    initializeVideoControls();
    
    // Remove loading screen after everything is ready
    setTimeout(() => {
        removeLoadingScreen();
    }, 1500);
}

// Loading Screen
function addLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `<div class="loading-spinner"></div>`;
    document.body.appendChild(loading);
}

function removeLoadingScreen() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
}

// Scroll Progress Bar
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Navigation
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to Section Function
function scrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Magnetic Effects
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic-btn, .logo-container, .service-card, .contact-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.service-card, .work-item, .contact-card, .contact-form-container, .section-header');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Form Interactions
function initializeFormInteractions() {
    const form = document.querySelector('.form');
    const formGroups = document.querySelectorAll('.form-group');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            showNotification('Message sent successfully!', 'success');
            form.reset();
            
            formGroups.forEach(group => {
                const label = group.querySelector('label');
                const input = group.querySelector('input, textarea');
                if (label && input) {
                    // Reset labels to their original state
                    label.classList.remove('active');
                    input.classList.remove('active');
                }
            });
        });
    }

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check for existing value on page load
            if (input.value) {
                label.classList.add('active');
                input.classList.add('active');
            }

            input.addEventListener('focus', () => {
                label.classList.add('active');
                input.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                    input.classList.remove('active');
                }
            });
        }
    });
}

// Ripple Effects
function initializeRippleEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'btn-ripple';
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 3D Tilt Effects
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Floating Elements Animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * speed;
            element.style.transform = `translateY(${rate}px) rotate(${rate * 0.1}deg)`;
        });
    });
}

// Animations
function initializeAnimations() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 1rem;
        color: var(--text-primary);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Smooth scrolling for all internal links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization
function optimizePerformance() {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {}, 16);
    });
    
    const lazyElements = document.querySelectorAll('[data-src]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.src = element.getAttribute('data-src');
                element.classList.remove('lazy');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

optimizePerformance();

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}

// Video controls for reels
function initializeVideoControls() {
    const workItems = document.querySelectorAll('.work-item');

    workItems.forEach(item => {
        const video = item.querySelector('video');
        const playPauseBtn = item.querySelector('.play-pause-btn');
        const muteUnmuteBtn = item.querySelector('.mute-unmute-btn');
        const overlay = item.querySelector('.video-controls-overlay');

        // Handle play/pause
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the parent click event
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Handle mute/unmute
        muteUnmuteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the parent click event
            video.muted = !video.muted;
            if (video.muted) {
                muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
                muteUnmuteBtn.dataset.state = 'muted';
            } else {
                muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-high"></i>';
                muteUnmuteBtn.dataset.state = 'unmuted';
            }
        });

        // Listen for video events to update the button and overlay
        video.addEventListener('play', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            overlay.classList.add('playing');
        });

        video.addEventListener('pause', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            overlay.classList.remove('playing');
        });
    });
}


// Export functions for global access
window.SwiftMedia = {
    scrollToSection,
    showNotification
};
