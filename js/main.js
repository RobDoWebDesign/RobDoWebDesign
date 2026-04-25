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
        mobileMenu.addEventListener('click', () => {
            // Toggles the hamburger icon state and the nav visibility
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            
            // Prevent scrolling on the body when the mobile menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                document.body.classList.add('nav-active');
            } else {
                document.body.style.overflow = '';
                document.body.classList.remove('nav-active');
            }
        });

        // Close menu when clicking overlay
        navOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('nav-active');
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('nav-active');
            });
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