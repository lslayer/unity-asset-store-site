const revealTargets = document.querySelectorAll(
  ".section-heading, .panel, .kit-card, .workflow-step, .site-footer"
);

for (const element of revealTargets) {
  element.setAttribute("data-reveal", "");
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

for (const element of revealTargets) {
  observer.observe(element);
}

const parallaxTargets = document.querySelectorAll("[data-parallax]");
const pageParallaxTargets = document.querySelectorAll("[data-page-parallax]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotionQuery.matches && (parallaxTargets.length > 0 || pageParallaxTargets.length > 0)) {
  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;

    for (const element of pageParallaxTargets) {
      const speed = Number(element.dataset.speed || "0");
      const shift = scrollY * speed;

      element.style.setProperty("--page-parallax-shift", `${shift.toFixed(1)}px`);
    }

    for (const element of parallaxTargets) {
      const scene = element.closest(".hero-art");

      if (!scene) {
        continue;
      }

      const rect = scene.getBoundingClientRect();
      const speed = Number(element.dataset.speed || "0");
      const traveled = Math.max(-180, Math.min(rect.height + 180, -rect.top));
      const shift = traveled * speed * 0.72;

      element.style.setProperty("--parallax-shift", `${shift.toFixed(1)}px`);
    }

    ticking = false;
  };

  const requestParallaxFrame = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener("scroll", requestParallaxFrame, { passive: true });
  window.addEventListener("resize", requestParallaxFrame);
}
