// Alexis Fils-Aimé | Premium Portfolio Logic

// 1. GLOBAL INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initAnimations();
    initCursor();
    initHeroParallax();
});

// 2. SMOOTH SCROLL (LENIS)
function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

// 3. CURSOR LOGIC
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (!cursor || !follower) return;

    gsap.set([cursor, follower], { opacity: 0 });

    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            opacity: 1
        });
        gsap.to(follower, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.3,
            opacity: 1
        });
    });

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            gsap.to(follower, { scale: 1.5, border: '1px solid #6a3dcc', duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { scale: 1, border: '1px solid rgba(255,255,255,0.2)', duration: 0.3 });
        });
    });
}

// 4. HERO PARALLAX (3D EFFECT)
function initHeroParallax() {
    const hero = document.getElementById('hero');
    const portrait = document.getElementById('hero-portrait');
    const bgTitle = document.querySelector('.hero-bg-title');
    const signature = document.getElementById('hero-signature-text');

    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate move offsets
        const moveX = (clientX - centerX) / centerX; 
        const moveY = (clientY - centerY) / centerY;

        // Move Background Title (Subtle, inverse)
        gsap.to(bgTitle, {
            x: moveX * -30,
            y: moveY * -20,
            duration: 1,
            ease: 'power2.out'
        });

        // Move Portrait (Background Layer)
        gsap.to(portrait, {
            x: moveX * 20,
            y: moveY * 15,
            scale: 1.05,
            duration: 1.2,
            ease: 'sine.out'
        });

        // Move Signature (Strongest, top layer)
        gsap.to(signature, {
            x: moveX * 40,
            y: moveY * 20,
            duration: 1.5,
            ease: 'power3.out'
        });
    });
}

// 5. CINEMATIC REVEALS
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Entrance Timeline
    const mainTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 2 } });

    mainTl.to('#nav-logo', { opacity: 1, y: 0, duration: 1.2 }, 0.5)
          .to('#nav-links', { opacity: 1, duration: 1.5 }, 0.8)
          .to('#nav-cta', { opacity: 1, y: 0, duration: 1.2 }, 0.8)
          .to('#hero-portrait', { opacity: 1, scale: 1.05, duration: 3 }, 0.2)
          .to('#hero-signature-text', { opacity: 1, y: '35%', x: '5%', duration: 2.5 }, 1.2)
          .to('.hero-info-item', { opacity: 1, y: 0, stagger: 0.2, duration: 1.2 }, 1.5)
          .to('#hero-scroll', { opacity: 1, duration: 1.2 }, 2);

    // Scroll Reveals
    gsap.utils.toArray('.reveal-text-trigger').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 100,
            skewY: 5,
            duration: 1.5,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    gsap.utils.toArray('.reveal-up-trigger').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 1.2,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Seamless Infinite Horizontal Loop for Projects
    const sliderContainer = document.querySelector('#slider-inner');
    if (sliderContainer) {
        // Since we explicitly duplicated the items in the HTML (4 originals + 4 clones), 
        // the slider width is 2x the base length. Shifting it by exactly -50% displays the clones.
        // It then jumps back to 0 perfectly seamlessly.
        const loop = gsap.to(sliderContainer, {
            xPercent: -50,
            ease: "none",
            duration: 35, // Adjust for speed
            repeat: -1
        });

        // Slow on hover
        sliderContainer.addEventListener('mouseenter', () => gsap.to(loop, { timeScale: 0.1, duration: 0.8 }));
        sliderContainer.addEventListener('mouseleave', () => gsap.to(loop, { timeScale: 1, duration: 0.8 }));
    }

    // Command Center Animations
    gsap.from('#skills .bg-white\\/\\[0\\.02\\]', {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 70%',
        }
    });

    gsap.from('#skills span', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 60%',
        }
    });
}
