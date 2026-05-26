const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const header = document.querySelector(".site-header");

const updateHeaderState = () => {
  if (!header) return;
  header.toggleAttribute("data-scrolled", window.scrollY > 8);
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.toggleAttribute("data-open", !isOpen);
  });
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const animatedSelectors = [
    ".hero h1",
    ".hero-copy",
    ".hero-actions",
    ".hero-panel",
    ".page-hero .section-inner > *",
    ".section-head > *",
    ".card",
    ".trust-item",
    ".quote",
    ".portrait",
    ".office-image",
    ".office-copy",
    ".fact-box",
    ".cta-band",
    ".map-embed"
  ];

  const animatedItems = document.querySelectorAll(animatedSelectors.join(","));

  animatedItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 30}ms`);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  animatedItems.forEach((item) => revealObserver.observe(item));
}
