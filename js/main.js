/**
 * RobDoWebDesign | Main Interaction Engine
 * Optimized for performance and premium user experience.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation & Mobile Menu Logic ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const navbar = document.querySelector('.navbar');

    if (mobileMenu && navLinks && navOverlay) {
        const toggleMenu = (isOpen) => {
            mobileMenu.classList.toggle('active', isOpen);
            navLinks.classList.toggle('active', isOpen);
            navOverlay.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            document.body.classList.toggle('nav-active', isOpen);
            mobileMenu.setAttribute('aria-expanded', isOpen);
        };

        mobileMenu.addEventListener('click', () => {
            const isOpen = !navLinks.classList.contains('active');
            toggleMenu(isOpen);
        });

        // Close menu when clicking overlay
        navOverlay.addEventListener('click', () => toggleMenu(false));

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // --- 2. Navbar Scroll Visuals ---
    const handleNavbarEffect = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-scrolled');
        } else {
            navbar.classList.remove('glass-scrolled');
        }
    };

    // Passive listener improves scroll performance
    window.addEventListener('scroll', handleNavbarEffect, { passive: true });
    handleNavbarEffect(); // Initial check on load

    // --- 3. High-End Scroll Reveal System ---
    // Uses IntersectionObserver for a smooth, non-janky reveal effect
    const revealOptions = {
        threshold: 0.15, // Element is 15% visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before the element enters
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Matches the .reveal.active class in your CSS
                entry.target.classList.add('active');
                // Stop observing once the animation has played
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Select all elements intended for reveal
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. Smooth Internal Anchor Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    console.log('RobDoWebDesign Engine Loaded Successfully.');
});