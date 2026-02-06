/**
 * 3D Cube - Simplified Single Scroll Approach
 * Everything happens smoothly as you scroll through ONE section
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cube = document.querySelector('.cube');
    const textLeft = document.querySelector('.sliding-text.text-left');
    const textRight = document.querySelector('.sliding-text.text-right');
    const container = document.querySelector('.case-studies-container');

    if (!cube || !textLeft || !textRight || !container) {
        console.error('Required cube elements not found');
        return;
    }

    // Initial state
    gsap.set(cube, {
        scale: 0,
        opacity: 0,
        rotateX: -20,  // Tilt to show 3D
        rotateY: 0,
        force3D: true
    });
    // Full cube animation WITH pinning - showing all 6 faces
    const cubeWrapper = document.querySelector('.cube-scene-wrapper');
    const titleWrapper = document.querySelector('.title-wrapper');
    
    gsap.set(cube, { opacity: 0, scale: 0 });
    gsap.set([textLeft, textRight], { x: 0, opacity: 1 });

    // Create timeline WITH pinning
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top top',      // Pin when section reaches top
            end: '+=400%',         // Pin for 4x viewport scroll (enough for all 6 faces)
            pin: true,             // Pin the section
            scrub: 0.5,
            anticipatePin: 1,
            markers: false,
            onEnter: () => {
                // Show BOTH title and cube wrapper when section pins
                gsap.to(titleWrapper, { opacity: 1, visibility: 'visible', duration: 0 });
                gsap.to(cubeWrapper, { opacity: 1, visibility: 'visible', duration: 0 });
            },
            onLeaveBack: () => {
                // Hide both when scrolling back up
                gsap.to(titleWrapper, { opacity: 0, visibility: 'hidden', duration: 0 });
                gsap.to(cubeWrapper, { opacity: 0, visibility: 'hidden', duration: 0 });
            }
        }
    });

    // PHASE 1: Initial pause with text together (0-10%)
    tl.to({}, { duration: 0.5 });

    // PHASE 2: Text splits apart (10-25%)
    tl.to(textLeft, {
        xPercent: -100,
        duration: 1,
        ease: 'power2.inOut'
    })
    .to(textRight, {
        xPercent: 100,
        duration: 1,
        ease: 'power2.inOut'
    }, '<');  // Same time as textLeft

    // PHASE 3: Cube appears (25-35%)
    tl.to(cube, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.2)'
    });

    // Small pause to show front face
    tl.to({}, { duration: 0.3 });

    // PHASE 4: Rotate through all 6 faces
    // Face 2: Right (Y+90)
    tl.to(cube, { rotateY: 90, duration: 1.5, ease: 'power2.inOut' });
    tl.to({}, { duration: 0.2 });

    // Face 3: Back (Y+180)
    tl.to(cube, { rotateY: 180, duration: 1.5, ease: 'power2.inOut' });
    tl.to({}, { duration: 0.2 });

    // Face 4: Left (Y+270)
    tl.to(cube, { rotateY: 270, duration: 1.5, ease: 'power2.inOut' });
    tl.to({}, { duration: 0.2 });

    // Face 5: Top (X+90, keep Y at 270)
    tl.to(cube, { rotateY: 270, rotateX: 90, duration: 1.5, ease: 'power2.inOut' });
    tl.to({}, { duration: 0.2 });

    // Face 6: Bottom (X-90, back to Y 0)
    tl.to(cube, { rotateY: 0, rotateX: -90, duration: 1.5, ease: 'power2.inOut' });
    tl.to({}, { duration: 0.2 });

    // Return to front face
    tl.to(cube, { rotateY: 0, rotateX: 0, duration: 1.5, ease: 'power2.inOut' });

    // Final pause before unpin
    tl.to({}, { duration: 0.5 });

    // Hover effects are now handled purely by CSS for better reliability

    // GLightbox - Ensure clicks work on images  
    const faceLinks = document.querySelectorAll('.face-content a');
    faceLinks.forEach(link => {
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
    });

    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.cube-face .face-content a.glightbox',
            touchNavigation: true,
            loop: true,
            closeButton: true
        });
        console.log('GLightbox initialized for', faceLinks.length, 'cube images');
    }

    console.log('3D Cube initialized');
});
