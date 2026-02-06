/**
 * Skills Section Scroll Animation
 * Pinned scroll with 3 phases: heading → description+badges → skill bars
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded for skills animation');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Get elements
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) {
        console.error('Skills section not found');
        return;
    }

    const heading = skillsSection.querySelector('h3');
    const description = skillsSection.querySelector('.skills-header p');
    const certifications = skillsSection.querySelector('.certifications');
    const skillItems = skillsSection.querySelectorAll('.skill-item');

    console.log('Found elements:', {
        heading: !!heading,
        description: !!description,
        certifications: !!certifications,
        skillItems: skillItems.length
    });

    if (!heading || !description || !certifications || skillItems.length === 0) {
        console.error('Some skills elements not found');
        return;
    }

    // Set initial state - everything hidden except heading
    gsap.set(description, { opacity: 0, y: 20 });
    gsap.set(certifications, { opacity: 0, y: 20 });
    gsap.set(skillItems, { opacity: 0, x: 50 });  // Slide from right

    // Create timeline with pinning
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: skillsSection,
            start: 'top top',
            end: '+=250%',  // Pin for 2.5x viewport scroll
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,  // Prevent conflicts with other pins
            markers: false,
            onUpdate: (self) => {
                console.log('Skills scroll progress:', (self.progress * 100).toFixed(1) + '%');
            }
        }
    });

    // PHASE 1: Heading already visible (pause)
    tl.to({}, { duration: 1 });

    // PHASE 2: Description + Certifications appear
    tl.to(description, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    })
    .to(certifications, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5');  // Overlap slightly

    // Pause before skills
    tl.to({}, { duration: 0.8 });

    // PHASE 3: All skill bars appear with stagger
    tl.to(skillItems, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,  // Each item 0.15s after previous
        ease: 'power2.out'
    });

    // Final pause before unpin
    tl.to({}, { duration: 1 });

    console.log('Skills section scroll animation initialized');
});
