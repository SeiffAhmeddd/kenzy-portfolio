// Luxe Beauty Portfolio - Interactivity & GSAP Animations

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle - ATTACH FIRST
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', (e) => {
            console.log("Mobile menu clicked");
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Navigation Scroll Effect
    const nav = document.querySelector('#main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('glass-scrolled');
            nav.style.height = '70px';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            nav.classList.remove('glass-scrolled');
            nav.style.height = '90px';
            nav.style.boxShadow = 'none';
        }
    });

    // 3. Reveal Animations (ScrollTrigger)
    const revealElements = document.querySelectorAll('.reveal');

    revealElements.forEach((el) => {
        gsap.fromTo(el,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // 4. Hero Parallax Effect
    const heroImg = document.querySelector('#hero-img');
    if (heroImg) {
        gsap.to(heroImg, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // 5. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Form Submission (Formspree Integration)
    const form = document.querySelector('#campaign-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            // NOTE: Replace the URL below with your unique Formspree URL
            const FORMSPREE_URL = 'https://formspree.io/f/mojpkrao';

            btn.innerHTML = '<span>Sending...</span>';
            btn.disabled = true;

            try {
                const response = await fetch(FORMSPREE_URL, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    btn.innerHTML = '<span>Enquiry Sent!</span>';
                    btn.style.background = '#27ae60';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error("Submission Error:", error);
                btn.innerHTML = '<span>Error Sending</span>';
                btn.style.background = '#e74c3c';
            } finally {
                setTimeout(() => {
                    btn.innerHTML = `<span>${originalText}</span>`;
                    btn.style.background = 'var(--color-primary)';
                    btn.disabled = false;
                }, 4000);
            }
        });
    }

    // 7. Micro-interactions for buttons
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'back.out(1.7)' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });

    // 8. Video Reel Interactivity (Hover to Play, Click to Unmute)
    const reelItems = document.querySelectorAll('.reel-item');
    reelItems.forEach(item => {
        const video = item.querySelector('.reel-video');
        if (video) {
            // Hover: Silent Play
            item.addEventListener('mouseenter', () => {
                video.play().catch(error => console.log("Autoplay prevented:", error));
            });

            // Hover Out: Pause
            item.addEventListener('mouseleave', () => {
                video.pause();
            });

            // Click: Toggle Mute
            item.addEventListener('click', () => {
                video.muted = !video.muted;
                // Once unmuted, we ensure it's playing
                if (!video.muted) {
                    video.play();
                }
            });
        }
    });
});
