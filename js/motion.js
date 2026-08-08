(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('has-motion');

  if (reducedMotion) return;

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from('.site-header', { y: -24, opacity: 0, duration: 0.55 }, 0)
    .from('.hero-badge, .hero-trust', { y: 18, opacity: 0, stagger: 0.08, duration: 0.55 }, 0.15)
    .from('.hero-title', { y: 60, opacity: 0, duration: 0.85 }, 0.2)
    .from('.hero-sub, .hero-actions', { y: 28, opacity: 0, stagger: 0.08, duration: 0.65 }, 0.45)
    .from('.metric-card', { y: 28, opacity: 0, stagger: 0.06, duration: 0.5 }, 0.9);

  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.15 }
  });

  gsap.to('.hero-copy, .hero-particle-field', {
    yPercent: -18,
    scale: 0.94,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 35%', scrub: 0.7 }
  });

  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
      y: 55,
      opacity: 0,
      stagger: 0.08,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: header, start: 'top 84%', once: true }
    });
  });

  gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.from(card, {
      y: 42,
      opacity: 0,
      duration: 0.72,
      delay: index * 0.035,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%', once: true }
    });
  });

  gsap.utils.toArray('#cases .case-card').forEach(card => {
    gsap.from(card, {
      y: 34,
      opacity: 0,
      duration: 0.72,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%', once: true }
    });
  });

  gsap.from('.case-stage', {
    y: 48,
    opacity: 0,
    duration: .9,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.case-showcase', start: 'top 80%', once: true }
  });

  gsap.from('#studio .studio-photo-wrap', {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.05,
    ease: 'power4.inOut',
    scrollTrigger: { trigger: '#studio .studio-grid', start: 'top 76%', once: true }
  });
  gsap.from('#studio .studio-title, #studio .studio-description, #studio .studio-item', {
    y: 40,
    opacity: 0,
    stagger: 0.075,
    duration: 0.78,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#studio .studio-grid', start: 'top 72%', once: true }
  });

  gsap.from('.who-card', {
    y: 42,
    opacity: 0,
    stagger: 0.09,
    duration: 0.72,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.who-grid', start: 'top 82%', once: true }
  });

  gsap.from('.process-step', {
    y: 58,
    opacity: 0,
    stagger: 0.1,
    duration: 0.82,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.process-grid', start: 'top 80%', once: true }
  });

  gsap.from('.tech-pill', {
    y: 26,
    opacity: 0,
    stagger: 0.035,
    duration: 0.55,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.tech-grid', start: 'top 84%', once: true }
  });

  gsap.from('.cta-banner h2, .cta-banner p, .cta-banner .btn', {
    y: 70,
    opacity: 0,
    stagger: 0.1,
    duration: 0.9,
    ease: 'power4.out',
    scrollTrigger: { trigger: '.cta-banner', start: 'top 72%', once: true }
  });

  gsap.from('.contact-info > *, .form-card', {
    y: 50,
    opacity: 0,
    stagger: 0.075,
    duration: 0.82,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-inner', start: 'top 78%', once: true }
  });

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
