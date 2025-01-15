document.addEventListener('DOMContentLoaded', () => {
    /**
     * Smooth Scrolling Function
     * Handles smooth scrolling for all navigation links and buttons
     */
    function smoothScroll(targetElement) {
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Navigation and Button Scroll Event Listeners
     * Adds smooth scrolling to navbar links and "View My Work" button
     */
    function setupScrollEvents() {
        const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('.nav-toggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('open');
                }
                
                smoothScroll(targetElement);
            });
        });
    }

    /**
     * Active Navigation Highlight
     * Highlights the current section's navigation link
     */
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');

        let currentSection = '';
        const headerHeight = document.querySelector('header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < (sectionTop + sectionHeight)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Mobile Navigation Toggle
     * Handles opening and closing of mobile navigation menu
     */
    function setupMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
    
        navToggle.addEventListener('click', () => {
            // Toggle classes for menu and hamburger icon
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('open');
    
            // Prevent body scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') 
                ? 'hidden' 
                : 'auto';
        });
    
        // Close menu when a nav link is clicked
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }

    function init() {
        setupScrollEvents();
        setupMobileNavigation();

        // Add scroll and load event listeners for navigation highlight
        window.addEventListener('scroll', highlightActiveNavLink);
        window.addEventListener('load', highlightActiveNavLink);
    }

    // Run initialization
    init();
});