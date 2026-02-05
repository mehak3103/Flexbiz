// 0. Reset Scroll on Refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Logic
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (dot && outline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot moves instantly
            dot.style.opacity = "1";
            dot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;

            // Outline follows with GSAP (smoother)
            gsap.to(outline, {
                duration: 0.5,
                x: posX - 20,
                y: posY - 20,
                opacity: 1,
                ease: "power2.out"
            });
        });

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .service-item, .hero-card, .logo');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(outline, {
                    scale: 1.5,
                    backgroundColor: 'rgba(221, 50, 9, 0.1)',
                    duration: 0.3
                });
                gsap.to(dot, { scale: 0.5, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(outline, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    duration: 0.3
                });
                gsap.to(dot, { scale: 1, duration: 0.3 });
            });
        });
    }

    // 2. Magnetic Buttons
    const magnets = document.querySelectorAll('.navmenu a, .btn, .service-icon');
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', moveMagnet);
        magnet.addEventListener('mouseout', (e) => {
            gsap.to(magnet, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        });
    });

    function moveMagnet(event) {
        const magnet = event.currentTarget;
        const bounding = magnet.getBoundingClientRect();
        const strength = 15;

        const x = (event.clientX - bounding.left) - (bounding.width / 2);
        const y = (event.clientY - bounding.top) - (bounding.height / 2);

        gsap.to(magnet, {
            x: x / strength,
            y: y / strength,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    // 3. Floating Orbs
    gsap.to(".orb-1", {
        x: '30vw',
        y: '20vh',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    gsap.to(".orb-2", {
        x: '-20vw',
        y: '-30vh',
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    gsap.to(".orb-3", {
        x: '-10vw',
        y: '40vh',
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 4. Glass Header on Scroll
    const header = document.querySelector('#header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('glass-header');
            } else {
                header.classList.remove('glass-header');
            }
        });
    }

    // 5. Services Card Stacking Logic
    gsap.registerPlugin(ScrollTrigger);

    const servicesContainer = document.querySelector('.services-stack-container');
    const servicesGroup1 = document.querySelector('.services-group.group-1');
    const servicesGroup2 = document.querySelector('.services-group.group-2');

    if (servicesContainer && servicesGroup1 && servicesGroup2) {
        // PIN THE CONTAINER ONLY (so heading scrolls away)
        ScrollTrigger.create({
            trigger: servicesContainer,
            start: "top top", // Container hits top of screen
            end: "+=150%", 
            pin: true,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                if (progress > 0.5) {
                    gsap.to(servicesGroup1, { opacity: 0, scale: 0.9, duration: 0.5, overwrite: true });
                    gsap.to(servicesGroup2, { autoAlpha: 1, scale: 1, duration: 0.5, overwrite: true, pointerEvents: "auto" });
                } else {
                    gsap.to(servicesGroup1, { opacity: 1, scale: 1, duration: 0.5, overwrite: true });
                    gsap.to(servicesGroup2, { autoAlpha: 0, scale: 1.1, duration: 0.5, overwrite: true, pointerEvents: "none" });
                }
            }
        });
    }
});
