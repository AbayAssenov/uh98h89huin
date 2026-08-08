(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class Particle {
    constructor(x, y, color) {
      this.x = x + (Math.random() - 0.5) * 14;
      this.y = y + (Math.random() - 0.5) * 14;
      this.originX = x;
      this.originY = y;
      this.velocityX = (Math.random() - 0.5) * 2.8;
      this.velocityY = (Math.random() - 0.5) * 2.8;
      this.color = color;
      this.phase = Math.random() * Math.PI * 2;
      this.size = 1 + Math.random() * 0.7;
    }

    update(pointerX, pointerY, time) {
      const distanceX = pointerX - this.x;
      const distanceY = pointerY - this.y;
      const distance = Math.hypot(distanceX, distanceY);
      const interactionRadius = 145;

      if (distance > 0 && distance < interactionRadius) {
        const force = (interactionRadius - distance) / interactionRadius;
        this.velocityX -= (distanceX / distance) * force * 3.4;
        this.velocityY -= (distanceY / distance) * force * 3.4;
      }

      const wave = Math.sin(time * 0.0016 + this.originX * 0.018 + this.phase) * 1.7;
      this.velocityX += (this.originX - this.x) * 0.055;
      this.velocityY += (this.originY + wave - this.y) * 0.055;
      this.velocityX *= 0.86;
      this.velocityY *= 0.86;
      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    draw(context) {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
  }

  function initParticleHero() {
    const hero = document.querySelector('.hero');
    const field = hero?.querySelector('.hero-particle-field');
    const canvas = hero?.querySelector('.hero-particle-canvas');
    if (!hero || !field || !canvas || reducedMotion) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let particles = [];
    let pointerX = -1000;
    let pointerY = -1000;
    let frameId;
    let resizeTimer;
    let startAttempts = 0;
    let started = false;

    const build = () => {
      const width = field.clientWidth;
      const height = field.clientHeight;
      const deviceScale = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.5 : 2);
      if (!width || !height) return false;

      canvas.width = Math.round(width * deviceScale);
      canvas.height = Math.round(height * deviceScale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);

      const source = document.createElement('canvas');
      source.width = width;
      source.height = height;
      const sourceContext = source.getContext('2d');
      if (!sourceContext) return false;

      let fontSize = Math.min(height * 0.72, width * 0.36);
      sourceContext.font = `800 ${fontSize}px "Sofia Sans Extra Condensed", sans-serif`;
      const measuredWidth = sourceContext.measureText('INSTEPPE').width;
      if (measuredWidth > width * 0.94) fontSize *= (width * 0.94) / measuredWidth;

      sourceContext.clearRect(0, 0, width, height);
      sourceContext.fillStyle = '#ffffff';
      sourceContext.font = `800 ${fontSize}px "Sofia Sans Extra Condensed", sans-serif`;
      sourceContext.textAlign = 'center';
      sourceContext.textBaseline = 'middle';
      sourceContext.fillText('INSTEPPE', width / 2, height / 2);

      let pixels;
      try {
        pixels = sourceContext.getImageData(0, 0, width, height).data;
      } catch (error) {
        return false;
      }
      const step = 6;
      particles = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (pixels[(y * width + x) * 4 + 3] > 128) {
            const color = x > width * 0.82 ? '#ed6d43' : '#b7d9c0';
            particles.push(new Particle(x, y, color));
          }
        }
      }

      if (!particles.length) return false;
      document.documentElement.classList.add('has-particle-hero');
      return true;
    };

    const animate = (time) => {
      const width = field.clientWidth;
      const height = field.clientHeight;
      context.clearRect(0, 0, width, height);
      particles.forEach(particle => {
        particle.update(pointerX, pointerY, time);
        particle.draw(context);
      });
      frameId = requestAnimationFrame(animate);
    };

    hero.addEventListener('pointermove', event => {
      const bounds = field.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      pointerX = -1000;
      pointerY = -1000;
    });

    const scheduleBuild = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 120);
    };

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(scheduleBuild);
      resizeObserver.observe(field);
    } else {
      window.addEventListener('resize', scheduleBuild, { passive: true });
    }
    window.visualViewport?.addEventListener('resize', scheduleBuild, { passive: true });

    const start = () => {
      if (started) return;
      if (!build()) {
        startAttempts += 1;
        if (startAttempts < 8) setTimeout(start, 180);
        return;
      }
      started = true;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(animate);
    };

    if (document.fonts?.load) {
      document.fonts.load('800 180px "Sofia Sans Extra Condensed"').then(start, start);
    }
    setTimeout(start, 450);
    window.addEventListener('pageshow', () => {
      if (started) scheduleBuild();
      else start();
    });
  }

  function initProjectShowcase() {
    const showcase = document.querySelector('.case-showcase');
    if (!showcase) return;

    const rows = Array.from(showcase.querySelectorAll('.case-card'));
    const previews = Array.from(showcase.querySelectorAll('.case-stage-image'));
    const stageName = showcase.querySelector('.case-stage-name');
    const stageCount = showcase.querySelector('.case-stage-count');
    const stageLine = showcase.querySelector('.case-stage-line span');
    const stageViewport = showcase.querySelector('.case-stage-viewport');
    let activeIndex = 0;

    const activate = index => {
      activeIndex = index;
      rows.forEach((row, rowIndex) => row.classList.toggle('is-active', rowIndex === index));
      rows.forEach((row, rowIndex) => row.setAttribute('aria-expanded', String(rowIndex === index)));
      previews.forEach((preview, previewIndex) => preview.classList.toggle('is-active', previewIndex === index));
      if (stageName) stageName.textContent = rows[index].querySelector('.case-title')?.textContent || '';
      if (stageCount) stageCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(rows.length).padStart(2, '0')}`;
      if (stageLine) stageLine.style.width = `${((index + 1) / rows.length) * 100}%`;
    };

    rows.forEach((row, index) => {
      row.addEventListener('mouseenter', () => activate(index));
      row.addEventListener('focusin', () => activate(index));
      row.addEventListener('click', event => {
        if (window.innerWidth > 768 || event.target.closest('a')) return;
        activate(index);
      });
      row.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        activate(index);
      });
    });

    if (stageViewport && !reducedMotion) {
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;

      showcase.addEventListener('pointermove', event => {
        const bounds = stageViewport.getBoundingClientRect();
        targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2.2;
        targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * -1.8;
      }, { passive: true });
      showcase.addEventListener('pointerleave', () => {
        targetX = 0;
        targetY = 0;
      });

      const follow = () => {
        currentX += (targetX - currentX) * 0.09;
        currentY += (targetY - currentY) * 0.09;
        stageViewport.style.setProperty('--stage-rotate-y', `${currentX}deg`);
        stageViewport.style.setProperty('--stage-rotate-x', `${currentY}deg`);
        requestAnimationFrame(follow);
      };
      requestAnimationFrame(follow);
    }

    activate(activeIndex);
  }

  initParticleHero();
  initProjectShowcase();
})();
